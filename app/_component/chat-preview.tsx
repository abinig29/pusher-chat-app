import { messageType } from '@/type/message'
import React from 'react'

const ChatPreview = ({ messages, ref }: { messages: messageType[], ref: any }) => {
    return (
        <div className='h-[300px] bg-slate-600/10 min-w-[400px] p-10 overflow-y-auto flex flex-col items-start gap-3 scroller-hidden' ref={ref}>
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`bg-slate-800 text-white px-3 py-1 
         ${msg.align === `right` ? `self-end rounded-l-full  rounded-tr-full` : `rounded-r-full  rounded-tl-full`}`}
                >
                    <h4>{msg.msg}</h4>
                </div>
            ))}
        </div>
    )
}

export default ChatPreview