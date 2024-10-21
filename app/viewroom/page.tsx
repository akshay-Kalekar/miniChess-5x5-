import React, { Suspense } from 'react'
import GameLayout from './GameLayout'

const page = () => {

  return (
    <Suspense fallback={<div>Loading . . . </div>}>
            <GameLayout/>
    </Suspense>
  )
}

export default page