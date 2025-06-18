import { async } from "q";

import { updateProfile, sendEmailVerification, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

// SignUp users using their Email and Password
export const emailPasswordSignUp = async (name, mail, pass) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, mail, pass);

    let data = {
      uid: res.user.uid,
      email: res.user.email,
    };
    await updateProfile(auth.currentUser, { displayName: name });

    return data;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      return { error: "auth/email-already-in-use" };
    } else {
      return { error: error.message };
    }
  }
};

export const updateName = async (nameOne, nameTwo) => {
  const res = await updateProfile(auth.currentUser, {
    displayName: nameOne || nameTwo,
  });

  return res;
};
