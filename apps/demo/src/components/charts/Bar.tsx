import {
  useResponsive,
  Container,
  DEFAULT_CHART_MARGIN,
  Chart,
  DashedLine,
} from "@kylo/dom";
import { useChartVariables, useTimeSeriesData } from "@kylo/dom/src/hooks";
import * as Scale from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Bar } from "@visx/shape";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { localPoint } from "@visx/event";
const points = [
  { x: "2022-01-01", y: 8 },
  { x: "2022-01-02", y: 1 },
];
export default function Barchart() {
  const { domRef, size } = useResponsive<HTMLDivElement>();
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  });
  const { axis, range } = useChartVariables({
    width: size?.width,
    height: size?.height,
    margin: DEFAULT_CHART_MARGIN,
  });
  const { domain, data } = useTimeSeriesData<{ x: string; y: number }>({
    data: points,
    key: {
      x: "x",
      y: "y",
    },
  });
  const xScale = Scale.scaleBand({
    domain: domain.x,
    range: [range.x.min, range.x.max],
    padding: 0.2,
  });

  const yScale = Scale.scaleLinear({
    domain: domain.y as number[],
    round: true,
    range: [range.y.max, range.y.min],
  });

  const colorScale = Scale.scaleOrdinal({
    domain: domain.x,
    range: ["#6c5efb", "#a44afe"],
  });
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<string>();

  return (
    <Container>
      <Container.Title>Balance</Container.Title>
      <Container.ChartWrapper ref={domRef}>
        <Chart width={size?.width} height={size?.height} ref={containerRef}>
          <AxisBottom
            scale={xScale}
            top={axis.bottom.top}
            left={axis.bottom.left}
          ></AxisBottom>
          <AxisLeft
            scale={yScale}
            top={axis.left.top}
            left={axis.left.left}
            numTicks={3}
            tickFormat={(v) => {
              return `$${v}`;
            }}
          ></AxisLeft>
          {data.map((point, index) => {
            const barWidth = xScale.bandwidth();
            const barHeight = range.y.max - yScale(point.y) - 2 || 0;
            const barX = xScale(point.x.toString()) || 0;
            const barY = range.y.max - barHeight - 2;
            return (
              <Bar
                key={index}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={colorScale(point.x)}
                stroke="1"
                rx="5"
                onMouseLeave={(event) => {
                  hideTooltip();
                }}
                onMouseMove={(event) => {
                  const eventSvgCoords = localPoint(event);
                  showTooltip({
                    tooltipTop: barY,
                    tooltipLeft: eventSvgCoords?.x || 0,
                    tooltipData: `${point.x}, ${point.y}`,
                  });
                }}
              ></Bar>
            );
          })}
          <DashedLine
            x={range?.x.min || 0}
            y={(range?.y.max - range.y.min) / 2}
            width={range?.x.max - range?.x.min}
          ></DashedLine>
        </Chart>
        {tooltipOpen && (
          <TooltipInPortal left={tooltipLeft} top={tooltipTop}>
            <div>{tooltipData}</div>
          </TooltipInPortal>
        )}
      </Container.ChartWrapper>
    </Container>
  );
}
