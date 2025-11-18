// Le decimos a Next.js que este código se ejecuta en el servidor. Es importante para la seguridad.
'use server';

// Importamos la función de IA que creamos en otro archivo.
import { improveContent } from '@/ai/flows/ai-powered-content-improvement';
// Importamos 'zod' para validar los datos que nos llegan de los formularios.
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
// Importamos Resend para enviar correos.
import { Resend } from 'resend';

// Inicializamos Resend con la API Key de las variables de entorno.
const resend = new Resend(process.env.RESEND_API_KEY);

// Definimos cómo será el estado de nuestros formularios.
// Esto nos ayuda a manejar mensajes de error, éxito, etc.
export type FormState = {
  message: string; // Un mensaje para el usuario (ej: "¡Gracias!" o "Error").
  improvedContent?: string; // Aquí guardaremos el texto mejorado por la IA.
  fields?: Record<string, string>; // Para guardar los valores de los campos del formulario.
  issues?: string[]; // Para guardar una lista de errores de validación.
  isSuccess?: boolean; // Para saber si la operación fue exitosa.
  errors?: Record<string, string[]>; // Para errores de campo específicos.
};

// Creamos un "esquema" con 'zod' para validar los datos del formulario de mejora de contenido.
const improveSchema = z.object({
  // El contenido debe ser un string y tener al menos 20 caracteres.
  content: z.string().min(20, 'El contenido debe tener al menos 20 caracteres.'),
});

// Esta es una "Server Action" de Next.js. Es una función que se ejecuta en el servidor
// y puede ser llamada directamente desde un formulario en el cliente.
export async function onImproveContent(
  prevState: FormState, // El estado anterior del formulario.
  data: FormData // Los datos que vienen del formulario.
): Promise<FormState> {
  // Convertimos los datos del formulario a un objeto normal.
  const formData = Object.fromEntries(data);
  // Validamos los datos usando el esquema que creamos antes.
  const parsed = improveSchema.safeParse(formData);

  // Si la validación falla...
  if (!parsed.success) {
    // Sacamos los mensajes de error.
    const issues = parsed.error.issues.map((issue) => issue.message);
    // Devolvemos un estado de error.
    return {
      message: 'Error de validación.',
      issues,
    };
  }

  // Si la validación es exitosa, intentamos llamar a la IA.
  try {
    const result = await improveContent({ content: parsed.data.content });
    // Si la IA nos devuelve contenido mejorado...
    if (result.improvedContent) {
      // Devolvemos un estado de éxito con el nuevo contenido.
      return {
        message: '¡Contenido mejorado exitosamente!',
        improvedContent: result.improvedContent,
        isSuccess: true,
      };
    } else {
      // Si la IA no pudo mejorar el contenido.
      return { message: 'La IA no pudo mejorar el contenido.' };
    }
  } catch (error) {
    // Si hay un error al conectar con la IA...
    console.error(error); // Mostramos el error en la consola del servidor.
    return { message: 'Ocurrió un error al contactar a la IA.' };
  }
}

// Creamos otro esquema de validación, esta vez para el formulario de contacto.
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .max(50, 'El nombre no puede tener más de 50 caracteres.'),
  email: z
    .string()
    .trim()
    .email('Por favor, introduce una dirección de email válida.'),
  message: z
    .string()
    .trim()
    .min(10, 'El mensaje debe tener al menos 10 caracteres.')
    .max(1000, 'El mensaje no puede exceder los 1000 caracteres.'),
});

// Otra Server Action, esta para el formulario de contacto.
export async function onContactSubmit(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  // Hacemos lo mismo: convertir y validar los datos.
  const formData = Object.fromEntries(data);
  const parsed = contactSchema.safeParse(formData);

  // Si la validación falla, formateamos los errores para el cliente.
  if (!parsed.success) {
    const validationError = fromZodError(parsed.error);
    return {
      message: validationError.message,
      errors: validationError.formErrors?.fieldErrors,
      isSuccess: false,
    };
  }
  
  // Si la validación es exitosa, intentamos enviar el email.
  try {
    const {name, email, message} = parsed.data;
    
    // Enviamos el email usando Resend.
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Este es un remitente verificado por Resend para pruebas.
      to: 'victoralcantarap@hotmail.com', // ¡Tu email!
      subject: `Nuevo mensaje de tu portafolio de ${name}`,
      reply_to: email,
      html: `<p>Has recibido un nuevo mensaje de contacto:</p>
             <p><strong>Nombre:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Mensaje:</strong></p>
             <p>${message}</p>`,
    });

    // Devolvemos un estado de éxito.
    return { message: '¡Gracias por tu mensaje! Te contactaré pronto.', isSuccess: true };

  } catch (error) {
    // Si hay un error al enviar el email...
    console.error(error);
    return { message: 'Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.', isSuccess: false };
  }
}
