import { Heading } from "@radix-ui/themes";
import ScoreBoard from "./components/charts/ScoreBoard";
import Bar from "./components/charts/Bar";
function App() {
  return (
    <div className="w-full h-full p-6">
      <h1 className="font-semibold text-2xl">Chart Examples</h1>
      <div className="flex relative gap-4 flex-1">
        <Bar></Bar>
        <ScoreBoard></ScoreBoard>
      </div>
    </div>
  );
}

export default App;
