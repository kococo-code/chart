import {
  useResponsive,
  Container,
  DEFAULT_CHART_MARGIN,
  Chart,
  DashedLine,
} from "@kylo/dom";
import { useChartVariables, useTimeSeriesData } from "@kylo/dom/src/hooks";
import * as Scale from "@visx/scale";
import { Grid } from "@visx/grid";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Bar } from "@visx/shape";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { generateSequentialStockData, Stock } from "@kylo/test";
import { useMemo } from "react";
export default function Barchart() {
  const { domRef, size } = useResponsive<HTMLDivElement>();
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  });
  const stock = useMemo(() => {
    return generateSequentialStockData(["AAPL"], 30, "2022-01-01");
  }, []);
  const { axis, range } = useChartVariables({
    width: size?.width,
    height: size?.height,
    margin: DEFAULT_CHART_MARGIN,
  });
  const { domain, data } = useTimeSeriesData<Stock>({
    data: stock[0],
    key: {
      x: "Date",
      y: "Open",
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
      <Container.Title>AAPL Bar</Container.Title>
      <Container.ChartWrapper ref={domRef}>
        <Chart width={size?.width} height={size?.height} ref={containerRef}>
          <AxisBottom
            scale={xScale}
            top={axis.bottom.top}
            left={axis.bottom.left}
            numTicks={5}
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
          <Grid
            top={0}
            left={DEFAULT_CHART_MARGIN.left}
            xScale={xScale}
            yScale={yScale}
            width={range.x.max - range.x.min}
            height={1}
            stroke="black"
            strokeOpacity={0.1}
            xOffset={xScale.bandwidth() / 2}
          ></Grid>
          {data.map((stock, index) => {
            const barWidth = xScale.bandwidth();
            const barHeight = range.y.max - yScale(stock.Open) - 2 || 0;
            const barX = xScale(stock.Date) || 0;
            const barY = range.y.max - barHeight - 2;
            return (
              <Bar
                key={index}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight > 0 ? barHeight : 0}
                fill={colorScale(domain.x[0])}
                stroke="1"
                rx="2"
                onMouseLeave={(event) => {
                  hideTooltip();
                }}
                onMouseMove={(event) => {
                  const eventSvgCoords = localPoint(event);
                  showTooltip({
                    tooltipTop: barY,
                    tooltipLeft: eventSvgCoords?.x || 0,
                    tooltipData: `${JSON.stringify(stock)}`,
                  });
                }}
              ></Bar>
            );
          })}
          <DashedLine
            className="border-black"
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
