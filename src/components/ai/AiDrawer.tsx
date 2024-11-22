import { Button } from "../ui/button";
import "../../styles/globals.css";
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
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async () => {
    if (!input) {
      return;
    }
    setLoading(true); // Set loading to true
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
    setLoading(false); // Set loading to false
  };

  const onClickCancel = () => {
    setInput("");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 animate-gradient-x hover:from-violet-700 hover:to-fuchsia-700 hover:border-none glow-effect">
          {localization.textKeyStore.generate_by_AI}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        {!loading ? (
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
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 animate-gradient-x hover:from-violet-700 hover:to-fuchsia-700 hover:border-none"
                onClick={handleSubmit}
                disabled={loading} // Disable button when loading
              >
                {localization.textKeyStore.submit}
              </Button>
              <DrawerClose asChild>
                <Button ref={ref} onClick={onClickCancel} variant="outline">
                  {localization.textKeyStore.cancel}
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        ) : (
          <div className="flex items-center justify-center py-20">
            <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 animate-gradient-x">
              loading...
            </span>
            <DrawerClose className="invisible" asChild>
              <Button ref={ref} onClick={onClickCancel} variant="outline">
                {localization.textKeyStore.cancel}
              </Button>
            </DrawerClose>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
