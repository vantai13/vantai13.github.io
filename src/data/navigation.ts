export const navigation = [
  { label: 'Home', href: '/', section: 'home' },
  { label: 'About', href: '/about/', section: 'about' },
  { label: 'Research', href: '/research/', section: 'research' },
  { label: 'Projects', href: '/projects/', section: 'projects' },
  { label: 'Experience', href: '/experience/', section: 'experience' },
  { label: 'Writing', href: '/writing/', section: 'writing' },
  { label: 'CV', href: '/cv/', section: 'cv' },
] as const;

export type NavigationSection = typeof navigation[number]['section'];
