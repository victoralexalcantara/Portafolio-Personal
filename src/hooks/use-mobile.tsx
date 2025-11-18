// Importamos React, específicamente 'useState' y 'useEffect'.
import * as React from "react"

// Definimos el punto de ruptura para considerar un dispositivo como móvil.
// 768px es un estándar común para tablets en modo retrato.
const MOBILE_BREAKPOINT = 768

/**
 * Un hook personalizado de React para detectar si el usuario está en un dispositivo móvil.
 * Devuelve 'true' si el ancho de la ventana es menor que el 'MOBILE_BREAKPOINT', y 'false' si no.
 * @returns {boolean} - Verdadero si es un dispositivo móvil, falso si no.
 */
export function useIsMobile() {
  // 'useState' para almacenar si el dispositivo es móvil o no.
  // Inicializa como 'undefined' para manejar el renderizado inicial en el servidor (SSR).
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  // 'useEffect' se ejecuta solo en el cliente, después de que el componente se ha montado.
  React.useEffect(() => {
    // 'matchMedia' es una API del navegador para comprobar si el documento cumple con una media query.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Esta función se ejecutará cada vez que cambie el tamaño de la ventana y cruce el breakpoint.
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Añadimos un 'listener' para el evento 'change' de la media query.
    mql.addEventListener("change", onChange)
    
    // Comprobamos el tamaño inicial de la ventana cuando el componente se monta.
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Función de limpieza: se ejecuta cuando el componente se desmonta.
    // Es importante eliminar el 'listener' para evitar fugas de memoria.
    return () => mql.removeEventListener("change", onChange)
  }, []) // El array vacío significa que este efecto solo se ejecuta una vez (al montar).

  // Devolvemos el valor booleano. '!!isMobile' convierte 'undefined' a 'false' en el primer render.
  return !!isMobile
}
