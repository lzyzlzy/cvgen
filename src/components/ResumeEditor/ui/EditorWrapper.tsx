import { ReactNode } from "react";

export function EditorWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="p-6 max-w-lg dark:bg-slate-700 dark:text-white">
      {children}
    </div>
  );
}
