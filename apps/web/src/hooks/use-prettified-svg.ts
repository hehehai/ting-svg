import { useEffect, useState } from "react";
import { prettierWorkerClient } from "@/lib/worker-utils/prettier-worker-client";

export function usePrettifiedSvg(svg: string, shouldPrettify: boolean): string {
  const [prettified, setPrettified] = useState("");
  const [_isPrettifying, setIsPrettifying] = useState(false);

  useEffect(() => {
    const prettify = async () => {
      if (shouldPrettify && svg) {
        setIsPrettifying(true);
        try {
          const result = await prettierWorkerClient.format(svg, "svg");
          setPrettified(result);
        } catch (_error) {
          setPrettified(svg);
        } finally {
          setIsPrettifying(false);
        }
      } else {
        setPrettified(svg);
      }
    };
    prettify();
  }, [svg, shouldPrettify]);

  return prettified;
}
