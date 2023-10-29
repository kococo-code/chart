import { scaleLinear } from "@kylo/scale";
import { Chart, useResponsive } from "@kylo/dom";
function App() {
  const { domRef, width, height } = useResponsive<HTMLDivElement>();
  const xScale = scaleLinear().range([0, width]).domain([0, 10]);
  const yScale = scaleLinear().range([0, height]).domain([0, 10]);

  return (
    <div
      ref={domRef}
      style={{ width: 100, height: 100 }}
      className="border rounded-2xl"
    >
      <Chart width={width} height={height} fill="black"></Chart>
    </div>
  );
}

export default App;
