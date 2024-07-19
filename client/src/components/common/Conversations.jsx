import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'

const Conversations = () => {
  const {loading,conversations} = useGetConversations();
  console.log("Conversations : ",conversations);


  return (
    <div className='py-2 flex flex-col overflow-auto'>

      {conversations.map((conversation => (
        <Conversation
          key={conversation}
          emoji 
        />
      )))}

      {loading ? <span className='loading loading-spinner mx-auto'></span> : null }
    </div>
  )
}

export default Conversations
