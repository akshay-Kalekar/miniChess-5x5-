
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setNotification } from '@/lib/features/game/gameSlice'

const Information2 = () => {
  
  const dispatch = useAppDispatch();

  const oppName = useAppSelector((state)=>state.room.oppName)
  const oppPiece = useAppSelector((state)=>state.game.oppPiece)

  return (
    <>
    <div className="stats stats-vertical lg:stats-horizontal shadow rounded-sm">
    <div className="stat">
      <div className="stat-title">Opponent Name</div>
      <div className="stat-value">{oppName}</div>
    </div>
  
   
    <div className="stat">
      <div className="stat-title">Piece Left</div>
      <div className="stat-value">{oppPiece}</div>
    </div>
    <div className="stat hover:text-green-500">
      <div className="stat-title "></div>
      <div className="stat-value" onClick={()=> dispatch(setNotification("rematchRequest"))}>Rematch</div>
    </div>
  
  
   
    <div className="stat hover:text-blue-500">
      <div className="stat-title"></div>
      <div className="stat-value" onClick={()=> dispatch(setNotification("drawRequest"))}>Draw</div>
    </div>
  </div>
  </>
  )
}

export default Information2