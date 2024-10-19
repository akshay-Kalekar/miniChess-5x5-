'use client'
import React, { useState, useEffect } from 'react'
import {initMessageApi } from './Alerts'
import MoveHistory from './MoveHistory'
import Information from './Information'
import Information2 from './Information2'
import { useSearchParams } from 'next/navigation'
import { message } from 'antd';
import Board from './Board'
import { handleRoomConnection } from './Utils'
import Chat from './Chat'
import GameResult from './GameResult'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setOppName, setPlayer, setRoomCode, setUserName } from '@/lib/features/room/roomSlice'
import Notification from './Notification'

const GameLayout: React.FC = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  dispatch(setOppName("Waiting to Join"));
  dispatch(setUserName(searchParams.get('name')));
  dispatch(setRoomCode(searchParams.get('roomcode')))
  const isHost = searchParams.get('type') === 'CREATE_ROOM'
  const player = useAppSelector((state) => state.room.player)
  const userName = useAppSelector((state) => state.room.userName);
  const roomCode = useAppSelector((state) => state.room.roomCode);
  
  const [messageApi, contextHolder] = message.useMessage();
  const [playerChar, setPlayerChar] = useState<'A'|'B'|'C'>('C');
  const [connection, setConnection] = useState<boolean>(false)   
  useEffect(() => {
    // Initialize the global messageApi
    initMessageApi(messageApi);
    async function roomConnection() {
      const isConnection:boolean = await handleRoomConnection(isHost, userName, roomCode) || false
      if (isConnection) {
        setPlayerChar(searchParams.get('type') === 'CREATE_ROOM' ? 'A' : 'B')
      }
      setConnection(isConnection)
    }
    roomConnection()
  }, [isHost,searchParams,messageApi, roomCode, userName]);
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
      <div className='flex md:gap-2 justify-center md:justify-around md:h-[75vh] items-center p-2 md:p-10'>
        <div className='hidden md:block h-full w-4/12 '><MoveHistory /></div>
        <div className='h-10/12  w-11/12 md:w-6/12'><Board roomCode={roomCode} player={player}  /></div>
        <div className='hidden md:block h-full w-4/12 '><Chat roomCode={roomCode} player={player} /></div>
        <div />
      </div>
      <Information2 />
    </div>
  )
}

export default GameLayout
