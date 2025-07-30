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
        login : (state , action) => {
            state.user = action.payload
        },
        logout : (state,action)=> {
            state.user = null;
            localStorage.removeItem('userSession')
        }
    }
})

const {login,logout} = clientSlice.actions;

export {
    login,
    logout
}

export default clientSlice.reducer;