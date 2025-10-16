import React, { useState, useEffect } from 'react'
import '../../src/App.css'
import { Link } from "react-router-dom"

function login() {

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {

    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ""
      }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {};

    console.log(values);

    if (!values.email) {
      newErrors.email = "Email / username is required!"
    }
    if (!values.password) {
      newErrors.password = 'Password is required!';
    }
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      console.log('logged in.')
    }
  }



  return (
    <div className="relative flex justify-center items-center w-screen h-screen bg-gradient-to-br 
    from-[#62b79c] to-[#afd1a1]">
      <div className='absolute top-0 left-1/2 -translate-x-1/2'>
        <img src='logo.png' className='w-[15vh] m-5' />
      </div>

      <div className='w-full flex flex-col justify-between items-center max-w-[640px] bg-white py-10 px-5 m-5 rounded-2xl gap-y-10'>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-3xl'>Sign in</p>
          <div className='flex items-center gap-x-2'>
            <p>Don't have an account?</p>
            <Link to='/register' className='text-ui-green1 p-1 underline hover:scale-110'>Sign up</Link>
          </div>
        </div>

        <div className='flex flex-col w-full justify-center gap-y-5'>
          <input className={`bg-gray-200 rounded-2xl p-2 pl-3 cursor-pointer ${errors.email ? 'bg-red-100 border border-red-500' : 'bg-gray-200'}`}
            type='text' name="email"
            placeholder={`${errors.email ? `${errors.email}` : 'Username / Email'}`}
            onChange={(e) => handleChange(e)} />
          <input className={`bg-gray-200 rounded-2xl p-2 pl-3 cursor-pointer ${errors.password ? 'bg-red-100 border border-red-500' : 'bg-gray-200'}`}
            type='password' name="password" 
            placeholder={`${errors.password ? `${errors.password}` : 'Password'}`}
            onChange={(e) => handleChange(e)} />
        </div>

        <div className="flex flex-col items-center w-full gap-y-6">
          <div className='w-full'>
            <div className='w-full flex justify-between p-3'>
              <div className='flex justify-between items-center gap-x-2'>
                <input id='isRemember' type='checkbox' className='w-4 h-4 accent-ui-green1'></input>
                <label for='isRemember'>Remember Me</label>
              </div>
              <p className='text-ui-green1 underline cursor-pointer hover:scale-110'>Forgot Password?</p>
            </div>
            <button className='w-full bg-ui-green2 rounded-2xl p-2 cursor-pointer text-white hover:border-ui-green2 
            hover:opacity-50 duration-150'
              onClick={handleSubmit}>Login</button>
          </div>
          <div className='w-full flex justify-center items-center bg-zinc-300 h-0.5'>
            <p className='bg-white text-zinc-400 p-2 pb-3'>or login with</p>
          </div>
          <img src='google.svg'
           className='w-10 sm:w-15 border-zinc-400 border-2 rounded-full hover:drop-shadow-sm hover:drop-shadow-black/50' />
        </div>

      </div>
    </div>
  )
}

export default login