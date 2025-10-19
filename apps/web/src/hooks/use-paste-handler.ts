import { useEffect } from "react";
import { toast } from "sonner";
import { extractSvgFromBase64, isSvgContent } from "@/lib/file-utils";

export function usePasteHandler(
  setOriginalSvg: (svg: string, name: string) => void,
  setHasAutoSwitchedTab: (value: boolean) => void
) {
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) {
        return;
      }

      for (const item of items) {
        if (item.type === "text/plain") {
          item.getAsString((text) => {
            if (isSvgContent(text)) {
              setOriginalSvg(text, "pasted.svg");
              setHasAutoSwitchedTab(false);
              toast.success("SVG pasted successfully!");
            } else {
              const extracted = extractSvgFromBase64(text);
              if (extracted) {
                setOriginalSvg(extracted, "pasted.svg");
                setHasAutoSwitchedTab(false);
                toast.success("SVG pasted successfully!");
              }
            }
          });
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [setOriginalSvg, setHasAutoSwitchedTab]);
}
