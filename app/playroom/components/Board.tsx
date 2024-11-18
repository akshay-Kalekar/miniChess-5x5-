"use client";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { movePiece, selectPiece } from "../../roomComponents/Utils";
import { onValue, ref, } from "firebase/database";
import { database } from "../../firebase/database";
import { updateRoom } from "./GameLogic";
import { error } from "../../roomComponents/Alerts";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setGameOver, setMyPiece, setOppPiece, setResult, setTurn } from "@/lib/features/game/gameSlice";
import { setMoveHistory } from "@/lib/features/game/gameSlice";
import { setOppName } from "@/lib/features/room/roomSlice";
import moveSound from '@/app/assets/sound/move.mp3';
import useSound from 'use-sound';
import Image from "next/image";
// import H2 from "@/app/assets/piece/one_piece/05.png"
// import H1 from "@/app/assets/piece/one_piece/04.png"
// import P3 from "@/app/assets/piece/one_piece/03.png"
// import P2 from "@/app/assets/piece/one_piece/02.png"
// import P1 from "@/app/assets/piece/one_piece/01.png"

// import H2 from "@/app/assets/piece/ancient/01.png"
// import H1 from "@/app/assets/piece/ancient/02.png"
// import P3 from "@/app/assets/piece/ancient/03.png"
// import P2 from "@/app/assets/piece/ancient/03.png"
// import P1 from "@/app/assets/piece/ancient/03.png"
interface BoardInterface {
  roomCode: string;
  player: string;
}

