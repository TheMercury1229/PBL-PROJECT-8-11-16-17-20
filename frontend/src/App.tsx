import { Button } from "@/components/ui/button";
import { useState } from "react";

function App() {
  const [count , setCount] = useState<String>();
  return (
    <>
      <Button>Test</Button>
    </>
  );
}

export default App;
