import React, { useContext, useEffect, useRef } from "react";
import { myContext } from "../Store/Context";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login = () => {
  const navigateTo = useNavigate();
  const { loggedInUser } = useContext(myContext);

  useEffect(() => {
    if (Object.keys(loggedInUser).length > 0) {
      navigateTo("/Profile");
    }
  }, []);
  return (
    <div className="w-full  mx-auto flex justify-center items-center h-[90vh]">
      <div className=" w-full  max-w-[400px]  ">
        <h1 className="text-center">Login In</h1>
        <LoginForm />
        <button className="bg-red-300 w-full text-center">
          Continue with Google
        </button>
        <div>
          <span>Dont Have an account?</span>
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigateTo("/signup")}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
