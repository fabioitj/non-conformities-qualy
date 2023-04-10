import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import "./styles.scss"

import Navbar from './components/Navbar'
import Content from './components/content'
import Footer from './components/footer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Navbar/>
      <Content/>
      <Footer/>
    </Router>
  </React.StrictMode>,
)
