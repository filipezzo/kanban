import { ComponentProps, useId } from "react";
import { cn } from "../../app/utils/cn";

interface TextAreaProps extends ComponentProps<"textarea">{
text: string;
}

export default function FormTextarea({text,...props}:TextAreaProps) {
  const id = useId()
  return (
    <fieldset className="flex gap-2 flex-col">
        <label htmlFor={id}>{text}</label>
        <textarea  id={id} className={cn(" rounded-md border px-4 placeholder:text-gray-400 py-2 h-40 resize-none outline-none border-white/10 bg-transparent")} {...props} />
      </fieldset>
  )
}
