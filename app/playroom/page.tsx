"use client"
import { Suspense } from "react";
import GameLayout from "./components/GameLayout";
import React from 'react'
import { Loading } from "../components/Utils";

const page = () => {
    
    return (
        <Suspense fallback={<Loading/>}>
            <GameLayout/>
        </Suspense>
    )
}

export default page
