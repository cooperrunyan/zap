import { join } from 'path';
import { ConfigEnv, UserConfig } from 'vite';

const srcRoot = join(__dirname, 'client');
const outDir = join(__dirname, 'compiled/client');
const assetRoot = join(__dirname, 'resources');

export default ({ command }: ConfigEnv): UserConfig => {
  // DEV
  if (command === 'serve') {
    return {
      root: srcRoot,
      base: '/',
      plugins: [],
      resolve: {
        alias: {
          '/@': srcRoot,
          assets: assetRoot
        }
      },
      build: {
        outDir,
        emptyOutDir: true,
        rollupOptions: {}
      },
      server: {
        port: process.env.PORT === undefined ? 3000 : +process.env.PORT
      },
      optimizeDeps: {
        exclude: ['path']
      }
    };
  }
  // PROD
  return {
    root: srcRoot,
    base: './',
    plugins: [],
    resolve: {
      alias: {
        '/@': srcRoot,
        assets: assetRoot
      }
    },
    build: {
      outDir,
      emptyOutDir: true,
      rollupOptions: {}
    },
    server: {
      port: process.env.PORT === undefined ? 3000 : +process.env.PORT
    },
    optimizeDeps: {
      exclude: ['path']
    }
  };
};
