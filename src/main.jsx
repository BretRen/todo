import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App/App.jsx'
import Footer from "./layout/footer.jsx"
import Setting from "./layout/setting.jsx"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Setting />
    <App />
    <Footer />
  </StrictMode>,
)
