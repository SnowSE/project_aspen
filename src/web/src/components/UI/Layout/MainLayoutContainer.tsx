import { NavBar } from "../Navigation/NavBar";
import AdminSideBar from "../Navigation/AdminSideBar";
import MainSwitch from "../Navigation/MainSwitch";
import { useStoreSelector } from "../../../store";

const MainLayoutContainer = () => {
  const isAdmin = useStoreSelector((state) => state.auth.isAdmin);
  return (
    <>
      <div className="row">
        <NavBar />
      </div>
      <div className="row">
        {isAdmin && (
          <div className="col-lg-2 bg-secondary ">
            <AdminSideBar />
          </div>
        )}
        <div className="col p-0">
          <MainSwitch />
        </div>
      </div>
    </>
  );
};

export default MainLayoutContainer;
