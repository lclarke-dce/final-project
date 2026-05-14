import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="container">
      <h1 className="text-center">Recipe Finder</h1>
      <App />
      <footer>
        <p>
          Recipes database: <a className="text-btn" href="https://www.themealdb.com/" target="_blank">TheMealDB.com</a>
        </p>
      </footer>
    </div>
  </StrictMode>,
)
