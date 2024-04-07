import { createContext, useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const myContext = createContext();

const Context = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState(loggedInUser.email);
  const [signUpPass, setSignUpPass] = useState("");
  const [signUpUserName, SetSignUpUserName] = useState(loggedInUser.userName);
  const [signUpFirstName, SetSignUpFirstName] = useState("");
  const [signUpLastName, SetSignUpLastName] = useState("");
  const baseUrl = "https://realestate-fullstack-cs9u.onrender.com"
  useEffect(() => {
    setSignUpEmail(loggedInUser.email);
    SetSignUpUserName(loggedInUser.userName);
  }, [loggedInUser]);

  console.log("Sign up", signUpEmail, signUpUserName);

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      console.log("in if", userData);
      setLoggedInUser(JSON.parse(userData));
    } else {
      getCookieData();
    }
    // setEmailAndUserName();
  }, []);
  const handleUpdateFuc = async () => {
    const option = {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        email: signUpEmail,
        userName: signUpUserName,
      }),
      headers: {
        "Content-Type": "application/json", // Specify that the content is JSON
      },
    };
    const res = await fetch(`${baseUrl}/users/update`, option);
    const data = await res.json();
    console.log(data);
    setLoggedInUser(data.data);
    getCookieData();
  };

  const handleLoginFunc = async () => {
    console.log("Called", email, password);
    const option = {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json", // Specify that the content is JSON
      },
      credentials: "include",
    };
    try {
      const res = await fetch(`${baseUrl}/users/login`, option);
      const data = await res.json();
      if (data.newuser) {
        setLoggedInUser(data.newuser);
      } else {
        console.error("User Does Not Exist");
      }
      // navigateTo("/Profile");
    } catch (error) {
      console.log(error);
    }
  };

  const getCookieData = async () => {
    console.log("called");
    const option = {
      method: "GET",
      credentials: "include",
    };
    try {
      const res = await fetch(`${baseUrl}/users`, option);
      const data = await res.json();
      console.log(data);
      if (data.status) {
        sessionStorage.setItem("user", JSON.stringify(data.user));
        setLoggedInUser(data.user);
        // navigateTo("/Profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    const option = {
      method: "GET",
      credentials: "include",
    };
    try {
      const res = await fetch(`${baseUrl}/users/signout`, option);
      const data = await res.json();
      console.log(data);
      // navigateTo("/signIn");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignUp = async () => {
    console.log(
      "SignUp Called",
      signUpEmail,
      signUpPass,
      signUpUserName,
      signUpFirstName,
      signUpLastName
    );
    const option = {
      method: "POST",
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        userName: signUpUserName,
        email: signUpEmail,
        password: signUpPass,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await fetch(`${baseUrl}/users/register`, option);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(loggedInUser);

  return (
    <myContext.Provider
      value={{
        signUpEmail,
        setSignUpEmail,
        loggedInUser,
        handleSignOut,
        setPassword,
        handleUpdateFuc,
        setEmail,
        handleLoginFunc,
        getCookieData,
        signUpUserName,
        setSignUpPass,
        SetSignUpUserName,
        setLoggedInUser,
        handleSignUp,
        SetSignUpFirstName,
        SetSignUpLastName,
        signUpFirstName,
        signUpLastName,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default Context;
