'use client'
import React, { useState, useEffect } from 'react'
import { success, Warning, initMessageApi } from './Alerts'
import MoveHistory from './MoveHistory'
import Information from './Information'
import Information2 from './Information2'
import { useSearchParams } from 'next/navigation'
import { message } from 'antd';
import Board from './Board'
import { handleRoomConnection } from './Utils'
import Chat from './Chat'
import { LosserModal } from './Modals'
import GameResult from './GameResult'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setOppName, setPlayer, setRoomCode, setUserName } from '@/lib/features/room/roomSlice'
import Notification from './Notification'

const GameLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [playerChar, setPlayerChar] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  dispatch(setOppName("Waiting to Join"));
  dispatch(setUserName(searchParams.get('name')));
  const player = useAppSelector((state) => state.room.player)
  const userName = useAppSelector((state) => state.room.userName);
  const [isHost, setIsHost] = useState(searchParams.get('type') === 'CREATE_ROOM')
  dispatch(setRoomCode(searchParams.get('roomcode')))
  const roomCode = useAppSelector((state) => state.room.roomCode);
  const [connection, setConnection] = useState(false)   //First Time Link Join call createRoom
  useEffect(() => {
    // Initialize the global messageApi
    initMessageApi(messageApi);
    async function roomConnection() {
      const isConnection = await handleRoomConnection(isHost, userName, roomCode)
      if (isConnection) {
        setPlayerChar(searchParams.get('type') === 'CREATE_ROOM' ? 'A' : 'B')
      }
      setConnection(isConnection)
    }
    roomConnection()
  }, []);
  if (connection === false) {
    return (
      <div>Loading</div>
    )
  }
  if(playerChar 
    && player==""
  ){
    dispatch(setPlayer(playerChar))
    
  }
  return (
    <div className='flex flex-col '>
      <Information userName={userName} roomCode={roomCode} />
      <div className=' absolute top-4 right-4  z-10'>
        {contextHolder}
      </div>
      <GameResult />
      <Notification/>
      <div className='flex gap-2 justify-around h-[75vh] items-center p-10'>
        <div className='h-full w-4/12 '><MoveHistory /></div>
        <div className='h-full w-8/12'><Board roomCode={roomCode} player={player}  /></div>
        <div className='h-full w-4/12 '><Chat roomCode={roomCode} player={player} /></div>
        <div />
      </div>
      <Information2 />
    </div>
  )
}

export default GameLayout
