import './index.css';
import App from './App';
import { getQueryClient } from './queryClients';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'

const queryClient = getQueryClient();

const root = document.getElementById("root") as HTMLElement;
const reactRoot = createRoot(root);

reactRoot.render(
  <StrictMode>
    {/* Auth provider */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
