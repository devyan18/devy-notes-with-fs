import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import App from './App'
import SessionProvider from './contexts/SessionProvider'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SessionProvider>
    <QueryClientProvider client={
      queryClient
    }>
      <App />
    </QueryClientProvider>
  </SessionProvider>
)
