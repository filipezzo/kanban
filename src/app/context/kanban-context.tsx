import { createContext, ReactNode, useEffect, useState } from 'react';
import { IBoard, ISub, ITask } from '../models/board';

export interface IContext {
  onAddBoard(newBoard: IBoard): void;
  onSelectingBoard(item: IBoard): void;
  board: IBoard[];
  selectedBoard: IBoard | null;
  onAddTask(newTask: ITask): void;
  onUpdateItem(selectedId: string | undefined, subtasks: ISub[]): void;
  onDeleteTask(id:string | undefined): void;
  onUpdateStatus(id:string | undefined): void;
}

export const Kanban = createContext({} as IContext);

export function KanbanProvider({ children }: { children: ReactNode }) {
  const loadFromLocalStorage = (key: string) => {
    try {
      const savedData = localStorage.getItem(key);
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error(`Error parsing localStorage data for key "${key}":`, error);
    }
    return null;
  };

  const [board, setBoard] = useState<IBoard[]>(() => {
    const savedBoard = loadFromLocalStorage('kanbanBoards');
    return savedBoard ? savedBoard : [];
  });

  const [selectedBoard, setSelectedBoard] = useState<IBoard | null>(() => {
    const savedSelectedBoard = loadFromLocalStorage('selectedBoard');
    return savedSelectedBoard ? savedSelectedBoard : null;
  });

  const handleAddBoard = (newBoard: IBoard) => {
    setBoard([...board, newBoard]);
  };

  const handleSelectingBoard = (item: IBoard) => {
    setSelectedBoard(item);
  };

  const handleUpdateItem = (id: string, subtasks: ISub[]) => {
    if (selectedBoard) {
      const updatedTasks = selectedBoard.tasks.map(task =>
        task.id === id ? { ...task, subtask: subtasks } : task
      );

      const updatedSelectedBoard = { ...selectedBoard, tasks: updatedTasks };

      const updatedBoards = board.map(b =>
        b.id === selectedBoard.id ? updatedSelectedBoard : b
      );
      setSelectedBoard(updatedSelectedBoard);
      setBoard(updatedBoards);
    }
  };
  const handleUpdateStatus = (id: string) => {
    if (selectedBoard) {
      const updateStatus = selectedBoard.tasks.map((item) =>
        item.id === id
          ? {
              ...item,
              status: (item.status === 'todo' ? 'doing' : item.status === 'doing' ? 'done' : 'todo') as 'todo' | 'doing' | 'done',
            }
          : item
      );
  
      const updatedSelectedBoard: IBoard = { ...selectedBoard, tasks: updateStatus };
      const updatedBoard = board.map(b => b.id === selectedBoard.id ? updatedSelectedBoard : b);
  
      setSelectedBoard(updatedSelectedBoard);
      setBoard(updatedBoard);
    }
  };

  const handleAddTask = (newTask: ITask) => {
    if (!selectedBoard) {
      return;
    }
    const updatedBoard = {
      ...selectedBoard,
      tasks: [...selectedBoard.tasks, newTask]
    };
    setBoard(board.map(b => b.id === selectedBoard.id ? updatedBoard : b));
    setSelectedBoard(updatedBoard);
  };

  const handleDeleteTask = (id:string) => {
    if(!selectedBoard){
      return
    }
    const deletedItem = {
      ...selectedBoard,
      tasks: selectedBoard.tasks.filter(item => item.id !== id)
    }
    setSelectedBoard(deletedItem)
    setBoard(board.map(b => b.id === selectedBoard.id ? deletedItem : b))
    
  }

  useEffect(() => {
    localStorage.setItem('kanbanBoards', JSON.stringify(board));
  }, [board]);

  useEffect(() => {
    localStorage.setItem('selectedBoard', JSON.stringify(selectedBoard));
  }, [selectedBoard]);

  return (
    <Kanban.Provider
      value={{
        onAddBoard: handleAddBoard,
        board,
        onSelectingBoard: handleSelectingBoard,
        selectedBoard,
        onAddTask: handleAddTask,
        onUpdateItem: handleUpdateItem,
        onDeleteTask: handleDeleteTask,
        onUpdateStatus: handleUpdateStatus

      }}
    >
      {children}
    </Kanban.Provider>
  );
}
