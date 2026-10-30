import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import WindowProvider from './Components/Windowscontext/WindowsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WindowProvider>
      <App />
    </WindowProvider>
  </StrictMode>,
)
