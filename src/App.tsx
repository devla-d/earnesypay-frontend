import { useState } from "react";

import Routers from "./Routers";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routers />
    </>
  );
}

export default App;
