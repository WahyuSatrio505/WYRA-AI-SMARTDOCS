import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import ChatWindow from './components/ChatWindow';
import InputArea from './components/InputArea';
import LandingPage from './components/LandingPage';
import ArchitectureGraph from './components/ArchitectureGraph';
import SettingsModal from './components/SettingsModal';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestionText, setSuggestionText] = useState('');
  const [showGraph, setShowGraph] = useState(false);
  const [systemStatus, setSystemStatus] = useState('idle'); // 'idle', 'uploading', 'retrieving', 'generating'
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNewChat = () => {
    setMessages([]);
    setIsLoading(false);
  };

  const handleSuggestionClick = (text) => {
    setSuggestionText(text);
  };

  const clearSuggestion = () => {
    setSuggestionText('');
  };

  const handleSendMessage = async (text) => {
    const newMessages = [...messages, { text, type: 'user' }];
    setMessages(newMessages);
    setIsLoading(true);
    setSystemStatus('retrieving'); // 1. Minta ke Vector Store

    try {
      const rawUrl = localStorage.getItem('api_url') || import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const API_BASE_URL = rawUrl.replace(/\/$/, '');
      const response = await fetch(`${API_BASE_URL}/api/v1/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) throw new Error("Network response was not ok");
      
      setSystemStatus('generating'); // 2. Dapat konteks, mulai ke LLM
      const data = await response.json();

      setMessages([...newMessages, { text: data.answer || "Maaf, saya tidak dapat merespon saat ini.", type: 'ai' }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { text: "⚠️ Gagal terhubung ke server. Pastikan Uvicorn FastAPI sedang berjalan di port 8000.", type: 'ai' }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => setSystemStatus('idle'), 1500); // 3. Kembali idle setelah delay
    }
  };

  if (currentView === 'landing') {
    return <LandingPage onEnterChat={() => setCurrentView('chat')} />;
  }

  return (
    <>
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onClearChat={handleNewChat}
        onClearDatabase={() => alert('Fitur hapus Vector Database bisa disambungkan ke backend FastAPI Anda!')}
      />

      <Sidebar 
        onNewChat={handleNewChat} 
        onBackHome={() => setCurrentView('landing')} 
        onSystemStatusChange={setSystemStatus} 
        onOpenSettings={() => setIsSettingsOpen(true)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div style={{ display: 'flex', flex: 1, width: '100%', overflow: 'hidden' }}>
        <motion.main 
          className="main-content"
          initial={false}
          animate={{ width: showGraph ? '55%' : '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ flex: 'none', display: 'flex', flexDirection: 'column' }}
        >
          <Header 
            showGraph={showGraph} 
            toggleGraph={() => setShowGraph(!showGraph)} 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {messages.length === 0 && !isLoading ? (
            <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
          ) : (
            <ChatWindow messages={messages} isLoading={isLoading} />
          )}

          <InputArea
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            initialValue={suggestionText}
            onClearInitialValue={clearSuggestion}
          />
        </motion.main>

        <AnimatePresence>
          {showGraph && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '45%', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ overflow: 'hidden', flex: 'none' }}
            >
              <ArchitectureGraph status={systemStatus} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
