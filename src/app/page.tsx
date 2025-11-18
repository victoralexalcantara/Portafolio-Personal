// Importo componentes de Next.js para imágenes y enlaces.
import Image from 'next/image';
import Link from 'next/link';
// Importo un montón de iconos chulos de la librería lucide-react.
import {
  ArrowDownToLine,
  Award,
  Book,
  Briefcase,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Star,
} from 'lucide-react';

// Importo los datos de mi portafolio (proyectos, skills, etc.) desde un archivo local.
import { certifications, education, experiences, projects, skills, socialLinks } from '@/lib/data';
// Importo las imágenes de placeholder que usaré.
import { PlaceHolderImages } from '@/lib/placeholder-image-data';
// Importo componentes de UI que he creado, como botones y tarjetas.
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
// Importo los componentes principales de mi página: el header, footer, etc.
import Header from '@/components/header';
import Footer from '@/components/footer';
import SectionHeading from '@/components/section-heading';
import { ProjectCard } from '@/components/project-card';
import ContactForm from '@/components/contact-form';

// Esta es la función principal de mi página. ¡Aquí empieza la magia!
export default function Home() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile');
  // 'return' es lo que le dice a React qué dibujar en la pantalla.
  return (
    // Un 'div' que envuelve toda la página. 'flex' y 'flex-col' lo hacen un contenedor flexible vertical.
    <div className="flex flex-col min-h-[100dvh]">
      {/* Pongo el Header (la barra de navegación) arriba del todo. */}
      <Header />
      {/* 'main' es donde va el contenido principal de la página. */}
      <main className="flex-1">
        {/* Sección del Héroe: la primera cosa que ves cuando entras. */}
        <section
          id="home"
          // Hacemos que la sección sea "relative" para poder posicionar los círculos animados dentro de ella.
          className="relative w-full h-[calc(100vh-5rem)] min-h-[600px] max-h-[1080px] flex items-center justify-center bg-card overflow-hidden"
        >
          {/* Este div es el contenedor de los círculos animados. Lo ponemos detrás del contenido. */}
          <div className="absolute inset-0 z-0">
            {/* 
              Cada uno de estos divs es un círculo (o "blob").
              - 'absolute' los saca del flujo normal para poder posicionarlos donde queramos.
              - 'bg-primary/5' les da un color (el primario con 5% de opacidad) y 'rounded-full' los hace círculos.
              - 'opacity-50' y 'blur-3xl' les da ese efecto difuminado y semitransparente.
              - 'animate-[blob-anim_25s_infinite]' aplica la animación que creamos en CSS.
                - 'blob-anim' es el nombre de nuestros keyframes.
                - '25s' es la duración de la animación.
                - 'infinite' hace que se repita para siempre.
              - Cambiamos la posición, tamaño y duración de cada uno para que no se muevan todos a la vez.
            */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 opacity-50 blur-3xl animate-[blob-anim_25s_infinite]"></div>
            <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-accent/5 opacity-50 blur-3xl animate-[blob-anim_20s_infinite_reverse]"></div>
            <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-primary/10 opacity-40 blur-2xl animate-[blob-anim_30s_infinite] animation-delay-5000"></div>
          </div>

          {/* Ponemos el contenido en una capa superior (z-10) para que esté por delante de los círculos. */}
          <div className="text-center space-y-4 z-10 relative">
            {/* Mi nombre bien grande. 'h1' es el título más importante. */}
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-gradient-primary">
              Victor Alex Alcantara
            </h1>
            {/* Mi profesión. */}
            <p className="text-xl md:text-2xl text-muted-foreground font-headline">
              Desarrollador Full Stack
            </p>
            {/* Una pequeña descripción sobre mí. */}
            <p className="max-w-2xl mx-auto text-lg">
              Especializado en crear aplicaciones web escalables con un fuerte
              enfoque en UX y rendimiento.
            </p>
            {/* Un contenedor para los botones. */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {/* Un botón que te lleva a mis proyectos. */}
              <Button size="lg" asChild>
                <Link href="#contact">
                  <Mail className="mr-2 h-5 w-5" />
                  <span className="animate-typing">Contrátame</span>
                </Link>
              </Button>
              {/* Un botón para descargar mi CV. */}
              <Button size="lg" variant="secondary" asChild>
                <Link href="https://drive.google.com/file/d/1RBRKGpEy2PeVwE4fLb5A7DAk0bX5F_AM/view?usp=sharing"
                  download target="_blank">
                  <ArrowDownToLine className="mr-2 h-5 w-5" />
                  Descargar CV
                </Link>
              </Button>
            </div>
            {/* Contenedor para mis redes sociales. */}
            <div className="flex items-center justify-center gap-4 pt-6">
              {/* Enlace a mi GitHub. */}
              <Link
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-7 w-7" />
              </Link>
              {/* Enlace a mi LinkedIn. */}
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-7 w-7" />
              </Link>
            </div>
          </div>
        </section>

        {/* Sección "Sobre Mí" */}
        <section id="about">
          {/* Un título para la sección. */}
          <SectionHeading>Sobre Mí</SectionHeading>
          {/* Un grid para poner mi foto a un lado y el texto al otro. */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
            <div className="md:col-span-1 flex justify-center">
              <div className="relative">
                {/* Mi foto de perfil. */}
                {profileImage && (
                  <Image
                    src={profileImage.imageUrl}
                    alt="Victor Alcantara"
                    width={300}
                    height={300}
                    className="rounded-full object-cover border-4 border-primary/10 shadow-lg"
                    data-ai-hint={profileImage.imageHint}
                  />
                )}
                {/* Un iconito de estrella para decorar. */}
                <div className="absolute bottom-4 -right-2 bg-primary p-3 rounded-full shadow-lg">
                  <Star className="text-primary-foreground h-6 w-6" />
                </div>
              </div>
            </div>
            {/* El texto sobre mí. */}
            <div className="md:col-span-2 space-y-4 text-lg/relaxed">
              <p>
                ¡Hola! Soy Victor, un Desarrollador Full Stack apasionado por
                construir soluciones tecnológicas que sean tan eficientes como
                intuitivas.
              </p>
              <p>
                Mi formación como{' '}
                <strong className="text-gradient-primary">
                  Técnico Superior en Desarrollo de Software
                </strong>{' '}
                me dio la base, pero mi verdadera especialización se ha forjado
                en la práctica, trabajando como freelance y desarrollando
                proyectos complejos. Me muevo con fluidez tanto en el backend,
                creando APIs robustas con{' '}
                <strong className="text-gradient-primary">Node.js</strong> y{' '}
                <strong className="text-gradient-primary">.NET</strong>, y en el
                frontend, dando vida a interfaces de usuario interactivas con{' '}
                <strong className="text-gradient-primary">React</strong> y {''}
                <strong className="text-gradient-primary">Next.js</strong>.
              </p>
              <p>
                Lo que realmente me impulsa es el desafío de la{' '}
                <strong className="text-gradient-primary">optimización</strong>. Me
                obsesiona crear aplicaciones web escalables, como una API que
                diseñé capaz de gestionar más de 1000 solicitudes por minuto, y
                mejorar el{' '}
                <strong className="text-gradient-primary">rendimiento</strong> y la{' '}
                <strong className="text-gradient-primary">UX</strong>, logrando
                reducir en un 40% el tiempo de carga en un proyecto reciente.
              </p>
              <p>
                Estoy certificado en Scrum, por lo que busco activamente
                contribuir con soluciones innovadoras en{' '}
                <strong className="text-gradient-primary">entornos ágiles</strong>{' '}
                donde pueda colaborar, aprender y ver el impacto real de mi
                código.
              </p>
            </div>
          </div>
        </section>

        {/* Sección de Habilidades */}
        <section id="skills" className="bg-card">
          <SectionHeading>Habilidades Clave</SectionHeading>
          {/* Un grid para organizar las categorías de habilidades. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Uso 'map' para crear una tarjeta por cada categoría de habilidad que tengo en 'skills'. */}
            {skills.map((category) => (
              <Card key={category.name} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl text-gradient-primary">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {/* Otro 'map' para mostrar cada habilidad como una 'Badge'. */}
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-base px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sección de Proyectos */}
        <section id="projects">
          <SectionHeading>Portafolio de Proyectos</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Uso 'map' otra vez para crear una tarjeta por cada proyecto. ¡Reutilizar es de pros! */}
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>

        {/* Sección de Experiencia y Formación */}
        <section id="experience" className="bg-card">
          <SectionHeading>Experiencia y Formación</SectionHeading>
          {/* Uso el componente 'Tabs' para que el usuario pueda cambiar entre experiencia, formación y certificaciones. */}
          <Tabs defaultValue="experience" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-[400px] mx-auto">
              <TabsTrigger value="experience"><Briefcase className="w-4 h-4 mr-2" />Experiencia</TabsTrigger>
              <TabsTrigger value="education"><Book className="w-4 h-4 mr-2" />Formación</TabsTrigger>
              <TabsTrigger value="certifications"><Award className="w-4 h-4 mr-2" />Certificaciones</TabsTrigger>
            </TabsList>
            {/* Contenido de la pestaña de Experiencia */}
            <TabsContent value="experience" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                {experiences.map((item, index) => (
                  <Card key={index} className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0 z-10">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>{item.company} | {item.period}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            {/* Contenido de la pestaña de Formación */}
            <TabsContent value="education" className="mt-8">
              {education.map((item, index) => (
                <Card key={index} className="max-w-2xl mx-auto">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="bg-secondary p-3 rounded-lg">
                        <Book className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{item.degree}</CardTitle>
                        <CardDescription>{item.institution} | {item.period}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </TabsContent>
            {/* Contenido de la pestaña de Certificaciones */}
            <TabsContent value="certifications" className="mt-8">
              <div className="max-w-2xl mx-auto space-y-4">
                {certifications.map((cert, index) => (
                  <Card key={index} className="flex items-center p-4">
                    <Award className="w-6 h-6 mr-4 text-accent" />
                    <div>
                      <p className="font-semibold">{cert.name}</p>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Sección de Contacto */}
        <section id="contact">
          <SectionHeading>¿Hablamos?</SectionHeading>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Lado izquierdo con mi info de contacto. */}
            <div className="space-y-6">
              <p className="text-lg">
                Estoy buscando contribuir con soluciones innovadoras en entornos ágiles. Si mi perfil encaja, me encantaría conectar.
              </p>
              <div className="space-y-4">
                <Link
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-lg bg-card/50 p-4 border border-border/20 shadow-sm backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-primary/20 hover:shadow-lg"
                >
                  <div className="rounded-lg bg-secondary p-3">
                    <Linkedin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">LinkedIn</h4>
                    <p className="text-sm text-muted-foreground">Conectemos profesionalmente</p>
                  </div>
                </Link>
                <Link
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-lg bg-card/50 p-4 border border-border/20 shadow-sm backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-primary/20 hover:shadow-lg"
                >
                  <div className="rounded-lg bg-secondary p-3">
                    <Github className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">GitHub</h4>
                    <p className="text-sm text-muted-foreground">Ve mis proyectos y código</p>                  </div>
                </Link>
                <Link
                  href="mailto:victoralcantarap@hotmail.com"
                  className="flex items-center gap-4 rounded-lg bg-card/50 p-4 border border-border/20 shadow-sm backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-primary/20 hover:shadow-lg"
                >
                  <div className="rounded-lg bg-secondary p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-sm text-muted-foreground">Escríbeme directamente</p>
                  </div>
                </Link>
              </div>
            </div>
            {/* Lado derecho con el formulario. */}
            <div>
              <Card className="bg-card/50 border-border/20 shadow-sm backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-primary/20 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Envíame un mensaje</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Aquí va el componente del formulario de contacto. */}
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      {/* Y por último, el Footer (pie de página). */}
      <Footer />
    </div>
  );
}
