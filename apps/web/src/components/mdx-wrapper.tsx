import { useMDXComponent } from "@content-collections/mdx/react";
import { mdxComponents } from "./mdx-components";

interface MdxProps {
  code: string;
}

export function MDX({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={mdxComponents} />
    </div>
  );
}
