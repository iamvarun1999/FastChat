import axios from "axios";
import { APIS, baseUrl } from "./Routes";


export async function getAllFriends(id) {
    return await axios.get(`${baseUrl}${APIS.message.getAllMessages}${id}`,)
}

export async function getAllMessages(id) {
    return await axios.get(`${baseUrl}${APIS.message.getAllMessagesData}${id}`,)
}

export async function sendMessage(payload) {
    return await axios.post(`${baseUrl}${APIS.message.startMessage}`,payload)
}

export async function sendNewMessage(id,payload) {
    return await axios.post(`${baseUrl}${APIS.message.sendMessage}${id}`,payload)
}

export async function markAsReed(id,chatId) {
    return await axios.patch(`${baseUrl}${APIS.message.markSeen}${id}/${chatId}`)
}