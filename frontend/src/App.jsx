import "./App.css";
import axios from "axios";
import Dashboard from "./components/dashboard";
import { APIProvider } from "./components/APIProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;


function App() {
  const navigate = useNavigate()
  const auth = async () => {
    try{
      const result = await axios.get("http://localhost:5000/auth");
      if (result.status == 200){
        navigate("/")
      }
    }catch (err){
      navigate("/login_register")
    }
  }
  useEffect(() => {
    auth()
  }, [])

  return (
    <div className="">
      <APIProvider>
        <Dashboard />
      </APIProvider>
    </div>
  );
}

export default App;
