import React from 'react'

function Accountboard({pageOpen}) {
  return (
    <div className={`h-full overflow-y-auto flex flex-col p-4 gap-y-2 ${pageOpen === 'account' ? 'block' : 'hidden'}`}>
      <h1 className='text-[clamp(20px,5vw,30px)] font-semibold'>Sep 2025</h1>
      <SummationBoard />
      <HistoryBoard />
    </div>
  )
}

export default Accountboard

const HistoryBoard = () => {
  let dummies = [{cat: 'Food', acc:'Account 101', date:'19/20/25', amount:'-295฿'},
                 {cat: 'Girlfriend', acc:'Account 101', date:'18/20/25', amount:'-49000฿'},
                 {cat: 'Food', acc:'Account 101', date:'19/20/25', amount:'-295฿'},
                 {cat: 'Girlfriend', acc:'Account 101', date:'18/20/25', amount:'-49000฿'},
                 {cat: 'Food', acc:'Account 101', date:'19/20/25', amount:'-295฿'},
                 {cat: 'Girlfriend', acc:'Account 101', date:'18/20/25', amount:'-49000฿'},
                 {cat: 'Food', acc:'Account 101', date:'19/20/25', amount:'-295฿'},
                 {cat: 'Girlfriend', acc:'Account 101', date:'18/20/25', amount:'-49000฿'},
                 {cat: 'Food', acc:'Account 101', date:'19/20/25', amount:'-295฿'},
                 {cat: 'Girlfriend', acc:'Account 101', date:'18/20/25', amount:'-49000฿'},
                 {cat: 'Food', acc:'Account 101', date:'19/20/25', amount:'-295฿'},
                 {cat: 'Girlfriend', acc:'Account 101', date:'18/20/25', amount:'-49000฿'},
                 {cat: 'Food', acc:'Account 101', date:'19/20/25', amount:'-295฿'},
                 {cat: 'Girlfriend', acc:'Account 101', date:'18/20/25', amount:'-49000฿'},
                 {cat: 'Food', acc:'Account 101', date:'19/20/25', amount:'-295฿'},
                 {cat: 'Girlfriend', acc:'Account 101', date:'18/20/25', amount:'-49000฿'},
                 {cat: 'Food', acc:'Account 101', date:'19/20/25', amount:'-295฿'},
                 {cat: 'Girlfriend', acc:'Account 101', date:'18/20/25', amount:'-49000฿'},
                 {cat: 'Food', acc:'Account 101', date:'19/20/25', amount:'-295฿'},
                 {cat: 'Girlfriend', acc:'Account 101', date:'18/20/25', amount:'-49000฿'},
                 {cat: 'Food', acc:'Account 101', date:'19/20/25', amount:'-295฿'},
                 {cat: 'Girlfriend', acc:'Account 101', date:'18/20/25', amount:'-49000฿'},
                 {cat: 'Food', acc:'Account 101', date:'19/20/25', amount:'-295฿'},
                 {cat: 'Girlfriend', acc:'Account 101', date:'18/20/25', amount:'-49000฿'},
                ];
  return (
    <div className='overflow-y-auto flex flex-col px-4 py-4 border-2 border-zinc-300 rounded-2xl space-y-2'>
      {dummies.map((item, index) => (
        <div key={index} className='w-full flex justify-between items-center border-2 border-zinc-200 shadow-sm rounded-xl px-4 py-1'>
          <p>{item.cat}</p>
          <div className='flex flex-col justify-center items-center'>
            <p>{item.acc}</p>
            <p>{item.date}</p>
          </div>
          <p>{item.amount}</p>
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
