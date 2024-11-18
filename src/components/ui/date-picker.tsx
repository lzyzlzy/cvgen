import { CalendarIcon } from "lucide-react";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { SelectSingleEventHandler } from "react-day-picker";
import { useState } from "react";

export function DatePicker({
  selected,
  onSelectDate,
  id,
  ...props
}: React.ComponentProps<typeof Button> & {
  selected: Date | undefined;
  onSelectDate: SelectSingleEventHandler;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !selected && "text-muted-foreground"
          )}
          onClick={() => setOpen(!open)}
          {...props}
        >
          <CalendarIcon />
          {selected ? format(selected, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(d, s, a, e) => {
            onSelectDate(d, s, a, e);
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}