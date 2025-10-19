import { useEffect, useState } from "react";

export function useAutoTabSwitch(
  compressedSvg: string,
  setActiveTab: (tab: string) => void
) {
  const [hasAutoSwitchedTab, setHasAutoSwitchedTab] = useState(false);

  useEffect(() => {
    if (compressedSvg && !hasAutoSwitchedTab) {
      setActiveTab("optimized");
      setHasAutoSwitchedTab(true);
    }
  }, [compressedSvg, hasAutoSwitchedTab, setActiveTab]);

  return [hasAutoSwitchedTab, setHasAutoSwitchedTab] as const;
}
