import { NextUIProvider } from "@nextui-org/react";
import { RoutesTree } from "./routes";

function App() {
  return (
    <NextUIProvider>
      <RoutesTree />
    </NextUIProvider>
  );
}

export default App;
