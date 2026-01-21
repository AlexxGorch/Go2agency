import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import './App.css'

interface LayoutProps {
  children: ReactNode
  isScrolled: boolean
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  setModalType: (type: 'audit' | 'discuss') => void
  setAuditModalOpen: (open: boolean) => void
}

function Layout({ children, isScrolled, mobileMenuOpen, setMobileMenuOpen, setModalType, setAuditModalOpen }: LayoutProps) {
  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <nav className="nav">
            <div className="nav-logo">
              <Link to="/" className="logo-link">Go2Agency</Link>
            </div>
            <ul className="nav-menu">
              <li><Link to="/#main" className="nav-link">Home</Link></li>
              <li><Link to="/#services" className="nav-link">Services</Link></li>
              <li><Link to="/#why-us" className="nav-link">Why us?</Link></li>
              <li><Link to="/#cases" className="nav-link">Cases</Link></li>
              <li><Link to="/#contacts" className="nav-link">Contacts</Link></li>
            </ul>
            <div className="nav-actions">
              <div className="lang-switcher" aria-label="Language switcher">
                <button className="lang-btn lang-btn-active" type="button">Ukr</button>
                <span className="lang-divider">|</span>
                <button className="lang-btn" type="button">Ru</button>
              </div>
              <button className="btn btn-secondary nav-cta" onClick={() => {
                setModalType('discuss');
                setAuditModalOpen(true);
              }}>
                Discuss Your Project
              </button>
            </div>
            <button 
              className={`burger-menu ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
            >
              <span className="burger-line"></span>
              <span className="burger-line"></span>
              <span className="burger-line"></span>
            </button>
          </nav>
          <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <ul className="mobile-menu-list">
              <li><Link to="/#main" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
              <li><Link to="/#services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Services</Link></li>
              <li><Link to="/#why-us" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Why us?</Link></li>
              <li><Link to="/#cases" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Cases</Link></li>
              <li><Link to="/#contacts" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Contacts</Link></li>
              <li><button className="btn btn-primary mobile-cta" onClick={() => {
                setMobileMenuOpen(false);
                setModalType('discuss');
                setAuditModalOpen(true);
              }}>
                Discuss Your Project
              </button></li>
            </ul>
          </div>
        </div>
      </header>

      {children}

      <footer className="footer" id="contacts">
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3 className="footer-title">Go2Agency</h3>
              <p className="footer-description">
                Digital agency: PPC advertising launch, SEO optimization, n8n automation and website development.
              </p>
              <div className="footer-contact">
                <p className="footer-email">Email: <a href="mailto:go2agency.info@gmail.com">go2agency.info@gmail.com</a></p>
                <p className="footer-telegram">Telegram: <a href="https://t.me/go2agency" target="_blank" rel="noopener noreferrer">@go2agency</a></p>
              </div>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Navigation</h3>
              <ul className="footer-links">
                <li><Link to="/#main">Home</Link></li>
                <li><Link to="/#services">Services</Link></li>
                <li><Link to="/#why-us">Why us?</Link></li>
                <li><Link to="/#cases">Cases</Link></li>
                <li><Link to="/#contacts">Contacts</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Services</h3>
              <ul className="footer-links">
                <li><Link to="/#services">SEO + Google PPC</Link></li>
                <li><Link to="/#services">AI automation</Link></li>
                <li><Link to="/#services">Website development</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Documents</h3>
              <ul className="footer-links">
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">© 2025 Go2Agency. All rights reserved.</p>
            <div className="footer-made-wrapper">
              <p className="footer-made">
                Made with love using vibe-code solutions. No developers were harmed <Heart size={16} className="heart" />
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Layout

