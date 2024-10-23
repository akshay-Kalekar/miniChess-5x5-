import React from 'react'
import { useAppSelector } from '../../lib/hooks'


const MoveHistory = () => {
    const lastMoves = useAppSelector((state) => state.game.moveHistory) ||[];
    // Group moves into pairs of two
    const groupedMoves = [];
    for (let i = 0; i < lastMoves.length; i += 2) {
        groupedMoves.push([lastMoves[i], lastMoves[i + 1] || null]); // Handle odd number of moves
    }

    return (
        <div className=' flex flex-col justify-center items-center pb-4'>
            <h3 className="text-lg font-semibold ">Moves History</h3>
        <div className="h-[65vh] w-full  overflow-x-auto text-center  scrollbar-thin ">
            <table className="table table-pin-rows h-fit overflow-x-auto rounded-md ">
                <thead className=''>
                    <tr className='text-white'>
                        <th className="border text-left w-1/2">Player A</th>
                        <th className="border text-left w-1/2">Player B</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {groupedMoves.map((pair, index) => (
                        <tr key={index} className='h-max-4'>
                            <td className="border px-4 py-2 ">{pair[0]}</td>
                            <td className="border px-4 py-2 ">{pair[1] ? pair[1] : '-'}</td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
                    </div>
    );
}

export default MoveHistory