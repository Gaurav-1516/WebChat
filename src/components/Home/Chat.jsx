import React, { useContext } from 'react'
import {AiOutlineVideoCamera,AiOutlineMore,AiOutlineUserAdd} from 'react-icons/ai'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../../context/ChatContext'

function Chat() {

  const {data} = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
            <AiOutlineUserAdd size={30} color='white'/>
            <AiOutlineVideoCamera size={30} color='white'/>
            <AiOutlineMore size={30} color='white'/>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat