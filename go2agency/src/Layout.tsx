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
              <li><Link to="/#main" className="nav-link">Главная</Link></li>
              <li><Link to="/#services" className="nav-link">Направления</Link></li>
              <li><Link to="/#why-us" className="nav-link">Почему мы?</Link></li>
              <li><Link to="/#cases" className="nav-link">Кейсы</Link></li>
              <li><Link to="/#contacts" className="nav-link">Контакты</Link></li>
            </ul>
            <div className="nav-actions">
              <div className="lang-switcher" aria-label="Переключение языка">
                <button className="lang-btn lang-btn-active" type="button">Укр</button>
                <span className="lang-divider">|</span>
                <button className="lang-btn" type="button">Ру</button>
              </div>
              <button className="btn btn-secondary nav-cta" onClick={() => {
                setModalType('discuss');
                setAuditModalOpen(true);
              }}>
                Обсудить проект
              </button>
            </div>
            <button 
              className={`burger-menu ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Открыть меню"
            >
              <span className="burger-line"></span>
              <span className="burger-line"></span>
              <span className="burger-line"></span>
            </button>
          </nav>
          <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <ul className="mobile-menu-list">
              <li><Link to="/#main" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Главная</Link></li>
              <li><Link to="/#services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Направления</Link></li>
              <li><Link to="/#why-us" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Почему мы?</Link></li>
              <li><Link to="/#cases" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Кейсы</Link></li>
              <li><Link to="/#contacts" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Контакты</Link></li>
              <li><button className="btn btn-primary mobile-cta" onClick={() => {
                setMobileMenuOpen(false);
                setModalType('discuss');
                setAuditModalOpen(true);
              }}>
                Обсудить проект
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
                Digital-агентство: запуск рекламы PPC, SEO оптимизация, автоматизация на n8n и разработка сайтов.
              </p>
              <div className="footer-contact">
                <p className="footer-email">Email: <a href="mailto:go2agency.info@gmail.com">go2agency.info@gmail.com</a></p>
                <p className="footer-telegram">Telegram: <a href="https://t.me/go2agency" target="_blank" rel="noopener noreferrer">@go2agency</a></p>
              </div>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Навигация</h3>
              <ul className="footer-links">
                <li><Link to="/#main">Главная</Link></li>
                <li><Link to="/#services">Направления</Link></li>
                <li><Link to="/#why-us">Почему мы?</Link></li>
                <li><Link to="/#cases">Кейсы</Link></li>
                <li><Link to="/#contacts">Контакты</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Услуги</h3>
              <ul className="footer-links">
                <li><Link to="/#services">SEO + Google PPC</Link></li>
                <li><Link to="/#services">AI-автоматизация</Link></li>
                <li><Link to="/#services">Разработка сайтов</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Документы</h3>
              <ul className="footer-links">
                <li><Link to="/privacy">Политика конфиденциальности</Link></li>
                <li><Link to="/terms">Условия использования</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">© 2025 Go2Agency. Все права защищены.</p>
            <div className="footer-made-wrapper">
              <p className="footer-made">
                Сделано с любовью с помощью вайб-код решений. Ни один разработчик не пострадал <Heart size={16} className="heart" />
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Layout

