import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import AboutUs from "./Components/AboutUs/AboutUs";
import Login from "./Components/LoginAndSignup/Login";
import Properties from "./Components/Properties/Properties";
import Context, { myContext } from "./Components/Store/Context";
import PropertyDetail from "./Components/PropertyDetailPage/PropertyDetail";
import Profile from "./Components/LoginAndSignup/Profile";
import SignUp from "./Components/LoginAndSignup/SignUp";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <AboutUs />,
        },
        {
          path: "/properties",
          element: <Properties />,
        },
        {
          path: "/properties/:id",
          element: <PropertyDetail />,
        },
        {
          path: "/SignIn",
          element: <Login />,
        },
        {
          path: "/Signup",
          element: <SignUp isUpdate={false} />,
        },
        {
          path: "/Profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return (
    <Context value={myContext}>
      <RouterProvider router={router}></RouterProvider>
    </Context>
  );
}

export default App;
