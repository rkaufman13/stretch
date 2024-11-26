import "./App.css";

import { getRedirectResult } from "firebase/auth";

import {
  auth,
  getUserHistory,
  getUserProfile,
  signInWithGooglePopup,
} from "./firebase";

import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SignInButton } from "./sign-in/SignInButton";
import { CenteredSpinner } from "./spinner/CenteredSpinner";
import { UserHistoryEntry, UserProfile } from "./types";
import { useCurrentUser } from "./user/UserProvider";
import { HistoryComponent } from "./history/history";

const App: React.FC = () => {
  const { user, setUser } = useCurrentUser();
  const [history, setHistory] = useState<UserHistoryEntry[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = () => {
    setIsLoading(true);
    signInWithGooglePopup()
      .then((result) => setUser(result.user))
      .catch(() => setIsLoading(false));
  };

  const loadHistory = (userId: string): Promise<void> => {
    return getUserHistory(userId)
      .then((newHistory: UserHistoryEntry[]) => setHistory(newHistory))
      .catch(console.warn);
  };

  const loadUserProfile = (userId: string): Promise<void> => {
    return getUserProfile(userId)
      .then((newUserProfile: UserProfile) => setUserProfile(newUserProfile))
      .catch(console.warn);
  };

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      Promise.all([loadHistory(user.uid), loadUserProfile(user.uid)])
        .catch(console.warn)
        .finally(() => setIsLoading(false));
    }

    if (!user) {
      setIsLoading(true);
      getRedirectResult(auth)
        .then((cred) => {
          if (cred) {
            setUser(cred.user);
          }
        })
        .catch(console.warn)
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  if (isLoading) {
    return <CenteredSpinner />;
  }

  return (
    <>
      <div className="centered">
        {user ? (
          <>
            <Text>Hello {userProfile?.first ?? user.displayName}.</Text>
            <HistoryComponent history={history} />
          </>
        ) : (
          <SignInButton onClick={handleSignIn} />
        )}
      </div>
    </>
  );
};

export default App;
