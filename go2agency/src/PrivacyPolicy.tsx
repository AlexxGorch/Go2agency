import { useState, useEffect } from 'react'
import Layout from './Layout'
import './App.css'

function PrivacyPolicy() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'audit' | 'discuss'>('audit');
  const [language, setLanguage] = useState<'ru' | 'en'>('en');

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

  return (
    <Layout 
      isScrolled={isScrolled}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
      setModalType={setModalType}
      setAuditModalOpen={setAuditModalOpen}
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
  )
}

export default PrivacyPolicy
