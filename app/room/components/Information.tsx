import React, { useEffect, useState } from 'react'
import { copytext } from './Utils'
import copy from '@/app/assets/copy-icon.svg'
import check from '@/app/assets/check.png'
import Image from 'next/image'
import { useAppSelector } from '@/lib/hooks'
import { ResignationModal } from './Modals'

const Information = ({userName,roomCode}) => {
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
    <div className="stats stats-vertical lg:stats-horizontal shadow rounded-sm">
    <div className="stat">
      <div className="stat-title">Your Name</div>
      <div className="stat-value">{userName}</div>
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
      <div className="stat-value " onClick={()=>document.getElementById('resignation_modal').showModal()}>Resign</div>
      <ResignationModal />
    </div>
    
  </div>
  </>
  )
}

export default Information