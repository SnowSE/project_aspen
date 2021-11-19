import { NavBar } from "../Navigation/NavBar";
import AdminSideBar from "../Navigation/AdminSideBar";
import MainSwitch from "../Navigation/MainSwitch";
import { useStoreSelector } from "../../../store";
import Footer from "../Navigation/Footer";

const MainLayoutContainer = () => {
  const isAdmin = useStoreSelector((state) => state.auth.isAdmin);
  return (
    <div className="row">
      <div className="col-12">
        <NavBar />
      </div>
      {isAdmin && (
        <div className="col-2">
          <AdminSideBar />
        </div>
      )}
      <div className={isAdmin ? "col-10" : "col-12"}>
        <MainSwitch />
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayoutContainer;
