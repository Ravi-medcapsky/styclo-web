import Banner from "../assets/Gemini_Generated_Image_xld1z8xld1z8xld1.png";
import googleLogo from "../assets/google.svg";
import { useState } from "react";

function Login() {
  const [islogin, setIslogin] = useState(true);
  return (
    <div
      className="flex items-center h-screen w-full justify-center 
        
        bg-gradient-to-br from-[#2c0e5c] via-[#391667] to-[#d07641]
        "
    >
      {/* form side */}
      <div className=" flex flex-col items-center w-full  h-[80%] justify-center  lg:max-w-[40%] max-w-[90%] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <div
          className="bg-white backdrop-blur-3xl text-black flex flex-col overflow-x-auto items-center lg:pt-0  px-5  h-full w-full  justify-center   rounded-xl shadow-lg 
                                 lg:rounded-tr-none lg:rounded-br-none "
        >
          {/* Toogle Button */}
          <div className="relative flex  h-[60px] mt-2 border border-gray-300 rounded-full overflow-hidden w-full lg:w-[70%]">
            <button
              type="button"
              onClick={() => setIslogin(false)}
              className={`w-1/2 text-lg font-medium transition-all z-10 ${
                !islogin ? "text-white" : "text-black"
              }`}
            >
              Sign Up{" "}
            </button>
            <button
              type="button"
              onClick={() => setIslogin(true)}
              className={`w-1/2 text-lg font-medium transition-all z-10 ${
                islogin ? "text-white" : "text-black"
              }`}
            >
              Login
            </button>
            <div
              className={`absolute top-0 h-full w-1/2 rounded-full ${
                !islogin
                  ? "bg-gradient-to-br from-[#2c0e5c] to-[#391667] "
                  : "bg-gradient-to-r from-[#2c0e5c] via-[#391667] to-[#d07641]"
              } transition-all duration-500 ${
                !islogin ? "left-0" : "left-1/2"
              }`}
            ></div>
          </div>

          {/* heading */}
          <div className="mb-2">
            <h1 className="text-4xl my-2 font-semibold  text-center">
              {islogin ? "Welcome Back" : "Please Sign Up"}
            </h1>
            {/* <p className="font-medium text-lg text-gray-500 text-center">Please enter your details.</p> */}
          </div>

          {/* form */}

          <form className="w-full h-full max-w-sm">
            <div className="mb-4 ">
              {!islogin && (
                <div>
                  <label
                    className="block text-lg font-medium mb-2 "
                    htmlFor="Name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="Name"
                    className="w-full px-3 py-2 mb-4 border border-gray-300  rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your Name"
                  />
                </div>
              )}

              <label
                className="block text-lg font-medium mb-2 "
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300  rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-lg font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            {islogin && (
              <div className="flex items-center justify-between">
                <div>
                  <input type="checkbox" className="my-4" id="remember" />
                  <label
                    className="ml-2 font-medium text-base "
                    htmlFor="remember"
                  >
                    Remember me
                  </label>
                </div>
                <button className="ml-2 active:underline active:text-blue-700 text-base text-blue-500 ">
                  Forgot Password?
                </button>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-[#2c0e5c] to-[#391667] text-white py-2 rounded hover:bg-blue-700 active:scale-[0.98] active:duration-75 transition-all duration-200"
            >
              {islogin ? "Login" : " Register Now"}
            </button>

            <span>
              {islogin
                ? "Didn't have an account? "
                : "Already have an account? "}
            </span>
            <a
              href="#"
              onClick={(e) => setIslogin(!islogin)}
              className="text-blue-500 my-10"
            >
              {islogin ? " Register Now" : "Login"}
            </a>
            <div className="flex items-center justify-center mb-2">
              <span className="text-gray-400 text-sm">or</span>
            </div>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-100 hover:text-black active:scale-[0.98] active:duration-75 transition-all duration-200"
            >
              <img src={googleLogo} alt="Google Logo" className="w-6 h-6" />
              <span className="font-medium text-base ">
                {!islogin ? "Sign Up with Google" : "Login in with Google"}
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* image side */}
      <div
        className="hidden lg:flex min-h-[80.5%] h-[80.5%] flex-col items-center justify-end  w-[38%]   rounded-2xl lg:rounded-tl-none lg:rounded-bl-none bg-center  shadow-[0_0_60px_rgba(255,255,255,0.06)]"
        style={{
          backgroundImage: `url(${Banner})`,
          maxWidth: "950px",
          maxHeight: "650px",
          backgroundSize: "cover",
          backgroundRepeat: "repeat-x",
        }}
      ></div>
    </div>
  );
}
export default Login;
