// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
    
//     tailwindcss(),
//     react()
//   ],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

// ✅ ESM-friendly __dirname workaround
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      // ✅ Make sure the path points to your .jsx mock file
      'next/image': path.resolve(__dirname, 'src/mocks/next-image.jsx'),
    },
  },
})
