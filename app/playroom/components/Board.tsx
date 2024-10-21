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
interface BoardInterface {
  roomCode: string;
  player: string;
}

const Board: FC<BoardInterface> = ({ roomCode, player }) => {
  const dispatch = useAppDispatch();
  const turn = useAppSelector((state) => state.game.turn)
  const moveHistory = useAppSelector((state) => state.game.moveHistory);
  const [selectedPieceInfo, setSelectedPieceInfo] = useState({
    piece: "",
    pos_x: -1,
    pos_y: -1,
  });

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
    const roomRef = ref(database, `rooms/${roomCode}`);
    console.log("roomRef");
    const unsubscribe = async () =>
      await onValue(roomRef, (snapshot) => {
        const data = snapshot.val();
        console.log("snapshot value : ", data);
        if (data && data.gameState) {
          if (JSON.stringify(data.gameState.layout) !== JSON.stringify(layout)) {
            setLayout(data.gameState.layout);
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
      });

    return () => {
      unsubscribe();
    };
  }, [roomCode, player, dispatch, layout]);
  console.log("After Move", layout);
  if (!layout) return <div>Loading...</div>
  return (
    <>

      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex  justify-center">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              data-x={rowIndex}
              data-y={colIndex}
              className={`border-2 border-white w-28 h-28 text-center flex items-center justify-center flex-row-reverse
                ${cell === selectedPieceInfo.piece && cell !== ""
                  ? "bg-gray-600"
                  : ""
                }
                ${possibleMoveLayout[rowIndex][colIndex] === "*"
                  ? "bg-green-300"
                  : possibleMoveLayout[rowIndex][colIndex] === "-1"
                    ? "bg-green-300"
                    : ""
                }
                ${myTurn && player === cell[0] ? "text-green-400" : ""}`}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                console.log(target.textContent[0],player)
                return (
                  selectedPieceInfo.piece === "" || target.textContent[0] === player
                    ? selectPiece(
                      {
                        e,
                        selectedPieceInfo,
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
              {cell !== "*" ? cell : ""}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Board;
