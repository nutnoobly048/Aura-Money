import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const APIContext = createContext()

export const APIProvider = ({ children }) => {
  const [accountList, setAccountList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const fetchAccount = async () => {
      const receive = await axios.get("http://localhost:5000/get_account");
      setAccountList(receive.data.map((item) => ({name: item.account_name, id: item.account_id})));
  }

  const fetchCategory = async () => {
    const receive = await axios.get("http://localhost:5000//get_category");
    setCategoryList(receive.data.map((item) => ({category_name: item.category_name, category_id: item.category_id})));
  }

  useEffect(() => {
    const createCat = async () => {
      try {
        await axios.post("http://localhost:5000/create_category", {category_name: 'bill1'});
      } catch (error) {
        console.log(error);
      }
    }
    // createCat();
  }, [])

  useEffect(() => {
    fetchAccount();
    fetchCategory();
  }, []);

  return (
    <APIContext.Provider value={{accountList, fetchAccount , categoryList, fetchCategory}}>
      {children}
    </APIContext.Provider>
  );
}
