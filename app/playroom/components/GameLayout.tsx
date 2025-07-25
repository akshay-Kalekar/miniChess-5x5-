'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
  
  if (!(player === 'A' || player === 'B')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 animated-bg flex items-center justify-center">
        <motion.div 
          className="text-center glass p-8 rounded-2xl max-w-md mx-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="text-6xl mb-4"
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            ⚠️
          </motion.div>
          <motion.h2 
            className="text-2xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Invalid Room Access
          </motion.h2>
          <motion.p 
            className="text-gray-400 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Please check your URL and try again. Make sure you have the correct room code and access permissions.
          </motion.p>
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 btn-enhanced"
            onClick={() => window.location.href = '/'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Return to Home
          </motion.button>
        </motion.div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 animated-bg">
      {/* Alert Container */}
      <div className='absolute top-4 right-4 z-50'>
        {contextHolder}
      </div>
      
      {/* Game Components */}
      <GameResult />
      <Notification />
      
      {/* Main Game Layout */}
      <motion.div 
        className="flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Information */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Information userName={userName} roomCode={roomCode} />
        </motion.div>
        
        {/* Game Board and Side Panels */}
        <motion.div 
          className='flex flex-col lg:flex-row gap-4 justify-center items-start p-4 lg:p-8 min-h-[calc(100vh-200px)]'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Move History - Hidden on mobile */}
          <motion.div 
            className='hidden lg:block lg:w-80 xl:w-96'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="glass p-4 rounded-2xl h-full">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span>📜</span>
                Move History
              </h3>
              <MoveHistory />
            </div>
          </motion.div>
          
          {/* Chess Board - Center */}
          <motion.div 
            className='flex-1 max-w-2xl mx-auto'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="glass p-6 rounded-2xl">
              <Board roomCode={roomCode} player={player} />
            </div>
          </motion.div>
          
          {/* Chat - Hidden on mobile */}
          <motion.div 
            className='hidden lg:block lg:w-80 xl:w-96'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="glass p-4 rounded-2xl h-full">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span>💬</span>
                Chat
              </h3>
              <Chat roomCode={roomCode} />
            </div>
          </motion.div>
        </motion.div>
        
        {/* Footer Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Information2 />
        </motion.div>
        
        {/* Mobile panels - Show on smaller screens */}
        <div className="lg:hidden px-4 pb-4 space-y-4">
          <motion.div 
            className="glass p-4 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span>📜</span>
              Move History
            </h3>
            <MoveHistory />
          </motion.div>
          
          <motion.div 
            className="glass p-4 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span>💬</span>
              Chat
            </h3>
            <Chat roomCode={roomCode} />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  )
}

export default GameLayout
