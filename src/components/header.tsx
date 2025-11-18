// Le decimos a Next.js que este componente se ejecuta en el navegador del cliente.
'use client';

// Importamos las herramientas de React que necesitamos.
// 'useState' para manejar el estado del componente (si el menú está abierto, etc.).
// 'useEffect' para ejecutar código cuando algo cambia (como hacer scroll).
import React, { useState, useEffect } from 'react';
// 'Link' de Next.js para navegar entre secciones sin recargar la página.
import Link from 'next/link';
// Importamos los iconos que usaremos desde la librería 'lucide-react'.
import { Menu, X } from 'lucide-react';

// Importamos la lista de enlaces de navegación desde nuestro archivo de datos.
import { navLinks } from '@/lib/data';
// 'cn' es una utilidad para combinar clases de CSS de forma inteligente.
import { cn } from '@/lib/utils';
// Importamos el componente de botón que hemos estilizado.
import { Button } from '@/components/ui/button';
// Importamos nuestro logo.
import { Logo } from './icons';

// Este es el componente del Header (la barra de navegación superior).
export default function Header() {
  // 'useState' para saber si el menú móvil está abierto o cerrado.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 'useState' para saber cuál es el enlace activo (la sección que se está viendo).
  const [activeLink, setActiveLink] = useState('#home');
  // 'useState' para saber si el usuario ha hecho scroll hacia abajo.
  const [isScrolled, setIsScrolled] = useState(false);

  // 'useEffect' se ejecuta después de que el componente se monta en la página.
  // Lo usamos para escuchar el evento de scroll de la ventana.
  useEffect(() => {
    // Esta función se ejecutará cada vez que el usuario haga scroll.
    const handleScroll = () => {
      // Si el scroll vertical es mayor a 10px, cambiamos el estado 'isScrolled' a true.
      setIsScrolled(window.scrollY > 10);
      
      // Buscamos todas las secciones de la página que corresponden a nuestros enlaces.
      const sections = navLinks.map(link => document.querySelector(link.href));
      let current = '#home'; // Por defecto, el enlace activo es 'home'.
      // Recorremos las secciones para ver cuál está visible.
      for (const section of sections) {
        // Si la sección existe y su parte superior está en la vista...
        if (section && window.scrollY >= (section as HTMLElement).offsetTop - 100) {
          // Actualizamos el enlace activo.
          current = `#${section.id}`;
        }
      }
      setActiveLink(current); // Actualizamos el estado con el enlace activo.
    };

    // Añadimos el "escuchador" de eventos de scroll a la ventana.
    window.addEventListener('scroll', handleScroll);
    // Esta función de limpieza se ejecuta cuando el componente se "desmonta".
    // Es importante para evitar problemas de memoria.
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // El array vacío significa que este useEffect solo se ejecuta una vez, al principio.

  // El JSX que se va a renderizar.
  return (
    // 'header' es una etiqueta semántica para la cabecera.
    <header
      className={cn(
        // Clases base del header. 'sticky' lo deja fijo en la parte superior.
        'sticky top-0 z-50 w-full transition-all duration-300',
        // Si 'isScrolled' es true, aplicamos estas clases para darle un fondo borroso.
        isScrolled ? 'bg-card/80 backdrop-blur-lg border-b' : 'bg-card/0'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* El logo y el nombre del sitio, que es un enlace a la sección 'home'. */}
        <Link href="#home" className="flex items-center gap-3" onClick={() => setActiveLink('#home')}>
          <Logo className="h-10 w-10 text-primary" />
          <div className="flex flex-col">
            <span className="font-headline text-xl font-bold text-gradient-primary tracking-wider">
              Victor Alcantara
            </span>
            <span className="text-xs text-muted-foreground font-mono tracking-widest">
              SOFTWARE DEVELOPMENT
            </span>
          </div>
        </Link>
        {/* La navegación principal, que se oculta en pantallas pequeñas ('hidden md:flex'). */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                // Si el enlace es el activo, le ponemos el color primario.
                activeLink === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* Contenedor para los botones de la derecha (IA y menú móvil). */}
        <div className="flex items-center gap-2">
          {/* El botón para abrir/cerrar el menú en móviles ('md:hidden'). */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Al hacer clic, invertimos el estado 'isMenuOpen'.
          >
            {/* Si el menú está abierto, muestra la 'X', si no, el icono de menú (hamburguesa). */}
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {/* El menú desplegable para móviles. Solo se muestra si 'isMenuOpen' es true. */}
      {isMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-lg pb-4">
          <nav className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.href);
                  setIsMenuOpen(false); // Cierra el menú al hacer clic en un enlace.
                }}
                className={cn(
                  'text-lg font-medium transition-colors hover:text-primary',
                  activeLink === link.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
