import  { createSlice } from "@reduxjs/toolkit";
const initialState = {
    player: "",
    oppName: "Waiting to Join",
    userName:"",
    isHost:"",
    roomCode:"",
    connection:false,
}
const roomSlice = createSlice({
    name:"room",
    initialState,
    reducers:{
        setPlayer:(state,action)=>{
            state.player = action.payload
        },
        setOppName:(state,action)=>{
            state.oppName = action.payload
        },
        setUserName:(state,action)=>{
            state.userName = action.payload
        },
        setIsHost:(state,action)=>{
            state.isHost = action.payload
        },
        setRoomCode:(state,action)=>{
            state.roomCode = action.payload
        },
        setConnection:(state,action)=>{
            state.connection = action.payload
        },
    }
})

export const {setPlayer,setOppName,setUserName,setIsHost,setRoomCode,setConnection} = roomSlice.actions  
export default roomSlice.reducer