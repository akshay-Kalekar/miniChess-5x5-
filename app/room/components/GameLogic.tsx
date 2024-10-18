import {ref,set,get,update} from 'firebase/database'
import {database} from '../firebase/database'

export const initialGameState =  {
    layout: [
      ["A-P1", "A-P2", "A-P3", "A-H1", "A-H2"],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["B-P1", "B-P2", "B-P3", "B-H1", "B-H2"]
    ],
    turn: 'A',
    possibleMoves: [],
    moveHistory: [],
    pieceA: 5,
    pieceB: 5,
  };
//Create Room on User Request with input roomCode
interface RoomProps{
    roomCode:string,
    playerName:string
}
export const createRoom = async ({roomCode,playerName}:RoomProps) => {
    console.log(roomCode,playerName)
    const roomRef = ref( database ,`rooms/${roomCode}`);
    await set(roomRef,{
        players : {A:playerName,B:null},
        gameState: initialGameState,
        chat:{
            message:[],
        },
        gameResult : {
            gameOver:"NotOver",
            result:"none",
        },
        gameRequest :{
            from:"",
            to:"",
            message:"",
            response:""
        }
    }); 
    return "Room Created"
};

//Check for user Join to existing room
export const resetRoom = async (roomCode:string) => {
    const updates = {
        [`rooms/${roomCode}/gameState`]: initialGameState,
        [`rooms/${roomCode}/gameResult`]: { gameOver: "NotOver", result: "none" },
        [`rooms/${roomCode}/gameRequest`]: { from: "", to: "", message: "", response: "" }
    }; 
    await update(ref(database), updates);
    return "Room Reset" ;
};

export const joinRoom = async ({roomCode,playerName}:RoomProps)=>{
    const roomRef = ref(database,`rooms/${roomCode}`);
    const roomSnapshot = await get(roomRef);
    
    if(roomSnapshot.exists()){
        // console.log("value",roomSnapshot.val())
        await update(roomRef,{players :{...roomSnapshot.val().players,B:playerName}});
        return "Room Joined"
    }
    else{
        return "Room Not Found"
    }
}

export const getRoom = async (roomCode:string)=>{
    const roomRef = ref(database,`rooms/${roomCode}`);
    const roomSnapshot = await get(roomRef);
    console.log("getRoom",roomSnapshot.val())
    if(roomSnapshot.exists()){
        return roomSnapshot.val()
    }
    else{
        return "Room Not Found"
    }
}
interface updateGameRequestProps{
    roomCode:string,
    player:string,
    message:string,
    response?:string
}

export const updateGameRequest = async ({roomCode,player,message,response="Waiting for Response" }: updateGameRequestProps) =>{
    const gameStateRef = ref(database,`rooms/${roomCode}/gameRequest`)   
        await update(gameStateRef,{
            from: player,
            message: message,
            response: response,
            to : player==='A'?'B':'A',
        })
    // if(response=="Waiting for Response" ){
    //     gameStateRef = ref(database,`rooms/${roomCode}/gameRequest`)   
    //     await update(gameStateRef,{
    //         from: player,
    //         message: message,
    //         response: response,
    //         to : player==='A'?'B':'A',
    //     })
    // }
    // else if(response==="Yes" || response==="No"){
    //     gameStateRef = ref(database,`rooms/${roomCode}/gameRequest`)   
    //     await update(gameStateRef, {response} )
    // }
    // else{
    //     console.log("Case Not handleed -  updateGameRequest");
    // }
};
interface updateGameResultProps{
    roomCode:string,
    player:string,
    gameOver:string,
}
export const updateGameResult = async ({roomCode,player,gameOver}:updateGameResultProps) =>{
    console.log("Request to resignation",roomCode,player,gameOver)    
    const gameStateRef = ref(database,`rooms/${roomCode}/gameResult`)
    let result="";
    if(gameOver==='Resignation'){
        result = player==='A'?'B':'A';
    }
    else if(gameOver==='ProperMatch'){
        result = player==='A'?'A':'B';
    }
    else if(gameOver==='drawRequest'){
        gameOver = 'Draw'
        result = 'Draw';
    }
    else{
        console.log("Case Not handleed -  updateGameResult");
    }
    

    await update(gameStateRef,{
        result: result,
        gameOver: gameOver,
      }
    )
}
//Updating Game state changes
interface updateRoomProps{
    roomCode:string,
    updatelayout:string[][],
    turn:string,
    pieceA:number,
    pieceB:number,
    mH:string[]
}
export const updateRoom = async ({roomCode,updatelayout,turn,pieceA,pieceB,mH}:updateRoomProps) =>{
    console.log(turn,"-- Update Room")
    const gameStateRef = ref(database,`rooms/${roomCode}/gameState`)
    const result = pieceA===0? 'B': pieceB===0? 'A':'none'
    let gameOver = 'NotOver'
    if(pieceA===0 || pieceB===0){
        gameOver="ProperMatch";
    }
    const myTurn = turn==='A'?'B':'A'
    await update(gameStateRef,{
        layout: updatelayout,
        turn: myTurn,
        // result: result,
        moveHistory: mH ,
        pieceA: pieceA,
        pieceB: pieceB,
        // gameOver: gameOver,
      }
    )
    if(result!='none'){
        await updateGameResult({roomCode,player:turn,gameOver});
      }
};