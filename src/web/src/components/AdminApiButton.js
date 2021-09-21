import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../store/AuthContext";

const AdminApiButton = () => {
  const [apiResponse, setApiResponse] = useState();
  const [errorResponse, setErrorResponse] = useState();
  const authContext = useContext(AuthContext);

  const getUserCallback = useCallback(() => {
    authContext.getUser().then((u) => {
      console.log(u);
      const options = {
        headers: {
          Authorization: `Bearer ${u.access_token}`,
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
    });
  }, [authContext]);

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
