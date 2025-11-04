import { useContext, useEffect, useState } from "react";
import { APIContext } from "../../APIProvider";
import { motion } from "framer-motion";
import axios from "axios";

function TransferAccContainer({ setPopupOpen }) {
  const { accountList } = useContext(APIContext);
  const [selectingFrom, setSelectingFrom] = useState(
    accountList.map((item) => item.id)[0]
  );
  const [selectingTo, setSelectingTo] = useState(
    accountList.map((item) => item.id)[0]
  );
  const now = new Date();
  const [amount, setAmount] = useState(0);
  const [data, setData] = useState({
    date: new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16),
    from_account_id: selectingFrom,
    to_account_id: selectingTo,
    amount: amount,
  });
  const amountAddBtn = ["-10", "-5", "-1", "+1", "+5", "+10"];

  const handlePostData = () => {
    const postData = async () => {
      try {
        await axios.post("http://localhost:5000/create_transfer", data)
      } catch (error) {
        console.log(error);
      }
    }
    postData();
    console.log("Transfer successfully");
    setPopupOpen(false);
  };
  useEffect(() => {setData(prev => ({...prev, amount: amount}))}, [amount]);
  useEffect(() => {console.log(data)}, [data]);
  return (
    <div className="h-[310px] flex flex-col justify-between items-center divide-y-2 divide-zinc-300">
      <div className="w-full flex items-center gap-x-3 p-3">
        <p>From:</p>
        <div className="flex overflow-x-auto gap-x-3">
          {accountList.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectingFrom(item.id);
                setData((prev) => ({ ...prev, from_account_id: item.id }));
              }}
              className={`${
                selectingFrom == item.id
                  ? "text-white bg-gradient-to-r from-[#62b79c] to-[#afd1a1]"
                  : "text-ui-green1 bg-white"
              }  border border-zinc-100 drop-shadow-md rounded-lg py-1 px-2 cursor-pointer`}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex items-center gap-x-3 p-3">
        <p className="w-10">To:</p>
        <div className="flex overflow-x-auto gap-x-3">
          {accountList.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectingTo(item.id);
                setData((prev) => ({ ...prev, to_account_id: item.id }));
              }}
              className={`${
                selectingTo == item.id
                  ? "text-white bg-gradient-to-r from-[#62b79c] to-[#afd1a1]"
                  : "text-ui-green1 bg-white"
              }  border border-zinc-100 drop-shadow-md rounded-lg py-1 px-2 cursor-pointer`}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>

      <label className="w-full flex items-center justify-between p-3">
        <div>
          Amount :
          <input
            type="number"
            min='0'
            className="ml-2 w-1/2 sm:w-auto! focus:outline-none"
            onChange={(e) => setAmount(Number(e.target.value))}
            value={amount}
          />
        </div>
        <div className="flex gap-x-1 flex-wrap">
          {amountAddBtn.map((item, index) => (
            <button
              key={index}
              onClick={() =>
                setAmount((p) => (p + Number(item) >= 0 ? p + Number(item) : 0))
              }
              className=" bg-gradient-to-br from-[#62b79c] to-[#afd1a1] border border-zinc-200 text-white font-semibold rounded-md shadow-lg px-2 py-0.5"
            >
              {item}
            </button>
          ))}
        </div>
      </label>

      <div className="w-full flex justify-center items-center gap-x-2 m-1 mt-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handlePostData}
          className="flex-1 bg-gradient-to-r from-[#62b79c] to-[#afd1a1] text-white font-bold rounded-2xl py-1"
        >
          Save
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setPopupOpen(false)}
          className="flex-1 border rounded-2xl py-1"
        >
          Cancel
        </motion.button>
      </div>
    </div>
  );
}

export default TransferAccContainer;