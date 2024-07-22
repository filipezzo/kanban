import { Ball } from "./ball";

interface BoardingHeaderProps {
  color: string;
  text: string;
}

export  function BoardingHeader({color, text}:BoardingHeaderProps) {
  return (
    <div className="flex  gap-2 items-center">
          <Ball color={color} />
          <h3 className="uppercase tracking-wide font-semibold  text-sm">{text}</h3>
        </div>
  )
}
