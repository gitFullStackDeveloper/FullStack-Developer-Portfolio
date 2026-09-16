import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
// console.log('API_BASE:', import.meta.env.VITE_API_URL);
// window.API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)