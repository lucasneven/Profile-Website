// Runs a small script while the HTML is still loading (before the first paint).
// On the client it renders as text/plain so React doesn't warn about <script> tags;
// see "Preventing flash before hydration" in node_modules/next/dist/docs.
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
