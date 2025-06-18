import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBygGPBCzGPIUYcWx1WVnDwQ0L0SXSp9DI",
  authDomain: "fastchat-9ac2d.firebaseapp.com",
  projectId: "fastchat-9ac2d",
  storageBucket: "fastchat-9ac2d.firebasestorage.app",
  messagingSenderId: "708281424888",
  appId: "1:708281424888:web:374c7fa67bfe9ea20d540d",
  measurementId: "G-M513GFJM6S"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

// export const auth = initializeAuth(app,{
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
