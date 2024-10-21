
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setNotification } from '@/lib/features/game/gameSlice'

const Information2 = () => {
  
  const dispatch = useAppDispatch();
  const playerBName = useAppSelector((state)=>state.room.playerBName)
  const oppPiece = useAppSelector((state)=>state.game.oppPiece)

  return (
    <>
    <div className="stats stats-vertical lg:stats-horizontal shadow rounded-sm">
    <div className="stat">
      <div className="stat-title">Player B</div>
      <div className="stat-value">{playerBName}</div>
    </div>
  
   
    <div className="stat">
      <div className="stat-title">Piece Left</div>
      <div className="stat-value">{oppPiece}</div>
    </div>
  </div>
  </>
  )
}

export default Information2