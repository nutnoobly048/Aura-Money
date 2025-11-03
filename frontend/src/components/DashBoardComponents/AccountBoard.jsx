import { ArrowBigLeft, ArrowBigRight, Trash, CircleX, } from "lucide-react";
import { useContext, useState, useRef, useEffect } from "react";
import { APIContext } from "../APIProvider";
import { motion } from "framer-motion";
import axios from "axios";

export default function AccountBoard({ pageOpen }) {
  const nowMonth = new Date().getMonth();
  const { iore } = useContext(APIContext);
  const [monthNum, setMonthNum] = useState(nowMonth);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    if (!iore) return;
    const filterMonthData = iore.filter((item) => {
      const monthDataNum = new Date(item?.date).toLocaleDateString("en-GB").split("/")[1];
      return Number(monthDataNum) === Number(monthNum + 1)
    })
    setCurrentData(filterMonthData)
  }, [monthNum , iore])
  
  return (
    <div
      className={`h-full overflow-y-auto flex flex-col p-4 gap-y-2 ${
        pageOpen === "account" ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center gap-x-1">
        <MonthSelector monthNum={monthNum} setMonthNum={setMonthNum} />
      </div>
      <SummationBoard iore={currentData} />
      <HistoryBoard iore={currentData} />
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

const HistoryBoard = ({ iore }) => {

  return (
    <div className="overflow-y-auto flex flex-col px-4 py-4 border-2 border-zinc-300 rounded-2xl space-y-2">
      {iore.length == 0 ? (
        <Nodata />
      ) : (
        iore?.map((item) => (
          <HistoryItem key={item?.track_id} item={item} />
        ))
      )}
    </div>
  );
};

const HistoryItem = ({ item }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const elementArea = useRef(null);
  const { fetchIore } = useContext(APIContext);
  
  useEffect(() => {
    if (!isMenuOpen) return;
    const handler = (e) => {
      if (!elementArea.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    }
  }, [isMenuOpen]);

  const handleDeleteIore = async (id) => {
    try {
      await axios.post("http://localhost:5000/delete_iore", {
        track_id:id
      });
      await fetchIore();
      // console.log('deleted', id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <div
        ref={elementArea}
        key={item?.track_id}
        onClick={() => setMenuOpen(p => !p)}
        className="relative w-full flex justify-between items-center border-2 border-zinc-200 shadow-sm rounded-xl px-4 py-2  "
      >
        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center rounded-xl z-10">
            <Trash onClick={() => handleDeleteIore(item?.track_id)} className="size-8 text-white bg-red-500 rounded-full p-1" />
          </div>
        )}
        <p className="text-xl">{item?.category_name}</p>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
          <p>{item?.account_name}</p>
          <p>{new Date(item?.date).toLocaleDateString("en-GB")}</p>
        </div>
        <p className={`${item?.types == "expense" ? "text-red-500" : "text-green-700"} text-xl`}>
          {`${item?.types == "expense" ? "-" : ""}${item?.amount} ฿`}
        </p>
      </div>
  );
}

const Nodata = () => {
  return (
    <div className="flex items-center justify-center gap-x-2 self-center text-xl">
      <CircleX className="text-red-500 animate-spin" />
      <p>No data recorded.</p>
    </div>
  );
};

const SummationBoard = ({ iore }) => {
  const sumArray = (arr) => {let sum=0;arr?.forEach(item => {sum += item});return sum}
  const incomeSum = sumArray(iore?.map(item => item.types == 'income' ? item.amount : 0));
  const expenseSum = sumArray(iore?.map(item => item.types == 'expense' ? item.amount : 0));
  const total = incomeSum + expenseSum;
  const balance = incomeSum - expenseSum;
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
        <p className={`${balance > 0 ? 'text-green-600' : balance < 0 ? 'text-red-500' : ''}`}>Balance</p>
        <p className={`${balance > 0 ? 'text-green-600' : balance < 0 ? 'text-red-500' : ''}`}>{`${balance} ฿`}</p>
      </div>
    </div>
  );
};
