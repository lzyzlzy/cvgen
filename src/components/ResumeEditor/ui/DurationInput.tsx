import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { UseLocalization } from "@/hooks/LocalizationContext";

interface DateTextInputOption {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DurationInput({
  id,
  from,
  to,
}: {
  id: string;
  from: DateTextInputOption;
  to: DateTextInputOption;
}) {
  const localization = UseLocalization();
  const textKeyStore = localization?.textKeyStore;

  return (
    <div className="grid grid-cols-2 justify-items-stretch gap-2">
      <div className="w-auto">
        <InputWithLabel
          labelName={textKeyStore.from}
          id={"from_" + id}
          placeholder={textKeyStore.from}
          value={from.value}
          onChange={from.onChange}
        />
      </div>
      <div className="w-auto">
        <InputWithLabel
          labelName={textKeyStore.to}
          id={"to_" + id}
          placeholder={textKeyStore.to}
          value={to.value}
          onChange={to.onChange}
        />
      </div>
    </div>
  );
}
