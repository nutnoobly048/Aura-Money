import { useState, useRef, useEffect, useContext } from "react";
import CategoryContainer from "./PopupComponents/CategoryContainer";
import AccountContainer from "./PopupComponents/AccountContainer";
import StatusPopup from "./PopupComponents/StatusPopup";
import { motion, AnimatePresence } from "framer-motion";
import { APIContext } from "../APIProvider";
import axios from "axios";
import TransferAccContainer from "./PopupComponents/TransferAccContainer";

export default function AddContentPopup({ isPopupOpen, setPopupOpen }) {
  const [addContentType, setAddContentType] = useState("Expense");

  const { fetchIore } = useContext(APIContext);

  const now = new Date();
  const nowTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

  const [amount, setAmount] = useState(0);
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const catRef = useRef();

  const [isAccountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef();

  //-------------------pop up-----------------------//
  const [isSend, setSend] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const [data, setData] = useState({
    date: nowTime,
    types: addContentType.toLowerCase(),
    account: '',
    account_id: "",
    category: '',
    category_id: "",
    amount: "",
    note: "",
  });

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const typeSelectColor = {
    Income: "left-0! text-black",
    Expense: "left-1/3! text-black",
    Transfer: "left-2/3! text-black",
  };

  const amountAddBtn = ["-10", "-5", "-1", "+1", "+5", "+10"];

  const handlePostData = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_URL_API}/create_iore`, data)
      setIsSuccess(true);
      setSend(true);
      setTimeout(() => {
        setSend(false)
      }, 2500);
      clearForm();
      setPopupOpen(false);
      await fetchIore();
    } catch (error) {
      console.log(error);
      setIsSuccess(false);
      setSend(true);
      setTimeout(() => {
        setSend(false)
        setIsSuccess(true);
      }, 2500);
    }
  }

  const clearForm = () => {
    setData({
      date: nowTime,
      types: addContentType.toLowerCase(),
      account: '',
      account_id: "",
      category: '',
      category_id: "",
      amount: "",
      note: "",
    });
  }
  useEffect(() => {
    if (!isCategoryOpen && !isAccountOpen) return;
    const handler = (e) => {
      if (!catRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
      if (!accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isCategoryOpen, isAccountOpen]);

  useEffect(() => {
    setData((prev) => ({ ...prev, amount: amount }));
  }, [amount]);

  return (
    <div
      className={`top-1/2 left-1/2 fixed w-[calc(100%-24px)] -translate-y-1/2 -translate-x-1/2 bg-white 
    rounded-2xl z-20 ease-in-out duration-200 max-w-2xl ${
      isPopupOpen ? "block scale-100" : "invisible scale-0"
    }`}
    >
      <AnimatePresence>{isSend && (<StatusPopup isSuccess={isSuccess} />)}</AnimatePresence>
      <nav className="relative rounded-t-2xl bg-gradient-to-r from-[#62b79c] to-[#afd1a1]">
        <div
          className={`absolute top-0 left-1/3 ${typeSelectColor[addContentType]} bg-white w-1/3 h-[calc(100%+1px)] rounded-t-2xl duration-250 overflow-hidden`}
        >
          <div className="absolute bottom-0 w-full h-1 bg-ui-green2"></div>
        </div>
        <button
          onClick={() => {setAddContentType("Income");setData(p => ({...p, types: 'income'}))}}
          className={`relative py-4 w-1/3 h-full font-semibold ${
            addContentType === "Income" ? "text-black" : "text-white"
          }`}
        >
          Income
        </button>
        <button
          onClick={() => {setAddContentType("Expense");setData(p => ({...p, types: 'expense'}))}}
          className={`relative py-4 w-1/3 h-full font-semibold ${
            addContentType === "Expense" ? "text-black" : "text-white!"
          }`}
        >
          Expense
        </button>
        <button
          onClick={() => {setAddContentType("Transfer");setData(p => ({...p, types: 'transfer'}))}}
          className={`relative py-4 w-1/3 h-full font-semibold ${
            addContentType === "Transfer" ? "text-black" : "text-white"
          }`}
        >
          Transfer
        </button>
      </nav>

      <h1 className="text-2xl font-bold text-center p-2">{addContentType}</h1>
      {['Income', 'Expense'].includes(addContentType) && (
        <div className="flex flex-col justify-center items-center p-3 divide-y-2 divide-zinc-300">
          <label className="w-full flex p-3">
            Date :
            <input
              type="datetime"
              value={nowTime}
              onChange={(e) => setData(prev => ({...prev, date: e.target.value}))}
              className="flex-1 pl-3 focus:outline-none"
            />
          </label>

          <label className="w-full flex items-center justify-between p-3">
            <div>
              Amount :
              <input
                type="number"
                min='0'
                className="ml-2 w-1/2 sm:w-auto! focus:outline-none"
                onChange={(e) => setAmount(Number(e.target.value))}
                value={data.amount}
              />
            </div>
            <div className="flex gap-x-1 flex-wrap">
              {amountAddBtn.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setAmount((p) => p + Number(item) >= 0 ? p + Number(item) : 0)}
                  className=" bg-gradient-to-br from-[#62b79c] to-[#afd1a1] border border-zinc-200 text-white font-semibold rounded-md shadow-lg px-2 py-0.5"
                >
                  {item}
                </button>
              ))}
            </div>
          </label>

          <label
            ref={catRef}
            onClick={() => setCategoryOpen(true)}
            className="relative w-full flex p-3"
          >
            Category :<div className="flex-1 pl-3">{data.category}</div>
            <CategoryContainer
              isCategoryOpen={isCategoryOpen}
              setData={setData}
            />
          </label>

          <label
            ref={accountRef}
            onClick={() => setAccountOpen(true)}
            className="relative w-full flex p-3"
          >
            Account :<div className="flex-1 pl-3">{data.account}</div>
            <AccountContainer isAccountOpen={isAccountOpen} setData={setData} />
          </label>

          <label className="w-full flex p-3">
            Note :
            <input type="text" onChange={(e) => setData(prev => ({...prev, note: e.target.value}))} className="flex-1 pl-3 focus:outline-none" />
          </label>

          <div className="w-full flex justify-center items-center gap-x-2 m-1 mt-4">
            <motion.button
              whileTap={{scale: 0.95}}
              onClick={handlePostData}
              className="flex-1 bg-gradient-to-r from-[#62b79c] to-[#afd1a1] text-white font-bold rounded-2xl py-1"
            >
              Save
            </motion.button>
            <motion.button
              whileTap={{scale: 0.95}}
              onClick={() => setPopupOpen(false)}
              className="flex-1 border rounded-2xl py-1"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      )}

      {addContentType == 'Transfer' && (
        <div className="bg-white p-3 rounded-b-2xl">
          <TransferAccContainer setPopupOpen={setPopupOpen} />
        </div>
      )}
    </div>
  );
}