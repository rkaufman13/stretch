import "./App.css";

import { getRedirectResult } from "firebase/auth";

import { auth, getUserHistory, getUserProfile, signInWithGooglePopup } from "./firebase";

import { Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SignInButton } from "./sign-in/SignInButton";
import { useCurrentUser } from "./user/UserProvider";
import { UserHistoryEntry, UserProfile } from "./types";

const App: React.FC = () => {
  const { user, setUser } = useCurrentUser();
  const [history, setHistory] = useState<UserHistoryEntry[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = () => {
    setIsLoading(true);
    signInWithGooglePopup()
      .then((result) => setUser(result.user))
      .catch((_) => setIsLoading(false));
  };

  const loadHistory = (userId: string): void => {
    getUserHistory(userId).then((newHistory: UserHistoryEntry[]) => setHistory(newHistory)).catch(e => console.log(e));

  }

  const loadUserProfile = (userId: string): void => {
    getUserProfile(userId).then((newUserProfile: UserProfile) => setUserProfile(newUserProfile)).catch(e => console.log(e));
  }

  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
      if (user) {
        loadHistory(user.uid);
        loadUserProfile(user.uid);
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
        {user && userProfile ? (
          <Text>Hello {userProfile.first}.
          </Text>
        ) : (
          <SignInButton onClick={handleSignIn} />
        )}
      </div>
    </>
  );
};

export default App;
