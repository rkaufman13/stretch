import "./App.css";

import { getRedirectResult, User } from "firebase/auth";

import { auth, signInWithGooglePopup } from "./firebase";

import { useContext, useEffect, useState } from "react";
import { SignInButton } from "./sign-in/SignInButton";
import { Spinner, Text } from "@chakra-ui/react";
import { UserContext } from "./user/UserProvider";
import { useNavigate } from "react-router-dom";

const App = () => {
  const  {user, setUser}= useContext(UserContext)
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
    return (
      <div className="centered">
        <Spinner size="lg" color="var(--logo-color)" />
      </div>
    );
  }

  return (
    <>
      <div className="centered">
        {user ? (
          <Text>Hello {user.displayName}</Text>
        ) : (
          <SignInButton onClick={handleSignIn} />
        )}
      </div>
    </>
  );
};

export default App;
