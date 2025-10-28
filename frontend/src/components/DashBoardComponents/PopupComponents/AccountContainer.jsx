import { useEffect, useState, useContext } from "react";
import { APIContext } from "../../APIProvider";

function AccountContainer({ isAccountOpen, setData }) {

  const [selecting, setSelecting] = useState(null);
  const { accountList } = useContext(APIContext);

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
      {accountList.map((item) => (
        <div
          key={item.id}
          onClick={() => setSelecting(item.name)}
          className={`w-full text-center rounded-lg py-1 px-2 shadow-md
          ${
            selecting == item.name
              ? "text-white bg-gradient-to-r from-[#62b79c] to-[#afd1a1]"
              : "bg-white text-ui-green1"
          }`}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default AccountContainer;
