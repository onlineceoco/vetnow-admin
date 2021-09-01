import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import PrivetRoutes from "./components/HOC/PrivetRoutes";
import Comments from "./pages/Comments";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import LoginConfirm from "./pages/LoginConfirm";
import Products from "./pages/Products";
import SignUpLogin from "./pages/SignUpLogin";
import { isUserLoggedIn } from "./redux/actions/auth.action";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, []);
  return (
    <>
      <PrivetRoutes path="/" component={Dashboard} exact />
      <PrivetRoutes path="/products" component={Products} />
      <PrivetRoutes path="/comments" component={Comments} />
      <PrivetRoutes path="/users" component={Users} />
      <Route path="/login-confirm" component={LoginConfirm} />
      <Route path="/signup-login" component={SignUpLogin} />
    </>
  );
}

export default App;
