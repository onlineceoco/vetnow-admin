import React, { useEffect, useState } from "react";
import { Card, CardContent, makeStyles, Modal } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import Alert from "../Alert";
import {
  getSingleDoctor,
  updateSingleDoctor,
} from "../../../redux/actions/user.action";
import { loginConfirm } from "../../../redux/actions/auth.action";

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
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [job, setJob] = useState("");
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
    // const data = Object.assign(
    //   {},
    //   !name ? null : { name },
    //   !lastName ? null : { lastName },
    //   !job ? null : { job },
    //   !graduate ? null : { graduate },
    //   !experience ? null : { experience },
    //   !doctorDescreption ? null : { doctorDescreption },
    //   !doctorId ? null : { doctorId },
    // );
    const data = new FormData();
    name && data.append("name", name);
    lastName && data.append("lastName", lastName);
    avatar && data.append("avatar", avatar);
    job && data.append("job", job);
    graduate && data.append("graduate", graduate);
    experience && data.append("experience", experience);
    doctorDescreption && data.append("doctorDescreption", doctorDescreption);
    doctorId && data.append("doctorId", doctorId);
    dispatch(updateSingleDoctor(data, doctorDocId));
    closeModalHandler();
  };

  const body = (
    <>
      <Card className={classes.card}>
        <CardContent>
          <h1>اطلاعات دکتر</h1>

          <form onSubmit={submitHandler}>
            <label htmlFor="name">نام دکتر</label>
            <input
              type="text"
              id="name"
              onChange={e => setName(e.target.value)}
              value={name}
              placeholder={
                singleDoctorState && singleDoctorState.name
                  ? singleDoctorState.name
                  : "نام دکتر"
              }
            />
            <label htmlFor="avatar">عکس پروفایل</label>
            <input
              type="file"
              id="avatar"
              onChange={e => setAvatar(e.target.files[0])}
            />
            <label htmlFor="lastName">نام خانوادگی دکتر</label>
            <input
              type="text"
              id="lastName"
              onChange={e => setLastName(e.target.value)}
              value={lastName}
              placeholder={
                singleDoctorState && singleDoctorState.lastName
                  ? singleDoctorState.lastName
                  : "نام خانوادگی دکتر"
              }
            />
            <label htmlFor="job">تخصص</label>
            <input
              type="text"
              id="job"
              onChange={e => setJob(e.target.value)}
              value={job}
              placeholder={
                singleDoctorState && singleDoctorState.job
                  ? singleDoctorState.job
                  : "تخصص"
              }
            />
            <label htmlFor="graduate">سال فارغ التحصیل</label>
            <input
              type="number"
              id="graduate"
              onChange={e => setGraduate(e.target.value)}
              value={graduate}
              placeholder={
                singleDoctorState && singleDoctorState.graduate
                  ? singleDoctorState.graduate
                  : "َسال فارغ التحصیل"
              }
            />
            <label htmlFor="experience">میزان تجربه</label>
            <input
              type="number"
              id="experience"
              onChange={e => setExperience(e.target.value)}
              value={experience}
              placeholder={
                singleDoctorState && singleDoctorState.experience
                  ? singleDoctorState.experience
                  : "َمیزان تجربه"
              }
            />
            <label htmlFor="doctorId">شماره نظام پزشکی</label>
            <input
              type="number"
              id="doctorId"
              onChange={e => setDoctorId(e.target.value)}
              value={doctorId}
              placeholder={
                singleDoctorState && singleDoctorState.doctorId
                  ? singleDoctorState.doctorId
                  : "َشماره نظام پزشکی"
              }
            />
            <label htmlFor="descreption">درباره دکتر</label>
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
