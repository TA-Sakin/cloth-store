import React from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/fireabse.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h2>Sign in</h2>
      <button onClick={logGoogleUser}>SIGN IN WITH GOOGLE POPUP</button>
    </div>
  );
};

export default SignIn;
