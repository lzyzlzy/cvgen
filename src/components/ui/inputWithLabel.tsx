import React from "react";
import { Input } from "./input";
import { Label } from "./label";

export const InputWithLabel = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { labelName: string }
>(({ labelName, id, ...props }, ref) => {
  return (
    <>
      <Label htmlFor={id}>{labelName}</Label>
      <Input id={id} ref={ref} {...props} />
    </>
  );
});
