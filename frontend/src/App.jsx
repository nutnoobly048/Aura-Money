import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Dashboard from './components/dashboard'

axios.defaults.withCredentials = true;

function App() {
  const navigate = useNavigate();
  const logout = async() => {
    try {
      const { data } = await axios.get('http://localhost:5000/logout');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   const auth = async () => {
  //     try {
  //       const data = await axios.get("http://localhost:5000/auth");
  //     } catch (error) {
  //       navigate("/login")
  //     }
  //   }
  //   auth()
  // },[])

  return (
    <div className="">
      {/* <button onClick={logout}>logout</button> */}
      <Dashboard/>
    </div>
  );
}

export default App
