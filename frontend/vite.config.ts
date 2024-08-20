import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react(), svgr()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          //rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@api': '/src/api',
        '@assets': '/src/assets',
        '@components': '/src/components',
        '@context': '/src/context',
        '@interfaces': '/src/interfaces',
        '@pages': '/src/pages',
        '@styles': '/src/styles',
        '@utils': '/src/utils',
      },
    },
  }
})
