import { NavBar } from "../Navigation/NavBar";
import AdminSideBar from "../Navigation/AdminSideBar";
import MainSwitch from "../../../Routing/MainSwitch";
import { useStoreSelector } from "../../../store";
import Footer from "../Navigation/Footer";
import AlertDisplay from "../AlertDisplay";

const MainLayoutContainer = () => {
  const isAdmin = useStoreSelector((state) => state.auth.isAdmin);
  return (
    <>
      <AlertDisplay />
      <div className="row m-0 p-0" id="top-nav">
        <NavBar />
      </div>
      <div className="row m-0 p-0">
        {isAdmin && <AdminSideBar />}
        <div className="col mt-2" id="body">
          <MainSwitch />
        </div>
      </div>
      <div className="row m-0 p-0" id="footer">
        <Footer />
      </div>
    </>
  );
};

export default MainLayoutContainer;
