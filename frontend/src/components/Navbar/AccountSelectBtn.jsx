import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Pencil, CirclePlus, CircleCheck, Trash } from "lucide-react";
import { useState, useRef, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { APIContext } from "../APIProvider";

export const AccountSelectBtn = ({ setPageOpen, className }) => {
  const [isAccountListOpen, setAccountListOpen] = useState(false);
  const [createAccName, setCreateAccName] = useState("");
  const areaRef = useRef();

  const [popupState, setPopupState] = useState({status: false, text: '', color: ''});

  const { accountList, fetchAccount } = useContext(APIContext);

  const handleSendNewAcc = async () => {
    if (!createAccName) {
      return setPopupState({status: true, text: 'Account name cannot be blank.', color: 'bg-red-500'});
    }
    else if (accountList.map((item) => item).includes(createAccName)) {
      return setPopupState({status: true, text: 'Already has this account.', color: 'bg-red-500'})
    }

    setPopupState({status: true, text: 'Created New Account.', color: 'bg-ui-green1'})
    await axios.post("http://localhost:5000/create_account", {
      account_name: createAccName,
      balance: 0,
    })
    await fetchAccount();
    setCreateAccName('');
  }

  const handleDeleteAcc = async (id) => {
    await axios.post("http://localhost:5000/delete_account", {account_id: id})
    await fetchAccount();
  }

  useEffect(() => {
    if (!popupState.status) return;
    const timeout = setTimeout(() => {
      setPopupState((prev) => ({...prev, status: false}))
    }, 1600);
    return () => clearTimeout(timeout);
  }, [popupState.status]);

  useEffect(() => {
    if (!isAccountListOpen) return;
    const handler = (e) => {
      if (!areaRef.current.contains(e.target)) {
        setAccountListOpen(false);
      }
    } 
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    }
  }, [isAccountListOpen]);

  const iconVariants = {
    rest: {
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    hover: {
      y: -3,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.4,
      },
    },
  };

  const baseClasses =
    "relative flex items-center font-bold gap-x-1 border-2 rounded-full px-2 py-1 cursor-pointer";

  return (
    <motion.div
      ref={areaRef}
      onClick={() => setAccountListOpen(true)}
      className={twMerge(baseClasses, className)}
      whileTap={{ scale: 0.98 }}
      initial="rest"
      whileHover="hover"
    >
      <NotiPopup popupState={popupState} text={popupState.text} color={popupState.color} />
      <CreateAccBtn
        createAccName={createAccName}
        setCreateAccName={setCreateAccName}
        isAccountListOpen={isAccountListOpen}
        handleSendNewAcc={handleSendNewAcc}
      />
      <p>AccountName #1</p>
      <motion.div variants={iconVariants}>
        <FontAwesomeIcon icon={faCaretDown} />
      </motion.div>
      <AccountList
        isAccountListOpen={isAccountListOpen}
        setPageOpen={setPageOpen}
        accountList={accountList}
        handleDeleteAcc={handleDeleteAcc}
      />
    </motion.div>
  );
};

const AccountList = ({ isAccountListOpen, setPageOpen, accountList, handleDeleteAcc }) => {

  return (
    <div
      className={`absolute  left-0 w-full flex flex-col justify-center items-center duration-200
                  ${isAccountListOpen ? 'opacity-100 top-[calc(100%+5px)]' : '-top-2 opacity-0 pointer-events-none'}`}
    >
      {accountList.map((item, index) => (
        <div
          key={item.id}
          className={`text-black py-3 px-1.5 w-full flex justify-between  bg-white hover:bg-zinc-200
          ${
            !index
              ? "rounded-t-xl"
              : index == accountList.length - 1
              ? "rounded-b-xl"
              : "rounded-none"
          }`}
        >
          <div className=" ">{item.name}</div>

          <div className="flex gap-x-1.5">
            <button
              onClick={(e) => {
                console.log("clicked at", item.name, 'id:', item.id);
                handleDeleteAcc(item.id);
                e.stopPropagation();
              }}
              className="bg-red-600 rounded-full px-1 hover:bg-white text-white hover:text-black"
            >
              <Trash className="size-4"/>
            </button>

            <button
              onClick={(e) => {
                console.log("clicked at", item.name, 'id:', item.id);
                e.stopPropagation();
              }}
              className="bg-ui-green1 rounded-full px-1 hover:bg-white text-white hover:text-ui-green1"
            >
              <Pencil className="size-4 " />
            </button>
          </div>

        </div>
      ))}
    </div>
  );
};

const CreateAccBtn = ({ isAccountListOpen, setCreateAccName, createAccName, handleSendNewAcc }) => {
  return (
    <div
      className={`absolute left-0 w-full flex justify-evenly items-center bg-white text-black text-xs border border-zinc-400 duration-200
      rounded-xl shadow-xl px-1.5 py-1 mt-2 ${isAccountListOpen ? 'bottom-[calc(100%+10px)] opacity-100' : 'opacity-0 pointer-events-none -bottom-2'}`}
    >
      <motion.div whileTap={{ scale: 1.1 }}>
        <CirclePlus onClick={handleSendNewAcc} className="bg-ui-green1 text-white rounded-full" />
      </motion.div>

      <input
        type="text"
        placeholder="create new account"
        onChange={(e) => setCreateAccName(e.target.value)}
        className="w-3/4 focus:outline-none"
        value={createAccName}
      />
    </div>
  );
};

const NotiPopup = ({ text, popupState, color }) => {
  return createPortal(
    <motion.div 
      className="fixed flex justify-center items-center gap-x-1 text-md font-semibold bg-white rounded-xl px-3 py-1 
                 left-1/2 top-0 -translate-x-1/2 text-black z-30 shadow-2xl"
      initial={{ y: "-120%", opacity: 0 }}
      animate={popupState.status ? { y: "100%", opacity: 1 } : { y: "-120%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <CircleCheck className={`text-white rounded-full ${color}`} />
      {text}
    </motion.div>,
     document.body
  );
}
