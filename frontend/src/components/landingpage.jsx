import React from 'react'
import '../../src/App.css'
import { Link } from "react-router-dom"

function landingpage() {
  return (
    <div className="relative flex flex-col justify-center items-center w-screen h-dvh bg-gradient-to-br 
    from-[#62b79c] to-[#afd1a1]">
      <nav className='absolute top-0 left-0 w-full flex justify-between sm:justify-center! items-center p-3'>
        <img src='logo.png' className='w-[15vh] sm:w-[20vh]!'/>
        <div className='flex space-x-5 text-xl sm:hidden!'>
          <Link to='/register' className='border rounded-3xl border-white text-white px-3 py-1 cursor-pointer
          hover:bg-white hover:text-ui-green1 hover:scale-110 transition duration-150 ease-in-out'>Signup</Link>
          <Link to='/login' className='rounded-3xl bg-white text-ui-green1 px-3 py-1 cursor-pointer 
          hover:bg-transparent hover:text-white hover:border hover:scale-110 hover:border-white 
          transition duration-150 ease-in-out'>Login</Link>
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
        <Link to='/login_register' className='flex-1 border rounded-3xl border-white text-white text-center px-3 py-1 
        cursor-pointer hover:bg-white hover:text-ui-green1 hover:scale-110 transition duration-150 ease-in-out'>Signup</Link>
        <Link to='/login_register' className='flex-1 rounded-3xl bg-white text-ui-green1 text-center px-3 py-1 
        cursor-pointer hover:bg-transparent hover:text-white hover:border hover:scale-110 hover:border-white transition 
        duration-150 ease-in-out'>Login</Link>
      </div>
    </div>
  )
}

export default landingpage