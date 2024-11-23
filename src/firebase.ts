import { initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  connectDatabaseEmulator,
  get,
  getDatabase,
  ref,
} from "firebase/database";

const firebaseConfig = {
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
export const auth = getAuth();
const database = getDatabase();

export const getUserHistory = (userId: string) => {
  const historyRef = ref(database, `users/${userId}`);
  return get(historyRef)
    .then((snapshot) => {
      return snapshot.val();
    })
    .catch(console.error);
};

export const getUserProfile = (userId: string) => {
  const userProfileRef = ref(database, `users/${userId}`);
  return get(userProfileRef)
    .then((snapshot) => {
      return snapshot.val();
    })
    .catch(console.error);
};

// for localdev only
if (import.meta.env.MODE === "development") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000); //this method uses a totally different method signature lawl (sick)
} else {
  provider.setCustomParameters({
    prompt: "select_account",
  });
}

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export default app;
