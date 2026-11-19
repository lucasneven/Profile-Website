import Icon from "./Icon.jsx";
import SplitText from "@/components/reactbits/SplitText";
import profile from "../assets/profile.jpg";
import { stats } from "../data.js";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-photo">
        <img
          src={profile}
          alt="Portrait of Lucas Neven"
          width="800"
          height="800"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <p className="eyebrow">Hi, I'm</p>
      {/* React Bits SplitText: letters blur in once on load (skipped if reduced motion is on) */}
      <SplitText
        tag="h1"
        text="Lucas Neven"
        textAlign="left"
        trigger="load"
        effect="blur"
        splitType="chars"
        delay={30}
        duration={0.8}
      />
      <p className="tagline">
        I build apps, start things, and invest. Junior at Malibu High, CS at Santa Monica College.
      </p>
      <p className="contact-email">
        Say hi: <a href="mailto:lucashneven@gmail.com">lucashneven@gmail.com</a>
      </p>
      <div className="stats">
        {stats.map((s) => (
          <div key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <a href="#about" className="button">
        Get to know me <Icon name="arrowDown" />
      </a>
    </section>
  );
}
