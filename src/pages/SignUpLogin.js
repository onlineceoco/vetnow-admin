import classes from "./Login.module.css";
import Logo from "../public/images/logo.jpg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singinupLogin } from "../redux/actions/auth.action";
import { Redirect, useHistory } from "react-router-dom";
import Alert from "../components/UI/Alert";

function SignUpLogin(props) {
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const authState = useSelector(state => state.auth);
  const alertState = useSelector(state => state.alert);
  //go to next step
  useEffect(() => {
    if (authState.user && authState.user.phone) {
      history.push(`/login-confirm/${authState.user.phone}`);
    }
  }, [authState]);
  //redirect if authenticated
  if (authState.isAuthenticated) {
    return <Redirect to="/" />;
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(singinupLogin(phone));
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
          <h1>ورود/ ثبت نام</h1>
          <p>شماره موبایل خود را وارد کنید </p>
          <form className={classes.inputBtnWrapper} onSubmit={handleSubmit}>
            <input
              type="text"
              name="un"
              onChange={e => {
                setPhone(e.target.value);
              }}
            />
            <button type="submit" className={classes.link}>
              ادامه
            </button>
          </form>
          <h4>
            با ورود و یا ثبت نام در وتنا شما شرایط و قوانین استفاده از سرویس های
            سایت وتنا و قوانین حریم خصوصی آن را می‌پذیرید
          </h4>
        </div>
      </div>
    </div>
  );
}

export default SignUpLogin;
