import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const APIContext = createContext()

export const APIProvider = ({ children }) => {
  const [accountList, setAccountList] = useState([]);

  const fetchAccount = async () => {
      const receive = await axios.get("http://localhost:5000/get_account");
      setAccountList(receive.data.map((item) => ({name: item.account_name, id: item.account_id})));
  }

  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <APIContext.Provider value={{accountList, fetchAccount}}>
      {children}
    </APIContext.Provider>
  );
}
