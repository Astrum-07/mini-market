
import React from 'react'
import ReactDOM from 'react-dom/client'
import Cart from './components/Cart'
import { initCatalog } from './vanillaCatalog'
import './index.css'


initCatalog();


ReactDOM.createRoot(document.getElementById('cart-root')).render(
  <React.StrictMode>
    <Cart />
  </React.StrictMode>,
)