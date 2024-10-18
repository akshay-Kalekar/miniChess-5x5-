import React, { useEffect, useState } from 'react';
import { ConfirmationModal, DrawPermissionModal, RematchPermissionModal } from './Modals';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { onValue, ref } from 'firebase/database';
import { setNotification } from '@/lib/features/game/gameSlice';
import { message } from 'antd';
import { database } from '../firebase/database';
import { error } from './Alerts';

const Notification = () => {
  const dispatch = useAppDispatch();
  const roomCode = useAppSelector((state) => state.room.roomCode);
  const player = useAppSelector((state) => state.room.player);
  const gameOver = useAppSelector((state) => state.game.gameOver);
  const [request, setRequest] = useState({ from: '', to: '', message: '', response: '' });

  useEffect(() => {
    const requestRef = ref(database, `rooms/${roomCode}/gameRequest`);
    onValue(requestRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (data.to === player && data.response === "Waiting for Response") {
          dispatch(setNotification(data.message));
        } else if (data.from === player) {
          dispatch(setNotification(""));
        }

        setRequest({
          from: data.from,
          to: data.to,
          message: data.message,
          response: data.response
        });
      }
    });
  }, [roomCode, player, dispatch]);

  const notification = useAppSelector((state) => state.game.notification);

  // Handle when request is rejected
  useEffect(() => {
    if (request.response === "No" && request.to === player) {
      error("Your request was rejected.");
    }
  }, [request.response, request.to, player]);
  console.log(notification)
  return (
    <>
      {/* Handle draw request */}
      {gameOver === "NotOver" && notification === "drawRequest" && (
        <>
          {(request.response === "Yes" || request.response==="No" || request.response==="") && <ConfirmationModal text="drawRequest" />}
          {player === request.to && request.response==="Waiting for Response" && <DrawPermissionModal />}
        </>
      )}

      {/* Handle rematch request */}
      {notification === "rematchRequest" && (
        <>
          {(request.response === "Yes" || request.response==="No" || !request.response) && <ConfirmationModal text="rematchRequest" />}
          {request.message === "rematchRequest" && request.response==="Waiting for Response" && player === request.to && <RematchPermissionModal />}
        </>
      )}
    </>
  );
};

export default Notification;
