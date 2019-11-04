import React from "react";
import { DragSelection, useSelectableByDragging } from "../lib/";

const Item = () => {
  const [{ selected }, ref] = useSelectableByDragging<HTMLDivElement>({});

  return (
    <div
      {...{ ref }}
      style={{ width: 100, height: 100, background: "lightGray", margin: 5 }}
      className={selected ? "selected" : ""}
    >
      <p>{selected ? "SELECTED" : ""}</p>
    </div>
  );
};

const App: React.FC = () => (
  <div className="App" style={{ flex: 1 }}>
    <DragSelection>
      <Item />
      <Item />
      <Item />
      <Item />
    </DragSelection>
  </div>
);
export default App;
