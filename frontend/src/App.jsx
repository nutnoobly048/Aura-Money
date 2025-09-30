import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="h-screen flex bg-gradient-to-br from-[#62b79c] to-[#afd1a1]">
      {/*------------------left bar section----------------*/}
      <div className="h-screen flex flex-col w-40">
        <img src='/logo.png' alt='logo' className='w-32 h-auto m-4 self-start'/>
        <div className='flex flex-col flex-1 items-center justify-center text-2xl gap-10 mb-30'>
          <h2 className='border-5 border-white px-3 py-2 rounded-3xl text-white'>Sign up</h2>
          <h2 className='bg-white px-6 py-2 rounded-3xl text-teal-600'>Login</h2>
        </div>
      </div>
      {/*------------------left bar section----------------*/}
      {/*------------------right big text----------------*/}
      <div className='h-full relative flex-1 bg-white'>
          <img src='/home-bg.png' alt='home-bg' className='min-h-2/4 absolute top-0 right-0 object-cover'/>
          <div className='h-6/10 w-full bg-white absolute bottom-0 right-0
          items-centerborder-white rounded-3xl flex justify-center items-center'>
            <div className='flex flex-col m-10'>
              <h2 className='text-4xl font-bold'>What is <span className='text-[#70aa82]'>Aura Money ?</span></h2>
              <p className='text-2xl'>An idea for an auto money-saving visualizer and planner is proposed,
              emphasizing its importance, though specific reasons and supporting data are yet to be provided.</p>
            </div>
            <img src='/home-money.png' alt='home-money' className='w-30 h-auto mr-10'/>
          </div>
      </div>
      {/*------------------right big text----------------*/}
    </div>
  );
}

export default App
