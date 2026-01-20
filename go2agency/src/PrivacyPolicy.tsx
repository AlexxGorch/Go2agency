import { useState, useEffect } from 'react'
import Layout from './Layout'
import './App.css'

function PrivacyPolicy() {
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
          <h1 className="legal-title">Политика конфиденциальности</h1>
          <p className="legal-updated">Последнее обновление: 1 января 2026 года</p>
          
          <div className="legal-section">
            <h2 className="legal-section-title">1. Общие положения</h2>
            <p className="legal-text">
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей веб-сайта Go2Agency (далее — «Сайт»), принадлежащего digital-агентству Go2Agency (далее — «Агентство», «мы», «нас», «наш»).
            </p>
            <p className="legal-text">
              Используя Сайт и предоставляя нам свои персональные данные, вы соглашаетесь с условиями настоящей Политики конфиденциальности.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">2. Какие данные мы собираем</h2>
            <p className="legal-text">
              При использовании Сайта и заполнении форм мы можем собирать следующую информацию:
            </p>
            <ul className="legal-list">
              <li>Имя и контактные данные (имя, фамилия, email, номер телефона)</li>
              <li>Информация о вашем сайте или проекте</li>
              <li>Технические данные (IP-адрес, тип браузера, операционная система, данные о посещении Сайта)</li>
              <li>Данные, которые вы добровольно предоставляете при заполнении форм обратной связи, запросах на аудит или обсуждение проекта</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">3. Цели обработки персональных данных</h2>
            <p className="legal-text">
              Мы используем собранные данные для следующих целей:
            </p>
            <ul className="legal-list">
              <li>Обработка ваших запросов и заявок на услуги (SEO, Google PPC, автоматизация, разработка IT-продуктов)</li>
              <li>Связь с вами для обсуждения проекта, предоставления консультаций и бесплатного аудита</li>
              <li>Отправка коммерческих предложений и информации об услугах Агентства</li>
              <li>Улучшение качества работы Сайта и наших услуг</li>
              <li>Соблюдение требований законодательства</li>
              <li>Организация обучения в Go2 Academy и Go2 Academy For Business</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">4. Способы обработки данных</h2>
            <p className="legal-text">
              Обработка персональных данных осуществляется с использованием средств автоматизации и без использования таких средств. Мы применяем необходимые технические и организационные меры для защиты ваших данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">5. Передача данных третьим лицам</h2>
            <p className="legal-text">
              Мы не продаем, не обмениваем и не передаем ваши персональные данные третьим лицам без вашего согласия, за исключением случаев:
            </p>
            <ul className="legal-list">
              <li>Когда это необходимо для предоставления запрошенных вами услуг</li>
              <li>Когда это требуется по закону или по запросу государственных органов</li>
              <li>Для защиты прав и безопасности Агентства, наших клиентов или третьих лиц</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">6. Хранение данных</h2>
            <p className="legal-text">
              Мы храним ваши персональные данные в течение срока, необходимого для достижения целей обработки, или в течение срока, установленного законодательством. После истечения срока хранения данные удаляются или обезличиваются.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">7. Ваши права</h2>
            <p className="legal-text">
              В отношении ваших персональных данных вы имеете право:
            </p>
            <ul className="legal-list">
              <li>Получать информацию о том, какие данные мы обрабатываем</li>
              <li>Требовать исправления неточных или неполных данных</li>
              <li>Требовать удаления ваших данных</li>
              <li>Возражать против обработки данных</li>
              <li>Отозвать согласие на обработку данных</li>
              <li>Подать жалобу в уполномоченный орган по защите персональных данных</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">8. Cookies и аналогичные технологии</h2>
            <p className="legal-text">
              Сайт может использовать файлы cookie и аналогичные технологии для улучшения работы Сайта, анализа трафика и персонализации контента. Вы можете настроить свой браузер для отказа от cookies, однако это может повлиять на функциональность Сайта.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">9. Безопасность данных</h2>
            <p className="legal-text">
              Мы принимаем необходимые меры для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения. Однако ни один метод передачи данных через интернет или метод электронного хранения не является на 100% безопасным.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">10. Изменения в Политике конфиденциальности</h2>
            <p className="legal-text">
              Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Все изменения вступают в силу с момента их публикации на Сайте. Рекомендуем периодически просматривать эту страницу для ознакомления с актуальной информацией.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">11. Контакты</h2>
            <p className="legal-text">
              Если у вас есть вопросы относительно настоящей Политики конфиденциальности или обработки ваших персональных данных, вы можете связаться с нами:
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

