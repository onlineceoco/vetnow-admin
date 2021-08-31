import React from "react";
import classes from "./Alert.module.css";
function Alert({ error, kind }) {
  const errors = error.split(".");
  console.log(errors);
  return (
    <>
      {errors.map(error => {
        return (
          <div
            className={
              kind === "danger"
                ? [classes.danger, classes.alert].join(" ")
                : [classes.alert, classes.success].join(" ")
            }
          >
            <p>{error}</p>
          </div>
        );
      })}
    </>
  );
}

export default Alert;
