"use client"
import { Button } from '@/component/ui/button'
import { Send } from 'lucide-react';
import { useState } from 'react';
export const ChatForm = ({ disable, userName }: { disable: boolean, userName: string }) => {
    const [newMessage, setNewMessage] = useState('');
    const sendMessage = (e: any) => {
        e.preventDefault();
        if (newMessage) {
            const messageData = {
                message: newMessage,
                userName
            };
            fetch('https://candidate.yewubetsalone.com/api/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });
            setNewMessage('');
        }
    };
    return <form onSubmit={sendMessage}>
        <div className='flex justify-end py-4 min-w-[400px] gap-4'>
            <input
                disabled={disable}
                type="text"
                placeholder="Type your message"
                value={newMessage}
                className='w-full border rounded-full px-4 py-2 '
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
                disabled={disable}
                type='submit' className='flex justify-center gap-2 bg-slate-500 text-white
            items-center px-4 py-2 rounded-full
            focus-visible:ring-2 
            focus-visible:ring-offset-2
            disabled:pointer-events-none
            disabled:opacity-50 ' >Send  <Send /></button>
        </div >
    </form>
}

