import { LanguageSelect } from "./LanguageSelect";

export function LogoBar() {
  return (
    <div className="border-b px-6 py-4 sticky top-0 w-full bg-white flex flex-row justify-between items-center">
      <div className="text-3xl font-bold">CVGEN</div>
      <LanguageSelect />
    </div>
  );
}
