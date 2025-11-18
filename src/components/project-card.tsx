// Importamos los componentes y tipos necesarios.
import Image from 'next/image'; // Componente optimizado para imágenes de Next.js.
import Link from 'next/link'; // Componente para la navegación del lado del cliente.
import { Github, ExternalLink, Trophy } from 'lucide-react'; // Iconos.

import { type Project } from '@/lib/types'; // El tipo que define la estructura de un proyecto.
import { PlaceHolderImages } from '@/lib/placeholder-image-data'; // Datos de las imágenes de marcador.
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'; // Componentes base de la tarjeta.
import { Badge } from '@/components/ui/badge'; // Componente para mostrar etiquetas (tecnologías).
import { Button } from '@/components/ui/button'; // Componente de botón.

// Definimos la interfaz para las 'props' que recibirá nuestro componente.
interface ProjectCardProps {
  project: Project; // Espera recibir un objeto 'project'.
}

// Este es el componente que renderiza una tarjeta para un proyecto individual.
export function ProjectCard({ project }: ProjectCardProps) {
  // Buscamos la imagen de marcador correspondiente al ID del proyecto.
  const placeholder = PlaceHolderImages.find(
    (p) => p.id === project.imagePlaceholderId
  );

  return (
    // 'Card' es el contenedor principal con el estilo de "cristal esmerilado".
    // Las clases 'transition-all', 'hover:*' crean el efecto de elevación al pasar el ratón.
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out bg-card/50 border-border/20 shadow-sm backdrop-blur-sm hover:border-primary/50 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
      {/* Contenedor para la imagen del proyecto. 'aspect-video' mantiene la proporción 16:9. */}
      <div className="relative w-full aspect-video">
        {/* Si encontramos una imagen de marcador, la mostramos. */}
        {placeholder && (
          <Image
            src={placeholder.imageUrl}
            alt={project.title}
            fill // 'fill' hace que la imagen ocupe todo el espacio de su contenedor padre.
            className="object-cover" // 'object-cover' asegura que la imagen cubra el área sin distorsionarse.
            data-ai-hint={placeholder.imageHint} // Atributo para la IA (no visible).
          />
        )}
      </div>
      {/* 'CardHeader' contiene el título y subtítulo del proyecto. */}
      <CardHeader>
        <CardTitle className="text-xl">{project.title}</CardTitle>
        <CardDescription>{project.subtitle}</CardDescription>
      </CardHeader>
      {/* 'CardContent' contiene la descripción y el logro principal. 'flex-1' hace que ocupe el espacio sobrante. */}
      <CardContent className="flex-1 space-y-4">
        <p className="text-muted-foreground">{project.description}</p>
        {/* Un bloque resaltado para mostrar el logro más importante del proyecto. */}
        <div className="flex items-start gap-3 bg-secondary/50 p-3 rounded-lg">
          <Trophy className="h-5 w-5 mt-1 text-accent flex-shrink-0" />
          <p className="text-sm font-medium text-foreground">
            {project.achievement}
          </p>
        </div>
      </CardContent>
      {/* 'CardFooter' contiene las tecnologías y los enlaces. */}
      <CardFooter className="flex flex-col items-start gap-4">
        {/* Un contenedor para las etiquetas de tecnología. 'flex-wrap' permite que pasen a la siguiente línea si no caben. */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
        {/* Contenedor para los botones de acción (Código y Demo). */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Código
            </Link>
          </Button>
          {/* Mostramos el botón de 'Demo' solo si existe la URL en los datos del proyecto. */}
          {project.liveUrl && (
            <Button variant="default" size="sm" asChild>
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Demo
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
