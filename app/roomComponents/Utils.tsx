//On clicking a peice on board show possible moves or trigger error of wrong click
import { createRoom,joinRoom, spectateRoom } from '../playroom/components/GameLogic'
import { success,error } from './Alerts'
interface selectedPieceInfoInterface{
    piece:string,
    pos_x:number,
    pos_y:number
}
interface pieceMovementInfoInterface{
    [key:string]:{
        [key:string]:Array<number>
    }
}
export const piecesMovementInfo:pieceMovementInfoInterface = {
    'P': {
        'U': [-1, 0],
        'D': [+1, 0],
        'R': [0, +1],
        'L': [0, -1],
    },
    'H1': {
        'U': [-2, 0],
        'D': [+2, 0],
        'R': [0, +2],
        'L': [0, -2],
    },
    'H2': {
        'BL': [+2, -2],
        'BR': [+2, +2],
        'FL': [-2, -2],
        'FR': [-2, +2],
    }
};
const handleRoomConnection = async ( isHost:string,userName:string,roomCode:string)=>{

    if(isHost==="CREATE_ROOM"){
        // console.log("Create Room")
        const roomCreated = await createRoom({roomCode,playerName:userName})
        // console.log(roomCreated)
        if(roomCreated==='Room Created'){
            success("Room Created")
            return true;
        }
        else{
            error("Failed to create room")
            return false;
        }
    }
    else if(isHost==="JOIN_ROOM"){
        const roomJoined = await joinRoom({roomCode,playerName:userName})
        if(roomJoined==='Room Joined'){
            success("Room Joined")
            return true;
        }
        else{
            error("Room Not Joined")//Possible error of room not found e.g Match already going on pr No Room Found
            return false;
        }
    }
    else if(isHost==="SPECTATE_ROOM"){
        const roomJoinedSpectator = await spectateRoom({roomCode});
        if(roomJoinedSpectator === "Room joined as Spectator"){
            success("Room Joined as Spectator")
            return true;
        }
        else{
            error("Room Not Joined")//Possible error of room not found e.g Match already going on pr No Room Found
            return false;
        }
        
    }
    else{
        error("Invalid Room")
        return false;
    }
}
const copytext = (roomCode:string)=>{
        navigator.clipboard.writeText(roomCode);
        success("Copied to Clipboard")
        
}
const moveHelper =(selectedPieceInfo:selectedPieceInfoInterface,layout:Array<Array<string>>) => {
    const piece = selectedPieceInfo.piece;
    const newLayout = [["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""]]  
    let moves:{[key:string]:Array<number>}={};
    
    if (piece.slice(-2)[0] === 'P') {
        moves = piecesMovementInfo['P'];
    } else if (piece.slice(-2)[0] === 'H') {
        moves = piecesMovementInfo[piece.slice(-2)];
    }

    const curr_x:number = selectedPieceInfo.pos_x;
    const curr_y:number = selectedPieceInfo.pos_y;

    for (const direction in moves) {
        const pos_x = curr_x + Number(moves[direction][0]);
        const pos_y = curr_y + Number(moves[direction][1]);
        if (pos_x >= 0 && pos_x < 5 && pos_y >= 0 && pos_y < 5) {
            if (layout[pos_x][pos_y] === "" || newLayout[pos_x][pos_y] === "*" ) {
                newLayout[pos_x][pos_y] = '*'; 
            }
            else if( (piece[0]==='A' && layout[pos_x][pos_y][0] === 'B') || (piece[0]==='B' && layout[pos_x][pos_y][0] === 'A')){
                newLayout[pos_x][pos_y] = '-1';
            }
        }
    }
    console.log(newLayout);
    
    return newLayout;
}
//Selecting a piece and showing possible moves
interface SelectPieceProps {
    e: React.MouseEvent<HTMLElement>;
    player: string;
    myTurn: boolean;
    layout: Array<Array<string>>;
    setSelectedPieceInfo: React.Dispatch<React.SetStateAction<selectedPieceInfoInterface>>;
    setPossibleMoveLayout: React.Dispatch<React.SetStateAction<Array<Array<string>>>>;
}
const selectPiece = ({e, player, myTurn, layout, setSelectedPieceInfo, setPossibleMoveLayout}: SelectPieceProps) => {
    if(!myTurn) {
        error("Not Your Turn");
        return;
    }
    
    const target = e.target as HTMLElement;
    const piece = target.dataset.piece;

    console.log("piece",piece)
    
    if ( myTurn && piece && ((player === "A" && piece.startsWith("A")) || (player === "B" && piece.startsWith("B")))) {
        const newSelectedPieceInfo = {
            piece,
            pos_x: Number(target.dataset.x),
            pos_y: Number(target.dataset.y),
        };
        const newLayout = moveHelper(newSelectedPieceInfo, layout);
        setSelectedPieceInfo(newSelectedPieceInfo); 
        setPossibleMoveLayout(newLayout); 
    } else {
        error("Wrong Click");
        setSelectedPieceInfo({ piece: "", pos_x: -1, pos_y: -1 }); // Reset selected piece
        setPossibleMoveLayout([["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]]); // Reset possible move layout
    }

};// Make a move or not
interface MovePieceProps {
    move_x: number;
    move_y: number;
    selectedPieceInfo: selectedPieceInfoInterface;
    layout: Array<Array<string>>;
    setLayout: React.Dispatch<React.SetStateAction<Array<Array<string>>>>;
    setSelectedPieceInfo: React.Dispatch<React.SetStateAction<selectedPieceInfoInterface>>;
    possibleMoveLayout: Array<Array<string>>;
    setPossibleMoveLayout: React.Dispatch<React.SetStateAction<Array<Array<string>>>>;
}
const movePiece = ({move_x,move_y,selectedPieceInfo, layout, setLayout, setSelectedPieceInfo,possibleMoveLayout,setPossibleMoveLayout}: MovePieceProps) => {
    if (selectedPieceInfo.piece !== "") {
        const x = move_x;
        const y = move_y;
        if(possibleMoveLayout[x][y]=='*' || possibleMoveLayout[x][y]=='-1'){
            const newLayout = {...layout};
            newLayout[selectedPieceInfo.pos_x][selectedPieceInfo.pos_y] = "";
            newLayout[x][y] = selectedPieceInfo.piece;
            setLayout(newLayout);
            setSelectedPieceInfo({ piece: "", pos_x: -1, pos_y: -1 });    
            setPossibleMoveLayout([["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]]);
            return true;
        }
        else{
            return false;
        }
    }
    return false; 
};
export {handleRoomConnection,selectPiece,movePiece,copytext};