import { useState } from "react";

function AccountContainer({ isAccountOpen }) {
  const [accountList, setAccountList] = useState([
    "Account #1",
    "Account #2",
    "Account #3",
    "Account #4",
  ]);
  const [selecting, setSelecting] = useState();

  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center justify-center rounded-xl 
      p-2 gap-y-2 bg-white/80 border-2 border-zinc-300 drop-shadow-2xl max-h-50 overflow-y-auto ${
        isAccountOpen ? "" : "hidden"
      }`}
    >
      {accountList.map((item, index) => (
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
