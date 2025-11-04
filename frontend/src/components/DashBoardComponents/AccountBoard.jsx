import {
  ArrowBigLeft,
  ArrowBigRight,
  Trash,
  CircleX,
  Pencil,
} from "lucide-react";
import { useContext, useState, useRef, useEffect, use } from "react";
import { APIContext } from "../APIProvider";
import { motion } from "framer-motion";
import axios from "axios";
import CategoryContainer from "./PopupComponents/CategoryContainer";
import AccountContainer from "./PopupComponents/AccountContainer";
import { useEffectEvent } from "react";

export default function AccountBoard({ pageOpen }) {
  const [isPopupOpenIore, setisPopupOpenIoreIore] = useState(false);
  const [isPopupOpenTransfer, setisPopupOpenTransfer] = useState(false);
  const nowMonth = new Date().getMonth();
  const { iore, transfer, selectingAcc } = useContext(APIContext);
  const [monthNum, setMonthNum] = useState(nowMonth);
  const [currentData, setCurrentData] = useState([]);
  const [currentDataTransfer, setCurrentDataTransfer] = useState([]);
  const [selectedItem, setSelectItem] = useState(null);

  const handleItemClickIore = (item) => {
    setSelectItem(item);
    setisPopupOpenIoreIore(true);
  };

  const handleItemClickTransfer = (item) => {
    setSelectItem(item);
    setisPopupOpenTransfer(true);
  };

  useEffect(() => {
    if (!iore) return;
    const filterMonthData = iore.filter((item) => {
      const monthDataNum = new Date(item?.date)
        .toLocaleDateString("en-GB")
        .split("/")[1];
      return Number(monthDataNum) === Number(monthNum + 1);
    });
    setCurrentData(filterMonthData);
    
  }, [monthNum, iore]);

  useEffect(() => {
    if (!transfer) return;
    const filterMonthData = transfer.filter((item) => {
      const monthDataNum = new Date(item?.date)
        .toLocaleDateString("en-GB")
        .split("/")[1];
      return Number(monthDataNum) === Number(monthNum + 1);
    });
    setCurrentDataTransfer(filterMonthData);
    // console.log(filterMonthData);
  }, [monthNum, transfer]);
  return (
    <div
      className={`h-full overflow-y-auto flex flex-col p-4 gap-y-2 ${
        pageOpen === "account" ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center gap-x-1">
        <MonthSelector monthNum={monthNum} setMonthNum={setMonthNum} />
      </div>
      <SummationBoard iore={currentData} transfer={transfer} selectingAcc={selectingAcc}/>
      <HistoryBoard iore={currentData} onEdit={handleItemClickIore} transfer={currentDataTransfer} onEditTransfer={handleItemClickTransfer} selectingAcc={selectingAcc}/>
      {isPopupOpenIore && (
        <div>
          <EditPopupIore setPopupOpen={setisPopupOpenIoreIore} data={selectedItem} />
          <Bgdark setPopupOpen={setisPopupOpenIoreIore} />
        </div>
      )}
      {isPopupOpenTransfer && (
        <div>
          <EditPopupTransfer setPopupOpen={setisPopupOpenTransfer} data={selectedItem} />
          <Bgdark setPopupOpen={setisPopupOpenTransfer} />
        </div>
      )}
    </div>
  );
}

const MonthSelector = ({ monthNum, setMonthNum }) => {
  let monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [year, setYear] = useState(2025);
  const handleSetMonth = (type) => {
    if (type == "+") {
      setMonthNum((prev) => prev + 1);
      if (monthNum + 1 > 11) {
        setMonthNum(0);
        setYear((prev) => prev + 1);
      }
    } else if (type == "-") {
      setMonthNum((prev) => prev - 1);
      if (monthNum - 1 < 0) {
        setMonthNum(11);
        setYear((prev) => prev - 1);
      }
    }
  };
  return (
    <div className="self-start flex items-center gap-x-1">
      <motion.div whileTap={{ scale: 0.8 }} whileHover={{ scale: 1.1 }}>
        <ArrowBigLeft
          onClick={() => handleSetMonth("-")}
          className="text-ui-green1"
        />
      </motion.div>
      <h1 className="text-[clamp(20px,5vw,30px)] font-semibold">{`${monthArr[monthNum]} ${year}`}</h1>
      <motion.div whileTap={{ scale: 0.8 }} whileHover={{ scale: 1.1 }}>
        <ArrowBigRight
          onClick={() => handleSetMonth("+")}
          className="text-ui-green1"
        />
      </motion.div>
    </div>
  );
};

const HistoryBoard = ({ iore, onEdit, transfer, onEditTransfer, selectingAcc }) => {
  return (
    <div className="overflow-y-auto flex flex-col px-4 py-4 border-2 border-zinc-300 rounded-2xl space-y-2">
      {iore.length === 0 ? (
      <Nodata />
    ) : (
      iore
        ?.filter((item) => item?.account_name === selectingAcc)
        .map((item) => (
          <HistoryItem
            key={item?.track_id}
            item={item}
            onEdit={onEdit}
          />
        ))
    )}

    {transfer.length !== 0 &&
      transfer?.map((item) => (
        <HistoryItem
          key={item?.transfer_id}
          item={item}
          onEdit={onEditTransfer}
        />
      ))}
    </div>
  );
};

const HistoryItem = ({ item, onEdit }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const elementArea = useRef(null);
  const { fetchIore, fetchTransfer } = useContext(APIContext);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handler = (e) => {
      if (elementArea.current && !elementArea.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isMenuOpen]);

  const handleDeleteIore = async (id) => {
    try {
      await axios.post("http://localhost:5000/delete_iore", {
        track_id: id,
      });
      await fetchIore();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTransfer = async (id) => {
    try {
      await axios.post("http://localhost:5000/delete_transfer", {
        transfer_id: id,
      });
      await fetchTransfer();
    } catch (error) {
      console.log(error);
    }
  };

  return item?.transfer_id ? (
    <div
      ref={elementArea}
      key={item?.transfer_id}
      onClick={() => setMenuOpen((p) => !p)}
      className="relative w-full flex justify-between items-center border-2 border-zinc-200 shadow-sm rounded-xl px-4 py-2"
    >
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center rounded-xl z-10">
          <Trash
            onClick={() => handleDeleteTransfer(item?.transfer_id)}
            className="size-8 text-white bg-red-500 rounded-full p-1 cursor-pointer"
          />
          <Pencil
            className="size-8 bg-ui-green1 rounded-full px-1 text-white cursor-pointer mx-2"
            onClick={() => onEdit(item)}
          />
        </div>
      )}

      <p className="text-xl">Transfer from <span className="font-bold">{item?.from_account_name}</span> to <span className="font-bold">{item?.to_account_name}</span></p>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
        <p>{item?.account_name}</p>
        <p>{new Date(item?.date).toLocaleDateString("en-GB")}</p>
      </div>

      <p
        className={`${
          item?.types === "expense" ? "text-red-500" : "text-green-700"
        } text-xl`}
      >
        {`${item?.types === "expense" ? "-" : ""}${item?.amount} ฿`}
      </p>
    </div>
  ) : (
    <div
      ref={elementArea}
      key={item?.track_id}
      onClick={() => setMenuOpen((p) => !p)}
      className="relative w-full flex justify-between items-center border-2 border-zinc-200 shadow-sm rounded-xl px-4 py-2"
    >
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center rounded-xl z-10">
          <Trash
            onClick={() => handleDeleteIore(item?.track_id)}
            className="size-8 text-white bg-red-500 rounded-full p-1 cursor-pointer"
          />
          <Pencil
            className="size-8 bg-ui-green1 rounded-full px-1 text-white cursor-pointer mx-2"
            onClick={() => onEdit(item)}
          />
        </div>
      )}

      <p className="text-xl">{item?.category_name}</p>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
        <p>{item?.account_name}</p>
        <p>{new Date(item?.date).toLocaleDateString("en-GB")}</p>
      </div>

      <p
        className={`${
          item?.types === "expense" ? "text-red-500" : "text-green-700"
        } text-xl`}
      >
        {`${item?.types === "expense" ? "-" : ""}${item?.amount} ฿`}
      </p>
    </div>
  );
};


const Nodata = () => {
  return (
    <div className="flex items-center justify-center gap-x-2 self-center text-xl">
      <CircleX className="text-red-500 animate-spin" />
      <p>No data recorded.</p>
    </div>
  );
};

const SummationBoard = ({ iore, transfer, selectingAcc }) => {
  const sumArray = (arr) => {
    let sum = 0;
    arr?.forEach((item) => {
      sum += item;
    });
    return sum;
  };
  const incomeSum = sumArray(
    iore?.map((item) => (item.types == "income" && item.account_name === selectingAcc ? item.amount : 0))
  );
  const expenseSum = sumArray(
    iore?.map((item) => (item.types == "expense" && item.account_name === selectingAcc ? item.amount : 0))
  );
  const transferInSum = sumArray(
    transfer?.map((item) => ((item.from_account_name === selectingAcc ? item.amount : 0)))
  );
  // console.log(transfer);
  
  const total = incomeSum + expenseSum + transferInSum;
  const balance = incomeSum - expenseSum - transferInSum;
  return (
    <div className="flex justify-evenly border-2 border-zinc-200 rounded-2xl p-1">
      <div className="flex flex-col justify-center items-center text-green-600 font-semibold">
        <p>Income</p>
        <p>{`${incomeSum} ฿`}</p>
      </div>
      <div className="flex flex-col justify-center items-center text-red-500 font-semibold">
        <p>Expense</p>
        <p>{`${expenseSum} ฿`}</p>
      </div>
      <div className="flex flex-col justify-center items-center font-semibold">
        <p>Total</p>
        <p>{`${total} ฿`}</p>
      </div>
      <div className="flex flex-col justify-center items-center font-semibold">
        <p
          className={`${
            balance > 0 ? "text-green-600" : balance < 0 ? "text-red-500" : ""
          }`}
        >
          Balance
        </p>
        <p
          className={`${
            balance > 0 ? "text-green-600" : balance < 0 ? "text-red-500" : ""
          }`}
        >{`${balance} ฿`}</p>
      </div>
    </div>
  );
};

const Bgdark = ({ setPopupOpen }) => {
  return (
    <div
      className="fixed bg-black/50 inset-0 z-0"
      onClick={() => setPopupOpen(false)}
    ></div>
  );
};

const EditPopupIore = ({ setPopupOpen, data }) => {
  const { fetchIore } = useContext(APIContext);
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const catRef = useRef();
  const [isAccountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef();
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
  const [categoryAccount, setCategoryAccount] = useState({
    account: "",
    account_id: "",
    category: "",
    category_id: "",
    amount: "",
    note: "",
  });
  const [currentData, setCurrentData] = useState({
    account_id: data?.account_id,
    account_name: data?.account_name,
    amount: data?.amount,
    category_id: data?.category_id,
    category_name: data?.category_name,
    date: data?.date,
    note: data?.note,
    track_id: data?.track_id,
    types: data?.types,
  });
  useEffect(() => {
    setCurrentData({
      account_id: data?.account_id,
      account_name: data?.account_name,
      amount: data?.amount,
      category_id: data?.category_id,
      category_name: data?.category_name,
      date: data?.date,
      note: data?.note,
      track_id: data?.track_id,
      types: data?.types,
    });
  }, [data]);

  const handleSubmit = async () => {
    try {
      const update = {
        ...currentData,
        account_id:
          categoryAccount.account_id && categoryAccount.account_id !== ""
            ? categoryAccount.account_id
            : currentData.account_id,
        category_id:
          categoryAccount.category_id && categoryAccount.category_id !== ""
            ? categoryAccount.category_id
            : currentData.category_id,
        category_name:
          categoryAccount.category && categoryAccount.category !== ""
            ? categoryAccount.category
            : currentData.category_name,
        account_name:
          categoryAccount.account && categoryAccount.account !== ""
            ? categoryAccount.account
            : currentData.account_name,
      };
      setCurrentData(update);
      const data = await axios.post("http://localhost:5000/update_iore", {
        track_id: update.track_id,
        date: update.date,
        types: update.types,
        account_id: update.account_id,
        category_id: update.category_id,
        amount: update.amount,
        note: update.note,
      });
      fetchIore();
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (value, name) => {
    setCurrentData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log(currentData);
  };
  return (
    <div className="w-3/4 sm:w-1/3! fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center border border-zinc-200 bg-white rounded-xl shadow-xl p-2 gap-2 z-10">
      <p className="text-xl">Edit Income/Expense</p>
      <p className="text-sm">Date :</p>
      <input
        type="date"
        value={toInputDate(currentData?.date)}
        onChange={(e) => {
          handleOnChange(e.target.value, "date");
        }}
        className="w-full border border-ui-green1 focus:outline-none pl-1 rounded-lg"
      />
      <p className="text-sm">Amount :</p>
      <input
        type="text"
        defaultValue={currentData?.amount}
        onChange={(e) => {
          handleOnChange(Number(e.target.value), "amount");
        }}
        className="w-full border border-ui-green1 focus:outline-none pl-1 rounded-lg"
      />
      <label
        ref={catRef}
        onClick={() => setCategoryOpen(true)}
        className="relative w-full flex p-2 border border-ui-green1 rounded-lg"
      >
        Category :
        <div className="flex-1 pl-3">
          {categoryAccount.category
            ? categoryAccount.category
            : currentData.category_name}
        </div>
        <CategoryContainer
          isCategoryOpen={isCategoryOpen}
          setData={setCategoryAccount}
        />
      </label>
      <label
        ref={accountRef}
        onClick={() => setAccountOpen(true)}
        className="relative w-full flex p-2 border border-ui-green1 rounded-lg"
      >
        Account :
        <div className="flex-1 pl-3">
          {categoryAccount.account
            ? categoryAccount.account
            : currentData.account_name}
        </div>
        <AccountContainer
          isAccountOpen={isAccountOpen}
          setData={setCategoryAccount}
        />
      </label>
      <p className="text-sm">Note :</p>
      <input
        type="text"
        defaultValue={currentData?.note}
        onChange={(e) => {
          handleOnChange(Number(e.target.value), "note");
        }}
        className="w-full border border-ui-green1 focus:outline-none pl-1 rounded-lg"
      />
      <div className="w-full flex items-center gap-x-2 mt-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setPopupOpen(false)}
          className="w-1/2 border border-zinc-200 rounded-lg"
        >
          Cancel
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-1/2 bg-ui-green1 text-white rounded-lg"
          onClick={() => {
            handleSubmit();
            setPopupOpen(false);
          }}
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};

const toInputDate = (v) => {
  // this function from chatgpt
  if (!v) return "";

  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v)) {
    return v.slice(0, 10);
  }
  if (typeof v === "string") {
    const m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (m) {
      const [, d, mo, y] = m;
      return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }
  }
  const d = new Date(v);
  if (isNaN(d)) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const EditPopupTransfer = ({ setPopupOpen, data }) => {
  const { fetchTransfer, accountList } = useContext(APIContext);
  const [isFromAccountOpen, setFromAccountOpen] = useState(false);
  const [isToAccountOpen, setToAccountOpen] = useState(false);
  const accountToRef = useRef();
  const accountFromRef = useRef();
  const [selectingFrom, setSelectingFrom] = useState(
    data?.from_account_id
  );
  const [selectingTo, setSelectingTo] = useState(
    data?.to_account_id
  );
  useEffect(() => {
    if (!isFromAccountOpen && !isToAccountOpen) return;
    const handler = (e) => {
      if (!accountToRef.current.contains(e.target)) {
        setToAccountOpen(false);
      }
      if (!accountFromRef.current.contains(e.target)) {
        setFromAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isFromAccountOpen, isToAccountOpen]);
  const [tempToAccount, setTempToAccount] = useState({
    account_id: "",
    account: "",
  });
  const [tempFromAccount, setTempFromAccount] = useState({
    account_id: "",
    account: "",
  });
  const [categoryAccount, setCategoryAccount] = useState({
    from_account_name: "",
    from_account_id: "",
    to_account_name: "",
    to_account_id: "",
    amount: "",
  });
  const [currentData, setCurrentData] = useState({
    to_account_id: data?.to_account_id,
    to_account_name: data?.to_account_name,
    from_account_id: data?.from_account_id,
    from_account_name: data?.from_account_name,
    amount: data?.amount,
    date: toInputDate(data?.date),
    transfer_id: data?.transfer_id,
  });
  useEffect(() => {
    setCurrentData({
      to_account_id: data?.to_account_id,
      to_account_name: data?.to_account_name,
      from_account_id: data?.from_account_id,
      from_account_name: data?.from_account_name,
      amount: data?.amount,
      date: toInputDate(data?.date),
      transfer_id: data?.transfer_id,
    });
    
  }, [data]);

  useEffect(() => {
    setCategoryAccount((prev) => ({
      ...prev,
      from_account_id: tempFromAccount.account_id,
      from_account_name: tempFromAccount.account,
    }));
    setCategoryAccount((prev) => ({
      ...prev,
      to_account_id: tempToAccount.account_id,
      to_account_name: tempToAccount.account,
    }));
    
  }, [tempFromAccount, tempToAccount]);

  const handleSubmit = async () => {
    try {
      const update = {
        ...currentData,
        to_account_id:
          categoryAccount.to_account_id && categoryAccount.to_account_id !== ""
            ? categoryAccount.to_account_id
            : currentData.to_account_id,
        to_account_name:
          categoryAccount.to_account_name && categoryAccount.to_account_name !== ""
            ? categoryAccount.to_account_name
            : currentData.to_account_name,
        from_account_id:
          categoryAccount.from_account_id && categoryAccount.from_account_id !== ""
            ? categoryAccount.from_account_id
            : currentData.from_account_id,
        from_account_name:
          categoryAccount.from_account_name && categoryAccount.from_account_name !== ""
            ? categoryAccount.from_account_name
            : currentData.from_account_name,
      };
      setCurrentData(update);
      const data = await axios.post("http://localhost:5000/update_transfer", {
        transfer_id: update.transfer_id,
        date: update.date,
        from_account_id: update.from_account_id,
        to_account_id: update.to_account_id,
        amount: update.amount,
      });
      fetchTransfer();
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (value, name) => {
    setCurrentData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log(currentData);
  };
  return (
    <div className="w-3/4 sm:w-1/3! fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center border border-zinc-200 bg-white rounded-xl shadow-xl p-2 gap-2 z-10">
      <p className="text-xl">Edit Transfer</p>
      <p className="text-sm">Date :</p>
      <input
        type="date"
        value={toInputDate(currentData?.date)}
        onChange={(e) => {
          handleOnChange(toInputDate(e.target.value), "date");
        }}
        className="w-full border border-ui-green1 focus:outline-none pl-1 rounded-lg"
      />
      <p className="text-sm">Amount :</p>
      <input
        type="text"
        defaultValue={currentData?.amount}
        onChange={(e) => {
          handleOnChange(Number(e.target.value), "amount");
        }}
        className="w-full border border-ui-green1 focus:outline-none pl-1 rounded-lg"
      />
      <div className="w-full flex items-center gap-x-3 p-3">
        <p>From:</p>
        <div className="flex overflow-x-auto gap-x-3">
          {accountList.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectingFrom(item.id);
                setTempFromAccount((prev) => ({ ...prev, account_id: item.id , account: item.name }));
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
                setTempToAccount((prev) => ({ ...prev, account_id: item.id , account: item.name }));
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
      <div className="w-full flex items-center gap-x-2 mt-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setPopupOpen(false)}
          className="w-1/2 border border-zinc-200 rounded-lg"
        >
          Cancel
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-1/2 bg-ui-green1 text-white rounded-lg"
          onClick={() => {
            handleSubmit();
            setPopupOpen(false);
          }}
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};