import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  // const navigateTo = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="pt-[50px] ">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
