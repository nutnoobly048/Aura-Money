import "./App.css";
import axios from "axios";
import Dashboard from "./components/dashboard";
import { AccountProvider } from "./components/ContextProvider";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="">
      <AccountProvider>
        <Dashboard />
      </AccountProvider>
    </div>
  );
}

export default App;
