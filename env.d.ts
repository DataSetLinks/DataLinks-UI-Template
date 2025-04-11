declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATALINKS_API_URL: string;
      DATALINKS_TOKEN: string;
      DATALINKS_DATASET: string;

      USE_NATURAL_LANGUAGE_QUERY: "0" | "1";
    }
  }
}

export {};
