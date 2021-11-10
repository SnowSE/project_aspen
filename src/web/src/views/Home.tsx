import MainContainer from "../components/Home/MainContainer";
import AdminSideBar from "../components/UI/AdminSideBar";
import { useStoreSelector } from "../store";
const Home = () => {
  const isAdmin = useStoreSelector((state) => state.auth.isAdmin);
  return (
    <div className="container-fluid">
      <div className="row">
        {isAdmin ? (
          <div className="col-md-1 border-end border-bottom">
            <AdminSideBar />
          </div>
        ) : (
          <></>
        )}
        <div className="col">
          <MainContainer />
        </div>
      </div>
    </div>
  );
};
export { Home };
