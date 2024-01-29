import React from 'react' //core React library that provides the fundamental building blocks for creating components
import ReactDOM from 'react-dom/client'//used to render components in DOM
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
   
  </React.StrictMode>,
)
