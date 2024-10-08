import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
import react from '@vitejs/plugin-react-swc';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['uuid'],
  },
  server: {
    host: '0.0.0.0',  // コンテナ外からアクセスを許可
    port: 5173        
  }
})

