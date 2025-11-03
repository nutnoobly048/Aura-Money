import axios from "axios";
import { motion } from "framer-motion";
import {
  ArrowBigLeft,
  ArrowBigRight,
  LoaderCircle,
  CircleX,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { APIContext } from "./APIProvider";

function Stats() {
  const nowMonth = new Date().getMonth();

  const [type, setType] = useState("income");
  const [data, setData] = useState();
  const [monthNum, setMonthNum] = useState(nowMonth);

  useEffect(() => {
    const fetchRecord = async () => {
      const receive = await axios.post("http://localhost:5000/get_info", {
        month: monthNum + 1,
      });
      setData(receive.data);
      // console.log(receive.data);
    };
    fetchRecord();
  }, [monthNum]);

  // useEffect(() => console.log(data), [data]);
  return (
    <div className="flex flex-col items-center justify-center p-4 gap-y-3">
      <MonthSelector monthNum={monthNum} setMonthNum={setMonthNum} />
      <IoreSelectBtn data={data} type={type} setType={setType} />
      <Chart data={data} type={type} />
    </div>
  );
}

export default Stats;

const Chart = ({ data, type }) => {
  if (!data?.[0]) return <Loading />;
  if (type == "income" && !Object.keys(data[0]).length) return <Nodata />;
  if (type == "expense" && !Object.keys(data[1]).length) return <Nodata />;

  const sortedIncome = Object.entries(data[0]).sort((a, b) => b[1] - a[1]);
  const incomeKeys = sortedIncome.map((x) => x[0]);
  const incomeValues = sortedIncome.map((x) => x[1][0]);
  const incomeAll = sortedIncome.map((x) => x[1][1]);
  
  const sortedExpense = Object.entries(data[1]).sort((a, b) => b[1] - a[1]);
  const expenseKeys = sortedExpense.map((x) => x[0]);
  const expenseValues = sortedExpense.map((x) => x[1][0]);
  const expenseAll = sortedExpense.map((x) => x[1][1]);

  const colorGreen = ["#007341", "#70aa82", "#c1ff72"];
  const colorRed = ["#8B002E", "#D56A7A", "#FF8F72"];

  const incomeData = {
    labels: incomeKeys,
    datasets: [
      {
        data: incomeValues,
        backgroundColor: colorGreen,
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const expenseData = {
    labels: expenseKeys,
    datasets: [
      {
        data: expenseValues,
        backgroundColor: colorRed,
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#444",
          font: { family: "Poppins", size: 14 },
          padding: 15,
        },
      },
    },
    layout: { padding: 10 },
  };

  return (
    <div className="h-full w-full flex-1 flex flex-wrap items-center justify-center border-2 border-zinc-300 rounded-2xl p-4">
      <div className="max-w-lg">
        <Pie
          data={type == "income" ? incomeData : expenseData}
          options={options}
        />
      </div>

      {type == 'income' ? (
        <div className="min-w-[290px] flex-1 flex flex-col border border-zinc-300 p-2 rounded-xl divide-y divide-zinc-300">
          {incomeValues.map((item, index) => (
            <div key={index} className="flex justify-between py-2">
              <div className="flex-1/2 flex gap-x-2">
                <p
                  className="text-white rounded-sm w-1/4 max-w-[76px] text-center"
                  style={{backgroundColor:  colorGreen[index % colorGreen.length]}}
                >
                  {item.toFixed(2)}%
                </p>
                <p>{incomeKeys[index]}</p>
              </div>
              <p>{FormatNumber(incomeAll[index])}฿</p>
            </div>
          ))}
        </div>
        ) : (
        <div className="min-w-[290px] flex-1 flex flex-col border border-zinc-300 p-2 rounded-xl divide-y divide-zinc-300">
          {expenseValues.map((item, index) => (
            <div key={index} className="flex justify-between py-2">
              <div className="flex-1/2 flex gap-x-2">
                <p
                  className="text-white rounded-sm w-1/4 max-w-[76px] text-center"
                  style={{backgroundColor:  colorRed[index % colorRed.length]}}
                >
                  {item.toFixed(2)}%
                </p>
                <p>{expenseKeys[index]}</p>
              </div>
              <p>{FormatNumber(expenseAll[index])}฿</p>
            </div>
          ))}
        </div>
      )}
      

    </div>
  );
};

const Loading = () => {
  return (
    <div className="flex items-center justify-center gap-x-2 self-center text-xl">
      <LoaderCircle className="text-ui-green1 animate-spin" />
      <p>Loading....</p>
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

const IoreSelectBtn = ({ data, type, setType }) => {
  if (!data?.[0]) return;
  const sortedIncome = Object.entries(data[0]).sort((a, b) => b[1] - a[1]);
  const sortedExpense = Object.entries(data[1]).sort((a, b) => b[1] - a[1]);
  const incomeAll = sortedIncome.map((x) => x[1][1]);
  const expenseAll = sortedExpense.map((x) => x[1][1]);
  const sumArray = (arr) => {
    let sum = 0;
    arr?.forEach((item) => {
      sum += item;
    });
    return sum;
  };
  const incomeSum = sumArray(incomeAll);
  const expenseSum = sumArray(expenseAll);
  return (
    <div
      className="relative w-full flex bg-white border border-zinc-300 rounded-xl shadow-md py-1 font-semibold
                    text-white"
    >
      <motion.div
        initial={{ x: type == "income" ? 0 : "100%" }}
        animate={{ x: type == "income" ? 0 : "100%" }}
        className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#62b79c] to-[#afd1a1] rounded-xl"
      ></motion.div>
      <div
        onClick={() => setType("income")}
        className={`z-10 flex-1 text-center duration-200 ${
          type == "income" ? "" : "text-black"
        }`}
      >
        {`Income ${incomeSum}฿`}
      </div>
      <div
        onClick={() => setType("expense")}
        className={`z-10 flex-1 text-center duration-200 ${
          type == "expense" ? "" : "text-black"
        }`}
      >
        {`Expense ${expenseSum}฿`}
      </div>
    </div>
  );
};

const FormatNumber = (num) => {
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // explain /\B(?=(\d{3})+(?!\d))/g
  // /..../g (g) make global
  // (?=..) like condition
  // (\d{3}) group 3 digit (d = digit)
  // (?!\d) loop by front condition
}
