import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AccountContext } from "../../ContextProvider";

function AccountContainer({ isAccountOpen, setData }) {

  const [accounts, setAccountList] = useState([]);
  const [selecting, setSelecting] = useState(null);
  
  const { accountList } = useContext(AccountContext);

  useEffect(() => {
    setAccountList(accountList);
  });

  useEffect(() => {
    if (selecting == null) return;
    setData((prev) => ({...prev, account: selecting}));
  }, [selecting]);
  
  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center justify-center rounded-xl 
      p-2 gap-y-2 bg-white/80 border-2 border-zinc-300 drop-shadow-2xl max-h-50 overflow-y-auto ${
        isAccountOpen ? "" : "hidden"
      }`}
    >
      {accounts.map((item, index) => (
        <div
          key={index}
          onClick={() => setSelecting(item)}
          className={`w-full text-center rounded-lg py-1 px-2 shadow-md
          ${
            selecting == item
              ? "text-white bg-gradient-to-r from-[#62b79c] to-[#afd1a1]"
              : "bg-white text-ui-green1"
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default AccountContainer;
