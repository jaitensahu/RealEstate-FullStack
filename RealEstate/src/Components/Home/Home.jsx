// import React, { useContext, useEffect } from "react";
import { useEffect } from "react";
import heroImg from "../../assets/heroImg.jpg";

const Home = () => {

  return (
    <div>
      <div className="w-full h-[93vh] overflow-hidden rounded-bl-[300px]">
        <div className="w-full h-full bg-black opacity-30 absolute top-0 rounded-bl-[300px]"></div>
        <img className="w-full" src={heroImg} alt="" />
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full bg-red-400 max-w-[1200px] ">
          <div className=" right-0  text-white">
            <h1 className="text-[50px] text-right font-semibold">
              Your Gateway to <br /> a Richer Life
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
