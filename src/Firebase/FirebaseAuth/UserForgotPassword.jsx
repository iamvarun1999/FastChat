import {
  sendPasswordResetEmail,
  EmailAuthProvider,
  updatePassword,
  reauthenticateWithCredential,
  deleteUser,
  confirmPasswordReset,
  verifyPasswordResetCode,
} from "firebase/auth";
import { auth } from "../firebase";

export const UserForgotPassword = async (mail) => {
  const res = await sendPasswordResetEmail(auth, mail);
  // .catch((err)=>{
  // console.log(err)
  //   alert("please cheack your email")
  // });
  return res;
};
export const resetPassword = async (password, newPassword) => {
  try {
    const currentUser = auth.currentUser;
    console.log(currentUser);
    // Get the user's credentials and reauthenticate the user
    const credential = await EmailAuthProvider.credential(currentUser.email, password);
    await reauthenticateWithCredential(currentUser, credential);

    // Change the user's password
    await updatePassword(currentUser, newPassword);
  } catch (error) {
    console.log(error);
  }
};

export const ForgotPassword = async (oobCode, newPassword) => {
  console.log(oobCode, newPassword);
  try {
    await verifyPasswordResetCode(auth, oobCode);
    await confirmPasswordReset(auth, oobCode, newPassword);
    console.log("Password reset successful!");
    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};
