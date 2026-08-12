import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsModal({ isOpen, onClose, onClearChat, onClearDatabase }) {
  const [temperature, setTemperature] = useState(0.2);
  const [maxTokens, setMaxTokens] = useState(512);
  const [systemPrompt, setSystemPrompt] = useState("Anda adalah Wyra AI, asisten dokumen yang cerdas dan teliti.");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}
        onClick={onClose}
      >
        <motion.div 
          className="modal-content"
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            backgroundColor: 'var(--bg-sidebar)', width: '90%', maxWidth: '500px',
            borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            border: '1px solid var(--border)'
          }}
          onClick={e => e.stopPropagation()} // Prevent clicking inside modal from closing it
        >
          {/* Header */}
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-header)' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
              Pengaturan Sistem
            </h2>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '1.5rem', maxHeight: '60vh', overflowY: 'auto' }}>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Model Configuration (Llama 3.2 1B)</h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>Temperature (Kreativitas)</label>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>{temperature}</span>
                </div>
                <input type="range" min="0" max="1" step="0.1" value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent)' }} />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Angka kecil (0.1) lebih akurat/kaku, angka besar (0.8) lebih kreatif.</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>Max Tokens (Panjang Jawaban)</label>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>{maxTokens}</span>
                </div>
                <input type="range" min="128" max="2048" step="128" value={maxTokens} onChange={(e) => setMaxTokens(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent)' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>System Prompt (Karakter AI)</label>
                <textarea 
                  value={systemPrompt} 
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)', resize: 'vertical', minHeight: '80px', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Data & Memori</h3>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={onClearChat}
                  style={{ flex: 1, padding: '0.75rem', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s' }}
                  onMouseOver={e => { e.target.style.backgroundColor = 'var(--border)' }}
                  onMouseOut={e => { e.target.style.backgroundColor = 'var(--bg-main)' }}
                >
                  Bersihkan Chat
                </button>
                <button 
                  onClick={onClearDatabase}
                  style={{ flex: 1, padding: '0.75rem', backgroundColor: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '8px', color: '#dc2626', cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s' }}
                  onMouseOver={e => { e.target.style.backgroundColor = '#fecaca' }}
                  onMouseOut={e => { e.target.style.backgroundColor = '#fee2e2' }}
                >
                  Hapus Database Vektor
                </button>
              </div>
            </div>

          </div>
          
          {/* Footer */}
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg-main)', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              onClick={onClose}
              style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
            >
              Simpan & Tutup
            </button>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
