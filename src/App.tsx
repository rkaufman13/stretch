import "./App.css";

import { getRedirectResult, User } from "firebase/auth";

import { auth, signInWithGooglePopup } from "./firebase";

import React, { FormEvent, useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithGooglePopup()
      .then((result) => setUser(result.user))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (!user) {
      getRedirectResult(auth)
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
    }
  }, [user]);

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
