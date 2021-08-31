import { Button, Grid, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";

const styles = makeStyles({
  headTitle: {
    padding: 0,
    display: "flex",
    justifyContent: "space-around",
  },
});

function HeadTitle({ title, modalOpenHandler, withBtn }) {
  const classes = styles();
  return (
    <Grid container className={classes.headTitle}>
      {withBtn ? (
        <>
          <Grid item md={9} s={3} xs={5}>
            <h2>{title}</h2>
          </Grid>
          <Grid item md={3} s={10} xs={7}>
            <Button
              size="medium"
              endIcon={<Add />}
              variant="outlined"
              color="primary"
              onClick={modalOpenHandler}
            >
              ایجاد محصول
            </Button>
          </Grid>
        </>
      ) : (
        <Grid item xs={12}>
          <h2>{title}</h2>
        </Grid>
      )}
    </Grid>
  );
}

export default HeadTitle;
