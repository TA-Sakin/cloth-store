// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjNY1MrdWsrvKNmn7fN6e7tznuBfo7oxg",
  authDomain: "cloth-store-3cd81.firebaseapp.com",
  projectId: "cloth-store-3cd81",
  storageBucket: "cloth-store-3cd81.appspot.com",
  messagingSenderId: "1059562466964",
  appId: "1:1059562466964:web:397f255b65a0950782ce81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// export const signInWithGoogleRedirect = () =>
//   signInWithRedirect(auth, googleProvider);

export const db = getFirestore(app);

export const getCategoryAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapShot = await getDocs(q);
  console.log(querySnapShot);
  const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
    console.log("snapshot", docSnapShot.data());
    const { title, items } = docSnapShot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef); //allows us to see whether data exists and allows us to access the data
  //   console.log(await userAuth);
  //   console.log(userSnapShot.exists()); //check if data exists in db
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// export const createProductDocumentFromJson = async (product) => {
//   if (!product) return;
//   const proudctDocRef = doc(db, "proudcts", product.id);
//   const proudctSnapShot = await getDoc(proudctDocRef); //allows us to see whether data exists and allows us to access the data
//   //   console.log(await userAuth);
//   //   console.log(userSnapShot.exists()); //check if data exists in db
//   if (!proudctSnapShot.exists()) {
//     const { name, imageUrl, price } = product;
//     const createdAt = new Date();
//     try {
//       await setDoc(proudctDocRef, {
//         name,
//         imageUrl,
//         price,
//         createdAt,
//       });
//     } catch (error) {
//       console.log("Error creating the user", error.message);
//     }
//   }
//   return proudctDocRef;
// };
