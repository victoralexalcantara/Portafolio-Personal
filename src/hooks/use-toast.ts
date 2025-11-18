// Marcamos que este código es para el cliente, ya que maneja estado y efectos de React.
"use client"

// Inspirado en la librería react-hot-toast.
import * as React from "react"

// Importamos los tipos de los componentes de Toast para asegurar la consistencia.
import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

// Constantes para la configuración de los toasts.
const TOAST_LIMIT = 1 // Número máximo de toasts visibles a la vez.
const TOAST_REMOVE_DELAY = 1000000 // Tiempo de espera antes de eliminar un toast del DOM.

// Tipo para un toast dentro del sistema, que extiende las props del componente y añade un ID y contenido.
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Definimos los tipos de acciones que puede manejar nuestro reducer.
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

// Un contador para generar IDs únicos para cada toast.
let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// Tipos para las acciones del reducer.
type ActionType = typeof actionTypes
type Action =
  | { type: ActionType["ADD_TOAST"]; toast: ToasterToast }
  | { type: ActionType["UPDATE_TOAST"]; toast: Partial<ToasterToast> }
  | { type: ActionType["DISMISS_TOAST"]; toastId?: ToasterToast["id"] }
  | { type: ActionType["REMOVE_TOAST"]; toastId?: ToasterToast["id"] }

// La "forma" del estado que manejará nuestro reducer.
interface State {
  toasts: ToasterToast[]
}

// Un Map para guardar los temporizadores de eliminación de cada toast.
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

// Función que añade un toast a la cola de eliminación después de un tiempo.
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

// El reducer es una función pura que calcula el siguiente estado basado en el estado actual y una acción.
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => addToRemoveQueue(toast.id))
      }
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? { ...t, open: false }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return { ...state, toasts: [] }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Array de 'listeners' para notificar a los componentes cuando el estado cambia.
const listeners: Array<(state: State) => void> = []

// El estado global de los toasts, guardado en memoria.
let memoryState: State = { toasts: [] }

// Función para despachar acciones. Actualiza el estado y notifica a los listeners.
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// Tipo para crear un nuevo toast, omitiendo el ID que se genera automáticamente.
type Toast = Omit<ToasterToast, "id">

// Función principal para crear y mostrar un toast.
function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({ type: "UPDATE_TOAST", toast: { ...props, id } })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return { id, dismiss, update }
}

// El hook personalizado que usarán los componentes para acceder al sistema de toasts.
function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

// Exportamos el hook y la función 'toast' para usarlos en la aplicación.
export { useToast, toast }
