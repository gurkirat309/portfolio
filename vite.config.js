import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Dev-only: serve the /api/chat serverless handler through Vite's dev server so
// `npm run dev` behaves like Vercel. In production Vercel runs api/chat.js directly.
function fridayApiPlugin(env) {
  return {
    name: 'friday-api-dev',
    configureServer(server) {
      // make the key available to the handler (it reads process.env.GROQ_API_KEY)
      if (env.GROQ_API_KEY && !process.env.GROQ_API_KEY) {
        process.env.GROQ_API_KEY = env.GROQ_API_KEY
      }
      // DEV ONLY: some local networks/AV intercept TLS, causing Node's fetch to
      // fail cert verification (UNABLE_TO_VERIFY_LEAF_SIGNATURE) when calling Groq.
      // This only affects the local dev server — production on Vercel is unaffected.
      if (env.GROQ_DEV_INSECURE_TLS === 'true') {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
      }
      server.middlewares.use('/api/chat', async (req, res, next) => {
        try {
          const { default: handler } = await server.ssrLoadModule('/api/chat.js')
          await handler(req, res)
        } catch (err) {
          next(err)
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), fridayApiPlugin(env)],
  }
})
