import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3002
    },
    resolve: {
        alias: {
            // Deduplicate React in monorepo
            'react': path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom'),
        },
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
    },
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.[jt]sx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
                '.jsx': 'jsx',
            },
        },
        include: ['react', 'react-dom', 'react-router-dom', 'firebase/app', 'firebase/auth', 'firebase/firestore']
    },
})


