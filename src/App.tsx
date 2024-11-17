import "./App.css";

import { getRedirectResult, User } from "firebase/auth";

import { auth, signInWithGooglePopup } from "./firebase";
import GoogleButton from "react-google-button";

import React, { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = () => {
    setIsLoading(true);
    signInWithGooglePopup()
      .then((result) => setUser(result.user))
      .catch((_) => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }

      setIsLoading(false);
    });

    if (!user) {
      getRedirectResult(auth)
        .catch(console.warn)
        .finally(() => setIsLoading(false));
    }
  }, [auth, user]);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      {user ? (
        <div>Hello {user.displayName}</div>
      ) : (
        <div className="centered">
          <GoogleButton onClick={handleSignIn} />
        </div>
      )}
    </div>
  );
};

export default App;
