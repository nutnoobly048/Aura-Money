import { useState, useRef, useEffect } from "react";
import CategoryContainer from "./PopupComponents/CategoryContainer";
import AccountContainer from "./PopupComponents/AccountContainer";

export default function AddContentPopup({ isPopupOpen, setPopupOpen, addContentType, setAddContentType }) {

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
    }
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    }
  }, [isCategoryOpen, isAccountOpen]);

  const typeSelectColor = {
    'Income': 'left-0! text-black',
    'Expense': 'left-1/3! text-black',
    'Transfer': 'left-2/3! text-black'
  }
  
  return (
    <div className={`top-1/2 left-1/2 absolute w-[calc(100%-24px)] -translate-y-1/2 -translate-x-1/2 bg-white 
    rounded-2xl z-20 ease-in-out duration-200 max-w-2xl ${isPopupOpen ? 'block scale-100' : 'invisible scale-0'}`}>
      
      <nav className='relative rounded-t-2xl bg-gradient-to-r from-[#62b79c] to-[#afd1a1]'>
        <div className={`absolute top-0 left-1/3 ${typeSelectColor[addContentType]} bg-white w-1/3 h-[calc(100%+1px)] rounded-t-2xl duration-250 overflow-hidden`}>
          <div className='absolute bottom-0 w-full h-1 bg-ui-green2'></div>
        </div>
        <button onClick={() => setAddContentType('Income')} className={`relative py-4 w-1/3 h-full font-semibold ${addContentType === 'Income' ? 'text-black' : 'text-white'}`}>Income</button>
        <button onClick={() => setAddContentType('Expense')} className={`relative py-4 w-1/3 h-full font-semibold ${addContentType === 'Expense' ? 'text-black' : 'text-white!'}`}>Expense</button>
        <button onClick={() => setAddContentType('Transfer')} className={`relative py-4 w-1/3 h-full font-semibold ${addContentType === 'Transfer' ? 'text-black' : 'text-white'}`}>Transfer</button>
      </nav>

      <h1 className='text-2xl font-bold text-center p-2'>{addContentType}</h1>
      <div className='flex flex-col justify-center items-center p-3 divide-y-2 divide-zinc-300'>
        <label className="w-full flex p-3">Date :<input type='datetime-local' className="flex-1 pl-3 focus:outline-none"/></label>

        <label className="w-full flex p-3">Amount :<input type='number' className="flex-1 pl-3 focus:outline-none" /></label>
        
        <label ref={catRef} onClick={() => setCategoryOpen(true)} className="relative w-full flex p-3">
          Category :
          <div className="flex-1 pl-3" ></div>
          <CategoryContainer isCategoryOpen={isCategoryOpen} setCategoryOpen={setCategoryOpen} />
        </label>
        
        <label ref={accountRef} onClick={() => setAccountOpen(true)} className="relative w-full flex p-3">
          Account :
          <div className="flex-1 pl-3" ></div>
          <AccountContainer isAccountOpen={isAccountOpen} />
        </label>
        
        <label className="w-full flex p-3">Note :<input type='text' className="flex-1 pl-3 focus:outline-none"/></label>

        <div className='w-full flex justify-center items-center gap-x-2 m-1 mt-4'>
          <button className='flex-1 bg-gradient-to-r from-[#62b79c] to-[#afd1a1] text-white font-bold rounded-2xl py-1'>Save</button>
          <button onClick={() => setPopupOpen(false)} className='flex-1 border rounded-2xl py-1'>Cancel</button>
        </div>
      </div>
    </div>
  );
}
