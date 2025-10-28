import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const AccountContext = createContext()

export const AccountProvider = ({ children }) => {
  const [accountList, setAccountList] = useState([]);
    
  const fetchAccount = async () => {
      const receive = await axios.get("http://localhost:5000/get_account");
      setAccountList(receive.data.map((item) => item.account_name));
      console.log('RAW:', receive.data);
      console.log('MAPPED:', receive.data.map(i => i.account_name));
  }

  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {
    console.log('1', accountList);
  }, [accountList])

  return (
    <AccountContext.Provider value={{accountList, fetchAccount}}>
      {children}
    </AccountContext.Provider>
  );
}
