import React, { useEffect, useState } from 'react'
import { copytext } from '../roomComponents/Utils'
import copy from '@/app/assets/copy-icon.svg'
import check from '@/app/assets/check.svg'
import Image from 'next/image'
import { useAppSelector } from '@/lib/hooks'
import { setNotification } from '@/lib/features/game/gameSlice'
import { useAppDispatch } from '@/lib/hooks'
interface  InformationProps {
  roomCode: string
}
const Information = ({roomCode}: InformationProps) => {
  const dispatch = useAppDispatch();
  const playerAName  = useAppSelector((state)=>state.room.playerAName)
  
  const myPiece = useAppSelector((state)=>state.game.myPiece)
  const [copied,setCopied] = useState(copy);
  useEffect(()=>{
    if(copied===check){
    setTimeout(()=>{
      setCopied(copy)
    },2000)
  }
  },[copied])
  return (
    <>
    <div className="stats stats-vertical sm:stats-horizontal shadow rounded-sm">
    <div className="stat">
      <div className="stat-title">Player A</div>
      <div className="stat-value">{playerAName}</div>
    </div>
    <div className="stat">
      <div className="stat-title">Piece Left</div>
      <div className="stat-value">{myPiece}</div>
    </div>
  
    <div className="stat hover:text-white" onClick={()=>{ copytext(roomCode); setCopied(check)}} >
      <div className=" ">Room code</div>
      <div className="stat-value flex  gap-2 justify-center cursor-copy p-2 border-white/40  rounded-md items-center " >{roomCode}<Image src={copied} height={20} width={20} className='relative -bottom-1' alt="copy-icon"/></div>
    </div>
  
    <div className="stat hover:text-red-500  ">
      <div className="stat-title"></div>
      <div className="stat-value " onClick={()=>dispatch(setNotification("Homepage"))}>Home Page</div>
    </div>
    
  </div>
  </>
  )
}

export default Information