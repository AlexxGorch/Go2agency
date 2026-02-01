import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Layout from './Layout'
import { submitContactForm } from './api/contact'
import type { ContactFormSource, ContactFormState } from './types/contact'
import './App.css'

function PrivacyPolicy() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'audit' | 'discuss'>('audit');
  const [language, setLanguage] = useState<'ru' | 'en'>('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    site: '',
    agree: false
  });
  const [phoneCountry, setPhoneCountry] = useState('+380');
  const [auditFormState, setAuditFormState] = useState<ContactFormState>({
    loading: false,
    success: false,
    error: null
  });

  useEffect(() => {
    // Читаем язык из query параметра или localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const savedLang = typeof window !== 'undefined' ? localStorage.getItem('go2-lang') : null;
    
    if (langParam === 'ru' || langParam === 'en') {
      setLanguage(langParam);
    } else if (savedLang === 'ru' || savedLang === 'en') {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    if (mobileMenuOpen || auditModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen, auditModalOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language === 'ru' ? 'ru' : 'en';
    }
  }, [language]);

  const t = (ru: string, en: string) => (language === 'ru' ? ru : en);

  const formatPhoneNumber = (value: string, countryCode: string) => {
    const digits = value.replace(/\D/g, '');
    if (countryCode === '+380') {
      if (digits.length <= 2) return digits;
      if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
      if (digits.length <= 7) return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
      return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
    } else if (countryCode === '+1') {
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    } else if (countryCode === '+34') {
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
    } else if (countryCode === '+39') {
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
      if (digits.length <= 9) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9, 13)}`;
    } else if (countryCode === '+48') {
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
    } else if (countryCode === '+44') {
      if (digits.length <= 3) return digits;
      if (digits.length <= 7) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
      return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7, 11)}`;
    } else if (countryCode === '+49') {
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 11)}`;
    } else if (countryCode === '+33') {
      if (digits.length <= 1) return digits;
      if (digits.length <= 3) return `${digits.slice(0, 1)} ${digits.slice(1)}`;
      if (digits.length <= 5) return `${digits.slice(0, 1)} ${digits.slice(1, 3)} ${digits.slice(3)}`;
      if (digits.length <= 7) return `${digits.slice(0, 1)} ${digits.slice(1, 3)} ${digits.slice(3, 5)} ${digits.slice(5)}`;
      return `${digits.slice(0, 1)} ${digits.slice(1, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
    }
    return digits;
  };

  return (
    <>
    <Layout 
      isScrolled={isScrolled}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
      setModalType={setModalType}
      setAuditModalOpen={setAuditModalOpen}
      language={language}
      setLanguage={setLanguage}
    >
      <section className="legal-page">
      <div className="container">
        <h1>Privacy Policy</h1>
        <p>This page will be updated later.</p>
      </div>
    </Layout>
    {auditModalOpen && (
      <div className="modal-overlay" onClick={() => setAuditModalOpen(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setAuditModalOpen(false)}>
            <X size={24} />
          </button>
          <h2 className="modal-title">{modalType === 'audit' ? t('Бесплатный аудит', 'Book a Free Audit') : t('Обсудить проект', 'Start a Project')}</h2>
          <form className="audit-form" onSubmit={async (e) => {
            e.preventDefault();
            const source: ContactFormSource = modalType === 'discuss' ? 'header_discuss_project' : 'hero_free_audit';
            setAuditFormState({ loading: true, success: false, error: null });
            try {
              await submitContactForm({
                name: formData.name,
                email: formData.email,
                phone: `${phoneCountry} ${formData.phone}`,
                site: formData.site,
                agree: formData.agree,
                source
              });
              setAuditFormState({ loading: false, success: true, error: null });
              setFormData({ name: '', email: '', phone: '', site: '', agree: false });
              setTimeout(() => {
                setAuditModalOpen(false);
                setAuditFormState({ loading: false, success: false, error: null });
              }, 2000);
            } catch (error) {
              setAuditFormState({
                loading: false,
                success: false,
                error: error instanceof Error ? error.message : 'Failed to submit form'
              });
            }
          }}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                {t('Имя', 'Name')} <span className="required">*</span>
              </label>
              <input type="text" id="name" className="form-input" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email <span className="required">*</span>
              </label>
              <input type="email" id="email" className="form-input" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                {t('Номер телефона', 'Phone number')} <span className="required">*</span>
              </label>
              <div className="phone-input-wrapper">
                <select className="phone-country-select" value={phoneCountry} onChange={(e) => { setPhoneCountry(e.target.value); setFormData({ ...formData, phone: '' }); }}>
                  <option value="+380">🇺🇦 +380</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+48">🇵🇱 +48</option>
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+39">🇮🇹 +39</option>
                </select>
                <input type="tel" id="phone" className="form-input phone-input" required placeholder={phoneCountry === '+380' ? '12 345 67 89' : phoneCountry === '+1' ? '(999) 123-4567' : phoneCountry === '+34' ? '123 456 789' : phoneCountry === '+39' ? '123 456 7890' : phoneCountry === '+48' ? '123 456 789' : phoneCountry === '+44' ? '123 4567 8901' : phoneCountry === '+49' ? '123 45678901' : phoneCountry === '+33' ? '1 23 45 67 89' : '123 456 789'} value={formData.phone} onChange={(e) => { const formatted = formatPhoneNumber(e.target.value, phoneCountry); setFormData({ ...formData, phone: formatted }); }} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="site" className="form-label">
                {t('Сайт', 'Site')} <span className="required">*</span>
              </label>
              <input type="url" id="site" className="form-input" required placeholder="https://example.com" value={formData.site} onChange={(e) => setFormData({ ...formData, site: e.target.value })} />
            </div>
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" className="form-checkbox" required checked={formData.agree} onChange={(e) => setFormData({ ...formData, agree: e.target.checked })} />
                <span>{t('Я согласен на обработку моих персональных данных в соответствии с', 'I agree to the processing of my personal data in accordance with')} <a href={`/privacy?lang=${language}`} className="form-link">{t('Политикой конфиденциальности', 'Privacy Policy')}</a>.</span>
              </label>
            </div>
            {auditFormState.success ? (
              <div className="form-success-message">
                {t('Спасибо! Мы свяжемся с вами в ближайшее время.', 'Thank you! We will contact you shortly.')}
              </div>
            ) : (
              <>
                {auditFormState.error && (
                  <div className="form-error-message">
                    {auditFormState.error}
                  </div>
                )}
                <button type="submit" className="btn btn-primary form-submit" disabled={auditFormState.loading}>
                  {auditFormState.loading ? t('Отправка...', 'Sending...') : t('Отправить запрос', 'Send request')}
                </button>
                <p className="form-footer-text">
                  {t('Мы используем ваши данные только для ответа на ваш запрос.', 'We use your data only to respond to your request.')}
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    )}
    </>
  )
}

export default PrivacyPolicy;
