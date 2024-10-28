'use client'
import React, { useState, useEffect, Suspense } from 'react'
import { initMessageApi } from '../../roomComponents/Alerts'
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
import { Loading } from '@/app/components/Utils'
import { set } from 'firebase/database'

const GameLayout: React.FC = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setOppName("Waiting to Join"));
    dispatch(setRoomCode(searchParams.get('roomcode')))
    dispatch(setUserName(searchParams.get('name')));
    dispatch(setPlayer(searchParams.get('type') === 'CREATE_ROOM' ? 'A' : searchParams.get('type') === 'JOIN_ROOM' ? 'B' : ''));
  }, [dispatch, searchParams])
  const isHost = searchParams.get('type') || "";
  const player = useAppSelector((state) => state.room.player)
  const userName = useAppSelector((state) => state.room.userName);
  const roomCode = useAppSelector((state) => state.room.roomCode) || searchParams.get('roomcode') || "";

  const [messageApi, contextHolder] = message.useMessage();
  const [connection, setConnection] = useState<boolean>(false)
  useEffect(() => {
    // Initialize the global messageApi
    initMessageApi(messageApi);
    async function roomConnection() {
      try {

        const isConnection: boolean = await handleRoomConnection(isHost, userName, roomCode) || false
        console.log(isConnection);
        setTimeout(() => {
          setConnection(isConnection);
        }, 2000);
      } catch (e) {
        console.log(e);
      }

    }
    roomConnection()

  }, [isHost, searchParams, messageApi, roomCode, userName]);
  if(!connection) {
    return <Loading />
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
