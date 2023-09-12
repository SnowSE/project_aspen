import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useStoreSelector } from "../../store";
import { clearUser } from "../../store/authSlice";

export const LogoutLanding = () => {
  const dispatch = useDispatch();
  const user = useStoreSelector((state) => state.auth.user);
  const isLoggedin = useStoreSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useStoreSelector((state) => state.auth.isAdmin);
  const history = useHistory();

  useEffect(() => {
    dispatch(clearUser());
  });
  if (
    typeof user === "undefined" &&
    isLoggedin === false &&
    isAdmin === false
  ) {
    history.replace("/");
  }
  return <div>You have logged out!</div>;
};
