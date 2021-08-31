import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivetRoutes({ component: Component, ...otherProps }) {
  return (
    <Route
      {...otherProps}
      render={props => {
        const token = localStorage.getItem("token");
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/signup-login"} />;
        }
      }}
    />
  );
}

export default PrivetRoutes;
