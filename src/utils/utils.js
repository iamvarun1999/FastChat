import { jwtDecode } from "jwt-decode";
import { startLoader, stopLoader } from "../store/slices/loaderSlice";
import { store } from "../store/store";
import { getToken } from "./auth";


export const loader = {
  start: () => store.dispatch(startLoader()),
  stop: () => store.dispatch(stopLoader())
}


export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};


export const userId = async () => {
  const token = await getToken();
  if (token) {
    return decodeToken(token)?._id || undefined
  } 
};


export function returnLast10Digits(number) {
  return number.slice(-10);
}

export function removeSpace(number) {
  return number?.replace(/\s/g, '')?.slice(-10);
}
