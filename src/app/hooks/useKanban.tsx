
import { useContext } from "react";
import { Kanban } from "../context/kanban-context";

export function useKanban(){
  return useContext(Kanban)
}