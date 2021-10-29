import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthService } from "../../services/authService";
import { setUser } from "../../store/AuthSlice";

export const LoginSilent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    AuthService.signinSilentCallback().then((user) => {
      const serializedUser = JSON.parse(JSON.stringify(user));
      dispatch(setUser(serializedUser));
    });
  });
  return <div>Initializing silent redirect...</div>;
};
