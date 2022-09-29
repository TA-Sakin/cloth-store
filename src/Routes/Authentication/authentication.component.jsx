// import { getRedirectResult } from "firebase/auth";
// import React, { useEffect } from "react";
// import {
//   auth,
//   createUserDocumentFromAuth,
//   signInWithGooglePopup,
//   signInWithGoogleRedirect,
// } from "../../utils/firebase/fireabse.utils";

import SignIn from "../sign-in/sign-in-form.component";
import SignUp from "../sign-up/sign-up.component";
import "./authentication.styles.scss";

const Authentication = () => {
  //   useEffect(() => {
  //     (async () => {
  //       const response = await getRedirectResult(auth);
  //       if (response) {
  //         const useDocRef = await createUserDocumentFromAuth(response.user);
  //       }
  //     })();
  //   }, []);

  return (
    <div className="authentication-container">
      {/* <button onClick={signInWithGoogleRedirect}>
        SIGN IN WITH GOOGLE Redirect
      </button> */}
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Authentication;
