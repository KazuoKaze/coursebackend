'use client'

import React, { useEffect, useState } from 'react'

import './admin-chat.css'

const API_URL = 'http://localhost:3000/api'

export default function AdminChatView() {
  const [conversations, setConversations] = useState<any[]>([])

  const [selectedConversation, setSelectedConversation] = useState<any>(null)

  const [messages, setMessages] = useState<any[]>([])

  const [reply, setReply] = useState('')

  // LOAD CONVERSATIONS
  async function loadConversations() {
    const res = await fetch(`${API_URL}/support-conversations?sort=-lastMessageAt`, {
      credentials: 'include',
    })

    const data = await res.json()

    setConversations(data.docs || [])
  }

  // LOAD MESSAGES
  async function loadMessages(conversationId: string) {
    const res = await fetch(
      `${API_URL}/get-conversation-messages?conversationId=${conversationId}`,
      {
        credentials: 'include',
      },
    )

    const data = await res.json()

    setMessages(data.messages || [])
  }

  // SEND REPLY
  async function sendReply() {
    if (!reply.trim() || !selectedConversation) return

    await fetch(`${API_URL}/send-message`, {
      method: 'POST',

      credentials: 'include',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        conversationId: selectedConversation.id,

        message: reply,
      }),
    })

    setReply('')

    loadMessages(selectedConversation.id)

    loadConversations()
  }

  // INIT
  useEffect(() => {
    loadConversations()
  }, [])

//   return (
//     <div
//       style={{
//         display: 'flex',
//         height: '100vh',
//       }}
//     >
//       {/* SIDEBAR */}
//       <div
//         style={{
//           width: '320px',
//           borderRight: '1px solid #ddd',
//           overflow: 'auto',
//         }}
//       >
//         <h2
//           style={{
//             padding: '20px',
//           }}
//         >
//           Support Chats
//         </h2>

//         {conversations.map((conv) => (
//           <div
//             key={conv.id}
//             onClick={() => {
//               setSelectedConversation(conv)

//               loadMessages(conv.id)
//             }}
//             style={{
//               padding: '16px',
//               cursor: 'pointer',
//               borderBottom: '1px solid #eee',
//               background: selectedConversation?.id === conv.id ? '#f5f5f5' : 'white',
//             }}
//           >
//             <div
//               style={{
//                 fontWeight: 600,
//               }}
//             >
//               {conv.subject}
//             </div>

//             <div
//               style={{
//                 fontSize: '14px',
//                 opacity: 0.7,
//               }}
//             >
//               {conv.lastMessage}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* CHAT AREA */}
//       <div
//         style={{
//           flex: 1,
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//       >
//         {/* MESSAGES */}
//         <div
//           style={{
//             flex: 1,
//             padding: '20px',
//             overflow: 'auto',
//           }}
//         >
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               style={{
//                 display: 'flex',
//                 justifyContent: msg.senderType === 'admin' ? 'flex-end' : 'flex-start',
//                 marginBottom: '12px',
//               }}
//             >
//               <div
//                 style={{
//                   background: msg.senderType === 'admin' ? '#000' : '#f1f1f1',

//                   color: msg.senderType === 'admin' ? '#fff' : '#111',

//                   padding: '12px 14px',

//                   borderRadius: '14px',

//                   maxWidth: '70%',
//                 }}
//               >
//                 {msg.message}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* INPUT */}
//         {selectedConversation && (
//           <div
//             style={{
//               padding: '16px',
//               borderTop: '1px solid #ddd',
//               display: 'flex',
//               gap: '10px',
//             }}
//           >
//             <input
//               value={reply}
//               onChange={(e) => setReply(e.target.value)}
//               placeholder="Type reply..."
//               style={{
//                 flex: 1,
//                 padding: '12px',
//               }}
//             />

//             <button onClick={sendReply}>Send</button>
//           </div>
//         )}
//       </div>
//     </div>
    //   )
    
    return (
      <div className="admin-chat-layout">
        {/* SIDEBAR */}
        <div className="admin-chat-sidebar">
          <div className="admin-chat-sidebar-header">Support Chats</div>

          <div className="admin-chat-conversations">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => {
                  setSelectedConversation(conv)

                  loadMessages(conv.id)
                }}
                className={`admin-chat-conversation ${
                  selectedConversation?.id === conv.id ? 'active' : ''
                }`}
              >
                <div className="admin-chat-subject">{conv.userName || conv.subject}</div>

                <div className="admin-chat-last-message">{conv.lastMessage}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN CHAT */}
        <div className="admin-chat-main">
          {/* TOPBAR */}
          <div className="admin-chat-topbar">
            <div>
              <div className="admin-chat-user-name">
                {selectedConversation ? selectedConversation.subject : 'Select a chat'}
              </div>

              <div className="admin-chat-status">Support conversation</div>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="admin-chat-messages">
            <div className="admin-chat-messages-inner">
              {messages.map((msg) => (
                <div key={msg.id} className={`admin-chat-message-row ${msg.senderType}`}>
                  <div className="admin-chat-bubble">{msg.message}</div>
                </div>
              ))}
            </div>
          </div>

          {/* INPUT */}
          {selectedConversation && (
            <div className="admin-chat-input-area">
              <div className="admin-chat-input-wrap">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type reply..."
                  className="admin-chat-input"
                />

                <button onClick={sendReply} className="admin-chat-send-btn">
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
}



