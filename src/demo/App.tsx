import React from "react";
import { DragSelection, useSelectableByDragging } from "../lib/";

const Item = () => {
  const [{ selected }, ref] = useSelectableByDragging<HTMLDivElement>();

  return (
    <div
      {...{ ref }}
      style={{
        width: 100,
        height: 100,
        background: selected ? "blue" : "lightGray",
        margin: 5,
        borderRadius: 4
      }}
      className={selected ? "selected" : ""}
    />
  );
};

const App: React.FC = () => (
  <div
    className="App"
    style={{ flex: 1, display: "flex", flexDirection: "column" }}
  >
    <DragSelection>
      <Item />
      <Item />
      <Item />
      <Item />
    </DragSelection>
  </div>
);
export default App;
