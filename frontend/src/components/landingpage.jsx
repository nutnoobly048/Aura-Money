import React from 'react'
import '../../src/App.css'

function landingpage() {
  return (
    <div className="flex flex-col w-screen h-screen bg-gradient-to-br from-[#62b79c] to-[#afd1a1]">
      <nav className='flex justify-between items-center p-3'>
        <img src='logo.png' className='w-25 h-15'/>
        <div className='flex space-x-5'>
          <button className='border rounded-3xl border-white text-white px-3 py-1'>Signup</button>
          <button className='rounded-3xl bg-white text-[#62b79c] px-3 py-1'>Login</button>
        </div>
      </nav>
      <div className='flex flex-col justify-center items-center bg-white py-25 px-5 m-5 rounded-2xl'>
        <img src='home-money.png' className='w-[10vh]'/>
        <p className='font-bold text-xl'>What is</p>
        <p className='text-[#62b79c] font-bold text-3xl'>Aura Money?</p>
        <p className='text-center'>An idea for an auto money-saving visualizer and planner is proposed, emphasizing its importance, 
          though specific reasons and supporting data are yet to be provided.</p>
      </div>
    </div>
  )
}

export default landingpage