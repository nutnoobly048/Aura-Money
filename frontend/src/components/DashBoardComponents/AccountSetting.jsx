import { SquarePen } from 'lucide-react';
import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { APIContext } from '../APIProvider';
import { motion } from "framer-motion";

export default function AccountSetting({ pageOpen, data }) {
  const { fetchAccount } = useContext(APIContext);
  const [currentData, setCurrentData] = useState({
    account_name: data?.name,
    account_id: data?.id,
    balance: data?.balance
  })
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [editSelect, setEditSelect] = useState(null);
  const [valueInput, setValueInput] = useState("");

  useEffect(() => {
    setCurrentData({
      account_name: data?.name,
      account_id: data?.id,
      balance: data?.balance
    })
  }, [data])
  
    const handleSubmit = (input, name) => {
    const update = { ...currentData, [name]: input };
    setCurrentData(update);
    pushData(update);
  };

  const pushData = async (update) => {
    try {
      await axios.post("http://localhost:5000/update_account", update);
      await fetchAccount();
    } catch (error) {
      console.log(error);
    }
  };

  return (
        <div className={`flex flex-col p-4 ${pageOpen === 'accountSetting' ? 'block' : 'hidden'}`}>
            <h1 className="text-[clamp(20px,5vw,30px)] font-semibold">
            Account Setting
            </h1>
            <div className="flex flex-col p-1 divide-y divide-zinc-300 border-zinc-300 border rounded-2xl">
                <p className="py-6 pl-1.5 pr-5 flex justify-between items-center ">
                Account Name : {currentData.account_name}
                <SquarePen size={16} className='cursor-pointer'
                  onClick={() => {
                    setIsEditPopup(true);
                    setEditSelect("account_name");
                  }}
                />
                </p>
                <p className="py-6 pl-1.5 pr-5 flex justify-between items-center ">
                จำนวนเงิน : {currentData.balance}฿
                <SquarePen size={16} className='cursor-pointer'
                  onClick={() => {
                    setIsEditPopup(true);
                    setEditSelect("balance");
                  }}
                />
                </p>
            </div>
            {isEditPopup && (
              <div>
                <EditPopup
                  setPopupOpen={setIsEditPopup}
                  editSelect={editSelect}
                  handleSubmit={handleSubmit}
                  valueInput={valueInput}
                  setValueInput={setValueInput}
                />
                <Bgdark setPopupOpen={setIsEditPopup} />
              </div>
            )}
        </div>
  )
}

const Bgdark = ({ setPopupOpen }) => {
  return (
    <div
      className="fixed bg-black/50 inset-0 z-0"
      onClick={() => setPopupOpen(false)}
    ></div>
  );
};

const EditPopup = ({
  defValue,
  setPopupOpen,
  editSelect,
  handleSubmit,
  valueInput,
  setValueInput,
}) => {
  const handleCheck = () => {
    if (valueInput){
      handleSubmit(valueInput, editSelect);
      setPopupOpen(false);
    }
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(valueInput, editSelect);
      setPopupOpen(false);
    }
  }

  return (
    <div className="w-3/4 sm:w-1/3! fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center border border-zinc-200 bg-white rounded-xl shadow-xl p-2 gap-2 z-10">
      <p className="text-xl">Edit {editSelect}</p>
      <input
        defaultValue={defValue}
        placeholder={`Enter New ${editSelect}`}
        type={editSelect}
        onChange={(e) => setValueInput(e.target.value)}
        onKeyDown={handleEnter}
        className="w-full border border-ui-green1 focus:outline-none pl-1 rounded-lg"
      />
      <div className="w-full flex items-center gap-x-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setPopupOpen(false)}
          className="w-1/2 border border-zinc-200 rounded-lg"
        >
          Cancel
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            handleCheck();
          }}
          className="w-1/2 bg-ui-green1 text-white rounded-lg"
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};
