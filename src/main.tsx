import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // ← Esto debe funcionar sin declarar tipos


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
