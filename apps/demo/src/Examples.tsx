import { Heading } from "@radix-ui/themes";
import Bar from "./components/charts/Bar";
function App() {
  return (
    <div className="w-full h-full p-1">
      <Heading as="h1" weight="bold">
        Chart Examples
      </Heading>
      <div className="flex relative">
        <Bar></Bar>
      </div>
    </div>
  );
}

export default App;
