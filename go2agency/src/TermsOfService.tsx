import { useState, useEffect } from 'react'
import Layout from './Layout'
import './App.css'

function TermsOfService() {
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
          <h1 className="legal-title">{t('Условия использования', 'Terms of Service')}</h1>
          <p className="legal-updated">{t('Последнее обновление: 1 января 2026 года', 'Last updated: January 1, 2026')}</p>
          
          <div className="legal-section">
            <h2 className="legal-section-title">{t('1. Общие положения', '1. General Provisions')}</h2>
            <p className="legal-text">
              {t('Настоящие Условия использования (далее — «Условия») регулируют отношения между digital-агентством Go2Agency (далее — «Агентство», «мы», «нас», «наш») и пользователями веб-сайта go2agency.com (далее — «Сайт», «Сервис»).', 'These Terms of Service (hereinafter referred to as the "Terms") govern the relationship between the digital agency Go2Agency (hereinafter referred to as the "Agency", "we", "us", "our") and users of the website go2agency.com (hereinafter referred to as the "Site", "Service").')}
            </p>
            <p className="legal-text">
              {t('Используя Сайт, вы соглашаетесь с настоящими Условиями. Если вы не согласны с какими-либо условиями, пожалуйста, не используйте Сайт.', 'By using the Site, you agree to these Terms. If you do not agree with any of the terms, please do not use the Site.')}
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('2. Описание услуг', '2. Service Description')}</h2>
            <p className="legal-text">
              {t('Go2Agency предоставляет следующие услуги:', 'Go2Agency provides the following services:')}
            </p>
            <ul className="legal-list">
              <li><strong>{t('SEO + Google PPC:', 'SEO + Google PPC:')}</strong> {t('поисковая оптимизация, запуск и управление рекламными кампаниями в Google Ads, настройка аналитики', 'search engine optimization, launch and management of advertising campaigns in Google Ads, analytics setup')}</li>
              <li><strong>{t('AI-автоматизация:', 'AI automation:')}</strong> {t('автоматизация бизнес-процессов с использованием платформы n8n, создание AI-агентов', 'business process automation using the n8n platform, AI agent creation')}</li>
              <li><strong>{t('Разработка IT-продуктов и сайтов:', 'IT products and website development:')}</strong> {t('создание сайтов, лендингов, интернет-магазинов, MVP с учетом SEO и аналитики', 'creation of websites, landing pages, e-commerce stores, MVP with SEO and analytics in mind')}</li>
              <li><strong>{t('Обучение:', 'Training:')}</strong> {t('корпоративное и индивидуальное обучение через Go2 Academy и Go2 Academy For Business', 'corporate and individual training through Go2 Academy and Go2 Academy For Business')}</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('3. Использование Сайта', '3. Use of the Site')}</h2>
            <p className="legal-text">
              {t('При использовании Сайта вы обязуетесь:', 'When using the Site, you agree to:')}
            </p>
            <ul className="legal-list">
              <li>{t('Предоставлять достоверную и актуальную информацию при заполнении форм', 'Provide accurate and up-to-date information when filling out forms')}</li>
              <li>{t('Не использовать Сайт в незаконных целях или для нарушения прав третьих лиц', 'Not use the Site for illegal purposes or to violate the rights of third parties')}</li>
              <li>{t('Не пытаться получить несанкционированный доступ к Сайту или его системам', 'Not attempt to gain unauthorized access to the Site or its systems')}</li>
              <li>{t('Не распространять вредоносное программное обеспечение, вирусы или другой вредоносный код', 'Not distribute malicious software, viruses, or other malicious code')}</li>
              <li>{t('Не копировать, не воспроизводить и не распространять контент Сайта без письменного разрешения Агентства', 'Not copy, reproduce, or distribute the Site\'s content without written permission from the Agency')}</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('4. Интеллектуальная собственность', '4. Intellectual Property')}</h2>
            <p className="legal-text">
              {t('Весь контент Сайта, включая тексты, изображения, логотипы, графику, дизайн и программный код, является собственностью Go2Agency или его лицензиаров и защищен законами об интеллектуальной собственности.', 'All content of the Site, including texts, images, logos, graphics, design, and program code, is the property of Go2Agency or its licensors and is protected by intellectual property laws.')}
            </p>
            <p className="legal-text">
              {t('Вы не имеете права использовать материалы Сайта без предварительного письменного разрешения Агентства, за исключением случаев, когда это явно разрешено настоящими Условиями.', 'You do not have the right to use the Site\'s materials without prior written permission from the Agency, except when explicitly permitted by these Terms.')}
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('5. Заказ услуг', '5. Service Ordering')}</h2>
            <p className="legal-text">
              {t('Заказ услуг осуществляется путем заполнения форм на Сайте, отправки запроса на бесплатный аудит или обсуждение проекта. После получения вашего запроса мы свяжемся с вами для уточнения деталей и подготовки коммерческого предложения.', 'Services are ordered by filling out forms on the Site, sending a request for a free audit or project discussion. After receiving your request, we will contact you to clarify details and prepare a commercial proposal.')}
            </p>
            <p className="legal-text">
              {t('Условия предоставления услуг, сроки, стоимость и объем работ определяются в договоре или коммерческом предложении, согласованном сторонами.', 'Service terms, deadlines, cost, and scope of work are determined in a contract or commercial proposal agreed upon by the parties.')}
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('6. Оплата услуг', '6. Service Payment')}</h2>
            <p className="legal-text">
              {t('Оплата услуг производится в соответствии с условиями договора или коммерческого предложения. Мы принимаем оплату по безналичному расчету. Формат оплаты может быть фиксированным за этапы, ежемесячным сопровождением или комбинированной моделью.', 'Service payment is made in accordance with the terms of the contract or commercial proposal. We accept payment by bank transfer. Payment format can be fixed per stages, monthly support, or a combined model.')}
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('7. Отказ от ответственности', '7. Disclaimer')}</h2>
            <p className="legal-text">
              {t('Агентство не гарантирует:', 'The Agency does not guarantee:')}
            </p>
            <ul className="legal-list">
              <li>{t('Бесперебойную работу Сайта и отсутствие технических ошибок', 'Uninterrupted operation of the Site and absence of technical errors')}</li>
              <li>{t('Точность, полноту или актуальность информации на Сайте', 'Accuracy, completeness, or relevance of information on the Site')}</li>
              <li>{t('Конкретные результаты от использования наших услуг (результаты зависят от множества факторов, включая специфику бизнеса, рынок, конкуренцию и другие)', 'Specific results from using our services (results depend on many factors, including business specifics, market, competition, and others)')}</li>
            </ul>
            <p className="legal-text">
              {t('Агентство не несет ответственности за ущерб, возникший в результате использования или невозможности использования Сайта или наших услуг.', 'The Agency is not responsible for damage arising from the use or inability to use the Site or our services.')}
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('8. Ограничение ответственности', '8. Limitation of Liability')}</h2>
            <p className="legal-text">
              {t('В максимальной степени, разрешенной законом, ответственность Агентства ограничивается суммой, уплаченной клиентом за конкретную услугу, в отношении которой возникла претензия.', 'To the maximum extent permitted by law, the Agency\'s liability is limited to the amount paid by the client for the specific service in relation to which the claim arose.')}
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('9. Конфиденциальность', '9. Confidentiality')}</h2>
            <p className="legal-text">
              {t('Мы обязуемся сохранять конфиденциальность информации, полученной от клиентов в ходе работы над проектами. Подробная информация об обработке персональных данных изложена в нашей', 'We undertake to maintain confidentiality of information received from clients during project work. Detailed information about personal data processing is set out in our')} <a href={`/privacy?lang=${language}`}>{t('Политике конфиденциальности', 'Privacy Policy')}</a>.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('10. Изменение условий', '10. Changes to Terms')}</h2>
            <p className="legal-text">
              {t('Мы оставляем за собой право изменять настоящие Условия в любое время. Изменения вступают в силу с момента их публикации на Сайте. Продолжение использования Сайта после внесения изменений означает ваше согласие с новыми условиями.', 'We reserve the right to change these Terms at any time. Changes take effect from the moment of their publication on the Site. Continued use of the Site after changes are made means your agreement with the new terms.')}
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('11. Разрешение споров', '11. Dispute Resolution')}</h2>
            <p className="legal-text">
              {t('Все споры и разногласия, возникающие в связи с использованием Сайта или предоставлением услуг, решаются путем переговоров. В случае невозможности достижения согласия споры разрешаются в соответствии с действующим законодательством.', 'All disputes and disagreements arising in connection with the use of the Site or the provision of services are resolved through negotiations. If agreement cannot be reached, disputes are resolved in accordance with applicable law.')}
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">{t('12. Контакты', '12. Contacts')}</h2>
            <p className="legal-text">
              {t('По всем вопросам, связанным с использованием Сайта или нашими услугами, вы можете связаться с нами:', 'For all questions related to the use of the Site or our services, you can contact us:')}
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

export default TermsOfService