const Board: FC<BoardInterface> = ({ roomCode, player }) => {
  const [playMoveSound] = useSound(moveSound,{volume: 0.5})
  const dispatch = useAppDispatch();
  const turn = useAppSelector((state) => state.game.turn)
  const moveHistory = useAppSelector((state) => state.game.moveHistory);
  const [selectedPieceInfo, setSelectedPieceInfo] = useState({
    piece: "",
    pos_x: -1,
    pos_y: -1,
  });
  const pieceImageMap: { [key: string]: string } = {
    "A-P1": "/piece/ancient/03.png",
    "A-P2": "/piece/ancient/03.png",
    "A-P3": "/piece/ancient/03.png",
    "A-H1": "/piece/ancient/02.png",
    "A-H2": "/piece/ancient/01.png",
    "B-P1": "/piece/ancient/03.png",
    "B-P2": "/piece/ancient/03.png",
    "B-P3": "/piece/ancient/03.png",
    "B-H1": "/piece/ancient/02.png",
    "B-H2": "/piece/ancient/01.png",
  };
  const loaderProp =({ src }: {src:string})  => {
    return src;
  }
  const [layout, setLayout] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [possibleMoveLayout, setPossibleMoveLayout] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [myTurn, setMyTurn] = useState(turn === player);
  const myPiece = useAppSelector((state) => state.game.myPiece)
  const oppPiece = useAppSelector((state) => state.game.oppPiece)
  const [boardLoaded,setBoardLoaded] = useState(false); 
  const handleMovePiece = (e: React.MouseEvent, rowIndex: number, colIndex: number) => {
    const playerAP = myPiece;
    let playerBP = oppPiece;
    if (
      possibleMoveLayout[rowIndex][colIndex] === "-1"
    ) {
      playerBP = playerBP - 1;
    }
    const mH: string[] = moveHistory ? [...moveHistory] : [];
    mH.push(`${selectedPieceInfo.piece} moved [${selectedPieceInfo.pos_x},${selectedPieceInfo.pos_y}] ~> [${rowIndex}, ${colIndex}]`)
    const successfulMove = movePiece({
      move_x: rowIndex,
      move_y: colIndex,
      selectedPieceInfo: selectedPieceInfo,
      layout: layout,
      setLayout: setLayout,
      setSelectedPieceInfo: setSelectedPieceInfo,
      possibleMoveLayout: possibleMoveLayout,
      setPossibleMoveLayout: setPossibleMoveLayout
    }
    );

    if (successfulMove) {
      const updatelayout = [...layout]; // This is the layout after the move
      if (player === 'A') {
        updateRoom({ roomCode, updatelayout, turn, pieceA: playerAP, pieceB: playerBP, mH });
      }
      else if (player == 'B') {
        updateRoom({ roomCode, updatelayout, turn, pieceA: playerBP, pieceB: playerAP, mH });
      }
      dispatch(setMyPiece(playerAP));
      dispatch(setOppPiece(playerBP));
    } else {
      error("Wrong Move");
    }
  };

  useEffect(() => {
    // console.log(roomCode)
    const roomRef = ref(database, `rooms/${roomCode}`);
    // console.log("roomRef");
    const unsubscribe =   () => {
          onValue(roomRef, (snapshot) => {
          const data = snapshot.val();
          // console.log("snapshot value : ", data);
          if (data && data.gameState) {
            if (JSON.stringify(data.gameState.layout) !== JSON.stringify(layout)) {
              setLayout(data.gameState.layout);
              playMoveSound();
            }
            dispatch(setTurn(data.gameState.turn));
            if (data.gameResult.gameOver !== "NotOver") {
              setMyTurn(false);
            } else {
              setMyTurn(data.gameState.turn === player);
            }
            if (player == 'A') {
              dispatch(setMyPiece(data.gameState.pieceA));
              dispatch(setOppPiece(data.gameState.pieceB));
            }
            else if (player == 'B') {
              dispatch(setMyPiece(data.gameState.pieceB));
              dispatch(setOppPiece(data.gameState.pieceA));
            }    
            dispatch(setMoveHistory(data.gameState.moveHistory));
            dispatch(setGameOver(data.gameResult.gameOver));
            dispatch(setResult(data.gameResult.result));
            dispatch(setOppName(data.players[player === "A" ? "B" : "A"] || "Waiting for Opponent"));
          }
          // console.log("snapshot value 2: ", data);
          setBoardLoaded(true);
          
        });
    }
    unsubscribe();
  },[roomCode, player, myPiece, oppPiece, layout,dispatch,playMoveSound]);
  if (!boardLoaded) return <div>Failed to fetch Board</div>
  return (
    <>
    <div className="bg-white/80 mx-auto w-fit">

      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex  justify-center  ">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              data-x={rowIndex}
              data-y={colIndex}
              className={` w-24 h-24 text-center flex items-center justify-center flex-row-reverse m-1
                ${!myTurn && cell[0]==player ? "border-[8px] border-yellow-800" : ""}
                ${cell === selectedPieceInfo.piece && cell !== ""
                  ? "bg-neutral-500"
                  : ""
                }
                ${possibleMoveLayout[rowIndex][colIndex] === "*"
                  ? "border-8 border-yellow-700"
                  : possibleMoveLayout[rowIndex][colIndex] === "-1"
                  ? "border-8 border-red-800"
                  : ""
                }
                ${myTurn && player === cell[0] ? "bg-green-800/70 " : ((rowIndex+colIndex) % 2 === 0 ? "bg-black" : "bg-slate-200")}`}
                
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  console.log(target)
                console.log("target.dataset.piece", target.dataset.piece);
                const content = target.dataset.piece || "";
                console.log("content", content);
                return (
                  selectedPieceInfo.piece === "" || content[0] === player
                    ? selectPiece(
                      {
                        e,
                        player,
                        myTurn,
                        layout,
                        setSelectedPieceInfo,
                        setPossibleMoveLayout
                      }
                    )
                    : handleMovePiece(e, rowIndex, colIndex)
                  )
              }
              }
            >
              {cell !== "*" ?
              cell
              && <>
              <Image src={pieceImageMap[cell]} alt={cell} width={80} height={80} loader={loaderProp} data-piece={cell}  data-x={rowIndex}
              data-y={colIndex} className={`${cell && myTurn && cell[0]==player && "backdrop-blur-sm"}`} /> 
              </>
                : ""}


            </div>
          ))}
        </div>
      ))}
    </div>
      </>
  );
};

export default Board;
