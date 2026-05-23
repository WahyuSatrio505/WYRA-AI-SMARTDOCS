export default function WelcomeScreen({ onSuggestionClick }) {
  return (
    <div className="welcome-screen">
      <svg className="welcome-icon" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
      <h1 className="welcome-title">SmartDocs Assistant</h1>
      <p className="welcome-subtitle">Sistem Retrieval-Augmented Generation (RAG) 100% Privat. Dibangun dengan Llama 3.2 1B & FastAPI. Silakan ajukan pertanyaan seputar laporan Document yang anda berikan</p>

      <div className="suggestion-grid">
        <div className="suggestion-card" onClick={() => onSuggestionClick('Apa fokus utama pengerjaan yang dilakukan penulis dalam sistem PMB ini?')}>
          <h3>Fokus Pengerjaan 🎯</h3>
          <p>Tanyakan tentang kontribusi penulis.</p>
        </div>
        <div className="suggestion-card" onClick={() => onSuggestionClick('Masalah apa yang terjadi pada fitur upload berkas dan bagaimana solusinya?')}>
          <h3>Limitasi Upload ⚙️</h3>
          <p>Cek kendala teknis pada frontend/backend.</p>
        </div>
        <div className="suggestion-card" onClick={() => onSuggestionClick('Bagaimana cara penulis menangani ancaman SQL Injection pada sistem?')}>
          <h3>Keamanan Data 🔒</h3>
          <p>Evaluasi mitigasi peretasan sistem.</p>
        </div>
        <div className="suggestion-card" onClick={() => onSuggestionClick('Siapa pembuat laporan ini dan apa nomor induknya?')}>
          <h3>Identitas Dokumen 📄</h3>
          <p>Verifikasi informasi halaman sampul.</p>
        </div>
      </div>
    </div>
  )
}
