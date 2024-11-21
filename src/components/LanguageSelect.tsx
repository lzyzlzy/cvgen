import {
  SupportedLangs,
  UseLocalizationDispatch,
} from "@/lib/hooks/LocalizationContext";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { LanguagesIcon } from "lucide-react";

export function LanguageSelect() {
  const dispatch = UseLocalizationDispatch();

  const onChangeLang = (lang: string) => {
    dispatch({
      type: "changeLang",
      data: lang,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="hover:border-none" variant="outline" size="icon">
          <LanguagesIcon />
        </Button>
      </PopoverTrigger>
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
