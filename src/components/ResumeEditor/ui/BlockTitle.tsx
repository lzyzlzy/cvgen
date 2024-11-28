import { ReactNode } from "react";
import { Button } from "../../ui/button";
import { PlusIcon } from "lucide-react";

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

export function BlockTitleWithPlusButton({
  title,
  children,
  onPlusClick,
  ...props
}: {
  title: string;
  children?: ReactNode;
  onPlusClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <BlockTitle title={title} {...props}>
      <Button
        onClick={onPlusClick}
        variant="ghost"
        size="icon"
        className="dark:bg-slate-700 dark:text-white dark:hover:bg-slate-500 bg-white hover:border-black"
      >
        <PlusIcon />
      </Button>
      {children}
    </BlockTitle>
  );
}
