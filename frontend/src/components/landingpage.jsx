import React from 'react'
import '../../src/App.css'

function landingpage() {
  return (
    <div className="relative flex flex-col justify-center items-center w-screen h-screen bg-gradient-to-br 
    from-[#62b79c] to-[#afd1a1]">
      <nav className='absolute top-0 left-0 w-full flex justify-between sm:justify-center! items-center p-3'>
        <img src='logo.png' className='w-[15vh] sm:w-[20vh]!'/>
        <div className='flex space-x-5 text-xl sm:hidden!'>
          <button className='border rounded-3xl border-white text-white px-3 py-1'>Signup</button>
          <button className='rounded-3xl bg-white text-[#62b79c] px-3 py-1'>Login</button>
        </div>
      </nav>
      <div className='flex flex-col justify-center items-center max-w-[640px] bg-white py-25 px-5 m-5 rounded-2xl gap-y-2 sm:hidden'>
        <img src='home-money.png' className='w-[10vh]'/>
        <p className='font-bold text-xl'>What is</p>
        <p className='text-[#62b79c] font-bold text-3xl sm:text-5xl'>Aura Money?</p>
        <p className='text-center sm:text-lg'>An idea for an auto money-saving visualizer and planner is proposed, emphasizing its importance, 
          though specific reasons and supporting data are yet to be provided.</p>
      </div>
      <div className='hidden sm:flex! w-160 space-x-10 text-xl font-bold'>
        <button className='flex-1 border rounded-3xl border-white text-white px-3 py-1'>Signup</button>
        <button className='flex-1 rounded-3xl bg-white text-[#62b79c] px-3 py-1'>Login</button>
      </div>
    </div>
  )
}

export default landingpage