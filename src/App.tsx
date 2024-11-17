import "./App.css";

import { User } from "firebase/auth";

import { auth, signInWithGooglePopup } from "./firebase";

import React, { FormEvent, useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn =  (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    event.preventDefault();
    signInWithGooglePopup()
      .then((result) => setUser(result.user))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      }
      setIsLoading(false)
    });
  }, [auth]);

  if (isLoading) {
    return <div className="App">
      Loading...
    </div>
  }

  return (
    <div className="App">
      {user ? (
        <div>Hello {user.displayName}</div>
      ) : (
        <div>
          Please log in:{" "}
          <form method="post" onSubmit={handleSignIn}>
            <input name="email"></input>
            <input name="password"></input>
            <button type="submit">Sign In With Google</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
