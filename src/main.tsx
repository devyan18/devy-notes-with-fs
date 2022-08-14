import './shim'
import ReactDOM from 'react-dom/client'
import App from './App'

import SessionProvider from './contexts/SessionProvider'
import GlobalPathProvider from './contexts/GlobalPathProvider'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalPathProvider>
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </SessionProvider>
  </GlobalPathProvider>
)
