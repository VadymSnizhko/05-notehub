import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
import './index.css'
import App from './components/App/App'

createRoot(document.getElementById('root')!).render(
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>,
)
