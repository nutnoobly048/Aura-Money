import React, { useState, useEffect } from "react";
import "../../src/App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons';

axios.defaults.withCredentials = true;

function login_register() {

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const loginform = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/login", {
        email: values.email,
        password: values.password,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    const newErrors = {};

    console.log(values);

    if (!values.email) {
      newErrors.email = "Email / username is required!";
    }
    if (!values.password) {
      newErrors.password = "Password is required!";
    }
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      loginform();
      console.log("logged in.");
    }
  };

  const googleLogin = () => {
    window.location.href = "http://localhost:5000/google";
  };

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [page, setPage] = useState(false);

  return (
    <div className="relative flex justify-center items-center w-screen h-dvh bg-gradient-to-br from-[#62b79c] to-[#afd1a1]">
      <LoginPage handleChange={handleChange} handleSubmit={handleSubmit} googleLogin={googleLogin} errors={errors} page={page} setPage={setPage}/>
      <RegisterPage isPasswordVisible={isPasswordVisible} setPasswordVisible={setPasswordVisible} googleLogin={googleLogin} page={page} setPage={setPage}/>
    </div>
  );
}

export default login_register;

const LoginPage = ({handleChange, handleSubmit, googleLogin, errors, page, setPage}) => {
  return (
    <div className={`absolute flex justify-center items-center w-screen h-dvh bg-transparent duration-500 ${page ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="w-full flex flex-col justify-between items-center max-w-[640px] bg-white py-10 px-5 m-5 rounded-2xl gap-y-10">
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl">Sign in</p>
          <div className="flex items-center gap-x-2">
            <p>Don't have an account?</p>
            <p onClick={() => setPage(!page)} className="text-ui-green1 p-1 underline hover:scale-110 cursor-pointer">Sign up</p>
          </div>
        </div>

        <div className="flex flex-col w-full justify-center gap-y-5">
          <input
            className={`bg-gray-200 rounded-2xl p-2 pl-3 cursor-pointer ${
              errors.email ? "bg-red-100 border border-red-500" : "bg-gray-200"
            }`}
            type="text"
            name="email"
            placeholder={`${
              errors.email ? `${errors.email}` : "Username / Email"
            }`}
            onChange={(e) => handleChange(e)}
          />
          <input
            className={`bg-gray-200 rounded-2xl p-2 pl-3 cursor-pointer ${
              errors.password
                ? "bg-red-100 border border-red-500"
                : "bg-gray-200"
            }`}
            type="password"
            name="password"
            placeholder={`${
              errors.password ? `${errors.password}` : "Password"
            }`}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="flex flex-col items-center w-full gap-y-6">
          <div className="w-full">
            <div className="w-full flex justify-between p-3">
              <div className="flex justify-between items-center gap-x-2">
                <input
                  id="isRemember"
                  type="checkbox"
                  className="w-4 h-4 accent-ui-green1"
                ></input>
                <label for="isRemember">Remember Me</label>
              </div>
              <p className="text-ui-green1 underline cursor-pointer hover:scale-110">
                Forgot Password?
              </p>
            </div>
            <button
              className="w-full bg-ui-green2 rounded-2xl p-2 cursor-pointer text-white hover:border-ui-green2 
            hover:opacity-50 duration-150"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <div className="w-full flex justify-center items-center bg-zinc-300 h-0.5">
            <p className="bg-white text-zinc-400 p-2 pb-3">or login with</p>
          </div>
          <img
            src="google.svg"
            className="w-10 sm:w-15 border-zinc-400 border-2 rounded-full hover:drop-shadow-sm hover:drop-shadow-black/50"
            onClick={googleLogin}
          />
        </div>
      </div>
    </div>
  );
};

const RegisterPage = ({setPasswordVisible, isPasswordVisible, googleLogin, page, setPage}) => {
  return (
    <div className={`absolute flex justify-center items-center w-screen h-dvh bg-transparent duration-500 ${page ? '-translate-x-full' : 'translate-x-0'}`}>
      <div className="items-center max-w-[640px] bg-white py-4 px-5 m-5 rounded-2xl gap-y-2 w-full flex flex-col justify-between">
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl">Create an account</p>
          <div className="flex items-center gap-x-2">
            <p>Already have an account?</p>
            <p onClick={() => setPage(!page)} className="text-ui-green1 p-1 underline hover:scale-102 cursor-pointer">Sign in</p>
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
};