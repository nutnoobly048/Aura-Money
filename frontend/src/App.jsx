import './App.css'
import axios from 'axios'
import Dashboard from './components/dashboard'

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="">
      <Dashboard/>
    </div>
  );
}

export default App
