import axios from "axios";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

const AdminApiButton = () => {
  const [apiResponse, setApiResponse] = useState();
  const [errorResponse, setErrorResponse] = useState();
  const user = useSelector((state) => state.auth.user);

  const getUserCallback = useCallback(() => {
    if (user) {
      const options = {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      };
      console.log(options);
      axios
        .get("/api/admin", options)
        .then((response) => {
          console.log("got response from api", response);
          setApiResponse(response.data);
          setErrorResponse("");
        })
        .catch((e) => {
          // console.log('error from api', e)
          setErrorResponse(e);
          setApiResponse("");
        });
    }
  }, [user]);

  return (
    <div>
      <button className="btn btn-primary" onClick={getUserCallback}>
        Send Request as Admin
      </button>
      {apiResponse && <div>Api Response: {JSON.stringify(apiResponse)}</div>}
      {errorResponse && (
        <div className="text-danger">
          Request Error: {JSON.stringify(errorResponse)}
        </div>
      )}
    </div>
  );
};

export { AdminApiButton };
