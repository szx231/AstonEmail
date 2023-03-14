/// <reference types="vite/client" />
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_KEY: string;
    }
  }
}

export {};
