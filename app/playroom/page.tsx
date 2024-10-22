"use client"
import { Suspense } from "react";
import GameLayout from "./components/GameLayout";
import React from 'react'

const page = () => {
    
    return (
        <Suspense fallback={<div>Loading . . . </div>}>
            <GameLayout/>
        </Suspense>
    )
}

export default page
