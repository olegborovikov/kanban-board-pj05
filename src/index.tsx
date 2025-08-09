import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { HashRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <HashRouter>
      <AppRouter />
    </HashRouter>
  </React.StrictMode>
)
