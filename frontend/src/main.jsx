import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Landingpage from './components/landingpage.jsx'
import Login from './components/login.jsx'
import Register from './components/register.jsx'
import Profile from './components/profile.jsx'
import Login_register from './components/login_register.jsx'


const router = createBrowserRouter([
  {path:"/", element:<App />},
  {path:"/landingpage", element:<Landingpage />},
  {path:"/login", element:<Login />},
  {path:"/register",element:<Register />},
  {path:"/profile", element:<Profile/>},
  {path:"/login_register", element:<Login_register/>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
