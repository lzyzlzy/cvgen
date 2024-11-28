import React from "react";
import { Label } from "./label";
import { Textarea } from "./textarea";

export const TextareaWithLabel = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & { labelName: string }
>(({ labelName, id, ...props }, ref) => {
  return (
    <>
      <Label htmlFor={id}>{labelName}</Label>
      <Textarea id={id} ref={ref} {...props} />
    </>
  );
});
