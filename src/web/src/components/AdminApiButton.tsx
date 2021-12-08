import axios from "axios";
import { useCallback, useState } from "react";
import { useStoreSelector } from "../store";

const AdminApiButton = () => {
  const [apiResponse, setApiResponse] = useState<any>();
  const [errorResponse, setErrorResponse] = useState<string>();
  const user = useStoreSelector((state) => state.auth.user);

  const getUserCallback = useCallback(() => {
    if (user) {
      const options = {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      };
      axios
        .get("/api/admin", options)
        .then((response) => {
          setApiResponse(response.data);
          setErrorResponse("");
        })
        .catch((e) => {
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
