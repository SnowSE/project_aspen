import axios from "axios";
import { useCallback, useState } from "react";
import { useStoreSelector } from "../store"

const ApiButton = () => {
  const [apiResponse, setApiResponse] = useState();
  const user = useStoreSelector((state) => state.auth.user);

  const getUserCallback = useCallback(() => {
    if (user) {
      const options = {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      };
      console.log(options, user);
      axios
        .get("/api/user", options)
        .then((response) => {
          console.log("got response from api", response);
          setApiResponse(response.data);
        })
        .catch((e) => {
          console.log("error from api", e);
        });
    }
  }, [user]);

  return (
    <div>
      <button className="btn btn-primary" onClick={getUserCallback}>
        Send API Request
      </button>
      {apiResponse && <div>Api Response: {JSON.stringify(apiResponse)}</div>}
    </div>
  );
};

export { ApiButton };
