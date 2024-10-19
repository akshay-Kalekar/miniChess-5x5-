import { useRouter } from 'next/navigation';
import React from 'react';
import { updateGameResult,updateGameRequest, resetRoom } from './GameLogic';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setNotification } from '@/lib/features/game/gameSlice';

interface WinnerModalProps {
  player: string;
  message?: string;
}
const WinnerModal = ({ player, message = "" }:WinnerModalProps) => {
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

interface LoserModalProps {
  player: string;
  oppName: string;
}
const LoserModal = ({ player = "aks", oppName = "hero" }:LoserModalProps) => {
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

const DrawModal = ({player}:{player:string}) => {
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
const ConfirmationModal = ({message}:{message:string}) => {
  const dispatch = useAppDispatch();
  console.log(message,"confirmation - modal")
  const roomCode = useAppSelector((state) => state.room.roomCode);
  const player = useAppSelector((state) => state.room.player);
  let text;
  if(message==="drawRequest"){
      text = "Do you want to draw?";
  }
  else if(message==="rematchRequest"){
      text = "Do you want to request for rematch?";
  }
  return (
    <dialog id="confirmation_modal" className="modal" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirmation</h3>
        <p className="py-4">{text}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={()=>{updateGameRequest({roomCode,player,message}); dispatch(setNotification("")) ;
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
            <button className="btn" onClick={()=>{updateGameRequest({roomCode,player,message:"drawRequest",response:"Yes"}); updateGameResult({roomCode,player,gameOver:"drawRequest"}); dispatch(setNotification("")); }}>Accept</button>
            <button className="btn" onClick={()=>{updateGameRequest({roomCode,player,message:"drawRequest",response:"No"}); dispatch(setNotification("")); }}>Reject</button>
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
            <button className="btn" onClick={()=>{updateGameRequest({roomCode,player,message:"rematchRequest",response:"Yes"}); resetRoom(roomCode); dispatch(setNotification(""))}}>Accept</button>
            <button className="btn" onClick={()=>{updateGameRequest({roomCode,player,message:"rematchRequest",response:"No"}); dispatch(setNotification(""));}}>Reject</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};


const ResignationModal = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const roomCode = useAppSelector((state) => state.room.roomCode);
  const player = useAppSelector((state) => state.room.player);

  return (
    <dialog id="resignation_modal" className="modal text-white" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Resignation</h3>
        <p className="py-4">Do you want to resign?</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={ async () =>{
              await updateGameResult({roomCode,player,gameOver:'Resignation'});
              router.push('/')
              
            }

            }>Yes</button>
            <button className="btn" onClick={()=>dispatch(setNotification(""))}>No</button>

          </form>
        </div>
      </div>
    </dialog>
  );
};

export { WinnerModal, LoserModal, DrawModal, RematchModal, DrawPermissionModal, RematchPermissionModal,ResignationModal ,ConfirmationModal };
