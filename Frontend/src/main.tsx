import React from 'react' //core React library that provides the fundamental building blocks for creating components
import ReactDOM from 'react-dom/client'//used to render components in DOM
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
