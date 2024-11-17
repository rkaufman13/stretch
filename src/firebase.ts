import { initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBVCyNLMhmnbp7CCbM3ghq_wuiEp0ZFU-c", // lmao
  authDomain: "stretch-5cf3f.firebaseapp.com",
  databaseURL: "https://stretch-5cf3f-default-rtdb.firebaseio.com",
  projectId: "stretch-5cf3f",
  storageBucket: "stretch-5cf3f.appspot.com",
  messagingSenderId: "789510594446",
  appId: "1:789510594446:web:b0619ec7c88743ba36cedf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();

// for localdev only
if (import.meta.env.MODE === "development") {
  connectAuthEmulator(getAuth(), "http://127.0.0.1:9099");
} else {
  provider.setCustomParameters({
    prompt: "select_account",
  });
}
export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export default app;
