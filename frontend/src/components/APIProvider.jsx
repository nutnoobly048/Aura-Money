import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [accountList, setAccountList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [userData, setUserData] = useState();
  const [transfer, setTransfer] = useState();
  const [iore, setIore] = useState();
  const [selectingAcc, setSelectingAcc] = useState();
  const fetchAccount = async () => {
    const receive = await axios.get(`${import.meta.env.VITE_URL_API}/get_account`);
    setAccountList(
      receive.data.map((item) => ({
        name: item.account_name,
        id: item.account_id,
        balance: item.balance,
      }))
    );
  };

  const fetchCategory = async () => {
    const receive = await axios.get(`${import.meta.env.VITE_URL_API}/get_category`);
    setCategoryList(
      receive.data.map((item) => ({
        category_name: item.category_name,
        category_id: item.category_id,
      }))
    );
  };

  const fetchUser = async () => {
    const receive = await axios.get(`${import.meta.env.VITE_URL_API}/get_user`);
    setUserData(receive.data[0]);
  };

  const fetchIore = async () => {
    const receive = await axios.get(`${import.meta.env.VITE_URL_API}/get_iore`);
    setIore(receive.data);
  };

  const fetchTransfer = async () => { 
    const receive = await axios.get(`${import.meta.env.VITE_URL_API}/get_transfer`);
    setTransfer(receive.data);
  };

  useEffect(() => {
    fetchAccount();
    fetchCategory();
    fetchUser();
    fetchIore();
    fetchTransfer();
  }, []);

  return (
    <APIContext.Provider
      value={{
        accountList,
        fetchAccount,
        categoryList,
        fetchCategory,
        userData,
        fetchUser,
        iore,
        fetchIore,
        transfer,
        fetchTransfer,
        setSelectingAcc,
        selectingAcc,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
