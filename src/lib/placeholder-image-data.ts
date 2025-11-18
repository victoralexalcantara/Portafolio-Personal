// Importamos los datos del archivo JSON.
import data from './placeholder-images.json';

// Definimos un tipo 'ImagePlaceholder' para asegurar que todos los objetos
// de imagen tengan la misma estructura. Esto nos ayuda a evitar errores.
export type ImagePlaceholder = {
  id: string; // Un identificador único para cada imagen.
  description: string; // Una descripción de lo que muestra la imagen.
  imageUrl: string; // la URL completa de la imagen.
  imageHint: string; // Una pista para la IA (no visible para el usuario).
};

// Exportamos la lista de imágenes, asegurándonos de que cumple con el tipo que definimos.
// 'data.placeholderImages' accede a la propiedad 'placeholderImages' dentro del JSON.
export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
