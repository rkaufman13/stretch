import "./App.css";

import { getRedirectResult, User } from "firebase/auth";

import { auth, signInWithGooglePopup } from "./firebase";
import GoogleButton from "react-google-button";

import React, { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signInWithGooglePopup()
      .then((result) => {
        setUser(result.user);
      })
      .catch((_) => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      }

      setIsLoading(false);
    });

    getRedirectResult(auth)
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, [auth]);

  return (
    <div className="App">
      {user ? (
        <div>Hello {user.displayName}</div>
      ) : (
        <div className="centered">
          <GoogleButton onClick={handleSignIn} disabled={isLoading} />
        </div>
      )}
    </div>
  );
};

export default App;
