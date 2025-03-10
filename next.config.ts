import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración de imágenes
  images: {
    // Desactivar la optimización de imágenes para que funcione en Amplify
    unoptimized: true,
    // Mantener los patrones remotos
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'elasticbeanstalk-us-east-1-867968001024.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Dominios permitidos para imágenes
    domains: [
      'localhost',
      'forku.app', // Reemplaza con tu dominio de Amplify
      'subseven-uk.vercel.app' // Reemplaza con tu dominio de Vercel
    ],
  },
  // Configuración para archivos estáticos
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : undefined,
  // Configuración experimental
  experimental: {
    // Mantener la configuración de Turbopack vacía
    turbo: {}
  },
};

export default nextConfig; 