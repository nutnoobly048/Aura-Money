import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useContext } from "react";
import { APIContext } from "../APIProvider";

export default function AccountBoard({ pageOpen }) {
  const { iore, setIore } = useContext(APIContext);

  return (
    <div
      className={`h-full overflow-y-auto flex flex-col p-4 gap-y-2 ${
        pageOpen === "account" ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center gap-x-1">
        <ArrowBigLeft className="text-ui-green1 " />
        <h1 className="text-[clamp(20px,5vw,30px)] font-semibold">Sep 2025</h1>
        <ArrowBigRight className="text-ui-green1" />
      </div>
      <SummationBoard iore={iore} />
      <HistoryBoard iore={iore} />
    </div>
  );
}

const HistoryBoard = ({ iore }) => {

  return (
    <div className="overflow-y-auto flex flex-col px-4 py-4 border-2 border-zinc-300 rounded-2xl space-y-2">
      {iore?.map((item) => (
        <div
          key={item?.track_id}
          className="relative w-full flex justify-between items-center border-2 border-zinc-200 shadow-sm rounded-xl px-4 py-2  "
        >
          <p className="text-xl">{item?.category_name}</p>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
            <p>{item?.account_name}</p>
            <p>{new Date(item?.date).toLocaleDateString("en-GB")}</p>
          </div>
          <p className={`${item?.types == "expense" ? "text-red-500" : "text-green-700"} text-xl`}>
            {`${item?.types == "expense" ? "-" : ""}${item?.amount} ฿`}
          </p>
        </div>
      ))}
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
        <p className={`${balance > 0 ? 'text-green-500' : balance < 0 ? 'text-red-500' : ''}`}>Balance</p>
        <p className={`${balance > 0 ? 'text-green-500' : balance < 0 ? 'text-red-500' : ''}`}>{`${balance} ฿`}</p>
      </div>
    </div>
  );
};
