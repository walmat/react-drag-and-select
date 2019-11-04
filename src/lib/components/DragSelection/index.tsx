import React, { useState, useEffect } from "react";
import "./index.css";
import { DragSelectionContext } from "./context";
import { SelectionBox } from "./types";

interface Point {
  x: number;
  y: number;
}

const DragSelection: React.FC = ({ children }) => {
  const [startPoint, setStartPoint] = useState<null | Point>(null);
  const [endPoint, setEndPoint] = useState<null | Point>(null);
  const [selectionBox, setSelectionBox] = useState<null | SelectionBox>(null);

  const onMouseMove = (e: MouseEvent) => {
    setEndPoint({
      x: e.pageX,
      y: e.pageY
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setStartPoint({
      x: e.pageX,
      y: e.pageY
    });

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

    setEndPoint(null);
    setStartPoint(null);
  };

  useEffect(() => {
    if (startPoint && endPoint) {
      setSelectionBox(
        calculateSelectionBox({
          startPoint,
          endPoint
        })
      );
    } else {
      setSelectionBox(null);
    }
  }, [endPoint, startPoint]);

  const calculateSelectionBox = ({
    startPoint,
    endPoint
  }: {
    startPoint: Point;
    endPoint: Point;
  }) => ({
    left: Math.min(startPoint.x, endPoint.x),
    top: Math.min(startPoint.y, endPoint.y),
    width: Math.abs(startPoint.x - endPoint.x),
    height: Math.abs(startPoint.y - endPoint.y)
  });

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "gray"
      }}
      {...{ onMouseDown }}
    >
      <DragSelectionContext.Provider
        value={{
          selectionBox
        }}
      >
        {children}
      </DragSelectionContext.Provider>

      {startPoint && endPoint && (
        <div className="selection-border" style={selectionBox || {}} />
      )}
    </div>
  );
};

export default DragSelection;
