"use client"
import { useState, useEffect, useRef } from 'react';
import pusher from '@/lib/pusher';
import { ChatForm } from './_component/chat-form';
import ChatPreview from './_component/chat-preview';
import { messageType } from '@/type/message';

const IndexPage = () => {
  const [userName, setUserName] = useState("")
  const [startMessage, setStartMessage] = useState(false)
  const [messages, setMessages] = useState<messageType[]>(
    []
  );
  console.log(messages)
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



      <ChatPreview messages={messages} ref={chatContainerRef} />
      <ChatForm userName={userName} disable={!startMessage} />
    </div>
  );
};

export default IndexPage;
