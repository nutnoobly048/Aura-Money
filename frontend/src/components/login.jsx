import React from 'react'
import '../../src/App.css'


function login() {
  return (
    <div className="relative flex justify-center items-center w-screen h-screen bg-gradient-to-br 
    from-[#62b79c] to-[#afd1a1]">
      <div className='absolute top-0 left-1/2 -translate-x-1/2'>
        <img src='logo.png' className='w-[15vh] m-5' />
      </div>

      <div className='w-full flex flex-col justify-between items-center max-w-[640px] bg-white py-10 px-5 m-5 rounded-2xl gap-y-10'>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-3xl'>Sign in</p>
          <p>Don't have an account?<span className='text-ui-green1 p-1 underline'>Sign up</span></p>
        </div>

        <div className='flex flex-col w-full justify-center gap-y-5'>
          <input className='bg-gray-200 rounded-2xl p-2' type='email' name="Email" placeholder="  Username / Email" />
          <input className='bg-gray-200 rounded-2xl p-2' type='password' name="password" placeholder="  Username / Email" />
        </div>

        <div className="flex flex-col items-center w-full gap-y-6">
          <div className='w-full'>
            <div className='w-full flex justify-between p-3'>
              <div className='flex justify-between items-center gap-x-2'>
                <input type='checkbox' className='w-4 h-4'></input>
                <p>Remember Me</p>
              </div>
              <p className='text-ui-green1 underline'>Forgot Password?</p>
            </div>
            <button className='w-full bg-ui-green2 rounded-2xl p-2 text-white'>Login</button>
          </div>
          <div className='w-full flex justify-center items-center bg-zinc-300 h-0.5'>
            <p className='bg-white text-zinc-400 p-2 pb-3'>or login with</p>
          </div>
          <img src='google.svg' className='w-10 sm:w-15 border-zinc-400 border-2 rounded-full' />
        </div>

      </div>
    </div>
  )
}

export default login