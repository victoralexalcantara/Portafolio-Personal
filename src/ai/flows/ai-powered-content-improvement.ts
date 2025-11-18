// Este archivo está autogenerado, ¡así que mejor no tocarlo mucho!

// Le decimos a Next.js que este código se ejecuta en el servidor.
'use server';

/**
 * @fileOverview Una herramienta de IA para mejorar el contenido de un portafolio.
 *
 * - improveContent - Una función que recibe un texto y sugiere cómo mejorarlo.
 * - ImproveContentInput - El tipo de datos que espera la función improveContent.
 * - ImproveContentOutput - El tipo de datos que devuelve la función improveContent.
 */

// Importamos las herramientas de Genkit para usar la IA.
import {ai} from '@/ai/genkit';
// Importamos 'zod' que nos ayuda a definir y validar los datos de entrada y salida.
import {z} from 'genkit';

// Aquí definimos cómo deben ser los datos de entrada.
const ImproveContentInputSchema = z.object({
  content: z
    .string()
    .describe('El contenido que queremos mejorar, como descripciones de proyectos o la sección "sobre mí".'),
});
// Creamos un tipo de TypeScript a partir del esquema para usarlo en nuestro código.
export type ImproveContentInput = z.infer<typeof ImproveContentInputSchema>;

// Y aquí definimos cómo serán los datos de salida.
const ImproveContentOutputSchema = z.object({
  improvedContent: z
    .string()
    .describe('El contenido ya mejorado, con sugerencias de palabras y frases.'),
});
// También creamos un tipo para la salida.
export type ImproveContentOutput = z.infer<typeof ImproveContentOutputSchema>;

// Esta es la función principal que exportamos para usar en otras partes de la app.
export async function improveContent(input: ImproveContentInput): Promise<ImproveContentOutput> {
  // Llama al "flow" (flujo) de Genkit, que hace todo el trabajo.
  return improveContentFlow(input);
}

// Aquí creamos el "prompt", que es la instrucción que le damos a la IA.
const improveContentPrompt = ai.definePrompt({
  name: 'improveContentPrompt', // Un nombre para identificar este prompt.
  input: {schema: ImproveContentInputSchema}, // Le decimos qué datos de entrada espera.
  output: {schema: ImproveContentOutputSchema}, // Y qué datos debe devolver.
  // Esta es la instrucción para la IA. Usa plantillas como Handlebars (por eso los {{{}}}).
  prompt: `You are a professional portfolio content editor. Review the following content and suggest improvements to make it more impactful and professional. Focus on word choice, phrasing, and overall clarity. Adhere to a professional portfolio style guide.

Content: {{{content}}}`,
});

// Definimos el "flow" (flujo) de Genkit. Un flujo es como una tarea que la IA puede ejecutar.
const improveContentFlow = ai.defineFlow(
  {
    name: 'improveContentFlow', // Nombre del flujo.
    inputSchema: ImproveContentInputSchema, // El esquema de entrada.
    outputSchema: ImproveContentOutputSchema, // El esquema de salida.
  },
  async input => {
    // Aquí es donde llamamos al prompt con los datos de entrada.
    const {output} = await improveContentPrompt(input);
    // Devolvemos la salida que nos dio la IA. El '!' al final le dice a TypeScript que estamos seguros de que 'output' no será nulo.
    return output!;
  }
);
