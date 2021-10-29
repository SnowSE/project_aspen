import { AdminApiButton } from "../components/AdminApiButton";
import { ApiButton } from "../components/ApiButton";
import NewPageDataForm from "../components/PageData/NewPageDataForm";

const Home = () => {
  return (
    <div>
      {/* {JSON.stringify(user.profile)} */}
      <br />
      <ApiButton />
      <hr />
      <AdminApiButton />
      <NewPageDataForm />
    </div>
  );
};
export { Home };
