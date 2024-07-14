import "./App.css";
import Map from "./components/Map";
import SearchLocation from "./components/SearchLocation";
import { useState } from "react";

import type { Location } from "./api/types";

function App() {
  const [place, setPlace] = useState<Location | null>(null);
  return (
    <div className="wrapper">
      <SearchLocation onLocation={(position) => setPlace(position)} />
      <Map location={place} />
    </div>
  );
}

export default App;
