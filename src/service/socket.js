import { io } from "socket.io-client";
import { baseUrl } from "./Routes";


export const socket = io.connect(baseUrl, {
    auth: { userId: '', username: '' }
})





