import {
  useResponsive,
  Container,
  DEFAULT_CHART_MARGIN,
  Chart,
  generateAnalogousColors,
  Legend,
  DEFAULT_BAND_COLOR_SCALE,
} from "@kylo/dom";
import { useChartVariables, useTimeSeriesData } from "@kylo/dom/src/hooks";
import * as Scale from "@visx/scale";
import { Grid } from "@visx/grid";
import { AxisBottom, AxisLeft } from "@visx/axis";
import * as allCurves from "@visx/curve";
import { AreaClosed, Bar, Line, LinePath } from "@visx/shape";
import {
  defaultStyles,
  TooltipWithBounds,
  useTooltip,
  useTooltipInPortal,
} from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { generateSequentialStockData, Stock } from "@kylo/test";
import { useEffect, useMemo } from "react";
import { scaleBandInvert } from "../../utils/scaleBandInvert";
import { LinearGradient } from "@visx/gradient";
export default function Area() {
  const { domRef, size } = useResponsive<HTMLDivElement>();
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  });
  const SYMBOLS = ["FB"];
  const stock = useMemo(() => {
    return generateSequentialStockData(SYMBOLS, 30, "2022-01-01");
  }, []);
  const flatStock = useMemo(() => {
    return stock.flat();
  }, [stock]);
  const { axis, range, margin, bounds } = useChartVariables({
    width: size?.width,
    height: size?.height,
    margin: DEFAULT_CHART_MARGIN,
  });
  const { domain, data } = useTimeSeriesData<Stock>({
    data: flatStock,
    key: {
      x: "Date",
      y: "Open",
    },
  });
  const xScale = Scale.scaleBand({
    domain: domain.x,
    range: [range.x.min, range.x.max],
  });
  const yScale = Scale.scaleLinear({
    domain: domain.y as number[],
    range: [range.y.max, range.y.min],
  });
  const colorScale = Scale.scaleOrdinal({
    domain: SYMBOLS,
    range: DEFAULT_BAND_COLOR_SCALE,
  });
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<Stock[]>();
  const BASE_COLOR = DEFAULT_BAND_COLOR_SCALE[0];
  const gradientColor = generateAnalogousColors(BASE_COLOR, SYMBOLS.length);
  return (
    <Container>
      <Container.Title>FB Line</Container.Title>
      <Legend categories={SYMBOLS} colorScale={colorScale}></Legend>
      <Container.ChartWrapper ref={domRef}>
        <Chart
          width={size?.width}
          height={size?.height}
          ref={containerRef}
          onMouseMove={(event) => {
            const eventSvgCoords = localPoint(event);
            const xPos = eventSvgCoords?.x || 0;
            const isVisible = range.x.min < xPos && range.x.max > xPos;

            const date = scaleBandInvert(xScale)(xPos);
            const targetData = flatStock.filter((data) => {
              return data.Date === date;
            });
            if (targetData && targetData.length > 0 && isVisible) {
              showTooltip({
                tooltipTop: eventSvgCoords?.y || 0,
                tooltipLeft: xPos,
                tooltipData: targetData,
              });
            } else {
              hideTooltip();
            }
          }}
          onMouseLeave={(event) => {
            hideTooltip();
          }}
        >
          <AxisBottom
            axisClassName="text-[#222222]"
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
          <LinearGradient
            id="area-gradient"
            from={"#5654D48C"}
            to={"#FFFFFF"}
          />
          <AreaClosed
            data={data}
            x={(d) => xScale(d.Date) || 0}
            y={(d) => yScale(d.Open)}
            yScale={yScale}
            fill="url(#area-gradient)"
            curve={allCurves["curveBasis"]}
          ></AreaClosed>
        </Chart>
        {tooltipOpen && (
          <>
            <TooltipInPortal
              left={tooltipLeft}
              top={tooltipTop}
              style={{
                ...defaultStyles,
                opacity: tooltipOpen ? 1 : 0,
                transitionProperty: "opacity",
                transitionDuration: "0.2s",
              }}
            >
              {tooltipData && tooltipData.length > 0 && (
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">{tooltipData[0].Date}</div>
                  <div className="flex gap-1">
                    {tooltipData?.map((stock, index) => {
                      return (
                        <div key={index}>
                          <div>Ticker : {stock?.Symbol}</div>
                          <div>Open : {stock?.Open}</div>
                          <div>Close : {stock?.Close}</div>
                          <div>High : {stock?.High}</div>
                          <div>Low : {stock?.Low}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </TooltipInPortal>
            <TooltipWithBounds
              key={Math.random()}
              left={(tooltipLeft || 0) - 20}
              top={tooltipTop}
              style={{
                ...defaultStyles,
                height: axis.bottom.top,
                background: "transparent",
                border: "transparent",
                boxShadow: "none",
              }}
            >
              <div className="w-[2px] h-full border-r-2 border-r-indigo-500 border-dashed"></div>
            </TooltipWithBounds>
          </>
        )}
      </Container.ChartWrapper>
    </Container>
  );
}
