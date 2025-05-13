import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import config from "./config";

const firebaseConfig = {
  apiKey: config.env.apiKey,
  authDomain: config.env.authDomain,
  projectId: config.env.projectId,
  storageBucket: config.env.storageBucket,
  messagingSenderId: config.env.messagingSenderId,
  appId: config.env.appId,
  measurementId: config.env.measurementId,
};

// Avoid re-initializing during Hot Reloads
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
