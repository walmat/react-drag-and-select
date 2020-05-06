import React, { useRef, useState, useEffect } from "react";
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
        borderRadius: 4,
      }}
      className={selected ? "selected" : ""}
    />
  );
};

const App: React.FC = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div
      className="App"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
      }}
    >
      <div
        ref={parentRef}
        style={{
          width: 500,
          height: 300,
          border: "1px solid red",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {parentRef.current && (
          <DragSelection parent={parentRef.current}>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </DragSelection>
        )}
      </div>
    </div>
  );
};
export default App;
