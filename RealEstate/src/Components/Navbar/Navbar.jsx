import React, { useContext, useEffect } from "react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { myContext } from "../Store/Context";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { loggedInUser } = useContext(myContext);
  const navigateTo = useNavigate();
  const params = useLocation();
  // console.log(params.pathname);

  useEffect(() => {
    console.log("useeffect");
    if (Object.keys(loggedInUser).length > 0) {
      navigateTo("/Profile");
    } else if (params.pathname == "/SignIn" || params.pathname == "/Profile") {
      navigateTo("/SignIn");
    }
  }, [loggedInUser]);
  // console.log(loggedInUser?.profileImage);
  return (
    <div className="fixed w-full z-50">
      <div className="border-blue-400 bg-white border-b-2 px-2 ">
        <div className="flex items-center justify-between max-w-[1200px] mx-auto ">
          <h1 className="font-bold text-[28px]">REALESTATE</h1>
          <div className="flex items-center py-3 max-[700px]:hidden">
            <p className="border-r-2 border-r-black px-4 ">
              Call: +91 9876543210
            </p>
            <p className="border-r-2 border-r-black px-4 ">info@gmail.com</p>
            <div className="flex gap-[10px] px-4">
              <BsInstagram />
              <FaFacebook />
              <FaTwitter />
              <FaLinkedin />
            </div>
          </div>
          <div>
            <NavLink to={"/SignIn"}>
              {" "}
              {loggedInUser?.profileImage != "" &&
              loggedInUser?.profileImage ? (
                <img
                  className="w-[35px] h-[35px] rounded-full"
                  src={loggedInUser.profileImage}
                />
              ) : (
                <CgProfile />
              )}{" "}
            </NavLink>
          </div>
        </div>
      </div>
      <div className=" bg-black opacity-50">
        <div className="max-w-[1200px] mx-auto py-2 ">
          <div className="max-w-[300px] text-white font-bold flex justify-between ">
            <NavLink to={"./"}>Home</NavLink>
            <NavLink to={"./about"}>About</NavLink>
            <NavLink to={"./properties"}>Properties</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
