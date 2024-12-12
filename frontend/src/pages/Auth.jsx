import React from 'react'
import backgroundImage from '../assets/SingUpBg.png';
import { FaArrowLeft, FaEyeSlash, FaEye  } from 'react-icons/fa';
import { useState } from "react";
import { Link } from 'react-router-dom';
const Auth = () => {

  const [isChecked, setIsChecked] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isChecked) {
      setError('You must agree to the terms to proceed.');
    } else{
      setError('');
      //API
      alert('Form submitted');
    }
    console.log("Form submitted:", formData);
    
  };

  return (
    <div className='flex h-screen bg-cover bg-center'
    style={{ backgroundImage: `url(${backgroundImage})` }}
    >
    <form className='flex flex-col items-center gap-y-4 bg-primary-1 p-4 rounded-xl my-auto mx-auto w-[37vw] sm:w-[17vw] md:w-[37vw] h-[90vh] sm:h-[60vh] md:h-[90vh]'>
        <div className='mt-8 flex items-center justify-center w-full text-white font-lexend font-bold text-[2.5rem]'>
          Welcome!
        </div>
        <div className='text-center text-gray-500 text-sm ml-2'>Enter your registered email and password to continue. </div>
        
        
        <div class="flex flex-col sm:w-[80%] md:w-[70%] lg:w-[80%]">
          <label for="email" class="text-white text-sm mb-1">Email</label>
          <input type="text" id="email" 
            class="w-full bg-gray-800 text-white border border-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" 
            placeholder="John"
            value={formData.email}
            onChange={handleChange}/>
        </div>

        <div class="flex flex-col sm:w-[80%] md:w-[70%] lg:w-[80%]">
          <label for="password" class="text-white text-sm mb-1">Password</label>
          <div className="relative">
            {/* Password Input */}
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              className="w-full bg-gray-800 text-white border border-white rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {/* Eye Icon */}
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <FaEye className="text-xl" />
              ) : (
                <FaEyeSlash className="text-xl" />
              )}
            </button>
          </div>
        </div>

        <div className='flex flex-row sm:w-[80%] md:w-[70%] lg:w-[80%] justify-between'>
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="account-checkbox" 
            className="peer text-gray-500 border-purple-500 rounded focus:ring-purple-500 focus:ring-2 checked:bg-purple-500 checked:border-purple-500"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="account-checkbox" 
            className='text-gray-500 text-sm ml-2'
            disabled={!isChecked}>
            Remember Me
          </label>
        </div>

        <a className='text-center text-gray-500 text-sm ml-2'>Forgot Password?</a>
        </div>
        <button type='submit' 
          className='sm:w-[80%] md:w-[70%] lg:w-[80%] rounded-full p-2 bg-accent-1 font-bold font-lexend'>
          Sign In
        </button>
        <img src='src\assets\SignInImg.png' className='sm:w-[80%] md:w-[70%] lg:w-[80%] '></img>
        <div className='flex flex-row gap-x-4'>
        <img src='src\assets\SignInGoogle.png' className='sm:w-[2rem] md:w-[4.5rem] lg:w-[4.5rem] '></img>
        <img src='src\assets\SignInFacebook.png' className='sm:w-[2rem] md:w-[4.5rem] lg:w-[4.5rem] '></img>
        </div>
        <Link to="/signup" className="underline text-gray-500 text-center w-full">
            I dont have an account yet
        </Link>
    </form>
    </div>
  )
}

export default Auth