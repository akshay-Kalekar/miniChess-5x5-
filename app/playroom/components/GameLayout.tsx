'use client'
import React, { useState, useEffect } from 'react'
import {initMessageApi } from '../../roomComponents/Alerts'
import MoveHistory from '../../roomComponents/MoveHistory'
import Information from './Information'
import Information2 from './Information2'
import { useSearchParams } from 'next/navigation'
import { message } from 'antd';
import Board from './Board'
import { handleRoomConnection } from '../../roomComponents/Utils'
import Chat from '../../roomComponents/Chat'
import GameResult from '../../roomComponents/GameResult'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setOppName, setPlayer, setRoomCode, setUserName } from '@/lib/features/room/roomSlice'
import Notification from '../../roomComponents/Notification'

const GameLayout: React.FC = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  dispatch(setOppName("Waiting to Join"));
  dispatch(setUserName(searchParams.get('name')));
  dispatch(setRoomCode(searchParams.get('roomcode')))
  const isHost = searchParams.get('type') || "";
  const player = useAppSelector((state) => state.room.player)
  const userName = useAppSelector((state) => state.room.userName);
  const roomCode = useAppSelector((state) => state.room.roomCode);

  const [messageApi, contextHolder] = message.useMessage();
  const [playerChar, setPlayerChar] = useState<'A' | 'B' | 'C' | ''>('C');
  const [connection, setConnection] = useState<boolean>(false)
  useEffect(() => {
    // Initialize the global messageApi
    initMessageApi(messageApi);
    async function roomConnection() {
      const isConnection: boolean = await handleRoomConnection(isHost, userName, roomCode) || false
      if (isConnection) {
        setPlayerChar(searchParams.get('type') === 'CREATE_ROOM' ? 'A' : searchParams.get('type') === 'JOIN_ROOM' ? 'B' : searchParams.get('type') === 'SPECTATE_ROOM' ? 'C' : '');
      }
      setConnection(isConnection)
    }
    roomConnection()
  }, [isHost, searchParams, messageApi, roomCode, userName]);
  if (connection === false) {
    return (
      <div>Loading</div>
    )
  }
  if (playerChar
    && player == ""
  ) {
    dispatch(setPlayer(playerChar))

  }
  return (
    <>
      {player === 'A' || player === 'B' ?
        <>
          <div className='flex flex-col '>

            <Information userName={userName} roomCode={roomCode} />
            <div className=' absolute top-4 right-4  z-10'>
              {contextHolder}
            </div>
            <GameResult />
            <Notification />
            <div className='flex gap-2 justify-around h-[75vh] items-center p-10'>
              <div className='hidden sm:block h-full w-4/12 '><MoveHistory /></div>
              <div className='h-full w-8/12'><Board roomCode={roomCode} player={player} /></div>
              <div className='hidden sm:block h-full w-4/12 '><Chat roomCode={roomCode} /></div>
              <div />
            </div>
            <Information2 />
          </div>
        </> :
        <> Please Recheck Url </>
      }
    </>
  )
}

export default GameLayout
