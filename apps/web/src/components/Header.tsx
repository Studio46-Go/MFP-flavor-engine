export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="header-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2c1 3 3 5 6 6-3 1-5 3-6 6-1-3-3-5-6-6 3-1 5-3 6-6z" />
              <path d="M5 16c.5 1.5 1.5 2.5 3 3-1.5.5-2.5 1.5-3 3-.5-1.5-1.5-2.5-3-3 1.5-.5 2.5-1.5 3-3z" />
            </svg>
          </span>
          <div>
            <h1 className="header-title">MFP Flavor Engine</h1>
            <p className="header-subtitle">
              20-Dimensional Culinary Intelligence
            </p>
          </div>
        </div>
        <span className="header-badge">v1.1</span>
      </div>
    </header>
  );
}
