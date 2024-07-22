import { useKanban } from "../../app/hooks/useKanban";
import { Button } from "./button";

interface HeaderProps {
  onOpeningModal():void;
}

export  function Header({onOpeningModal}:HeaderProps) {

  const {selectedBoard} = useKanban()

  return (
    <header className="flex items-center justify-between border-b border-white/10 h-[100px] bg-neutral-900 p-8">
          <h2 className="text-2xl text-white/80  font-semibold">{selectedBoard && selectedBoard.label}</h2>
          <Button disabled={!selectedBoard} onClick={onOpeningModal}>Add New Task</Button>
</header>
  )
}
