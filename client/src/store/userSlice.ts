import { createSlice } from "@reduxjs/toolkit";

type user =  {
    id : string;
    name : string;
    email : string;
}

interface IuserState {
    user : user | null;
}

const initialState : IuserState =  {
    user : JSON.parse(localStorage.getItem('userSession') || "null")
}

const clientSlice = createSlice({
    name : "user",
    initialState : initialState,
    reducers : {
        userLogin : (state , action) => {
            state.user = action.payload
        },
        userLogout : (state,action)=> {
            state.user = null;
            localStorage.removeItem('userSession')
        }
    }
})

const {userLogin,userLogout} = clientSlice.actions;

export {
    userLogin,
    userLogout
}

export default clientSlice.reducer;