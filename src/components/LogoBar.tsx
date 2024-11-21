import { Github, Moon, Sun } from "lucide-react";
import { LanguageSelect } from "./LanguageSelect";
import { Button } from "./ui/button";
import { SimpleTooltip } from "./SimpleTooltip";

export function LogoBar({
  setDark,
  isDark,
}: {
  setDark: (val: boolean) => void;
  isDark: boolean;
}) {
  return (
    <div className="dark:bg-slate-900 dark:text-white dark:border-white border-b px-6 py-2 sticky top-0 w-full bg-white flex flex-row justify-between items-center">
      <div className="font-sans text-3xl font-bold">CVGEN</div>
      <div className="space-x-2">
        <DarkModeToggle isDark={isDark} setDark={setDark} />
        <LanguageSelect />
        <GithubButton />
      </div>
    </div>
  );
}

function DarkModeToggle({
  isDark,
  setDark,
}: {
  isDark: boolean;
  setDark: (val: boolean) => void;
}) {
  return (
    <SimpleTooltip content={isDark ? "Light Mode" : "Dark Mode"}>
      <Button
        size="icon"
        variant="outline"
        className="dark:hover:bg-white dark:hover:text-black hover:border-none hover:bg-slate-800 hover:text-white"
        onClick={() => setDark(!isDark)}
      >
        {isDark ? <Sun /> : <Moon />}
      </Button>
    </SimpleTooltip>
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
        <Github className="text-black dark:text-white" />
      </Button>
    </SimpleTooltip>
  );
}
