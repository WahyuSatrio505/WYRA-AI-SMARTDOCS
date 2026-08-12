import React, { useEffect, useRef } from 'react';

export default function ChatWindow({ messages, isLoading }) {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="chat-window">
      {messages.map((msg, idx) => (
        <div key={idx} className={`message-wrapper ${msg.type}`}>
          {msg.type === 'ai' && (
            <div className="msg-avatar ai-avatar-icon">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a6 6 0 1 1 6-6 6 6 0 0 1-6 6z"/>
                <path d="M12 8v4l3 3"/>
              </svg>
            </div>
          )}
          
          <div className="message-bubble">{msg.text}</div>
          
          {msg.type === 'user' && (
            <div className="msg-avatar user-avatar-icon">
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>W</span>
            </div>
          )}
        </div>
      ))}
      
      {isLoading && (
        <div className="message-wrapper ai">
          <div className="msg-avatar ai-avatar-icon">
            <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a6 6 0 1 1 6-6 6 6 0 0 1-6 6z"/>
              <path d="M12 8v4l3 3"/>
            </svg>
          </div>
          <div className="message-bubble">
            <div className="typing-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </div>
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
}
