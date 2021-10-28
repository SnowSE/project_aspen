import { AdminApiButton } from "../components/AdminApiButton";
import { ApiButton } from "../components/ApiButton";

const Home = () => {
  return (
    <div>
      {/* {JSON.stringify(user.profile)} */}
      <br />
      <ApiButton />
      <hr />
      <AdminApiButton />
    </div>
  );
};
export { Home };
