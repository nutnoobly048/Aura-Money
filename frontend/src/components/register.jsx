import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faL } from '@fortawesome/free-solid-svg-icons';

function register() {
  const googleLogin = () => {
    window.location.href = "http://localhost:5000/google";
  };

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <div
      className="relative flex justify-center items-center w-screen h-dvh bg-gradient-to-br 
    from-[#62b79c] to-[#afd1a1] "
    >
      <div className="flex absolute top-0 left-1/2 -translate-x-1/2">
        <img src="logo.png" className="w-[15vh] m-5" />
      </div>

      <div
        className="items-center max-w-[640px] bg-white py-4 px-5 m-5 rounded-2xl gap-y-2 
      w-full flex flex-col justify-between"
      >
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl">Create an account</p>
          <div className="flex items-center gap-x-2">
            <p>Already have an account?</p>
            <Link
              to="/login"
              className="text-ui-green1 p-1 underline hover:scale-102"
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="flex flex-col w-full justify-center gap-y-4.5">
          <input
            className="bg-gray-200 rounded-2xl p-2 pl-4.5 cursor-pointer"
            type="text"
            name="Username"
            placeholder="Username"
          />
          <input
            className="bg-gray-200 rounded-2xl p-2 pl-4.5 cursor-pointer"
            type="text"
            name="Email"
            placeholder="Email"
          />
          <div className="relative">
            <input
              className="bg-gray-200 rounded-2xl p-2 pl-4.5 cursor-pointer w-full"
              type={`${isPasswordVisible ? 'text' : 'password'}`}
              name="Password"
              placeholder="Password"
            />
            <FontAwesomeIcon onClick={() => setPasswordVisible(!isPasswordVisible)} icon={faEye} className="absolute right-0 mr-3 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer hover:scale-120"/>
          </div>
          <div className="relative">
            <input
              className="bg-gray-200 rounded-2xl p-2 pl-4.5 cursor-pointer w-full"
              type={`${isPasswordVisible ? 'text' : 'password'}`}
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            <FontAwesomeIcon onClick={() => setPasswordVisible(!isPasswordVisible)} icon={faEye} className="absolute right-0 mr-3 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer hover:scale-120"/>
          </div>
        </div>

        <div className="flex flex-col items-center w-full gap-y-6">
          <div className="w-full">
            <div className="w-full flex justify-between p-3">
              <div className="flex justify-between items-center gap-x-2">
                <input
                  id="isRemember"
                  type="checkbox"
                  className="w-4 h-4 accent-ui-green1 cursor-pointer"
                ></input>
                <label for="isRemember" className="cursor-pointer">Remember Me</label>
              </div>
              <p className="text-ui-green1 underline cursor-pointer hover:scale-102">
                Forgot Password?
              </p>
            </div>
            <button
              className="w-full bg-ui-green2 rounded-2xl p-2 cursor-pointer text-white hover:border-ui-green2 
            hover:opacity-50 duration-150"
            >
              Create Account
            </button>
          </div>
          <div className="w-full flex justify-center items-center bg-zinc-300 h-0.5">
            <p className="bg-white text-zinc-400 p-2 pb-3">or login with</p>
          </div>
          <img
            src="google.svg"
            className="w-10 sm:w-15 hover:drop-shadow-sm hover:drop-shadow-black/50 duration-250 cursor-pointer"
            onClick={googleLogin}
          />
        </div>
      </div>
    </div>
  );
}

export default register;
