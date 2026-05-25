import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiUrl = env.VITE_API_URL ?? env.API_URL

  return {
    plugins: [react()],
    define: {
      'import.meta.env.API_URL': JSON.stringify(apiUrl ?? '')
    },
    server: {
      proxy: apiUrl
        ? {
            '/api': {
              target: apiUrl,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
            }
          }
        : undefined
    }
  }
})
