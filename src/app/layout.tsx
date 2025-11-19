// Importamos el tipo 'Metadata' de Next.js para el SEO y los estilos globales.
import type { Metadata } from 'next';
import '@/app/globals.css';
// Importamos las fuentes que vamos a usar desde Google Fonts.
import { Poppins, Fira_Code } from 'next/font/google';
// Importamos el componente 'Toaster' para mostrar notificaciones bonitas.
import { Toaster } from '@/components/ui/toaster';

// Configuramos la fuente Poppins.
// 'subsets' le dice a Next.js que solo cargue los caracteres latinos (que incluyen el español).
// 'weight' especifica los grosores que vamos a necesitar.
// 'variable' le asigna un nombre para usarla en CSS.
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

// Hacemos lo mismo para la fuente Fira Code, que usaremos para mostrar código.
const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fira-code',
});


// Aquí definimos los metadatos de la página, como el título y la descripción.
// ¡Esto es muy importante para que Google nos encuentre!
export const metadata: Metadata = {
  title: "Victor Alex Alcantara | Software Development",
  description: 'Portafolio de Victor Alex Alcantara, desarrollador Full Stack especializado en aplicaciones web escalables.',
};

// Este es el "Layout" principal, es como la plantilla que envuelve toda nuestra aplicación.
export default function RootLayout({
  children, // 'children' son los componentes de cada página que se mostrarán aquí.
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // En la etiqueta <html>, ponemos el idioma en español ('es').
    // Por defecto, el tema es oscuro, así que no necesitamos la clase 'dark' aquí.
    <html lang="es">
      {/* En el 'head' va el contenido que no se ve, como las fuentes. */}
      <head>
        
      </head>
      {/* En el 'body' va el contenido de nuestra página.
          - 'antialiased' suaviza las fuentes.
          - Asignamos las variables de las fuentes para que estén disponibles en todo el CSS. */}
      <body className={`${poppins.variable} ${firaCode.variable} font-body antialiased`}>
        {/* Aquí es donde Next.js renderizará el contenido de cada página. */}
        {children}
        {/* Y aquí ponemos el 'Toaster' para que las notificaciones puedan aparecer en cualquier lugar. */}
        <Toaster />
      </body>
    </html>
  );
}