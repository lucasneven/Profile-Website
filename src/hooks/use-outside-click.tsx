// Aceternity UI's outside-click hook (used by expandable-card.tsx), typed for React 19:
// calls `callback` when a mouse or touch press lands outside the element `ref` points to.
import { useEffect } from "react";

export const useOutsideClick = (ref: React.RefObject<HTMLElement | null>, callback: (event: Event) => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if the press is on the element or inside it
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
