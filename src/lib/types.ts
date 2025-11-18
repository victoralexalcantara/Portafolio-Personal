// Este archivo define las "formas" o "estructuras" de los datos que usamos en la aplicación.
// Usar TypeScript y definir estos tipos nos ayuda a evitar errores y a tener un código más robusto y fácil de mantener.

// Define la estructura de un objeto 'Project'.
export type Project = {
  title: string; // Título del proyecto.
  subtitle: string; // Un subtítulo o contexto corto (ej. "Freelance").
  description: string; // Descripción detallada del proyecto.
  achievement: string; // El logro más importante o destacado del proyecto.
  technologies: string[]; // Un array de strings con las tecnologías usadas.
  githubUrl: string; // Enlace al repositorio en GitHub.
  liveUrl?: string; // Enlace a la demo en vivo (es opcional, por eso el '?').
  imagePlaceholderId: string; // El ID para encontrar la imagen de marcador correspondiente.
};

// Define la estructura de una categoría de habilidades.
export type SkillCategory = {
  name: string; // Nombre de la categoría (ej. "Frontend").
  skills: string[]; // Un array con las habilidades de esa categoría.
};

// Define la estructura de un item de experiencia laboral.
export type ExperienceItem = {
  title: string; // El puesto (ej. "Full Stack Developer").
  company: string; // La empresa o si fue autónomo.
  period: string; // El rango de fechas (ej. "2022 - Presente").
  description: string; // Descripción de las responsabilidades y logros.
};

// Define la estructura de un item de formación académica.
export type EducationItem = {
  degree: string; // El título obtenido.
  institution: string; // La institución educativa.
  period: string; // El rango de fechas.
};

// Define la estructura de una certificación.
export type Certification = {
  name: string; // Nombre de la certificación.
  issuer: string; // Entidad que emitió la certificación (ej. "SCRUMstudy").
};

// Define la estructura de un enlace de navegación.
export type NavLink = {
  href: string; // La URL o ancla a la que apunta (ej. "#projects").
  label: string; // El texto que se muestra en el enlace (ej. "Proyectos").
};

// Define la estructura para los enlaces a redes sociales.
export type SocialLink = {
  github: string; // URL del perfil de GitHub.
  linkedin: string; // URL del perfil de LinkedIn.
};
