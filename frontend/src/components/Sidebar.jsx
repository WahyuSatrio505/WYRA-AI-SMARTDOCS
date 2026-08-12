import React, { useRef, useState, useEffect } from 'react';

export default function Sidebar({ onNewChat, onBackHome, onSystemStatusChange, onOpenSettings, isOpen, onClose }) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeDoc, setActiveDoc] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const rawUrl = localStorage.getItem('api_url') || import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    const API_BASE_URL = rawUrl.replace(/\/$/, '');
    fetch(`${API_BASE_URL}/api/v1/document`)
      .then(res => res.json())
      .then(data => {
        if (data && data.document) setActiveDoc(data.document);
      })
      .catch(err => console.error("Gagal memuat dokumen aktif:", err));
  }, []);

  const handleUploadClick = () => {
    if (!isUploading) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert("⚠️ Hanya file PDF yang diperbolehkan.");
      return;
    }

    setIsUploading(true);
    if (onSystemStatusChange) onSystemStatusChange('uploading');

    const formData = new FormData();
    formData.append("file", file);

    try {
      const rawUrl = localStorage.getItem('api_url') || import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const API_BASE_URL = rawUrl.replace(/\/$/, '');
      const response = await fetch(`${API_BASE_URL}/api/v1/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setActiveDoc(file.name);
        alert("✅ Upload & Ingestion Sukses!\nDatabase AI berhasil diperbarui dengan dokumen terbaru.");
      } else {
        alert("❌ Error: " + (data.detail || data.message || "Terjadi kesalahan."));
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Gagal terhubung ke server backend. Pastikan Uvicorn FastAPI sedang berjalan di port 8000.");
    } finally {
      setIsUploading(false);
      if (onSystemStatusChange) onSystemStatusChange('idle');
      e.target.value = ""; // reset input file
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }}
        />
      )}
      <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
        <div className="new-chat-btn" onClick={() => { onNewChat(); onClose(); }} style={{ marginBottom: '1rem' }}>
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14"></path>
        </svg>
        New Chat
      </div>

      <div 
        className="upload-doc-btn" 
        onClick={handleUploadClick} 
        style={{ 
          display: 'flex', alignItems: 'center', gap: '0.75rem', 
          backgroundColor: isUploading ? 'var(--border)' : '#10b981', 
          color: isUploading ? 'var(--text-secondary)' : 'white', 
          padding: '0.75rem 1rem', borderRadius: '8px', 
          cursor: isUploading ? 'not-allowed' : 'pointer', 
          marginBottom: '1rem', transition: 'all 0.2s', fontWeight: '500',
          boxShadow: isUploading ? 'none' : '0 4px 12px rgba(16, 185, 129, 0.2)'
        }}
        onMouseOver={(e) => { if (!isUploading) e.currentTarget.style.backgroundColor = '#059669'; }}
        onMouseOut={(e) => { if (!isUploading) e.currentTarget.style.backgroundColor = '#10b981'; }}
      >
        {isUploading ? (
          <div className="spinner" style={{ width: '16px', height: '16px', border: '2px solid transparent', borderTopColor: 'currentColor', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        ) : (
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        )}
        {isUploading ? 'Mengunggah...' : 'Upload Document +'}
      </div>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".pdf" onChange={handleFileChange} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div 
        className="back-home-btn" 
        onClick={onBackHome} 
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', backgroundColor: 'var(--bg-card)', padding: '0.75rem 1rem', borderRadius: '8px', cursor: 'pointer', marginBottom: '2rem', border: '1px solid var(--border)', transition: 'all 0.2s', fontWeight: '500' }}
        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'white'; }}
        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-card)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Beranda
      </div>

      <div className="nav-label">Dokumen Aktif</div>
      <div className="history-list">
        {activeDoc ? (
          <div className="history-item" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--accent)', color: 'var(--accent)' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={activeDoc}>
              {activeDoc}
            </span>
          </div>
        ) : (
          <div className="history-item" style={{ opacity: 0.5, cursor: 'default' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            Belum ada dokumen
          </div>
        )}
      </div>

      <div className="user-menu">
        <div className="history-item" onClick={toggleDarkMode}>
          {isDarkMode ? (
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </div>
        <div className="history-item" onClick={onOpenSettings}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          Settings
        </div>
        <div className="history-item" style={{ color: '#ef4444' }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Log Out
        </div>
      </div>
    </aside>
    </>
  )
}
