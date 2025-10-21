import React from 'react'

function Accountboard({pageOpen}) {
  return (
    <div className={`flex flex-col p-4 gap-y-2 ${pageOpen === 'account' ? 'block' : 'hidden'}`}>
      <h1 className='text-[clamp(20px,5vw,30px)] font-semibold'>Sep 2025</h1>
      <SummationBoard />
      <HistoryBoard />
    </div>
  )
}

export default Accountboard

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
