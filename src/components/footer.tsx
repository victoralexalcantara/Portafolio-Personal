'use client';

// Importamos las herramientas de React necesarias para manejar estado y efectos.
import React, { useState, useEffect, useRef } from 'react';
// Importamos el componente del logo.
import { Logo } from './icons';
// Importamos la utilidad 'cn' para manejar las clases condicionales.
import { cn } from '@/lib/utils';


// Definimos y exportamos nuestro componente Footer.
export default function Footer() {
  // Obtenemos el año actual para mostrarlo en el copyright.
  const currentYear = new Date().getFullYear();
  // 'useRef' para obtener una referencia al elemento que queremos observar.
  const animationRef = useRef<HTMLParagraphElement>(null);
  // 'useState' para guardar si el elemento está visible o no.
  const [isInView, setIsInView] = useState(false);

  // 'useEffect' se ejecuta solo en el cliente.
  useEffect(() => {
    // Si no tenemos la referencia, no hacemos nada.
    if (!animationRef.current) return;

    // Creamos un 'IntersectionObserver'.
    // Esta función se llamará cuando el elemento observado entre o salga de la pantalla.
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 'isIntersecting' es true si el elemento está visible.
        if (entry.isIntersecting) {
          setIsInView(true);
          // Una vez que la animación ha comenzado, ya no necesitamos observar.
          observer.unobserve(entry.target);
        }
      },
      {
        // 'threshold' en 0.1 significa que la animación se disparará
        // cuando al menos el 10% del elemento esté visible.
        threshold: 0.1,
      }
    );

    // Le decimos al observador que empiece a vigilar nuestro párrafo.
    observer.observe(animationRef.current);

    // Función de limpieza: se ejecuta cuando el componente se desmonta.
    // Es importante para evitar fugas de memoria.
    return () => {
      if (animationRef.current) {
        observer.unobserve(animationRef.current);
      }
    };
  }, []); // El array vacío asegura que este efecto solo se ejecute una vez.

  // Devolvemos el JSX que representa el pie de página.
  return (
    // La etiqueta 'footer' es semántica, le dice al navegador que esto es un pie de página.
    // Le ponemos un borde superior para separarlo del contenido.
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 py-6 px-4 md:px-6 text-center">
        {/* Este div agrupa el logo y el texto de copyright. */}
        <div className="flex items-center gap-2">
          {/* Un párrafo con el texto de copyright. Usamos el año que calculamos antes. */}
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Victor Alex Alcantara. Todos los derechos reservados.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Usamos nuestro componente de Logo. */}
          <Logo className="h-6 w-6 text-muted-foreground" />
          {/* 
            Aplicamos la clase 'animate-typing' solo cuando 'isInView' es true.
            La clase 'opacity-0' lo mantiene invisible hasta que la animación empieza.
          */}
          <p
            ref={animationRef}
            className={cn(
              'text-sm text-muted-foreground',
              isInView ? 'animate-typing' : 'opacity-0'
            )}
          >
            Diseñado y desarrollado con 😁 pasión.
          </p>
        </div>
      </div>
    </footer>
  );
}