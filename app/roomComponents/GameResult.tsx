import React from 'react'
import { useAppSelector } from '@/lib/hooks'
import { WinnerModal,LoserModal, DrawModal } from './Modals'
const GameResult = () => {
  const player = useAppSelector((state)=>state.room.player)
  const gameOver = useAppSelector((state)=>state.game.gameOver)
  const result = useAppSelector((state)=>state.game.result)
  const userName = useAppSelector((state)=>state.room.userName)
  const oppName = useAppSelector((state)=>state.room.oppName)
  // console.log(gameOver  )
  if(gameOver==="ProperMatch"){
    if(result===player)
    return (
      <WinnerModal player={userName} />
    )
    else{
      return (
        <LoserModal player={userName} oppName={oppName}/>
      )
    }
  }
  else if(gameOver==="Resignation"){
    if(result===player)
    return (
      <WinnerModal player={userName} message={`Won by ${oppName} resignation`} />
    )
    else{
      return (
        <LoserModal player={userName} oppName={oppName} />
      )
    }
  }
  else if(gameOver==="Draw"){
    return (
      <DrawModal player={userName} />
    )
  }
  return (
    <></>
  )
}

export default GameResult