import { Github } from "lucide-react";
import { LanguageSelect } from "./LanguageSelect";
import { Button } from "./ui/button";
import {
  SimpleTooltip,
} from "./SimpleTooltip";

export function LogoBar() {
  return (
    <div className="border-b px-6 py-2 sticky top-0 w-full bg-white flex flex-row justify-between items-center">
      <div className="font-sans text-3xl font-bold">CVGEN</div>
      <div className="space-x-2">
        <LanguageSelect />
        <GithubButton />
      </div>
    </div>
  );
}

function GithubButton() {
  return (
    <SimpleTooltip content="Github">
      <Button
        size="icon"
        variant="outline"
        className="hover:border-none "
        onClick={() =>
          window.open("https://github.com/lzyzlzy/cvgen", "_blank")
        }
      >
        <Github className="text-black" />
      </Button>
    </SimpleTooltip>
  );
}
