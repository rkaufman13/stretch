import "./App.css";

import { getRedirectResult } from "firebase/auth";

import { auth, signInWithGooglePopup } from "./firebase";

import { Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SignInButton } from "./sign-in/SignInButton";
import { useCurrentUser } from "./user/UserProvider";

const App = () => {
  const { user, setUser } = useCurrentUser();
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
