import { useRef, useState, useEffect, useContext, RefObject } from "react";
import { DragSelectionContext } from "../components/DragSelection/context";
import { Box } from "../components/DragSelection/types";

const boxesIntersect = (boxA: Box, boxB: Box) =>
  boxA.left <= boxB.left + boxB.width &&
  boxA.left + boxA.width >= boxB.left &&
  boxA.top <= boxB.top + boxB.height &&
  boxA.top + boxA.height >= boxB.top;

const useSelectableByDragging = <Type extends HTMLElement>(): [
  { selected: boolean },
  RefObject<Type>
] => {
  const itemRef = useRef<Type>(null);
  const { selectionBox } = useContext(DragSelectionContext);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selectionBox && itemRef.current) {
      const box = {
        top: itemRef.current.offsetTop,
        left: itemRef.current.offsetLeft,
        width: itemRef.current.clientWidth,
        height: itemRef.current.clientHeight
      };

      const intersect = boxesIntersect(box, selectionBox);

      setSelected(intersect);
    } else {
      setSelected(false);
    }
  }, [selectionBox]);

  return [{ selected }, itemRef];
};

export default useSelectableByDragging;
