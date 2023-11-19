import ScoreBoard from "./components/charts/ScoreBoard";
import Bar from "./components/charts/Bar";
import Line from "./components/charts/Line";
import Area from "./components/charts/Area";
function App() {
  return (
    <div className="w-full h-full p-6">
      <h1 className="font-semibold text-2xl">Chart Examples</h1>

      <div className="flex gap-2 flex-wrap">
        <Bar></Bar>
        <Line></Line>
        <Area></Area>
        <ScoreBoard></ScoreBoard>
      </div>
    </div>
  );
}

export default App;
