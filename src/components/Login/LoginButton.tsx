import GoogleButton from "../../assets/Images/googleButton.png";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

function LoginButton() {
  //googleのログイン認証popupを表示
  const signInGoogle = () => {
    signInWithPopup(auth, provider).catch((e) => {
      alert("ユーザー認証が行われませんでした。");
    });
  };
  return (
    <div>
      <button className="loginButton">
        <img
          src={GoogleButton}
          height="80"
          width="300"
          alt="ログインボタン"
          onClick={signInGoogle}
        />
      </button>
    </div>
  );
}

export default LoginButton;
