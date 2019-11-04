import { createContext } from "react";
import { SelectionBox } from "./types";

export const DragSelectionContext = createContext<{
  selectionBox: SelectionBox | null;
}>({
  selectionBox: null
});
