// Importamos la función 'genkit' para configurar nuestra instancia de IA.
import {genkit} from 'genkit';
// Importamos el plugin de Google AI para poder usar los modelos de Gemini.
import {googleAI} from '@genkit-ai/google-genai';

// Creamos y exportamos la instancia principal de 'genkit', que llamamos 'ai'.
export const ai = genkit({
  // 'plugins' es un array donde registramos los proveedores de modelos de IA.
  plugins: [googleAI()],
  // 'model' define el modelo de IA por defecto que se usará en los prompts si no se especifica otro.
  // Aquí estamos usando 'gemini-2.5-flash', una versión rápida y eficiente.
  model: 'googleai/gemini-2.5-flash',
});
