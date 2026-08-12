import React, { useState, useRef, useEffect } from 'react';

export default function InputArea({ onSendMessage, isLoading, initialValue, onClearInitialValue }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (initialValue) {
      setMessage(initialValue);
      onClearInitialValue();
      if (textareaRef.current) {
         textareaRef.current.focus();
      }
    }
  }, [initialValue, onClearInitialValue]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      if (message === '') textareaRef.current.style.height = 'auto';
    }
  }, [message]);

  const handleSubmit = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !isLoading) {
      onSendMessage(trimmedMessage);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="input-container">
      <div className="input-box">
        <textarea
          ref={textareaRef}
          rows="1"
          placeholder="Tanya sesuatu ke Wyra AI..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button 
          className="send-btn" 
          onClick={handleSubmit}
          disabled={isLoading || !message.trim()}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
      <div style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
        Wyra AI dapat berbuat kesalahan. Periksa informasi penting pada dokumen asli.
      </div>
    </div>
  );
}
