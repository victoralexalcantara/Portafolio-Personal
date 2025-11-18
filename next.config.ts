// Importamos el tipo 'NextConfig' desde 'next' para tener autocompletado y seguridad de tipos.
import type {NextConfig} from 'next';

// Aquí definimos la configuración de nuestro proyecto de Next.js.
const nextConfig: NextConfig = {
  // Configuración de TypeScript.
  typescript: {
    // Le decimos a Next.js que no falle la 'build' (compilación) si encuentra errores de TypeScript.
    // Esto es útil en desarrollo, pero en producción es recomendable ponerlo en 'false'.
    ignoreBuildErrors: true,
  },
  
  // Configuración de las imágenes.
  images: {
    // 'remotePatterns' nos permite definir desde qué dominios podemos cargar imágenes externas.
    // Es una medida de seguridad para evitar que se carguen imágenes de sitios no autorizados.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

// Exportamos la configuración para que Next.js la pueda usar.
export default nextConfig;
