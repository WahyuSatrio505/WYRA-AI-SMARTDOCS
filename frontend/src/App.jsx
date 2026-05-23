import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import ChatWindow from './components/ChatWindow';
import InputArea from './components/InputArea';
import LandingPage from './components/LandingPage';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestionText, setSuggestionText] = useState('');

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

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      setMessages([...newMessages, { text: data.answer || "Maaf, saya tidak dapat merespon saat ini.", type: 'ai' }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { text: "⚠️ Gagal terhubung ke server. Pastikan Uvicorn FastAPI sedang berjalan di port 8000.", type: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (currentView === 'landing') {
    return <LandingPage onEnterChat={() => setCurrentView('chat')} />;
  }

  return (
    <>
      <Sidebar onNewChat={handleNewChat} onBackHome={() => setCurrentView('landing')} />
      <main className="main-content">
        <Header />

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
      </main>
    </>
  );
}

export default App;
