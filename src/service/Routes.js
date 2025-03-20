// export const baseUrl = 'http://192.168.31.162:4000/'
export const baseUrl = 'http://192.168.1.30:4000/'

export const APIS = {
    users:{
        getAllUsers:'user/getAllUsers',
        getUserByPhone:'user/getUserDataByPhone',
        sendOtp:'user/sendOTP',
        verifyOTPAndRegister:'user/register',
        updateUser:'user/updateUser/'
    },
    message:{
        getAllMessages:'message/getAllMessages/',
        getAllMessagesData:'message/getAllMessageData/',
        startMessage:'message/startMessage',
        sendMessage:'message/sendMessage/',
        markSeen:'message/seenStatus/'
    }
}