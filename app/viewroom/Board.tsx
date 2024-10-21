"use client";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { onValue, ref, } from "firebase/database";
import { database } from "@/app/firebase/database";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setGameOver, setMyPiece, setOppPiece, setResult, setTurn } from "@/lib/features/game/gameSlice";
import { setMoveHistory } from "@/lib/features/game/gameSlice";
import { setPlayerAName,setPlayerBName } from "@/lib/features/room/roomSlice";
interface BoardInterface {
    roomCode: string;
    player: string;
}


const Board: FC<BoardInterface> = ({ roomCode, player }) => {
    const dispatch = useAppDispatch();
    const turn = useAppSelector((state) => state.game.turn)
    const [layout, setLayout] = useState([
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ]);
    const [myTurn, setMyTurn] = useState(turn === player);
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
                    dispatch(setMyPiece(data.gameState.pieceA));
                    dispatch(setOppPiece(data.gameState.pieceB));
                    dispatch(setMoveHistory(data.gameState.moveHistory));
                    dispatch(setGameOver(data.gameResult.gameOver));
                    dispatch(setResult(data.gameResult.result));
                    dispatch(setPlayerAName(data.players.A || "Waiting for Player A"));
                    dispatch(setPlayerBName(data.players.B || "Waiting for Player B"));
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
                
                ${myTurn && player === cell[0] ? "text-green-400" : ""}`}
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
