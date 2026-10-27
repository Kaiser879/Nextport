import { HeroField } from '@/components/hero-field';
import { ProjectCard } from '@/components/project-card';
import { projects } from '@/lib/projects';

// TODO: point this at the real profile before publishing.
const LINKEDIN_URL = 'https://www.linkedin.com/in/';

export default function HomePage() {
  return (
    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <HeroField />
        <div className="hero-inner">
          <div className="hero-title-row">
            <h1 className="hero-name" id="hero-title">Kunal Wagh<span>.</span></h1>
            <nav className="hero-links" aria-label="Profiles">
              <a href="https://github.com/Kaiser879" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            </nav>
          </div>
          <p className="hero-college">MIT Mumbai</p>
        </div>
      </section>

      <section className="work-section section-shell" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <h2 id="work-title">Selected work</h2>
        </div>
        <div className="project-list">
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
        </div>
      </section>

      <section className="about-section section-shell" id="about" aria-labelledby="about-title">
        <div className="about-mark">
          <img src="/elliot-miku.jpg" alt="Elliot with a Hatsune Miku figure" width={638} height={629} loading="lazy" decoding="async" />
        </div>
        <div className="about-copy">
          <p className="eyebrow">02 / ABOUT ME</p>
          <h2 id="about-title">Curious about how things work — and how they could work better.</h2>
          <p>I’m studying at MIT Mumbai and building across mobile, desktop, and Linux. I like projects where a clear user problem meets a satisfying technical challenge.</p>
          <div className="capabilities"><span>PRODUCT THINKING</span><span>REACT NATIVE</span><span>RUST & LINUX</span><span>SEARCH SYSTEMS</span></div>
          <p className="about-award">BUILDX · WINNER WITH mem <span aria-hidden="true">↗</span></p>
        </div>
      </section>

      <section className="contact-section section-shell" id="contact" aria-labelledby="contact-title">
        <div className="contact-topline"><p className="eyebrow">03 / OPEN CHANNEL</p><span>AVAILABLE FOR GOOD IDEAS <i /></span></div>
        <h2 id="contact-title">Have something<br /><em>in mind?</em></h2>
        <a className="contact-link" href="mailto:kunalwagh916@gmail.com">kunalwagh916@gmail.com <span aria-hidden="true">↗</span></a>
        <div className="contact-footer"><span>LET’S MAKE IT USEFUL.</span><a href="https://github.com/Kaiser879" target="_blank" rel="noreferrer">GITHUB <span aria-hidden="true">↗</span></a></div>
      </section>
    </main>
  );
}
