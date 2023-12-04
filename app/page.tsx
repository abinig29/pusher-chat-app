"use client"
import { useState, useEffect, useRef } from 'react';
import pusher from '@/lib/pusher';
import { ChatForm } from './_component/chat-form';
type messageType = {
  msg: string, align: 'left' | 'right'
}
const IndexPage = () => {
  const [userName, setUserName] = useState("")
  const [startMessage, setStartMessage] = useState(false)

  const [messages, setMessages] = useState<messageType[]>(
    [
      // { msg: "hi there", align: "left" },
      // { msg: "hi man", align: "right" },
      // { msg: "hi man", align: "right" },
    ]
  );
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', (data: any) => {
      setMessages((pre: any) => {
        let newMessage;
        if (data.userName === userName) {
          newMessage = { msg: data.message, align: 'right' }
        }
        else {
          newMessage = { msg: data.message, align: 'left' }
        }
        return [...pre, newMessage]
      });
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);



  return (
    <div className='max-w-[100px] mx-auto min-h-screen grid place-content-center'>
      {!startMessage ? <div className='flex gap-2 items-center '>
        <input
          type="text"
          placeholder="Type your message"
          value={userName}
          className='w-full border rounded-full px-4 py-2 '
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={() => {
          if (userName.length > 2)
            setStartMessage(true)
        }

        } className='px-3 py-1 text-white rounded-full bg-slate-800 disabled:bg-slate-800/20' disabled={userName.length < 3}>save</button>
      </div> : null}
      {!startMessage && <h2 className='mb-10 ml-3 text-gray-500/40'>Type your user name <span className='text-sm font-normal'>{"(of length gt 3)"}</span></h2>}



      <div className='h-[300px] bg-slate-600/10 min-w-[400px] p-10 overflow-y-auto flex flex-col items-start gap-3 scroller-hidden' ref={chatContainerRef}>
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
      <ChatForm userName={userName} disable={!startMessage} />
    </div>
  );
};

export default IndexPage;
