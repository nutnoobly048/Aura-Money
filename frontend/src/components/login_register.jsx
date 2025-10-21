import React, { useState, useEffect } from "react";
import "../../src/App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons';

axios.defaults.withCredentials = true;

function login_register() {

  // ----------------------------Login Validations-------------------------------
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (errors[name]) {
      setErrors((prevErrors) => ({...prevErrors,[name]: "",}));
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

  const [isLoginPasswordVisible, setLoginPasswordVisible] = useState(false);
  // ----------------------------Login Validations-------------------------------
  // Page Switch
  const [page, setPage] = useState(false);
  // ----------------------------Register Validations-------------------------------
  const [isRegisterPasswordVisible, setRegisterPasswordVisible] = useState(false);
  const [registerValues, setRegisterValues] = useState({username:'',email:'',password:'',confirmPassword:''});
  const [registerErrors, setRegisterErrors] = useState({username:'',email:'',password:'',confirmPassword:''});
  
  // const registerForm = async () => {
  //   try {
  //     const { data } = await axios.post("http://localhost:5000/register", {
  //       username:
  //       email: values.email,
  //       password: values.password,
  //     });
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegisterValues({ ...registerValues, [name]: value });

    if (registerErrors[name]) {
      setRegisterErrors((prevErrors) => ({...prevErrors,[name]: "",}));
    }
  };

  const handleRegisterSubmit = () => {
    const newErrors = {};

    console.log(registerValues);

    // ----------check if inputs are filled or not--------
    if (!registerValues.username) {
      newErrors.username = 'Username is required!';
    }
    if (!registerValues.email) {
      newErrors.email = "Email / username is required!";
    }
    if (!registerValues.password) {
      newErrors.password = "Password is required!";
    }
    if (!registerValues.confirmPassword) {
      newErrors.confirmPassword = "You need to confirm your password!";
    }
    
    //---------------check if email is in correct format----------
    if (!registerValues.email.includes("@")) {
      newErrors.email = "Email is not valid!";
    }

    //----------check if username == email / except the case if both havn't filled yet---------
    if (registerValues.username === registerValues.email && registerValues.username && registerValues.email) {
      newErrors.username = "username and email must not be the same!";
      newErrors.email = "username and email must not be the same!";
    }

    //----------check if confirm password valid or not-------------
    if (registerValues.password != registerValues.confirmPassword) {
      newErrors.confirmPassword = "Password filled is not correct."
    }
    setRegisterErrors(newErrors);

    if (!newErrors.email && !newErrors.username && !newErrors.password && !newErrors.confirmPassword) {
      // loginform();
      console.log("Registered.");
    }
  };

  return (
    <div className="relative flex justify-center items-baseline w-screen h-dvh bg-gradient-to-br from-[#62b79c] to-[#afd1a1] overflow-hidden">
      <img src="logo.png" alt="auramoney" className="h-[10vh] m-2" />
      <LoginPage 
       handleChange={handleChange} 
       handleSubmit={handleSubmit} 
       googleLogin={googleLogin} 
       errors={errors} 
       page={page} 
       setPage={setPage}
       isLoginPasswordVisible={isLoginPasswordVisible}
       setLoginPasswordVisible={setLoginPasswordVisible}/>
      <RegisterPage 
       isRegisterPasswordVisible={isRegisterPasswordVisible} 
       setRegisterPasswordVisible={setRegisterPasswordVisible} 
       googleLogin={googleLogin} 
       page={page} 
       setPage={setPage}
       handleChangeRegister={handleChangeRegister}
       handleRegisterSubmit={handleRegisterSubmit}
       registerErrors={registerErrors}/>
    </div>
  );
}

export default login_register;

