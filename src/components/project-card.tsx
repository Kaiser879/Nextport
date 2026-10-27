'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import type { Project } from '@/lib/projects';
import { ProjectVisual } from './project-visual';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.article className={`project-row project-row-${index + 1}`} initial={false} whileHover={reducedMotion ? undefined : { y: -4 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
      <Link className="project-link" href={`/work/${project.slug}`} aria-label={`Read the ${project.title} case study`}>
        <ProjectVisual slug={project.slug} variant={index === 2 ? 'wide' : 'card'} />
        <div className="project-info">
          <div className="project-info-main"><span className="project-number">0{index + 1} / 03</span><h3>{project.title}<span>.</span></h3><p>{project.summary}</p></div>
          <div className="project-info-meta"><div className="project-tags">{project.technologies.slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}</div><span className="project-arrow" aria-hidden="true">↗</span></div>
        </div>
      </Link>
    </motion.article>
  );
}
