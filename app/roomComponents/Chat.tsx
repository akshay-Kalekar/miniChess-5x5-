import { onValue, ref, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { database } from '../firebase/database'
import { useAppSelector } from '@/lib/hooks'
interface ChatProps {
    roomCode: string
}
const Chat:React.FC<ChatProps> = ({ roomCode }) => {
    const {userName} = useAppSelector((state)=>state.room)
    const [messages, setMessages] = useState<{ message: string, sender: string }[]>([])
    const [newMessage, setNewMessage] = useState('')

    const sendMessage = () => {
        if (newMessage.trim() === '') return; // Avoid sending empty messages
        const messageObj = { message: newMessage, sender: userName }
        const updatedMessages = [messageObj,...messages]
        set(ref(database, `${roomCode}/chat`), {
            message: updatedMessages
        })
        setNewMessage('') // Clear the input after sending the message
    }

    useEffect(() => {
        const chatRef = ref(database, `${roomCode}/chat`)
        const unsubscribe = onValue(chatRef, (snapshot) => {
            const data = snapshot.val()
            if (data && data.message) {
            
                setMessages(data.message)
            }
        })

        return () => unsubscribe()
    }, [roomCode])

    return (
        <div className='flex flex-col justify-between h-full pb-4  overflow-y-scroll border-2 bg-black/20 rounded-md scrollbar-thin'>
            <div className='text-center text-4xl stat-value  py-4  rounded-sm h-full w-full'> Chat room</div>
            <div>

            <div className='flex flex-col-reverse px-2 '>

            {messages.map((message, index) => {
                if (message.sender === userName) {
                    return (
                        <div key={index} className='chat chat-end'>
                            <div className="chat-bubble chat-bubble-error">
                                {message.message}
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div key={index} className='chat chat-start'>
                            <div className="chat-bubble chat-bubble-warning">
                                <div className='text-xs underline-offset-2 underline text-black/80  tracking-widest '>
                                    {message.sender}
                            </div>

                                {message.message}
                            </div>
                        </div>
                    )
                }
            })}

            </div>
            <div className='chat gap-2 px-4 flex flex-wrap justify-center '>
                <input
                    type="text"
                    className="input input-error w-full"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage()
                        }
                    }}
                    
                />
                <button className="btn btn-error w-6/12" onClick={sendMessage}>
                    Send
                </button>
            </div>
                    </div>
        </div>
    )
}

export default Chat
