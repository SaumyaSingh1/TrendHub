import React from 'react' //core React library that provides the fundamental building blocks for creating components
import ReactDOM from 'react-dom/client'//used to render components in DOM
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!)// "!" tells typescript this element(here this id root) exists in the document, and it will never be null or undefined."
.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
