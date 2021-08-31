import { useEffect, useState } from "react";
import classes from "./Login.module.css";
import Logo from "../public/images/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { loginConfirm } from "../redux/actions/auth.action";
import { Redirect, useHistory } from "react-router-dom";
import Timer from "../components/UI/Timer";
import Alert from "../components/UI/Alert";

function LoginConfirm(props) {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const alertState = useSelector(state => state.alert);
  const history = useHistory();
  useEffect(() => {
    if (!authState.user) {
      history.push(`/signup-login`);
    }
  }, [authState]);

  //timer for countdown
  const phone = props.location.pathname.split("/")[2];
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);
  //redirect if authenticated

  if (authState.isAuthenticated) {
    return <Redirect to="/" />;
  }

  const submitHandler = e => {
    e.preventDefault();
    dispatch(loginConfirm(password, phone));
  };

  return (
    <div className={classes.loginPage}>
      <div className={classes.loginWrap}>
        <div className={classes.logo}>
          <img src={Logo} alt="VetNow" />
        </div>
        {alertState.kind && (
          <Alert
            error={alertState.kind && alertState.error}
            kind={alertState.kind && alertState.kind}
          />
        )}
        <div className={classes.form}>
          <h1>کد تایید را وارد نمایید</h1>
          <p>
            کد تایید برای شماره موبایل {authState.user && authState.user.phone}{" "}
            ارسال گردید{" "}
          </p>
          <form className={classes.inputBtnWrapper} onSubmit={submitHandler}>
            <input
              type="text"
              name="un"
              onChange={e => setPassword(e.target.value)}
            />
            <Timer expiryTimestamp={time} phone={phone} />
            <button type="submit" className={classes.link}>
              ورود به وتنا
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginConfirm;
