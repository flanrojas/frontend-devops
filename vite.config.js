import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const ventasApiUrl = env.VITE_VENTAS_API_URL
  const despachosApiUrl = env.VITE_DESPACHOS_API_URL
  const proxy = {}

  if (ventasApiUrl) {
    proxy['/api-ventas'] = {
      target: ventasApiUrl,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api-ventas/, '')
    }
  }

  if (despachosApiUrl) {
    proxy['/api-despachos'] = {
      target: despachosApiUrl,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api-despachos/, '')
    }
  }

  return {
    plugins: [react()],
    server: {
      proxy: Object.keys(proxy).length ? proxy : undefined
    }
  }
})
