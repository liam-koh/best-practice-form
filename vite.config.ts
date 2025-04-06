import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isLocal = process.env.ENV || 'local';
  return {
    plugins: [react(), tsconfigPaths(), svgr({})],
    assetsInclude: ['**/*.svg', '**/*.png'],
    server: {
      // port 설정
      port: 5678,
      // api proxy 설정, 프록시 기능 필요한 경우 사용
      // proxy: {
      //   '/api': {
      //     target: env.VITE_API_BASEURL + '/api',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
    },
    // env 설정
    define: {
      global: {},
      isLocal: JSON.stringify(isLocal),
    },
  };
});
