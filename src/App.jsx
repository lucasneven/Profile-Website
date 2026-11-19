import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Section from "./components/Section.jsx";
import Icon from "./components/Icon.jsx";
import {
  experience,
  leadership,
  projects,
  skillGroups,
  coursework,
  interests,
} from "./data.js";

export default function App() {
  return (
    <>
      <Nav />

      <main id="top">
        <Hero />

        <Section id="about" title="About me">
          <p className="lead">
            I'm in the class of 2028 and like building real software, then finding out whether
            people actually need it. Long term, I want to build and ship real products and
            companies.
          </p>
        </Section>

        <Section id="experience" title="Experience">
          <ul className="timeline">
            {experience.map((job) => (
              <li key={job.title}>
                <span className="year">{job.year}</span>
                <div>
                  <h3>{job.title}</h3>
                  <p className="sub">{job.sub}</p>
                  <p>{job.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="leadership" title="Leadership & activities">
          <div className="grid">
            {leadership.map((item) => (
              <article className="card" key={item.title}>
                <span className="card-icon"><Icon name={item.icon} /></span>
                <h3>{item.title}</h3>
                <p className="sub">{item.sub}</p>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid">
            {projects.map((p) => (
              <article className="card" key={p.title}>
                <span className="tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                {p.stack && <p className="stack">{p.stack}</p>}
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="chips">
                {group.items.map((item) => (
                  <span className="chip" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
          <div className="skill-group">
            <h3>Coursework</h3>
            <ul className="list">
              {coursework.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="likes" title="What I'm into">
          <div className="grid">
            {interests.map((item) => (
              <article className="card" key={item.title}>
                <span className="card-icon"><Icon name={item.icon} /></span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="next" title="What's next">
          <p className="lead">
            Summer 2027: applying to Summer Discovery at UC Berkeley (Engineering &amp; Robotics
            Academy or Entrepreneurship: New Venture Creation). Then CS and entrepreneurship in
            college, aiming for Stanford, UC Berkeley (especially its{" "}
            <abbr title="Management, Entrepreneurship & Technology">M.E.T.</abbr> program), and
            UCLA.
          </p>
        </Section>
      </main>

      <footer>
        <p>Made by Lucas Neven · {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
