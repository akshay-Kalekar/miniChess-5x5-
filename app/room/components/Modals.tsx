import { update } from 'firebase/database';
import { useRouter } from 'next/navigation';
import React from 'react';
import { updateGameResult,updateGameRequest, resetRoom } from './GameLogic';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setNotification } from '@/lib/features/game/gameSlice';


const WinnerModal = ({ player, message = "" }) => {
  const router = useRouter();
  return (
    <dialog id="winner_modal" className="modal" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Congratulations!</h3>
        <p className="py-4">Well played! {player}</p>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

const LoserModal = ({ player = "aks", oppName = "hero" }) => {
  const router = useRouter();
  return (
    <dialog id="loser_modal" className="modal z-20" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Sorry! {player}</h3>
        <p className="py-4">Looks like {oppName} outsmarted you</p>
        <div className="modal-action">
          <form method="dialog">
          <button className="btn" onClick={ () =>{ 
              router.push('/')
            }
            }>New Game</button>
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

const DrawModal = ({ player}) => {
  return (
    <dialog id="winner_modal" className="modal" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">That is a Tie</h3>
        <p className="py-4"> {player}, Beat the Opponent in next match</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

const RematchModal = () => {
  return (
    <dialog id="rematch_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Rematch</h3>
        <p className="py-4">Do you want a rematch?</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Accept</button>
            <button className="btn">Reject</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
const 
ConfirmationModal = ({text}) => {
  const dispatch = useAppDispatch();
  console.log(text,"confirmation - modal")
  const roomCode = useAppSelector((state) => state.room.roomCode);
  const player = useAppSelector((state) => state.room.player);
  let message;
  if(text==="drawRequest"){
      message = "Do you want to draw?";
  }
  else if(text==="rematchRequest"){
      message = "Do you want to request for rematch?";
  }
  return (
    <dialog id="confirmation_modal" className="modal" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirmation</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={()=>{updateGameRequest(roomCode,player,text); dispatch(setNotification("")) ;
            }} >Yes</button>
            <button className="btn" onClick={()=>dispatch(setNotification(""))}>No</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

const DrawPermissionModal = () => {
  const dispatch = useAppDispatch();
  const roomCode = useAppSelector((state) => state.room.roomCode);
  const player = useAppSelector((state) => state.room.player);
  return (
    <dialog id="draw_modal" className="modal" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Draw</h3>
        <p className="py-4">Do you want to accept a draw?</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={()=>{updateGameRequest(roomCode,player,"drawRequest","Yes"); updateGameResult(roomCode,player,"drawRequest"); dispatch(setNotification("")); }}>Accept</button>
            <button className="btn" onClick={()=>{updateGameRequest(roomCode,player,"drawRequest","No"); dispatch(setNotification("")); }}>Reject</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
const RematchPermissionModal = () => {
  const dispatch = useAppDispatch();
  const roomCode = useAppSelector((state) => state.room.roomCode);
  const player = useAppSelector((state) => state.room.player);
  return (
    <dialog id="draw_modal" className="modal" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Rematch</h3>
        <p className="py-4">Do you want to accept a rematch?</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={()=>{updateGameRequest(roomCode,player,"rematchRequest","Yes"); resetRoom(roomCode); dispatch(setNotification(""))}}>Accept</button>
            <button className="btn" onClick={()=>{updateGameRequest(roomCode,player,"rematchRequest","No"); dispatch(setNotification(""));}}>Reject</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};


const ResignationModal = () => {
  const router = useRouter();
  const roomCode = useAppSelector((state) => state.room.roomCode);
  const player = useAppSelector((state) => state.room.player);

  return (
    <dialog id="resignation_modal" className="modal text-white" >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Resignation</h3>
        <p className="py-4">Do you want to resign?</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={ async () =>{
              await updateGameResult(roomCode,player,'Resignation');
              router.push('/')
              
            }

            }>Yes</button>
            <button className="btn">No</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export { WinnerModal, LoserModal, DrawModal, RematchModal, DrawPermissionModal, RematchPermissionModal,ResignationModal ,ConfirmationModal };
