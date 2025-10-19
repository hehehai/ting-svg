import { useEffect, useState } from "react";
import { prettifySvg } from "@/lib/file-utils";

export function usePrettifiedSvg(svg: string, shouldPrettify: boolean): string {
  const [prettified, setPrettified] = useState("");

  useEffect(() => {
    const prettify = async () => {
      if (shouldPrettify && svg) {
        const result = await prettifySvg(svg);
        setPrettified(result);
      } else {
        setPrettified(svg);
      }
    };
    prettify();
  }, [svg, shouldPrettify]);

  return prettified;
}
