import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as Contact from 'expo-contacts';

let initialState = {
    data: [],
    permission: true
}




export const getAllContacts = createAsyncThunk(
    "getAppContacts",
    async () => {
        const { status } = await Contact.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contact.getContactsAsync({
                fields: [Contact.Fields.Name, Contact.Fields.PhoneNumbers],
            });

            if (data.length > 0) {
                const phoneContacts = data
                    .filter(contact => contact.phoneNumbers?.length)
                    .map(contact => ({
                        name: contact.name,
                        number: contact.phoneNumbers[0]?.number,
                    }));
                return { data: phoneContacts, permission: true }
            }
        } else {
            return { data: [], permission: false }
        }
    }
)


export const contactSlice = createSlice({
    name: 'allContacts',
    initialState,
    reducers: {
        updateContactData: (state, action) => {
            state = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllContacts.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.permission = action.payload.permission
            })
        // .addCase(getAllContacts.pending, (state) => {
        //     state.loading = true;
        // })
        // .addCase(getAllContacts.rejected, (state) => {
        //     state.loading = false;
        // });
    }

})

export const { updateContactData } = contactSlice.actions