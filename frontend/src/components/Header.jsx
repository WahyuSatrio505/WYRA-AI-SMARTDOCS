export default function Header({ showGraph, toggleGraph, toggleSidebar }) {
  return (
    <header>
      <div className="logo-area">
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <svg width="24" height="24" fill="none" stroke="var(--accent)" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-1 4-1S10 10 9 12z"></path>
          <path d="M12 9s3 .5 4 2c1.1 1.45 2 4 2 4S14.5 16 12 9z"></path>
        </svg>
        <span>WYRA AI</span>
      </div>
      <div className="profile-area">
        {toggleGraph && (
          <button 
            onClick={toggleGraph} 
            style={{
              background: showGraph ? 'var(--accent)' : 'transparent',
              color: showGraph ? 'white' : 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '0.4rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 0.2s',
              marginRight: '0.5rem'
            }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            System View
          </button>
        )}
        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Wahyu</span>
        <div className="avatar">W</div>
      </div>
    </header>
  )
}
