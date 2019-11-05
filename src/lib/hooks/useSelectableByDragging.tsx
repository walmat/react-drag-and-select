import { useRef, useState, useEffect, useContext, RefObject } from "react";
import { DragSelectionContext } from "../components/DragSelection/context";
import { boxesIntersect } from "../utils/boxes";

export type UseSelectableByDraggingReturnType<RefType> = [
  { selected: boolean },
  RefObject<RefType>
];

const useSelectableByDragging = <
  RefType extends HTMLElement
>(): UseSelectableByDraggingReturnType<RefType> => {
  const itemRef = useRef<RefType>(null);
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
