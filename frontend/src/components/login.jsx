import React from 'react'
import '../../src/App.css'


function login() {
  return (
    <div className="relative flex flex-col justify-center items-center w-screen h-screen bg-gradient-to-br 
    from-[#62b79c] to-[#afd1a1] ">
      <nav className='absolute top-0 left-0 w-full flex justify-between sm:justify-center! items-center p-3'>
        <img src='logo.png' className='w-[15vh] sm:w-[20vh]!'/>
      </nav>
      <div className='flex flex-col justify-center items-center max-w-[640px] bg-white py-25 px-5 m-5 rounded-2xl gap-y-2 sm:hidden'>
        <p className=' text-3xl'> Sign in </p>
        <p>
          <span>Don’t have an account? </span>
          <span className=' text-green-500 text-'><ins>Sign up</ins></span>
        </p>
        <label className=' bg-center mt-20 mb-20 ml-25 mr-25'>
          <input className=' bg-gray-200 rounded-2xl p-2 ' type='email' name="Email" placeholder="  Username / Email" />
          <br></br>
          <br></br>
          <input className=' bg-gray-200 rounded-2xl p-2 ' type='password' name="password" placeholder="  Username / Email" />
      </label>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-2">
          <input className="w-4 h-4" type="checkbox" />
            <span>Remember Me</span>
        </div>
        <span className=' text-green-500 text-'><ins>Forgot Password?</ins></span>
      </div>
      <div>
        <input className='bg-green-800 text-white px-6 py-3 w-100 rounded-2xl' type='button' name="Login" value="Login"></input>
      </div>
    </div>
  </div>
  )
}

export default login