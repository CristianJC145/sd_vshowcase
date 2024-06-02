import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '../src/shared/plugins/fortawesome.plugin'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/theme/index.scss'
import { AuthProvider } from './shared/contexts/AuthContext'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
