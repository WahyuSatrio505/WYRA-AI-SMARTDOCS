export default function Header() {
  return (
    <header>
      <div className="logo-area">
        <svg width="24" height="24" fill="none" stroke="var(--accent)" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-1 4-1S10 10 9 12z"></path>
          <path d="M12 9s3 .5 4 2c1.1 1.45 2 4 2 4S14.5 16 12 9z"></path>
        </svg>
        <span>WYRA AI</span>
      </div>
      <div className="profile-area">
        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Wahyu</span>
        <div className="avatar">W</div>
      </div>
    </header>
  )
}
