import React, { useContext, useEffect } from "react";
import { myContext } from "../Store/Context";
import LoginForm from "./LoginForm";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { loggedInUser } = useContext(myContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!Object.keys(loggedInUser).length > 0) {
      navigateTo("/Signin");
    }
  }, []);
  // if ()
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <div className="w-[50%] flex flex-col justify-center items-center gap-4">
        <h1>Profile</h1>
        <img
          src={loggedInUser.profileImage}
          alt=""
          className="w-[100px] h-[100px] rounded-full"
        />
        <SignUp isUpdate={true} />
      </div>
    </div>
  );
};

export default Profile;
