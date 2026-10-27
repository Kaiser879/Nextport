import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectVisual } from '@/components/project-visual';
import { projectBySlug, projects } from '@/lib/projects';

const caseStudies = {
  'your-next-binge': () => import('@/content/your-next-binge.mdx'),
  mem: () => import('@/content/mem.mdx'),
  airblued: () => import('@/content/airblued.mdx'),
} as const;

type ProjectSlug = keyof typeof caseStudies;

function isProjectSlug(slug: string): slug is ProjectSlug {
  return slug in caseStudies;
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = isProjectSlug(slug) ? projectBySlug[slug] : undefined;
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isProjectSlug(slug)) notFound();
  const key = slug;
  const project = projectBySlug[key];
  const { default: CaseStudy } = await caseStudies[key]();
  const index = projects.findIndex((item) => item.slug === key);
  const next = projects[(index + 1) % projects.length];
  const previous = projects[(index - 1 + projects.length) % projects.length];

  return (
    <main id="main" className="case-page section-shell">
      <Link className="back-link" href="/#work"><span aria-hidden="true">←</span> Selected work</Link>
      <header className="case-header">
        <div className="case-meta"><span>PROJECT CASE STUDY</span><span>{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span></div>
        <h1>{project.title}<span className="title-period">.</span></h1>
        <p>{project.summary}</p>
        <p className="case-description">{project.description}</p>
        <dl className="case-facts">
          <div><dt>Platform</dt><dd>{project.platform}</dd></div>
          <div><dt>Status</dt><dd>{project.status}</dd></div>
          <div><dt>Source</dt><dd><a href={project.repositoryUrl} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a></dd></div>
          {project.demoUrl && <div><dt>Demo</dt><dd><a href={project.demoUrl} target="_blank" rel="noreferrer">Devpost <span aria-hidden="true">↗</span></a></dd></div>}
        </dl>
        <div className="case-stack"><span>BUILT WITH</span>{project.technologies.map((tech) => <b key={tech}>{tech}</b>)}</div>
      </header>
      <ProjectVisual slug={key} variant="detail" />
      <article className="case-content"><CaseStudy /></article>
      <footer className="case-end">
        <Link className="back-link" href="/#work">← All work</Link>
        <div className="case-links">
          <Link className="text-link" href={`/work/${previous.slug}`}><span aria-hidden="true">←</span> {previous.title}</Link>
          <Link className="text-link" href={`/work/${next.slug}`}>{next.title} <span aria-hidden="true">→</span></Link>
        </div>
      </footer>
    </main>
  );
}
