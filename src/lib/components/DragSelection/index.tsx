import React, { useState, useEffect } from "react";
import { DragSelectionContext } from "./context";
import { SelectionBox, Point } from "./types";
import { calculateSelectionBox } from "../../utils/boxes";
import { createPortal } from "react-dom";

interface DragSelectionProps {
  parent: HTMLElement;
}

const DragSelection: React.FC<DragSelectionProps> = ({ children, parent }) => {
  const [startPoint, setStartPoint] = useState<null | Point>(null);
  const [endPoint, setEndPoint] = useState<null | Point>(null);
  const [selectionBox, setSelectionBox] = useState<null | SelectionBox>(null);

  useEffect(() => {
    const onMouseUp = () => {
      if (startPoint && endPoint) {
        setEndPoint(null);
        setStartPoint(null);
      }
    };

    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [endPoint, startPoint]);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!startPoint) {
      return;
    }

    const parentOffsetX = parent.offsetLeft;
    const parentOffsetY = parent.offsetTop;

    setEndPoint({
      x: e.pageX - parentOffsetX,
      y: e.pageY - parentOffsetY,
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const parentOffsetX = parent.offsetLeft;
    const parentOffsetY = parent.offsetTop;

    setStartPoint({
      x: e.pageX - parentOffsetX,
      y: e.pageY - parentOffsetY,
    });
  };

  useEffect(() => {
    if (startPoint && endPoint) {
      setSelectionBox(
        calculateSelectionBox({
          startPoint,
          endPoint,
        })
      );
    } else {
      setSelectionBox(null);
    }
  }, [endPoint, startPoint]);

  return (
    <div {...{ onMouseMove, onMouseDown }}>
      <DragSelectionContext.Provider
        value={{
          selectionBox,
        }}
      >
        {children}
      </DragSelectionContext.Provider>

      {startPoint &&
        endPoint &&
        createPortal(
          <div
            data-selection-box
            style={{
              background: `rgba(0, 162, 255, 0.4)`,
              position: `absolute`,
              zIndex: 99,
              ...(selectionBox || {}),
            }}
          />,
          parent || document.body
        )}
    </div>
  );
};

export default DragSelection;
