// Importamos 'clsx' para construir cadenas de clases condicionales de forma sencilla.
import { type ClassValue, clsx } from "clsx"
// Importamos 'tailwind-merge' para fusionar clases de Tailwind CSS sin conflictos.
import { twMerge } from "tailwind-merge"

/**
 * Función de utilidad para combinar clases de Tailwind CSS de manera inteligente.
 * - Primero, 'clsx' junta todas las clases, resolviendo las condicionales.
 *   (ej. cn('p-2', {'bg-red-500': hasError}))
 * - Luego, 'twMerge' fusiona las clases resultantes, eliminando conflictos.
 *   (ej. cn('p-2', 'p-4') resultará solo en 'p-4')
 * @param inputs - Una secuencia de valores de clase (strings, objetos, arrays).
 * @returns Una cadena de texto con las clases finales y sin conflictos.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
