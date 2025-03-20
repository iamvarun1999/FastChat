import axios from "axios";
import { APIS, baseUrl } from "./Routes";



export async function getAllUsers() {
    return await axios.get(`${baseUrl}${APIS.users.getAllUsers}`)
}

export async function getUserByPhone(payload) {
    console.log(payload)
    return await axios.post(`${baseUrl}${APIS.users.getUserByPhone}`,payload)
}

export async function sendOTP(payload) {
    return await axios.post(`${baseUrl}${APIS.users.sendOtp}`, payload)
}

export async function registerUser(payload) {
    return await axios.post(`${baseUrl}${APIS.users.verifyOTPAndRegister}`, payload)
}

export async function updateUser(id,payload) {
    return await axios.put(`${baseUrl}${APIS.users.updateUser}${id}`, payload)
}