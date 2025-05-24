/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Puedes añadir más variables de entorno aquí según sea necesario
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}