import App from './App';
import { getQueryClient } from './queryClients';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import "bootstrap"
import "./assets/custom.scss"
import "bootstrap-icons/font/bootstrap-icons.css"
import { createRoot } from 'react-dom/client'
import { AuthProvider } from 'react-oidc-context';
import { oidcConfig } from './services/authService';

const queryClient = getQueryClient();

const root = document.getElementById("root") as HTMLElement;
const reactRoot = createRoot(root);


reactRoot.render(
  <StrictMode>
    <AuthProvider {...oidcConfig}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
