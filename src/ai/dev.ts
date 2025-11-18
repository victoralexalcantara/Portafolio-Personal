// Importamos la función 'config' de 'dotenv' para cargar las variables de entorno.
import { config } from 'dotenv';
// Ejecutamos la función para que las variables del archivo .env estén disponibles.
config();

// Importamos el flow de Genkit para que se registre y esté disponible.
// Al importar este archivo, el código que define el flow se ejecuta.
import '@/ai/flows/ai-powered-content-improvement.ts';
