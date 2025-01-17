import * as VisuallyHiddenRadix from "@radix-ui/react-visually-hidden";

function VisuallyHidden({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <VisuallyHiddenRadix.Root {...props} />;
}

export { VisuallyHidden };
