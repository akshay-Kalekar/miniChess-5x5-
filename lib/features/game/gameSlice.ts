import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    layout: [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ],
    possibleMoveLayout: [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ],
    turn: "A",
    myPiece: 0,
    oppPiece: 0,
    moveHistory: [],
    result: "none",
    gameOver: "NotOver",
    notification:""
}
//Plan Out the notification feature if new opbjcet had notify only requestor
const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setLayout: (state, action) => {
            state.layout = action.payload
        },
        setPossibleMoveLayout: (state, action) => {
            state.possibleMoveLayout = action.payload
        },
        setTurn: (state, action) => {
            state.turn = action.payload
        },
        setMyPiece: (state, action) => {
            state.myPiece = action.payload
        },
        setOppPiece: (state, action) => {
            state.oppPiece = action.payload
        },
        setMoveHistory: (state, action) => {
            state.moveHistory = action.payload
        },
        setResult: (state, action) => {
            state.result = action.payload
        },
        setGameOver: (state, action) => {
            state.gameOver = action.payload
        },
        setNotification: (state, action) => {
            state.notification = action.payload
        }
    }
})

export const { setLayout, setPossibleMoveLayout, setTurn, setMyPiece, setOppPiece, setMoveHistory,setResult,setGameOver,setNotification } = gameSlice.actions
export default gameSlice.reducer