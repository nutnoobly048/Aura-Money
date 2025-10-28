import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Pencil, CirclePlus, CircleCheck } from "lucide-react";
import { useState, useRef, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { AccountContext } from "../ContextProvider";

export const AccountSelectBtn = ({ setPageOpen, className }) => {
  const [isAccountListOpen, setAccountListOpen] = useState(false);
  const [createAccName, setCreateAccName] = useState("");
  const areaRef = useRef();

  const [popupState, setPopupState] = useState({status: false, text: '', color: ''});

  const { accountList, fetchAccount } = useContext(AccountContext);

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
      />
    </motion.div>
  );
};

const AccountList = ({ isAccountListOpen, setPageOpen, accountList }) => {
  const containerVariants = {
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
      transitionEnd: { pointerEvents: "none" },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
      },
      pointerEvents: "auto",
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      className="absolute top-[calc(100%+5px)] left-0 w-full flex flex-col justify-center items-center"
      variants={containerVariants}
      initial="hidden"
      animate={isAccountListOpen ? "visible" : "hidden"}
    >
      {accountList.map((item, index) => (
        <motion.div
          variants={itemVariants}
          key={item}
          className={`text-black p-3 w-full flex justify-between  bg-white hover:bg-zinc-200 px-3
          ${
            !index
              ? "rounded-t-xl"
              : index == accountList.length - 1
              ? "rounded-b-xl"
              : "rounded-none"
          }`}
        >
          {item}
          <button
            onClick={(e) => {
              console.log("clicked at", item);
              e.stopPropagation();
            }}
            className="bg-ui-green1 rounded-full px-1 hover:scale-120 hover:bg-white"
          >
            <Pencil className="size-4 text-white hover:text-ui-green1" />
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
};

const CreateAccBtn = ({ isAccountListOpen, setCreateAccName, createAccName, handleSendNewAcc }) => {
  return (
    <div
      className={`absolute bottom-[calc(100%+3px)] left-0 w-full flex justify-evenly items-center bg-white text-black text-xs border border-zinc-400 
      rounded-xl shadow-xl px-1.5 py-1 mt-2 ${isAccountListOpen ? '' : 'hidden'}`}
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
      className="fixed w-[content] flex justify-center items-center gap-x-1 text-md font-semibold bg-white rounded-xl px-3 py-1 
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
