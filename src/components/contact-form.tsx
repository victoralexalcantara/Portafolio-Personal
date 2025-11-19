'use client';

// Importamos las herramientas que necesitamos de React.
import React, { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
// 'useForm' de 'react-hook-form' nos ayuda a manejar el estado del formulario.
import { useForm } from 'react-hook-form';
// 'zodResolver' conecta 'react-hook-form' con 'zod' para validar los datos.
import { zodResolver } from '@hookform/resolvers/zod';
// 'zod' nos ayuda a definir la "forma" que deben tener nuestros datos.
import { z } from 'zod';

// Importamos la Server Action que se encargará de procesar el formulario.
import { onContactSubmit } from '@/app/actions';
// Importamos los componentes de UI (interfaz de usuario) que creamos antes.
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
// 'useToast' es un "custom hook" para mostrar notificaciones (toasts).
import { useToast } from '@/hooks/use-toast';
// El icono de carga que se muestra mientras se envía el formulario.
import { Loader2 } from 'lucide-react';

// Definimos la estructura y reglas de validación para nuestro formulario con 'zod'.
const contactSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido.'), // El nombre es obligatorio.
  email: z.string().email('Dirección de email inválida.'), // Debe ser un email válido.
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres.'), // El mensaje debe tener al menos 10 caracteres.
});

// Creamos un tipo de TypeScript a partir del esquema de 'zod'.
// Así tenemos autocompletado y seguridad de tipos.
type ContactFormValues = z.infer<typeof contactSchema>;

// Este es el estado inicial para nuestro 'useActionState'.
const initialState = {
  message: '',
  isSuccess: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
 
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Enviar Mensaje
    </Button>
  );
}

// Este es nuestro componente de React.
export default function ContactForm() {
  // 'useActionState' nos da el estado actual del formulario ('state')
  // y la función para llamar a la Server Action ('formAction').
  const [state, formAction] = useActionState(onContactSubmit, initialState);
  // Obtenemos la función 'toast' para mostrar notificaciones.
  const { toast } = useToast();
  // 'useRef' nos permite acceder directamente a un elemento del DOM, en este caso el <form>.
  const formRef = useRef<HTMLFormElement>(null);

  // 'useForm' es el hook principal de react-hook-form.
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema), // Le decimos que use 'zod' para validar.
    defaultValues: { // Valores iniciales para los campos.
      name: '',
      email: '',
      message: '',
    },
  });

  // 'useEffect' se ejecuta cuando cambian las dependencias (en este caso, 'state').
  // Lo usamos para reaccionar a la respuesta del servidor.
  useEffect(() => {
    // Si no hay respuesta del servidor, no hacemos nada.
    if (!state) return;

    // Si el envío fue exitoso
    if (state.isSuccess) {
      toast({
        title: '¡Mensaje Enviado!',
        description: state.message,
        variant: 'success',
      });
      // Limpiamos el formulario y reseteamos su estado.
      form.reset();
      formRef.current?.reset();
    }
    // Si hubo errores de validación de campos
    else if (state.errors) {
      // Recorremos los errores y los asignamos al campo correspondiente en react-hook-form.
      Object.entries(state.errors).forEach(([field, errors]) => {
        if (errors) {
          form.setError(field as keyof ContactFormValues, {
            type: 'server',
            message: errors.join(', '),
          });
        }
      });
      toast({
        title: 'Error de validación',
        description: state.message,
        variant: 'destructive',
      });
    }
    // Si hubo cualquier otro tipo de error no relacionado con campos específicos
    else if (state.message) {
      toast({
        title: 'Error al enviar',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, form, toast]);

  // El JSX que se va a renderizar.
  return (
    // El componente 'Form' de ShadCN envuelve todo y nos da el contexto del formulario.
    <Form {...form}>
      {/* Usamos nuestra 'formAction' en el evento 'action' del formulario. */}
      <form ref={formRef} action={formAction} className="space-y-4">
        {/* 'FormField' es un componente que conecta un campo a react-hook-form. */}
        <FormField
          control={form.control} // Le pasamos el control del formulario.
          name="name" // El nombre del campo, debe coincidir con el schema de 'zod'.
          render={({ field }) => ( // 'render' nos da todo lo necesario para conectar el input.
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                {/* Pasamos las propiedades de 'field' al 'Input' para conectarlo. */}
                <Input placeholder="Tu nombre" {...field} />
              </FormControl>
              {/* 'FormMessage' mostrará el mensaje de error si la validación falla. */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Repetimos el patrón para los otros campos. */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="tu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hola Victor, me gustaría..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       <SubmitButton />
      </form>
    </Form>
  );
}
