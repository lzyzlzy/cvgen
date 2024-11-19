import { Cv } from "@/core/CV";

export function ResumeViewer({ data }: { data: Cv }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-6 overflow-auto">
      <code className="font-semibold">
        {JSON.stringify(data, null, "  ")}
      </code>
    </div>
  );
}
