import { defineConfig } from 'vite';

export default defineConfig({
  // Expose the dev server on the local network so a phone on the same Wi-Fi can open it.
  server: { host: true },
});
