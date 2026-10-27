export type ProjectSlug = 'your-next-binge' | 'mem' | 'airblued';

export type Project = {
  slug: ProjectSlug;
  title: string;
  summary: string;
  description: string;
  platform: string;
  status: string;
  technologies: string[];
  repositoryUrl: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'your-next-binge',
    title: 'Your Next Binge',
    summary: 'Find something you can actually stream, rent, or buy in India.',
    description: 'A React Native for Vega discovery app for Fire TV, centered on regional availability, semantic search, and a persistent watchlist.',
    platform: 'Fire TV · React Native for Vega',
    status: 'Devpost submission · debug and release builds verified on the Vega Virtual Device',
    technologies: ['React Native for Vega', 'TypeScript', 'TMDB', 'Vector search'],
    repositoryUrl: 'https://github.com/Kaiser879/YourNextBinge',
    demoUrl: 'https://devpost.com/software/your-next-binge',
  },
  {
    slug: 'mem',
    title: 'mem',
    summary: 'Find files by what you remember, not what they’re named.',
    description: 'A local-first document search tool that indexes document text and ranks results with SQLite FTS5.',
    platform: 'Desktop · Terminal',
    status: 'BuildX winner · MIT Kernel Tech Club',
    technologies: ['Go', 'SQLite FTS5', 'Bubble Tea', 'OCR'],
    repositoryUrl: 'https://github.com/Kaiser879/MeM',
  },
  {
    slug: 'airblued',
    title: 'AirBlued',
    summary: 'Manage Linux Bluetooth devices from a terminal without shelling out to bluetoothctl.',
    description: 'An nmtui-style Rust terminal app that manages Bluetooth over BlueZ and system D-Bus.',
    platform: 'Linux · Terminal',
    status: 'Core device actions shipped · pairing agent, adapter settings and GATT browsing still open',
    technologies: ['Rust', 'ratatui', 'bluer', 'D-Bus'],
    repositoryUrl: 'https://github.com/Kaiser879/AirBlued',
  },
];

export const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project])) as Record<ProjectSlug, Project>;
