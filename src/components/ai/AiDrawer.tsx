import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { UseLocalization } from "@/hooks/LocalizationContext";
import { Textarea } from "../ui/textarea";
import { useRef, useState } from "react";
import { getCvByInput } from "@/lib/ai/typeChatService";
import { UseCvDispatch } from "@/hooks/CvContext";
import { toast } from "@/hooks/use-toast";

export function AiDrawer() {
  const localization = UseLocalization();

  const ref = useRef<HTMLButtonElement>(null);
  const cvDispatch = UseCvDispatch();

  const [input, setInput] = useState("");
  const handleSubmit = async () => {
    var res = await getCvByInput(input);
    if (typeof res === "string") {
      console.log(res);
      toast({ title: "AI Connect Error", description: res });
    } else {
      cvDispatch({
        type: "setNewCv",
        data: res,
      });
      ref.current?.click();
    }
  };

  const onClickCancel = () => {
    setInput("");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-700 hover:border-none">
          {localization.textKeyStore.generate_by_AI}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              {localization.textKeyStore.ai_drawer_title}
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DrawerFooter>
            <Button
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-700 hover:border-none"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <DrawerClose asChild>
              <Button ref={ref} onClick={onClickCancel} variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
