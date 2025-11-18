// Importamos React para crear el componente.
import React from 'react';
// Importamos la utilidad 'cn' para combinar clases de Tailwind de forma segura.
import { cn } from '@/lib/utils';

// Definimos la interfaz para las 'props' que recibirá nuestro componente.
interface SectionHeadingProps {
  children: React.ReactNode; // 'children' es el contenido que se pasará al componente (el texto del título).
  className?: string; // 'className' es opcional, para añadir clases extra desde fuera.
}

// Este es un componente reutilizable para los títulos de cada sección.
export default function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    // 'div' que centra el título y le da un margen inferior.
    // Usamos 'cn' para combinar las clases por defecto con cualquier clase extra que se pase.
    <div className={cn("text-center mb-12 md:mb-16", className)}>
      {/* El 'h2' es el título principal de la sección.
          - 'text-3xl md:text-4xl': Tamaño de fuente grande, responsive.
          - 'font-bold': Texto en negrita.
          - 'text-gradient-primary': Aplica el degradado de color que definimos.
          - 'tracking-tight': Reduce el espaciado entre letras. */}
      <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary tracking-tight">
        {children}
      </h2>
      {/* Este 'div' crea la línea decorativa debajo del título.
          - 'w-24 h-1': Ancho y alto de la línea.
          - 'bg-primary': Usa el color primario (el degradado no se aplica a fondos, así que toma el color base).
          - 'mx-auto': Centra la línea horizontalmente.
          - 'mt-4': Margen superior.
          - 'rounded-full': Bordes completamente redondeados. */}
      <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full" />
    </div>
  );
}
