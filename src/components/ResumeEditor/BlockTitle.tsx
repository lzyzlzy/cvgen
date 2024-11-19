import { ReactNode } from "react";

export function BlockTitle({
  title,
  children,
  ...props
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-row items-center justify-between">
      <h2 className="text-xl font-bold underline" {...props}>
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}
