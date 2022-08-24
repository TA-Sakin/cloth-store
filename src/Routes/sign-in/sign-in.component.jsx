import { getRedirectResult } from "firebase/auth";
import React, { useEffect } from "react";
import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from "../../utils/firebase/fireabse.utils";
import SignUp from "../sign-up/sign-up.component";

const SignIn = () => {
  //   useEffect(() => {
  //     (async () => {
  //       const response = await getRedirectResult(auth);
  //       if (response) {
  //         const useDocRef = await createUserDocumentFromAuth(response.user);
  //       }
  //     })();
  //   }, []);
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const useDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h2>Sign in</h2>
      <button onClick={logGoogleUser}>SIGN IN WITH GOOGLE POPUP</button>
      {/* <button onClick={signInWithGoogleRedirect}>
        SIGN IN WITH GOOGLE Redirect
      </button> */}
      <SignUp />
    </div>
  );
};

export default SignIn;
