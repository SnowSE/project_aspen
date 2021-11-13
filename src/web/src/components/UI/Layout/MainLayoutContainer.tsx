import { NavBar } from "../Navigation/NavBar";
import AdminSideBar from "../Navigation/AdminSideBar";
import MainSwitch from "../Navigation/MainSwitch";
import { useStoreSelector } from "../../../store";

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
    </div>
  );
};

export default MainLayoutContainer;
