import { ReactNode } from "react";

export function EditorRowWrapper({ children }: { children: ReactNode }) {
  return <div className="w-full items-center">{children}</div>;
}
