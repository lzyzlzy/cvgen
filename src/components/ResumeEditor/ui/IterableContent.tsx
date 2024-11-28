import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

export function IterableContent<T>({
  source,
  render,
  onTrashClick,
}: {
  source?: T[];
  render: (item: T, index: number) => React.ReactNode;
  onTrashClick: (
    val: T,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | undefined;
}) {
  return (
    <>
      {source?.map((item, index) => {
        return (
          <div
            className="border-t-2 mb-2 dark:border-white hover:shadow-xl"
            key={"proj_item_" + index}
          >
            <div className="flex flex-row justify-between items-center">
              <p className="text-md font-bold">{index + 1}.</p>
              <Button
                onClick={(e) => onTrashClick(item, e)}
                variant="ghost"
                size="icon"
                className="dark:bg-slate-700 dark:text-white dark:hover:bg-slate-500 bg-white hover:border-black"
              >
                <Trash2Icon />
              </Button>
            </div>
            {render(item, index)}
          </div>
        );
      })}
    </>
  );
}
