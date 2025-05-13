"use client";

import { useEffect, useState } from "react";
import { auth, provider } from "../lib/firebase";
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export default function SignInButton() {
  const [login, setLogin] = useState<{
    name?: string | null;
    email?: string | null;
  }>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setLogin({
          name: user.displayName,
          email: user.email,
        });
      } else {
        setLogin({});
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setLogin({
        name: user.displayName,
        email: user.email,
      });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setLogin({});
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const isLoggedIn = login.name && login.email;

  return (
    <div>
      {isLoggedIn ? (
        <div className="text-center items-center justify-center">
          <p className="text-xl">{login.name}</p>
          <p className="pb-10">{login.email}</p>
          <Button variant="contained" color="error" onClick={handleSignOut}>
            Log Out
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleSignIn}
          variant="contained"
          className="flex justify-center items-center gap-2"
          style={{ padding: 10 }}
        >
          <GoogleIcon />
          Sign in with Google
        </Button>
      )}
    </div>
  );
}
