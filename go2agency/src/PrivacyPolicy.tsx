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
        <div className="legal-content">
          <h1 className="legal-title">{t('Политика конфиденциальности', 'Privacy Policy')}</h1>
          <p className="legal-updated">{t('Последнее обновление: 1 января 2026 года', 'Last updated: January 1, 2026')}</p>
          
          <div className="legal-section">
            <h2 className="legal-section-title">{t('1. Общие положения', '1. General Provisions')}</h2>
            <p className="legal-text">
              {t('Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей веб-сайта Go2Agency (далее — «Сайт»), принадлежащего digital-агентству Go2Agency (далее — «Агентство», «мы», «нас», «наш»).', 'This Privacy Policy defines the procedure for processing and protecting personal data of users of the Go2Agency website (hereinafter referred to as the "Site"), owned by the digital agency Go2Agency (hereinafter referred to as the "Agency", "we", "us", "our").')}
            </p>
            <p className="legal-text">
              {t('Используя Сайт и предоставляя нам свои персональные данные, вы соглашаетесь с условиями настоящей Политики конфиденциальности.', 'By using the Site and providing us with your personal data, you agree to the terms of this Privacy Policy.')}
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('2. Какие данные мы собираем', '2. What Data We Collect')}</h2>
            <p className="legal-text">
              {t('При использовании Сайта и заполнении форм мы можем собирать следующую информацию:', 'When using the Site and filling out forms, we may collect the following information:')}
            </p>
            <ul className="legal-list">
              <li>{t('Имя и контактные данные (имя, фамилия, email, номер телефона)', 'Name and contact information (first name, last name, email, phone number)')}</li>
              <li>{t('Информация о вашем сайте или проекте', 'Information about your website or project')}</li>
              <li>{t('Технические данные (IP-адрес, тип браузера, операционная система, данные о посещении Сайта)', 'Technical data (IP address, browser type, operating system, Site visit data)')}</li>
              <li>{t('Данные, которые вы добровольно предоставляете при заполнении форм обратной связи, запросах на аудит или обсуждение проекта', 'Data that you voluntarily provide when filling out contact forms, audit requests, or project discussion requests')}</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('3. Цели обработки персональных данных', '3. Purposes of Personal Data Processing')}</h2>
            <p className="legal-text">
              {t('Мы используем собранные данные для следующих целей:', 'We use the collected data for the following purposes:')}
            </p>
            <ul className="legal-list">
              <li>{t('Обработка ваших запросов и заявок на услуги (SEO, Google PPC, автоматизация, разработка IT-продуктов)', 'Processing your requests and service applications (SEO, Google PPC, automation, IT product development)')}</li>
              <li>{t('Связь с вами для обсуждения проекта, предоставления консультаций и бесплатного аудита', 'Contacting you to discuss the project, provide consultations and free audit')}</li>
              <li>{t('Отправка коммерческих предложений и информации об услугах Агентства', 'Sending commercial proposals and information about the Agency\'s services')}</li>
              <li>{t('Улучшение качества работы Сайта и наших услуг', 'Improving the quality of the Site and our services')}</li>
              <li>{t('Соблюдение требований законодательства', 'Compliance with legal requirements')}</li>
              <li>{t('Организация обучения в Go2 Academy и Go2 Academy For Business', 'Organizing training at Go2 Academy and Go2 Academy For Business')}</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('4. Способы обработки данных', '4. Methods of Data Processing')}</h2>
            <p className="legal-text">
              {t('Обработка персональных данных осуществляется с использованием средств автоматизации и без использования таких средств. Мы применяем необходимые технические и организационные меры для защиты ваших данных от несанкционированного доступа, изменения, раскрытия или уничтожения.', 'Personal data processing is carried out using automation tools and without using such tools. We apply necessary technical and organizational measures to protect your data from unauthorized access, alteration, disclosure, or destruction.')}
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('5. Передача данных третьим лицам', '5. Data Transfer to Third Parties')}</h2>
            <p className="legal-text">
              {t('Мы не продаем, не обмениваем и не передаем ваши персональные данные третьим лицам без вашего согласия, за исключением случаев:', 'We do not sell, exchange, or transfer your personal data to third parties without your consent, except in the following cases:')}
            </p>
            <ul className="legal-list">
              <li>{t('Когда это необходимо для предоставления запрошенных вами услуг', 'When it is necessary to provide the services you requested')}</li>
              <li>{t('Когда это требуется по закону или по запросу государственных органов', 'When required by law or by request of government agencies')}</li>
              <li>{t('Для защиты прав и безопасности Агентства, наших клиентов или третьих лиц', 'To protect the rights and security of the Agency, our clients, or third parties')}</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('6. Хранение данных', '6. Data Storage')}</h2>
            <p className="legal-text">
              {t('Мы храним ваши персональные данные в течение срока, необходимого для достижения целей обработки, или в течение срока, установленного законодательством. После истечения срока хранения данные удаляются или обезличиваются.', 'We store your personal data for the period necessary to achieve the processing purposes, or for the period established by law. After the storage period expires, the data is deleted or anonymized.')}
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('7. Ваши права', '7. Your Rights')}</h2>
            <p className="legal-text">
              {t('В отношении ваших персональных данных вы имеете право:', 'Regarding your personal data, you have the right to:')}
            </p>
            <ul className="legal-list">
              <li>{t('Получать информацию о том, какие данные мы обрабатываем', 'Receive information about what data we process')}</li>
              <li>{t('Требовать исправления неточных или неполных данных', 'Request correction of inaccurate or incomplete data')}</li>
              <li>{t('Требовать удаления ваших данных', 'Request deletion of your data')}</li>
              <li>{t('Возражать против обработки данных', 'Object to data processing')}</li>
              <li>{t('Отозвать согласие на обработку данных', 'Withdraw consent to data processing')}</li>
              <li>{t('Подать жалобу в уполномоченный орган по защите персональных данных', 'File a complaint with the authorized body for personal data protection')}</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('8. Cookies и аналогичные технологии', '8. Cookies and Similar Technologies')}</h2>
            <p className="legal-text">
              {t('Сайт может использовать файлы cookie и аналогичные технологии для улучшения работы Сайта, анализа трафика и персонализации контента. Вы можете настроить свой браузер для отказа от cookies, однако это может повлиять на функциональность Сайта.', 'The Site may use cookies and similar technologies to improve the Site\'s performance, analyze traffic, and personalize content. You can configure your browser to refuse cookies, however, this may affect the Site\'s functionality.')}
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('9. Безопасность данных', '9. Data Security')}</h2>
            <p className="legal-text">
              {t('Мы принимаем необходимые меры для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения. Однако ни один метод передачи данных через интернет или метод электронного хранения не является на 100% безопасным.', 'We take necessary measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, no method of data transmission over the internet or electronic storage method is 100% secure.')}
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('10. Изменения в Политике конфиденциальности', '10. Changes to Privacy Policy')}</h2>
            <p className="legal-text">
              {t('Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Все изменения вступают в силу с момента их публикации на Сайте. Рекомендуем периодически просматривать эту страницу для ознакомления с актуальной информацией.', 'We reserve the right to make changes to this Privacy Policy. All changes take effect from the moment of their publication on the Site. We recommend periodically reviewing this page to familiarize yourself with current information.')}
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('11. Контакты', '11. Contacts')}</h2>
            <p className="legal-text">
              {t('Если у вас есть вопросы относительно настоящей Политики конфиденциальности или обработки ваших персональных данных, вы можете связаться с нами:', 'If you have questions regarding this Privacy Policy or the processing of your personal data, you can contact us:')}
            </p>
            <ul className="legal-list">
              <li>Email: <a href="mailto:go2agency.info@gmail.com">go2agency.info@gmail.com</a></li>
              <li>Telegram: <a href="https://t.me/go2agency" target="_blank" rel="noopener noreferrer">@go2agency</a></li>
            </ul>
          </div>
          </div>
        </div>
      </section>
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

export default PrivacyPolicy
