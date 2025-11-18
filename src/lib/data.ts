// Importo los "tipos" de datos que definí en otro archivo.
// Esto ayuda a que TypeScript sepa qué forma tienen mis objetos y me avise si me equivoco.
import type {
  Project,
  SkillCategory,
  ExperienceItem,
  EducationItem,
  Certification,
  NavLink,
  SocialLink,
} from './types';

// Aquí guardo los enlaces de navegación de mi página.
// Es un array de objetos, donde cada objeto es un enlace.
export const navLinks: NavLink[] = [
  { href: '#about', label: 'Sobre Mí' },
  { href: '#skills', label: 'Habilidades' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#experience', label: 'Experiencia' },
  { href: '#contact', label: 'Contacto' },
];

// Un objeto para guardar mis redes sociales. Fácil de encontrar y cambiar.
export const socialLinks: SocialLink = {
  github: 'https://github.com/victoralexalcantara',
  linkedin: 'https://www.linkedin.com/in/victoralexalcantara/',
};

// Mis habilidades, organizadas por categoría.
// Es un array de objetos, y cada objeto tiene un nombre y otro array con las habilidades.
export const skills: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: ['React', 'Next.js', 'JavaScript', 'HTML/CSS', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    name: 'Backend',
    skills: ['C#', '.NET', 'Node.js', 'API RESTful'],
  },
  {
    name: 'Bases de Datos y Otros',
    skills: ['SQL Server', 'GitHub', 'Entity Framework', 'Firebase', 'Auth0'],
  },
];

// La lista de mis proyectos. Cada proyecto es un objeto con todos sus detalles.
export const projects: Project[] = [
  {
    title: 'Sistema de Gestión de Tareas',
    subtitle: 'Freelance',
    description:
      'Desarrollo de una aplicación web full stack con autenticación segura (Auth0) y despliegue en la nube (Firebase), permitiendo a los usuarios gestionar sus tareas diarias.',
    achievement:
      'Logré una reducción del 40% en el tiempo de carga de la aplicación optimizando el renderizado en React.',
    technologies: ['React', 'C#/.NET Core', 'SQL Server', 'Auth0', 'Firebase'],
    githubUrl: 'https://github.com/victoralexalcantara/task-management-app',
    liveUrl: '#', // Pongo '#' porque todavía no tengo un link en vivo.
    imagePlaceholderId: 'task-management', // Un ID para buscar la imagen de placeholder.
  },
  {
    title: 'API RESTful de Alto Rendimiento',
    subtitle: 'Servicio Web',
    description:
      'Arquitectura de backend diseñada para alta disponibilidad y tráfico, optimizando las consultas a la base de datos con Entity Framework.',
    achievement: 'Arquitectura optimizada para gestionar de forma estable más de 1000 solicitudes por minuto.',
    technologies: ['C#/.NET 8', 'Entity Framework', 'SQL Server'],
    githubUrl: 'https://github.com/victoralexalcantara/high-performance-api',
    imagePlaceholderId: 'rest-api',
  },
  {
    title: 'Portafolio Personal',
    subtitle: 'Este sitio',
    description:
      'Mi sitio web personal, construido desde cero para demostrar mis habilidades en desarrollo frontend y diseño responsivo.',
    achievement: 'Sitio 100% responsivo con despliegue ágil y hosting en Firebase.',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Firebase Hosting'],
    githubUrl: 'https://github.com/victoralexalcantara/portfolio-nextjs',
    liveUrl: '#home',
    imagePlaceholderId: 'portfolio',
  },
];

// Mi experiencia laboral. Por ahora, solo una, ¡pero importante!
export const experiences: ExperienceItem[] = [
  {
    title: 'Full Stack Developer Freelance',
    company: 'Autónomo',
    period: '2022 - Presente',
    description:
      'Enfocado en el desarrollo de soluciones web completas, desde la API hasta la interfaz de usuario, en entornos ágiles.',
  },
  {
    title: 'Backend Developer',
    company: 'Tech Solutions Inc.',
    period: '2021 - 2022',
    description:
      'Desarrollo y mantenimiento de APIs RESTful para aplicaciones web, utilizando C# y .NET. Participé en la optimización de consultas a bases de datos y en la implementación de nuevas funcionalidades.',
  },
];

// Mi formación académica.
export const education: EducationItem[] = [
  {
    degree: 'Técnico Superior en Desarrollo de Software',
    institution: 'Instituto Técnico Superior Comunitario (ITSC)',
    period: '2018 - 2021',
  },
];

// Mis certificaciones. ¡Siempre aprendiendo!
export const certifications: Certification[] = [
  { name: 'Scrum Fundamentals Certified', issuer: 'SCRUMstudy' },
  { name: 'Python Essentials', issuer: 'Cisco Networking Academy' },
  { name: 'Database Foundations', issuer: 'Oracle Academy' },
  { name: 'Visual C++ Esencial', issuer: 'LinkedIn Learning' },
];
