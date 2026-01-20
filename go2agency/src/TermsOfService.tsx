import { useState, useEffect } from 'react'
import Layout from './Layout'
import './App.css'

function TermsOfService() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'audit' | 'discuss'>('audit');

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
          <h1 className="legal-title">Условия использования</h1>
          <p className="legal-updated">Последнее обновление: 1 января 2026 года</p>
          
          <div className="legal-section">
            <h2 className="legal-section-title">1. Общие положения</h2>
            <p className="legal-text">
              Настоящие Условия использования (далее — «Условия») регулируют отношения между digital-агентством Go2Agency (далее — «Агентство», «мы», «нас», «наш») и пользователями веб-сайта go2agency.com (далее — «Сайт», «Сервис»).
            </p>
            <p className="legal-text">
              Используя Сайт, вы соглашаетесь с настоящими Условиями. Если вы не согласны с какими-либо условиями, пожалуйста, не используйте Сайт.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">2. Описание услуг</h2>
            <p className="legal-text">
              Go2Agency предоставляет следующие услуги:
            </p>
            <ul className="legal-list">
              <li><strong>SEO + Google PPC:</strong> поисковая оптимизация, запуск и управление рекламными кампаниями в Google Ads, настройка аналитики</li>
              <li><strong>AI-автоматизация:</strong> автоматизация бизнес-процессов с использованием платформы n8n, создание AI-агентов</li>
              <li><strong>Разработка IT-продуктов и сайтов:</strong> создание сайтов, лендингов, интернет-магазинов, MVP с учетом SEO и аналитики</li>
              <li><strong>Обучение:</strong> корпоративное и индивидуальное обучение через Go2 Academy и Go2 Academy For Business</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">3. Использование Сайта</h2>
            <p className="legal-text">
              При использовании Сайта вы обязуетесь:
            </p>
            <ul className="legal-list">
              <li>Предоставлять достоверную и актуальную информацию при заполнении форм</li>
              <li>Не использовать Сайт в незаконных целях или для нарушения прав третьих лиц</li>
              <li>Не пытаться получить несанкционированный доступ к Сайту или его системам</li>
              <li>Не распространять вредоносное программное обеспечение, вирусы или другой вредоносный код</li>
              <li>Не копировать, не воспроизводить и не распространять контент Сайта без письменного разрешения Агентства</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">4. Интеллектуальная собственность</h2>
            <p className="legal-text">
              Весь контент Сайта, включая тексты, изображения, логотипы, графику, дизайн и программный код, является собственностью Go2Agency или его лицензиаров и защищен законами об интеллектуальной собственности.
            </p>
            <p className="legal-text">
              Вы не имеете права использовать материалы Сайта без предварительного письменного разрешения Агентства, за исключением случаев, когда это явно разрешено настоящими Условиями.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">5. Заказ услуг</h2>
            <p className="legal-text">
              Заказ услуг осуществляется путем заполнения форм на Сайте, отправки запроса на бесплатный аудит или обсуждение проекта. После получения вашего запроса мы свяжемся с вами для уточнения деталей и подготовки коммерческого предложения.
            </p>
            <p className="legal-text">
              Условия предоставления услуг, сроки, стоимость и объем работ определяются в договоре или коммерческом предложении, согласованном сторонами.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">6. Оплата услуг</h2>
            <p className="legal-text">
              Оплата услуг производится в соответствии с условиями договора или коммерческого предложения. Мы принимаем оплату по безналичному расчету. Формат оплаты может быть фиксированным за этапы, ежемесячным сопровождением или комбинированной моделью.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">7. Отказ от ответственности</h2>
            <p className="legal-text">
              Агентство не гарантирует:
            </p>
            <ul className="legal-list">
              <li>Бесперебойную работу Сайта и отсутствие технических ошибок</li>
              <li>Точность, полноту или актуальность информации на Сайте</li>
              <li>Конкретные результаты от использования наших услуг (результаты зависят от множества факторов, включая специфику бизнеса, рынок, конкуренцию и другие)</li>
            </ul>
            <p className="legal-text">
              Агентство не несет ответственности за ущерб, возникший в результате использования или невозможности использования Сайта или наших услуг.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">8. Ограничение ответственности</h2>
            <p className="legal-text">
              В максимальной степени, разрешенной законом, ответственность Агентства ограничивается суммой, уплаченной клиентом за конкретную услугу, в отношении которой возникла претензия.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">9. Конфиденциальность</h2>
            <p className="legal-text">
              Мы обязуемся сохранять конфиденциальность информации, полученной от клиентов в ходе работы над проектами. Подробная информация об обработке персональных данных изложена в нашей <a href="/privacy">Политике конфиденциальности</a>.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">10. Изменение условий</h2>
            <p className="legal-text">
              Мы оставляем за собой право изменять настоящие Условия в любое время. Изменения вступают в силу с момента их публикации на Сайте. Продолжение использования Сайта после внесения изменений означает ваше согласие с новыми условиями.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">11. Разрешение споров</h2>
            <p className="legal-text">
              Все споры и разногласия, возникающие в связи с использованием Сайта или предоставлением услуг, решаются путем переговоров. В случае невозможности достижения согласия споры разрешаются в соответствии с действующим законодательством.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">12. Контакты</h2>
            <p className="legal-text">
              По всем вопросам, связанным с использованием Сайта или нашими услугами, вы можете связаться с нами:
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

