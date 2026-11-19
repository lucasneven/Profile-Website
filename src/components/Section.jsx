import { useEffect, useRef, useState } from "react";

// A page section that fades in when it scrolls into view.
export default function Section({ id, title, className = "", children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`section reveal ${visible ? "visible" : ""} ${className}`.trim()}
    >
      <h2>{title}</h2>
      {children}
    </section>
  );
}
