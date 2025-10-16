import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

function dashboard() {

  const [isPopupOpen, setPopupOpen] = useState(false);


  return (
    <div className='w-screen min-h-screen bg-gradient-to-b from-[#62b79c] to-[#afd1a1] p-3'>
      <nav className='flex justify-between items-center p-2'>
        <Hamburger />
        <img src='logo.png' className='w-[15vh]' />
        <User />
      </nav>

      <div className='bg-white rounded-2xl'>
        <img src='aurora.png' className='pt-10' />
        <div className='flex flex-col p-4 gap-y-2'>
          <h1 className='text-xl'>Sep 2025</h1>
          <SummationBoard />
          <HistoryBoard />
          <div></div>
        </div>
      </div>

      <div onClick={() => setPopupOpen(false)} className={`fixed inset-0 bg-black z-10 transition-all
       ease-in-out duration-300 ${isPopupOpen ? 'block opacity-50' : 'invisible opacity-0'}`}></div>
      <AddContentBtn isPopupOpen={isPopupOpen} setPopupOpen={setPopupOpen} />
      <AddContentPopup isPopupOpen={isPopupOpen} />
    </div>
  )
}

const Hamburger = ({ size = '2xl' }) => {
  return (
    <FontAwesomeIcon size={size} icon={faBars} style={{ color: "#ffffff", }} />
  );
}

const User = ({ size = '2xl' }) => {
  return (
    <FontAwesomeIcon size={size} icon={faUser} style={{ color: "#ffffff", }} />
  );
}

const HistoryBoard = () => {
  let dummies = [1, 2, 3, 4, 5];
  return (
    <div className='flex flex-col justify-evenly px-4 py-2 border-2 border-zinc-300 rounded-2xl space-y-2'>
      {dummies.map((dummy) => (
        <div key={dummy} className='h-8 bg-zinc-200 rounded-2xl'>
          <p>{dummy}</p>
        </div>
      ))}
    </div>
  );
}
const SummationBoard = () => {
  return (
    <div className='flex justify-evenly border-2 border-zinc-200 rounded-2xl p-1'>
      <div className='flex flex-col justify-center items-center'>
        <p>Income</p>
        <p>-</p>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <p>Expenses</p>
        <p>-</p>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <p>Total</p>
        <p>-</p>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <p>Balance</p>
        <p>-</p>
      </div>
    </div>
  );
}

const AddContentBtn = ({ isPopupOpen, setPopupOpen }) => {
  return (
      <button onClick={() => setPopupOpen(!isPopupOpen)}>
        <FontAwesomeIcon icon={faPlus} size="md" className={`fixed bottom-0 right-0 text-white px-3 py-3.5 m-5 
        rounded-full duration-300 ${isPopupOpen ? 'z-30 rotate-405 bg-rose-500' : 'bg-ui-green2'}`} />
      </button>
  );
}

const AddContentPopup = ({ isPopupOpen }) => {
  return (
    <div className={`top-1/2 left-1/2 absolute w-[calc(100%-24px)] -translate-y-1/2 -translate-x-1/2 bg-white rounded-2xl
     z-20 ease-in-out duration-300 ${isPopupOpen ? 'block scale-100' : 'invisible scale-0'}`}>
      <nav className='flex justify-evenly items-center rounded-t-2xl bg-gradient-to-r from-[#62b79c] to-[#afd1a1] p-4'>
        <p>Income</p>
        <p>Expenses</p>
        <p>Transfer</p>
      </nav>

      <h1 className='text-2xl font-bold text-center p-2'>Income</h1>
      <div className='flex flex-col justify-center items-centerv p-3 gap-y-2'>
        <span className='h-0.5 w-full bg-zinc-300'></span>
        <div className='w-full flex'>
          <label for='Date'>Date :</label>
          <input id='Date' className='flex-1' />
        </div>
        <span className='h-0.5 w-full bg-zinc-300'></span>
        <div className='w-full flex'>
          <label for='Amount'>Amount :</label>
          <input id='Amount' className='flex-1' />
        </div>
        <span className='h-0.5 w-full bg-zinc-300'></span>
        <div className='w-full flex'>
          <label for='Catagory'>Catagory :</label>
          <input id='Catagory' className='flex-1' />
        </div>
        <span className='h-0.5 w-full bg-zinc-300'></span>
        <div className='w-full flex'>
          <label for='Account'>Account :</label>
          <input id='Account' className='flex-1' />
        </div>
        <span className='h-0.5 w-full bg-zinc-300'></span>
        <div className='w-full flex'>
          <label for='Note'>Note :</label>
          <input id='Note' className='flex-1' />
        </div>
        <span className='h-0.5 w-full bg-zinc-300'></span>

        <div className='flex flex-col justify-center items-center gap-y-2 m-1'>
          <button className='bg-gradient-to-r from-[#62b79c] to-[#afd1a1] text-white font-bold rounded-2xl min-w-3/4 py-1'>Save</button>
          <button className='border rounded-2xl min-w-3/4 py-1'>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default dashboard