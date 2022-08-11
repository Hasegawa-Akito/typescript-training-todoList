import { auth } from "../../firebase";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "../../assets/css/Login.css";
import LoginButton from "./LoginButton";

function Login() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userName = user.displayName;
        const uid = user.uid;
        setUserInfo({
          userName: userName || "noName",
          uid: uid,
          login: true,
        });
        navigate("/todo");
      }
    });
  }, []);

  return <LoginButton />;
}

export default Login;
