import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../redux/actions/product.action";

function YesOrNoDialog({ open, id, DialogHandleClose, dispatch }) {
  return (
    <Dialog
      onClose={DialogHandleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">آیا شما مطمئن هستید؟</DialogTitle>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={dispatch}>
          تایید
        </Button>
        <Button variant="contained" color="primary" onClick={DialogHandleClose}>
          لغو
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default YesOrNoDialog;
