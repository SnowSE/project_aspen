import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/AuthSlice";

export const LogoutLanding = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(clearUser());
  });
  return <div>You have logged out!</div>;
};
