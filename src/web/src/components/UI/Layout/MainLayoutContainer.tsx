import { NavBar } from "../Navigation/NavBar";
import AdminSideBar from "../Navigation/AdminSideBar";
import MainSwitch from "../Navigation/MainSwitch";
import { useStoreSelector } from "../../../store";
import Footer from "../Navigation/Footer";

const MainLayoutContainer = () => {
  const isAdmin = useStoreSelector((state) => state.auth.isAdmin);
  return (
    <>
      <div className="row m-0 p-0">
        <NavBar />
      </div>
      <div className="row m-0 p-0">
        {isAdmin && (
          <div className="col-2 ps-0">
            <AdminSideBar />
          </div>
        )}
        <div className="col">
          <MainSwitch />
        </div>
      </div>
      <div className="row m-0 p-0">
        <Footer />
      </div>
    </>
  );
};

export default MainLayoutContainer;