const LoginPage = ({handleChange, 
                    handleSubmit, 
                    googleLogin, 
                    errors, 
                    page, 
                    setPage, 
                    isLoginPasswordVisible, 
                    setLoginPasswordVisible}) => {
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
              errors.email ? "bg-red-100 border border-red-500" : "bg-gray-200"}`}
            type="email"
            name="email"
            placeholder={`${
              errors.email ? `${errors.email}` : "Username / Email"
            }`}
            onChange={(e) => handleChange(e)}
          />
          <div className="relative">
            <input
              className={`bg-gray-200 rounded-2xl p-2 pl-3 cursor-pointer w-full ${
              errors.password ? "bg-red-100 border border-red-500" : "bg-gray-200"}`}
              type={`${isLoginPasswordVisible ? 'text' : 'password'}`}
              name="password"
              placeholder={errors.password ? errors.password : "Password"}
              onChange={handleChange}
            />
            <FontAwesomeIcon onClick={() => setLoginPasswordVisible(!isLoginPasswordVisible)} icon={faEye} className="absolute right-0 mr-3 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer hover:scale-120"/>
          </div>
        </div>

        <div className="flex flex-col items-center w-full gap-y-6">
          <div className="w-full">
            <div className="w-full flex justify-between p-3">
              <div className="flex justify-between items-center gap-x-2">
                <input
                  id="isRememberLogin"
                  type="checkbox"
                  className="w-4 h-4 accent-ui-green1"
                ></input>
                <label htmlFor="isRememberLogin">Remember Me</label>
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
            className="w-10 sm:w-15 hover:drop-shadow-sm hover:drop-shadow-black/50 duration-250 cursor-pointer"
            onClick={googleLogin}
          />
        </div>
      </div>
    </div>
  );
};

const RegisterPage = ({setRegisterPasswordVisible,
                       isRegisterPasswordVisible, 
                       googleLogin, 
                       page, 
                       setPage,
                       handleChangeRegister,
                       handleRegisterSubmit,
                       registerErrors}) => {
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
            className={`bg-gray-200 rounded-2xl p-2 pl-3 cursor-pointer w-full ${
              registerErrors.username ? "bg-red-100 border border-red-500" : "bg-gray-200"}`}
            type="text"
            name="username"
            placeholder={`${
              registerErrors.username ? `${registerErrors.username}` : "Username"}`}
            onChange={handleChangeRegister}
          />
          <input
            className={`bg-gray-200 rounded-2xl p-2 pl-3 cursor-pointer w-full ${
              registerErrors.email ? "bg-red-100 border border-red-500" : "bg-gray-200"}`}
            type="text"
            name="email"
            placeholder={`${
              registerErrors.email ? `${registerErrors.email}` : "email"}`}
            onChange={handleChangeRegister}
          />
          <div className="relative">
            <input
              className={`bg-gray-200 rounded-2xl p-2 pl-3 cursor-pointer w-full ${
                registerErrors.password ? "bg-red-100 border border-red-500" : "bg-gray-200"}`}
              type={`${isRegisterPasswordVisible ? 'text' : 'password'}`}
              name="password"
              placeholder={`${
                registerErrors.password ? `${registerErrors.password}` : "Password"}`}
              onChange={handleChangeRegister}
            />
            <FontAwesomeIcon onClick={() => setRegisterPasswordVisible(!isRegisterPasswordVisible)} icon={faEye} className="absolute right-0 mr-3 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer hover:scale-120"/>
          </div>
          <div className="relative">
            <input
              className={`bg-gray-200 rounded-2xl p-2 pl-3 cursor-pointer w-full ${
                registerErrors.confirmPassword ? "bg-red-100 border border-red-500" : "bg-gray-200"}`}
              type={`${isRegisterPasswordVisible ? 'text' : 'password'}`}
              name="confirmPassword"
              placeholder={`${
                registerErrors.confirmPassword ? `${registerErrors.confirmPassword}` : "Confirm Password"}`}
              onChange={handleChangeRegister}
            />
            <FontAwesomeIcon onClick={() => setRegisterPasswordVisible(!isRegisterPasswordVisible)} icon={faEye} className="absolute right-0 mr-3 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer hover:scale-120"/>
          </div>
        </div>

        <div className="flex flex-col items-center w-full gap-y-6">
          <div className="w-full">
            <div className="w-full flex justify-between p-3">
              <div className="flex justify-between items-center gap-x-2">
                <input
                  id="isRememberRegister"
                  type="checkbox"
                  className="w-4 h-4 accent-ui-green1 cursor-pointer"
                ></input>
                <label htmlFor="isRememberRegister" className="cursor-pointer">Remember Me</label>
              </div>
              <p className="text-ui-green1 underline cursor-pointer">
                Forgot Password?
              </p>
            </div>
            <button
              className="w-full bg-ui-green2 rounded-2xl p-2 cursor-pointer text-white hover:border-ui-green2 
              hover:opacity-50 duration-150"
              onClick={handleRegisterSubmit}
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