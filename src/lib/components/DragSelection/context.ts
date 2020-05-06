import { createContext } from "react";
import { SelectionBox } from "./types";

interface Item {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const DragSelectionContext = createContext<{
  selectionBox: SelectionBox | null;
  items: {
    [key: string]: Item;
  };
  registerItem: (item: Item) => void;
}>({
  selectionBox: null,
  items: {},
  registerItem: (item) => {},
});
