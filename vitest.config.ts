import { defineConfig } from "vitest/config";
/** vitest 설정 파일 */
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ["src/**/*.test.tsx", "src/**/*.test.ts", "src/**/*.spec.tsx", "src/**/*.spec.ts"],
  },
  resolve: {
    alias: {
      '@': '/src',
    }
  }
});