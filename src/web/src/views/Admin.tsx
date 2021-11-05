import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminNavBar from "../components/UI/AdminNavBar";
import { useStoreSelector } from "../store";
import Demo from "./Demo";

export default function Admin() {
  const user = useStoreSelector((state) => state.auth.user);
  const isAdmin = useStoreSelector((state) => state.auth.isAdmin);
  return (
    <div>
      <Route exact path= "/admin/">
        <h1> Admin page</h1>
        <p>{JSON.stringify(user)}</p>
        <h2>Is Admin: {isAdmin.toString()}</h2>
      </Route>
      <Route exact path="/admin/demo">
        <Demo />
      </Route>
    </div>
  );
}
