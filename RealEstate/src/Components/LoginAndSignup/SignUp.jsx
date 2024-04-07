import React, { useContext } from "react";
import { myContext } from "../Store/Context";
import { useNavigate } from "react-router-dom";

const SignUp = ({ isUpdate }) => {
  const {
    handleUpdateFuc,
    signUpEmail,
    SetSignUpUserName,
    signUpUserName,
    setSignUpPass,
    handleSignOut,
    setSignUpEmail,
    loggedInUser,
    setLoggedInUser,
    handleSignUp,
    SetSignUpFirstName,
    SetSignUpLastName,
    signUpFirstName,
    signUpLastName,
  } = useContext(myContext);
  const navigateTo = useNavigate();
  return (
    <div
      className={`${
        isUpdate ? "h-[auto]" : "h-[80vh]"
      } w-full flex justify-center items-center flex-col`}
    >
      <div className="w-[70%]">
        <h1 className="text-center">
          {isUpdate ? loggedInUser.firstName : "SignUp"}
        </h1>
        <form className=" flex flex-col gap-2">
          <input
            value={signUpFirstName}
            onChange={(e) => SetSignUpFirstName(e.target.value)}
            type="text"
            placeholder="First Name"
            className="border-2 border-black px-1"
          />
          <input
            value={signUpLastName}
            onChange={(e) => SetSignUpLastName(e.target.value)}
            type="text"
            placeholder="Last Name"
            className="border-2 border-black px-1"
          />
          <input
            value={signUpUserName}
            onChange={(e) => SetSignUpUserName(e.target.value)}
            type="text"
            placeholder="Username"
            className="border-2 border-black px-1"
          />
          <input
            value={signUpEmail}
            onChange={(e) => setSignUpEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="border-2 border-black px-1"
          />
          <input
            onChange={(e) => setSignUpPass(e.target.value)}
            type="text"
            placeholder="Password"
            className="border-2 border-black px-1"
          />
          {!isUpdate ? (
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSignUp();
              }}
            >
              SIGNUP
            </button>
          ) : (
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleUpdateFuc();
              }}
            >
              UPDATE
            </button>
          )}
        </form>
        <button className="text-center w-full">Continue With Google</button>
        <div>
          {!isUpdate ? (
            <>
              <span>Have an account?</span>
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigateTo("/SignIn")}
              >
                Sign in
              </span>
            </>
          ) : null}
        </div>
      </div>

      {isUpdate ? (
        <div className="w-[70%] flex justify-between">
          <span onClick={() => handleAccDelete}>Delete Account</span>
          <span
            onClick={() => {
              sessionStorage.clear();
              handleSignOut();
              setLoggedInUser({});
              navigateTo("/SignIn");
            }}
          >
            Sign Out
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default SignUp;
