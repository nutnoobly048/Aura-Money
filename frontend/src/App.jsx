import "./App.css";
import axios from "axios";
import Dashboard from "./components/dashboard";
import { APIProvider } from "./components/APIProvider";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="">
      <APIProvider>
        <Dashboard />
      </APIProvider>
    </div>
  );
}

export default App;
