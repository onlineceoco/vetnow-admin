import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTimer } from "react-timer-hook";
import { resetPaswword } from "../../redux/actions/auth.action";
import classes from "./Timer.module.css";

function Timer({ expiryTimestamp, phone }) {
  const [expired, setExpired] = useState(false);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);

  const dispatch = useDispatch();
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => setExpired(true),
  });

  const submitRestPassword = () => {
    dispatch(resetPaswword(phone));
    restart(time, true);
    setExpired(false);
  };

  return (
    <div className={classes.timer}>
      {!expired ? (
        <div className={classes.timerText}>
          <span style={{ marginLeft: "10px" }}>دریافت مجدد کد</span>
          <span>{minutes}</span>:<span>{seconds}</span>
        </div>
      ) : (
        <button
          type="reset"
          onClick={submitRestPassword}
          className={classes.timerBtn}
        >
          دریافت کد
        </button>
      )}
    </div>
  );
}

export default Timer;
