import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://build.kujira.app",
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro'
    }
  }
});