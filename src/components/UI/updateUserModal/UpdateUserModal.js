import React, { useEffect, useState } from "react";
import { Card, CardContent, makeStyles, Modal } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../redux/actions/product.action";
import Alert from "../Alert";
import { Close } from "@material-ui/icons";
import {
  getSingleDoctor,
  updateSingleDoctor,
} from "../../../redux/actions/user.action";

const styles = makeStyles(theme => {
  return {
    modal: {
      overflowY: "scroll",
    },
    row: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
    formControl: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
    imageBoxContainer: {
      [theme.breakpoints.down("md")]: {
        justifyContent: "center",
        alignItems: "center",
      },
    },
    box: {
      height: 200,
      width: 200,
      marginLeft: "1.5rem",
      border: "1px dotted #ccc",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "1rem",
      },
    },
    image: {
      width: "100%",
      objectFit: "contain",
    },
    confirmBtnWrapper: {
      dispaly: "flex",
      justifyContent: "center",
    },
    confirmBtn: {
      width: "inherit",
    },
  };
});

function UpdateUserModal({ openModalHandler, closeModalHandler, doctorDocId }) {
  const [graduate, setGraduate] = useState("");
  const [experience, setExperience] = useState("");
  const [doctorDescreption, setDoctorDescreption] = useState("");
  const [doctorId, setDoctorId] = useState("");

  const classes = styles();
  const dispatch = useDispatch();
  const singleDoctorState = useSelector(state => state.user.singleDoctor);

  useEffect(() => {
    if (openModalHandler) {
      dispatch(getSingleDoctor(doctorDocId));
    }
  }, [openModalHandler]);

  const submitHandler = e => {
    e.preventDefault();
    const data = Object.assign(
      {},
      !graduate ? null : { graduate },
      !experience ? null : { experience },
      !doctorDescreption ? null : { doctorDescreption },
      !doctorId ? null : { doctorId },
    );
    dispatch(updateSingleDoctor(data, doctorDocId));
    closeModalHandler();
  };

  const body = (
    <>
      <Card className={classes.card}>
        <CardContent>
          <h1>اطلاعات دکتر</h1>
          <form onSubmit={submitHandler}>
            <input
              type="number"
              onChange={e => setGraduate(e.target.value)}
              value={graduate}
              placeholder={
                singleDoctorState && singleDoctorState.graduate
                  ? singleDoctorState.graduate
                  : "َسال فارغ التحصیل"
              }
            />
            <input
              type="number"
              onChange={e => setExperience(e.target.value)}
              value={experience}
              placeholder={
                singleDoctorState && singleDoctorState.experience
                  ? singleDoctorState.experience
                  : "َمیزان تجربه"
              }
            />
            <input
              type="number"
              onChange={e => setDoctorId(e.target.value)}
              value={doctorId}
              placeholder={
                singleDoctorState && singleDoctorState.doctorId
                  ? singleDoctorState.doctorId
                  : "َشماره نظام پزشکی"
              }
            />
            <label htmlFor="descreption"></label>
            <textarea
              type="text"
              onChange={e => setDoctorDescreption(e.target.value)}
              value={doctorDescreption}
              placeholder={
                singleDoctorState && singleDoctorState.doctorDescreption
                  ? singleDoctorState.doctorDescreption
                  : "َدرباره دکتر"
              }
              id="descreption"
            ></textarea>
            <button type="submit">ارسال</button>
          </form>
        </CardContent>
      </Card>
    </>
  );

  return (
    <>
      <Modal
        disableEnforceFocus
        open={openModalHandler}
        onClose={closeModalHandler}
        className={classes.modal}
      >
        {body}
      </Modal>
    </>
  );
}

export default UpdateUserModal;
