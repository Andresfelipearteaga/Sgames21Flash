import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/index.routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserProvider } from './contexts/userContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <ToastContainer autoClose={1000} theme='colored' limit={5} position="top-right" hideProgressBar={false} newestOnTop={false} closeOnClick />
    <App />
    </UserProvider>
  </StrictMode>,
)
