import { configureStore } from '@reduxjs/toolkit'
import roomReducer from './features/room/roomSlice'
import gameReducer from './features/game/gameSlice'
export const GameStoreProvider = () =>{
    return configureStore({
        reducer:{
            room:roomReducer,
            game:gameReducer
        },
    })
}


// Infer the type of GameStoreProvider
export type AppStore = ReturnType<typeof GameStoreProvider>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']