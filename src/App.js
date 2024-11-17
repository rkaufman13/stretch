import "./App.css";

import { getAuth, getRedirectResult, signInWithPopup } from "firebase/auth";

import { auth, provider } from "./firebase";

import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))?.user ?? null
  );

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        setUser(result.user);
        window.localStorage.setItem("user", JSON.stringify(result));
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (!user) {
      getRedirectResult(getAuth())
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
    }
  }, [user]);

  return (
    <div className="App">
      {user ? (
        <div>Hello {user.name}</div>
      ) : (
        <div>
          Please log in:{" "}
          <button onClick={handleSignIn}>Sign In With Google</button>
        </div>
      )}
    </div>
  );
}

export default App;
