import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
import { GoDiamond } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { IoMdBed } from "react-icons/io";
import { LuBath } from "react-icons/lu";
import { IconContext } from "react-icons";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
const Properties = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function getAllProperties() {
      try {
        const response = await axios.get("http://localhost:10000/property");

        setCards(response.data.data);
      } catch (error) {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      }
    }
    getAllProperties();
  }, []);
  const navigateTo = useNavigate();

  const likedArray = [];
  console.log(cards);
  return (
    <div className=" h-[90vh] mt-[50px] flex flex-wrap gap-4 justify-center ">
      {cards.map((ele, idx) => {
        return (
          <div
            className="card w-[30%]"
            key={idx + "asde"}
            onClick={() => navigateTo(`/properties/${ele._id}`)}
          >
            <div className="imageContainer overflow-hidden">
              <LazyLoadImage
                effect="blur"
                src={ele.image}
                alt=""
                className="hover:scale-[110%] transition"
              />
            </div>
            <IconContext.Provider value={{ size: "1.5em" }}>
              <div className="detail gap-2 flex flex-col  ">
                <div className="price flex justify-between">
                  <h1>Rs {ele.price}/Day</h1>
                  <div onClick={() => addToLike(ele.id)}>
                    {likedArray.includes(ele.id) ? (
                      <FaHeart style={{ color: "red" }} />
                    ) : (
                      <CiHeart />
                    )}
                  </div>
                </div>
                <h2>{ele.title}</h2>
                <p>{ele.address}</p>
                <hr />
                <div className="bottom_data flex justify-between">
                  <div className="bed flex items-center flex-col">
                    <IoMdBed />
                    <span> {ele.details.beds} Beds</span>
                  </div>
                  <div className="bath flex items-center flex-col">
                    <LuBath />
                    <span> {ele.details.bath} Bath</span>
                  </div>
                  <div className="area flex items-center flex-col">
                    <GoDiamond />
                    <span>Type: {ele.details.propertyType}</span>
                  </div>
                </div>
              </div>
            </IconContext.Provider>
          </div>
        );
      })}
    </div>
  );
};

export default Properties;
