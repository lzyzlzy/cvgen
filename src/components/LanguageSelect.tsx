import {
  SupportedLangs,
  UseLocalization,
  UseLocalizationDispatch,
} from "@/hooks/LocalizationContext";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { LanguagesIcon } from "lucide-react";
import { SimpleTooltip } from "./SimpleTooltip";

export function LanguageSelect() {
  const localization = UseLocalization();
  const dispatch = UseLocalizationDispatch();

  const onChangeLang = (lang: string) => {
    dispatch({
      type: "changeLang",
      data: lang,
    });
  };

  return (
    <Popover>
      <SimpleTooltip content={localization.textKeyStore.change_lang}>
        <PopoverTrigger asChild>
          <Button className="hover:border-none" variant="outline" size="icon">
            <LanguagesIcon />
          </Button>
        </PopoverTrigger>
      </SimpleTooltip>
      <PopoverContent
        className={`space-x-2 w-${SupportedLangs.length * 10 + 10}`}
      >
        {SupportedLangs.map(([lang, display]) => (
          <Button
            className="hover:border-black"
            key={"select_lang_" + lang}
            id={"select_lang_" + lang}
            variant="outline"
            size="icon"
            onClick={() => onChangeLang(lang)}
          >
            {display}
          </Button>
        ))}{" "}
      </PopoverContent>
    </Popover>
  );
}
