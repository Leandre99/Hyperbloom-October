import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Standard portable base
export default defineConfig({
  plugins: [react()],
  base: './',
});
