import { ComponentProps, useId } from "react";
import { cn } from "../../app/utils/cn";

interface FormInputProps extends ComponentProps<"input"> {
text: string;

}

export  function FormInput({text, ...rest}:FormInputProps) {
  const id = useId()

  
  return (
<fieldset className="flex gap-2 flex-col">
          <label htmlFor={id}>{text}</label>
          <input id={id} className={cn("h-12 rounded-md border px-4 placeholder:text-gray-500 outline-none border-white/10 bg-transparent")}  {...rest}/>
        </fieldset>
  )
}
