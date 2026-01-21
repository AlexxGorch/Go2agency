import { useState, useEffect } from 'react'
import './App.css'
import { Rocket, Bot, Wrench, BarChart3, TrendingUp, Target, Zap, Code, Heart, Search, Globe, Lightbulb, Link, Palette, Settings, Laptop, Smartphone, MapPin, Megaphone, Star, ArrowUpRight, ChevronRight, X, Plus, FileCheck, ClipboardCheck, MessageCircle } from 'lucide-react'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('general');
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  const [servicesVisible, setServicesVisible] = useState(false);
  const [stagesVisible, setStagesVisible] = useState<Set<number>>(new Set());
  const [whyUsVisible, setWhyUsVisible] = useState<Set<number>>(new Set());
  const [stageProgress, setStageProgress] = useState(0);
  const [servicesTitleAnimated, setServicesTitleAnimated] = useState(false);
  const [whyUsTitleAnimated, setWhyUsTitleAnimated] = useState(false);
  const [casesTitleAnimated, setCasesTitleAnimated] = useState(false);
  const [stat15, setStat15] = useState(1);
  const [stat300, setStat300] = useState(1);
  const [stat80, setStat80] = useState(1);
  const [stat4Visible, setStat4Visible] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'audit' | 'discuss'>('audit');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    site: '',
    agree: false
  });
  const [phoneCountry, setPhoneCountry] = useState('+380');
  const [contactFormData, setContactFormData] = useState({
    firstName: '',
    site: '',
    email: '',
    phone: ''
  });
  const [contactPhoneCountry, setContactPhoneCountry] = useState('+380');
  const [contactFormErrors, setContactFormErrors] = useState({
    firstName: '',
    site: '',
    email: '',
    phone: ''
  });

  const t = (ru: string, en: string) => (language === 'ru' ? ru : en);

  const formatPhoneNumber = (value: string, countryCode: string) => {
    const digits = value.replace(/\D/g, '');
    if (countryCode === '+380') {
      // Украина: +380 XX XXX XX XX
      if (digits.length <= 2) return digits;
      if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
      if (digits.length <= 7) return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
      return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
    } else if (countryCode === '+1') {
      // США/Канада: +1 (XXX) XXX-XXXX
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    } else if (countryCode === '+34') {
      // Испания: +34 XXX XXX XXX
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
    } else if (countryCode === '+39') {
      // Италия: +39 XXX XXX XXXX
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
      if (digits.length <= 9) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9, 13)}`;
    }
    return digits;
  };

  useEffect(() => {
    if (mobileMenuOpen || auditModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen, auditModalOpen]);

  useEffect(() => {
    // Smooth scroll for anchor links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
      if (link) {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    // Инициализируем язык из localStorage
    const saved = typeof window !== 'undefined' ? localStorage.getItem('go2-lang') : null;
    if (saved === 'ru' || saved === 'en') {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    // Сохраняем выбранный язык
    if (typeof window !== 'undefined') {
      localStorage.setItem('go2-lang', language);
      document.documentElement.lang = language === 'ru' ? 'ru' : 'en';
    }
  }, [language]);

  useEffect(() => {
    // Прозрачный эффект хедера при скролле
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Анимация появления блока Services
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setServicesVisible(true);
          } else {
            setServicesVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    const servicesSection = document.querySelector('.services');
    if (servicesSection) {
      observer.observe(servicesSection);
    }

    return () => {
      if (servicesSection) {
        observer.unobserve(servicesSection);
      }
    };
  }, []);

  useEffect(() => {
    // Эффект пишущей машинки для заголовка "Направления"
    const servicesTitle = document.querySelector('.services .section-title');
    if (!servicesTitle) return;

    const originalText = t('Направления', 'Services');
    const titleElement = servicesTitle as HTMLElement;
    let typeInterval: ReturnType<typeof setInterval> | null = null;
    let cursorTimeout: ReturnType<typeof setTimeout> | null = null;

    const clearAllIntervals = () => {
      if (typeInterval) {
        clearInterval(typeInterval);
        typeInterval = null;
      }
      if (cursorTimeout) {
        clearTimeout(cursorTimeout);
        cursorTimeout = null;
      }
    };

    const resetTitle = () => {
      clearAllIntervals();
      // Полностью очищаем содержимое, включая все span элементы
      titleElement.innerHTML = '';
      titleElement.textContent = originalText;
    };

    const typewriterEffect = (element: HTMLElement, text: string, speed: number = 130) => {
      clearAllIntervals();
      element.innerHTML = '';
      element.innerHTML = '<span class="typewriter-text"></span><span class="typewriter-cursor">|</span>';
      const textSpan = element.querySelector('.typewriter-text') as HTMLElement;
      const cursorSpan = element.querySelector('.typewriter-cursor') as HTMLElement;
      
      let index = 0;
      typeInterval = setInterval(() => {
        if (index < text.length) {
          textSpan.textContent = text.substring(0, index + 1);
          index++;
        } else {
          clearInterval(typeInterval!);
          typeInterval = null;
          // Удаляем курсор после завершения анимации
          cursorTimeout = setTimeout(() => {
            if (cursorSpan && cursorSpan.parentNode) {
              cursorSpan.remove();
            }
            cursorTimeout = null;
            setServicesTitleAnimated(true);
          }, 500);
        }
      }, speed);
    };

    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !servicesTitleAnimated) {
            typewriterEffect(titleElement, originalText, 130);
          } else if (!entry.isIntersecting) {
            // При выходе из viewport сбрасываем анимацию
            resetTitle();
            setServicesTitleAnimated(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    titleObserver.observe(titleElement);

    return () => {
      clearAllIntervals();
      titleObserver.unobserve(titleElement);
    };
  }, [servicesTitleAnimated, language]);

  // Эффект пишущей машинки для заголовка "Почему мы?"
  useEffect(() => {
    const whyUsTitle = document.querySelector('.why-us .section-title');
    if (!whyUsTitle) return;

    const originalText = t('Почему мы?', 'Why us?');
    const titleElement = whyUsTitle as HTMLElement;
    let typeInterval: ReturnType<typeof setInterval> | null = null;
    let cursorTimeout: ReturnType<typeof setTimeout> | null = null;

    const clearAllIntervals = () => {
      if (typeInterval) {
        clearInterval(typeInterval);
        typeInterval = null;
      }
      if (cursorTimeout) {
        clearTimeout(cursorTimeout);
        cursorTimeout = null;
      }
    };

    const resetTitle = () => {
      clearAllIntervals();
      titleElement.innerHTML = '';
      titleElement.textContent = originalText;
    };

    const typewriterEffect = (element: HTMLElement, text: string, speed: number = 130) => {
      clearAllIntervals();
      element.innerHTML = '';
      element.innerHTML = '<span class="typewriter-text"></span><span class="typewriter-cursor">|</span>';
      const textSpan = element.querySelector('.typewriter-text') as HTMLElement;
      const cursorSpan = element.querySelector('.typewriter-cursor') as HTMLElement;
      
      let index = 0;
      typeInterval = setInterval(() => {
        if (index < text.length) {
          textSpan.textContent = text.substring(0, index + 1);
          index++;
        } else {
          clearInterval(typeInterval!);
          typeInterval = null;
          cursorTimeout = setTimeout(() => {
            if (cursorSpan && cursorSpan.parentNode) {
              cursorSpan.remove();
            }
            cursorTimeout = null;
            setWhyUsTitleAnimated(true);
          }, 500);
        }
      }, speed);
    };

    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !whyUsTitleAnimated) {
            typewriterEffect(titleElement, originalText, 130);
          } else if (!entry.isIntersecting) {
            resetTitle();
            setWhyUsTitleAnimated(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    titleObserver.observe(titleElement);

    return () => {
      clearAllIntervals();
      titleObserver.unobserve(titleElement);
    };
  }, [whyUsTitleAnimated, language]);

  // Эффект пишущей машинки для заголовка "Кейсы"
  useEffect(() => {
    const casesTitle = document.querySelector('.cases .section-title');
    if (!casesTitle) return;

    const originalText = t('Кейсы', 'Cases');
    const titleElement = casesTitle as HTMLElement;
    let typeInterval: ReturnType<typeof setInterval> | null = null;
    let cursorTimeout: ReturnType<typeof setTimeout> | null = null;

    const clearAllIntervals = () => {
      if (typeInterval) {
        clearInterval(typeInterval);
        typeInterval = null;
      }
      if (cursorTimeout) {
        clearTimeout(cursorTimeout);
        cursorTimeout = null;
      }
    };

    const resetTitle = () => {
      clearAllIntervals();
      titleElement.innerHTML = '';
      titleElement.textContent = originalText;
    };

    const typewriterEffect = (element: HTMLElement, text: string, speed: number = 130) => {
      clearAllIntervals();
      element.innerHTML = '';
      element.innerHTML = '<span class="typewriter-text"></span><span class="typewriter-cursor">|</span>';
      const textSpan = element.querySelector('.typewriter-text') as HTMLElement;
      const cursorSpan = element.querySelector('.typewriter-cursor') as HTMLElement;
      
      let index = 0;
      typeInterval = setInterval(() => {
        if (index < text.length) {
          textSpan.textContent = text.substring(0, index + 1);
          index++;
        } else {
          clearInterval(typeInterval!);
          typeInterval = null;
          cursorTimeout = setTimeout(() => {
            if (cursorSpan && cursorSpan.parentNode) {
              cursorSpan.remove();
            }
            cursorTimeout = null;
            setCasesTitleAnimated(true);
          }, 500);
        }
      }, speed);
    };

    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !casesTitleAnimated) {
            typewriterEffect(titleElement, originalText, 130);
          } else if (!entry.isIntersecting) {
            resetTitle();
            setCasesTitleAnimated(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    titleObserver.observe(titleElement);

    return () => {
      clearAllIntervals();
      titleObserver.unobserve(titleElement);
    };
  }, [casesTitleAnimated, language]);


  useEffect(() => {
    // Анимация счетчика статистики
    let animationTimers: number[] = [];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Сбрасываем значения перед запуском анимации
            setStat15(1);
            setStat300(1);
            setStat80(1);
            setStat4Visible(false);
            
            // Очищаем предыдущие таймеры
            animationTimers.forEach(timer => clearInterval(timer));
            animationTimers = [];
            
            // Анимация для 15+
            const animate15 = () => {
              let current = 1;
              const target = 15;
              const duration = 2000; // 2 секунды
              const increment = target / (duration / 16); // ~60 FPS
              
              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  setStat15(target);
                  clearInterval(timer);
                } else {
                  setStat15(Math.floor(current));
                }
              }, 16);
              animationTimers.push(timer);
            };

            // Анимация для 300+
            const animate300 = () => {
              let current = 1;
              const target = 300;
              const duration = 2000;
              const increment = target / (duration / 16);
              
              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  setStat300(target);
                  clearInterval(timer);
                } else {
                  setStat300(Math.floor(current));
                }
              }, 16);
              animationTimers.push(timer);
            };

            // Анимация для 80%
            const animate80 = () => {
              let current = 1;
              const target = 80;
              const duration = 2000;
              const increment = target / (duration / 16);
              
              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  setStat80(target);
                  clearInterval(timer);
                } else {
                  setStat80(Math.floor(current));
                }
              }, 16);
              animationTimers.push(timer);
            };

            // Запускаем анимации с небольшой задержкой
            setTimeout(() => {
              animate15();
              animate300();
              animate80();
              // Анимация для "4 в 1"
              setTimeout(() => {
                setStat4Visible(true);
              }, 500);
            }, 100);
          } else {
            // Сбрасываем состояния когда элемент выходит из viewport
            setStat15(1);
            setStat300(1);
            setStat80(1);
            setStat4Visible(false);
            // Очищаем таймеры
            animationTimers.forEach(timer => clearInterval(timer));
            animationTimers = [];
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => {
      if (statsSection) {
        observer.unobserve(statsSection);
      }
      animationTimers.forEach(timer => clearInterval(timer));
    };
  }, []);

  useEffect(() => {
    // Функция для разбиения текста на строки и обертывания их в span
    const wrapTextInLines = (element: HTMLElement) => {
      if (element.dataset.linesWrapped === 'true') return;
      
      const text = element.textContent || '';
      const words = text.split(' ');
      const maxWidth = element.offsetWidth;
      
      element.innerHTML = '';
      let currentLine = '';
      let lineIndex = 0;
      
      words.forEach((word, index) => {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const testElement = document.createElement('span');
        testElement.textContent = testLine;
        testElement.style.visibility = 'hidden';
        testElement.style.position = 'absolute';
        testElement.style.whiteSpace = 'nowrap';
        document.body.appendChild(testElement);
        
        if (testElement.offsetWidth > maxWidth && currentLine) {
          const lineSpan = document.createElement('span');
          lineSpan.className = 'why-us-text-line';
          lineSpan.textContent = currentLine;
          lineSpan.style.display = 'block';
          lineSpan.style.opacity = '0';
          lineSpan.style.transform = 'translateY(8px)';
          lineSpan.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
          element.appendChild(lineSpan);
          currentLine = word;
          lineIndex++;
        } else {
          currentLine = testLine;
        }
        
        document.body.removeChild(testElement);
        
        if (index === words.length - 1 && currentLine) {
          const lineSpan = document.createElement('span');
          lineSpan.className = 'why-us-text-line';
          lineSpan.textContent = currentLine;
          lineSpan.style.display = 'block';
          lineSpan.style.opacity = '0';
          lineSpan.style.transform = 'translateY(8px)';
          lineSpan.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
          element.appendChild(lineSpan);
        }
      });
      
      element.dataset.linesWrapped = 'true';
    };

    // Анимация появления элементов блока "Почему мы?"
    const whyUsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const itemIndex = parseInt(entry.target.getAttribute('data-why-us-index') || '0');
          if (entry.isIntersecting) {
            setWhyUsVisible((prev) => new Set([...prev, itemIndex]));
            
            // Разбиваем текст на строки при первом появлении
            const textElement = entry.target.querySelector('.why-us-item-text') as HTMLElement;
            if (textElement && !textElement.dataset.linesWrapped) {
              setTimeout(() => {
                wrapTextInLines(textElement);
                // Анимируем строки с задержками
                const lines = textElement.querySelectorAll('.why-us-text-line');
                lines.forEach((line, index) => {
                  setTimeout(() => {
                    (line as HTMLElement).style.opacity = '1';
                    (line as HTMLElement).style.transform = 'translateY(0)';
                  }, 400 + index * 200);
                });
              }, 100);
            } else if (textElement) {
              // При повторном появлении просто показываем строки
              const lines = textElement.querySelectorAll('.why-us-text-line');
              lines.forEach((line, index) => {
                (line as HTMLElement).style.opacity = '0';
                (line as HTMLElement).style.transform = 'translateY(8px)';
                setTimeout(() => {
                  (line as HTMLElement).style.opacity = '1';
                  (line as HTMLElement).style.transform = 'translateY(0)';
                }, 400 + index * 200);
              });
            }
          } else {
            // Удаляем элемент из Set при выходе из viewport, чтобы анимация могла повториться
            setWhyUsVisible((prev) => {
              const newSet = new Set(prev);
              newSet.delete(itemIndex);
              return newSet;
            });
            
            // Скрываем строки при выходе из viewport
            const textElement = entry.target.querySelector('.why-us-item-text') as HTMLElement;
            if (textElement) {
              const lines = textElement.querySelectorAll('.why-us-text-line');
              lines.forEach((line) => {
                (line as HTMLElement).style.opacity = '0';
                (line as HTMLElement).style.transform = 'translateY(8px)';
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const whyUsItems = document.querySelectorAll('.why-us-item');
    whyUsItems.forEach((item) => {
      whyUsObserver.observe(item);
    });

    return () => {
      whyUsItems.forEach((item) => {
        whyUsObserver.unobserve(item);
      });
    };
  }, []);


  useEffect(() => {
    // Анимация появления этапов при прокрутке и расчет прогресса
    const stageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const stageIndex = parseInt(entry.target.getAttribute('data-stage-index') || '0');
          if (entry.isIntersecting) {
            setStagesVisible((prev) => new Set([...prev, stageIndex]));
          } else {
            setStagesVisible((prev) => {
              const newSet = new Set(prev);
              newSet.delete(stageIndex);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const calculateProgress = () => {
      const stagesSection = document.querySelector('.stages');
      if (!stagesSection) return;

      const rect = stagesSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const sectionTop = scrollTop + rect.top;
      const sectionHeight = rect.height;
      const sectionStart = sectionTop - windowHeight;
      const sectionEnd = sectionTop + sectionHeight;

      // Если секция еще не видна
      if (scrollTop < sectionStart) {
        setStageProgress(0);
        return;
      }

      // Если секция полностью прокручена
      if (scrollTop > sectionEnd) {
        setStageProgress(100);
        return;
      }

      // Расчет прогресса от 0 до 100% (снизу вверх)
      const scrolled = scrollTop - sectionStart;
      const totalScroll = sectionHeight + windowHeight;
      const progress = Math.max(0, Math.min(100, (scrolled / totalScroll) * 100));
      setStageProgress(progress);
    };

    const stageItems = document.querySelectorAll('.stage-item');
    stageItems.forEach((item) => {
      stageObserver.observe(item);
    });

    // Отслеживание скролла для прогресса
    window.addEventListener('scroll', calculateProgress);
    calculateProgress(); // Инициализация

    return () => {
      stageItems.forEach((item) => {
        stageObserver.unobserve(item);
      });
      window.removeEventListener('scroll', calculateProgress);
    };
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <div className="header-hero-wrapper">
        {/* Header */}
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <nav className="nav">
            <div className="nav-logo">
              <a href="/" className="logo-link">Go2Agency</a>
      </div>
            <ul className="nav-menu">
              <li><a href="#main" className="nav-link">{t('Главная', 'Home')}</a></li>
              <li><a href="#services" className="nav-link">{t('Направления', 'Services')}</a></li>
              <li><a href="#why-us" className="nav-link">{t('Почему мы?', 'Why us?')}</a></li>
              <li><a href="#cases" className="nav-link">{t('Кейсы', 'Cases')}</a></li>
              <li><a href="#contacts" className="nav-link">{t('Контакты', 'Contacts')}</a></li>
            </ul>
            <div className="nav-actions">
              <div className="lang-switcher" aria-label="Переключение языка">
                <button
                  className={`lang-btn ${language === 'en' ? 'lang-btn-active' : ''}`}
                  type="button"
                  onClick={() => setLanguage('en')}
                >
                  EN
                </button>
                <span className="lang-divider">|</span>
                <button
                  className={`lang-btn ${language === 'ru' ? 'lang-btn-active' : ''}`}
                  type="button"
                  onClick={() => setLanguage('ru')}
                >
                  RU
                </button>
              </div>
              <button className="btn btn-secondary nav-cta" onClick={() => {
                setModalType('discuss');
                setAuditModalOpen(true);
              }}>
                {t('Обсудить проект', 'Discuss Your Project')}
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
              <li><a href="#main" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('Главная', 'Home')}</a></li>
              <li><a href="#services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('Направления', 'Services')}</a></li>
              <li><a href="#why-us" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('Почему мы?', 'Why us?')}</a></li>
              <li><a href="#cases" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('Кейсы', 'Cases')}</a></li>
              <li><a href="#contacts" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('Контакты', 'Contacts')}</a></li>
              <li><button className="btn btn-primary mobile-cta" onClick={() => {
                setMobileMenuOpen(false);
                setModalType('discuss');
                setAuditModalOpen(true);
              }}>
                {t('Обсудить проект', 'Discuss Your Project')}
              </button></li>
            </ul>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero hero-animate" id="main">
        {/* Декоративный фон с иконками */}
        <div className="hero-icons-background">
          <BarChart3 className="hero-icon-bg" size={40} />
          <TrendingUp className="hero-icon-bg" size={40} />
          <Search className="hero-icon-bg" size={40} />
          <Laptop className="hero-icon-bg" size={40} />
          <Rocket className="hero-icon-bg" size={40} />
          <Zap className="hero-icon-bg" size={40} />
          <Target className="hero-icon-bg" size={40} />
          <Smartphone className="hero-icon-bg" size={40} />
          <Globe className="hero-icon-bg" size={40} />
          <Wrench className="hero-icon-bg" size={40} />
          <BarChart3 className="hero-icon-bg" size={40} />
          <TrendingUp className="hero-icon-bg" size={40} />
          <Lightbulb className="hero-icon-bg" size={40} />
          <Link className="hero-icon-bg" size={40} />
          <BarChart3 className="hero-icon-bg" size={40} />
          <Palette className="hero-icon-bg" size={40} />
          <Settings className="hero-icon-bg" size={40} />
          <Code className="hero-icon-bg" size={40} />
          <Search className="hero-icon-bg" size={40} />
          <Laptop className="hero-icon-bg" size={40} />
          <TrendingUp className="hero-icon-bg" size={40} />
          <Rocket className="hero-icon-bg" size={40} />
          <Zap className="hero-icon-bg" size={40} />
          <Target className="hero-icon-bg" size={40} />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-left">
            <h1 className="hero-title hero-title-animate">
              {language === 'ru' ? (
                <>
                  <span className="hero-title-gradient">Performance</span> маркетинг с результатом
                </>
              ) : (
                <>
                  <span className="hero-title-gradient">Performance</span> marketing with results
                </>
              )}
            </h1>
            <p className="hero-subtitle hero-subtitle-animate">
              {language === 'ru' ? (
                <>
                  <strong>SEO + Google PPC</strong> в комплексе, автоматизируем процессы, проектируем и развиваем <strong>IT-продукты</strong>, обучаем команды и специалистов
                </>
              ) : (
                <>
                  <strong>SEO + Google PPC</strong> as a system: we automate processes, design and grow <strong>IT products</strong>, train teams and specialists
                </>
              )}
            </p>
              <div className="hero-cta hero-cta-animate">
                <div className="hero-cta-buttons">
                  <button className="btn btn-primary btn-large" onClick={() => {
                setModalType('audit');
                setAuditModalOpen(true);
              }}>{t('Бесплатный аудит', 'Book a Free Audit')}</button>
      </div>
              </div>
            </div>
            <div className="hero-right hero-right-animate">
              <div className="hero-image-wrapper">
                <div className="hero-image-placeholder">
                  <img src="/img/main_img.webp" alt="Digital Marketing Dashboard" className="hero-image" />
                </div>
              </div>
            </div>
          </div>
          <div className="hero-stats hero-stats-animate">
            <div className="hero-stats-numbers">
              <div className="stat-item">
                <div className="stat-number">{stat15}+</div>
                <div className="stat-label">
                  {t('лет опыта в IT и digital-маркетинге', 'years of experience in IT and digital marketing')}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-number stat-number-4in1">
                  <span className={`stat-4 ${stat4Visible ? 'visible' : ''}`}>4</span>
                  <span className={`stat-v ${stat4Visible ? 'visible' : ''}`}>в</span>
                  <span className={`stat-1 ${stat4Visible ? 'visible' : ''}`}>1</span>
                </div>
                <div className="stat-label">
                  {t('Комплекс: SEO + PPC + аналитика + автоматизация', 'System: SEO + PPC + analytics + automation')}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stat300}+</div>
                <div className="stat-label">
                  {t('Обученных специалистов по собственной методологии', 'Trained specialists using our own methodology')}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stat80}%</div>
                <div className="stat-label">
                  {t('решений — из реальных проектов и живых данных', 'solutions — from real projects and live data')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>

      {/* Services Section */}
      <section className={`services ${servicesVisible ? 'services-visible' : ''}`} id="services">
        <div className="container">
          <h2 className={`section-title ${servicesVisible ? 'section-title-animate' : ''}`}>
            {t('Направления', 'Services')}
          </h2>
          <div className="services-grid">
            <div className={`service-card ${servicesVisible ? 'service-card-animate' : ''}`}>
              <div className="service-icon">
                <Rocket size={40} color="#F15A29" />
              </div>
              <h3 className="service-title">SEO + Google PPC</h3>
              <p className="service-description">
                <strong>SEO + Google PPC</strong> {t('работают в одной системе продаж.', 'work together in one sales system.')}
              </p>
              <div className="service-result">
                <p className="service-result-title">{t('Что делаем:', 'What we do:')}</p>
                <ul className="service-list">
                  <li>{t('Анализ конкурентов', 'Competitor analysis')}</li>
                  <li>{t('Сбор и кластеризация семантики', 'Semantic research and clustering')}</li>
                  <li>{t('SEO-подготовка сайта (структура, контент, техничка)', 'SEO website preparation (structure, content, technical SEO)')}</li>
                  <li>{t('Настройка аналитики: GA4 + GTM + конверсии', 'Analytics setup: GA4 + GTM + conversions')}</li>
                  <li>{t('Запуск Google Ads: Search, Shopping, Performance Max, Remarketing', 'Google Ads launch: Search, Shopping, Performance Max, Remarketing')}</li>
                  <li>{t('Оптимизация кампаний на основе данных', 'Data-driven campaign optimization')}</li>
                </ul>
              </div>
              <div className="service-result">
                <p className="service-result-title">{t('Результат:', 'Result:')}</p>
                <p className="service-result-text">
                  {t('Предсказуемый трафик, контроль CPA/ROAS и понятная воронка продаж.', 'Predictable traffic, CPA/ROAS control and clear sales funnel.')}
                </p>
              </div>
            </div>

            <div className={`service-card ${servicesVisible ? 'service-card-animate' : ''}`}>
              <div className="service-icon">
                <Bot size={40} color="#F15A29" />
              </div>
              <h3 className="service-title">{t('AI-агенты и автоматизация (n8n)', 'AI agents and automation (n8n)')}</h3>
              <p className="service-description">
                {t('Автоматизируем маркетинг, аналитику и бизнес-процессы.', 'We automate marketing, analytics and business processes.')}
              </p>
              <div className="service-result">
                <p className="service-result-title">{t('Примеры задач:', 'Task examples:')}</p>
                <ul className="service-list">
                  <li>{t('Оптимизация и масштабирование рекламных кампаний', 'Campaign optimization and scaling')}</li>
                  <li>{t('Ресерч цен, ассортимента и активности конкурентов', 'Competitor price, assortment and activity research')}</li>
                  <li>{t('Создание карточек товара на основе семантики и лидеров рынка', 'Product card creation based on semantics and market leaders')}</li>
                  <li>{t('AI-анализ рекламных кампаний и UI сайта', 'AI analysis of campaigns and website UI')}</li>
                  <li>{t('Любые кастомные бизнес-сценарии и интеграции через n8n', 'Any custom business scenarios and integrations via n8n')}</li>
                </ul>
              </div>
              <div className="service-result">
                <p className="service-result-title">{t('Результат:', 'Result:')}</p>
                <p className="service-result-text">
                  {t('Меньше ручной работы, быстрее реакции, больше контроля.', 'Less manual work, faster response, more control.')}
                </p>
              </div>
            </div>

            <div className={`service-card ${servicesVisible ? 'service-card-animate' : ''}`}>
              <div className="service-icon">
                <Wrench size={40} color="#F15A29" />
              </div>
              <h3 className="service-title">{t('Разработка IT-продуктов и сайтов', 'IT products and website development')}</h3>
              <p className="service-description">
                {t('Создаём сайты, готовые к продвижению и масштабированию.', 'We create websites ready for promotion and scaling.')}
              </p>
              <div className="service-result">
                <p className="service-result-title">{t('Что разрабатываем:', 'What we develop:')}</p>
                <ul className="service-list">
                  <li>{t('Лендинги под рекламу', 'Landing pages for advertising')}</li>
                  <li>{t('Сайты-визитки', 'Business card websites')}</li>
                  <li>{t('Интернет-магазины', 'E-commerce stores')}</li>
                  <li>{t('MVP и страницы под запуск IT-продуктов', 'MVP and pages for IT product launches')}</li>
                </ul>
              </div>
              <div className="service-result">
                <p className="service-result-title">{t('В работе учитываем:', 'We consider in our work:')}</p>
                <ul className="service-list">
                  <li>{t('SEO-базу', 'SEO foundation')}</li>
                  <li>UX/UI</li>
                  <li>{t('Аналитику и события', 'Analytics and events')}</li>
                  <li>{t('Подготовку под Google Ads', 'Google Ads preparation')}</li>
                </ul>
              </div>
              <div className="service-result">
                <p className="service-result-title">{t('Результат:', 'Result:')}</p>
                <p className="service-result-text">
                  {t('Сайт как инструмент продаж.', 'Website as a sales tool.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="why-us" id="why-us">
        <div className="container">
          <h2 className="section-title">
            {t('Почему мы?', 'Why us?')}
          </h2>
          <div className="why-us-grid">
            <div className={`why-us-item why-us-item-1 ${whyUsVisible.has(0) ? 'why-us-item-visible' : ''}`} data-why-us-index="0">
              <div className="why-us-icon-bg">
                <Rocket size={120} />
              </div>
              <h3 className="why-us-item-title">
                {t('Имеем экспертизу в построении и масштабировании IT-проектов', 'We have expertise in building and scaling IT projects')}
              </h3>
              <p className="why-us-item-text">
                {t('Понимаем не только рекламу, но и экономику, воронку и логику роста продукта.', 'We understand not only advertising, but also economics, funnel and product growth logic.')}
              </p>
            </div>
            <div className={`why-us-item why-us-item-2 ${whyUsVisible.has(1) ? 'why-us-item-visible' : ''}`} data-why-us-index="1">
              <div className="why-us-icon-bg">
                <BarChart3 size={120} />
              </div>
              <h3 className="why-us-item-title">
                {t('Комплексный подход: SEO + PPC + автоматизация', 'Comprehensive approach: SEO + PPC + automation')}
              </h3>
              <p className="why-us-item-text">
                {t('Даёт контроль и понимание всех процессов, которые влияют на продажи услуг или продукта.', 'Provides control and understanding of all processes that affect sales of services or products.')}
              </p>
            </div>
            <div className={`why-us-item why-us-item-3 ${whyUsVisible.has(2) ? 'why-us-item-visible' : ''}`} data-why-us-index="2">
              <div className="why-us-icon-bg">
                <Search size={120} />
              </div>
              <h3 className="why-us-item-title">
                {t('Работа строится на аналитике конкурентов и семантике', 'Work is based on competitor analytics and semantics')}
              </h3>
              <p className="why-us-item-text">
                {t('Мы понимаем, кто ваш клиент, как он ищет продукт и почему выбирает конкурентов.', 'We understand who your client is, how they search for products and why they choose competitors.')}
              </p>
            </div>
            <div className={`why-us-item why-us-item-4 ${whyUsVisible.has(3) ? 'why-us-item-visible' : ''}`} data-why-us-index="3">
              <div className="why-us-icon-bg">
                <Code size={120} />
              </div>
              <h3 className="why-us-item-title">
                {t('Получаете готовый алгоритм работы', 'You get a ready-to-use workflow algorithm')}
              </h3>
              <p className="why-us-item-text">
                {t('План проекта, чек-листы и логику действий, которые можно использовать и в других проектах.', 'Project plan, checklists and action logic that can be used in other projects.')}
              </p>
            </div>
            <div className={`why-us-item why-us-item-5 ${whyUsVisible.has(4) ? 'why-us-item-visible' : ''}`} data-why-us-index="4">
              <div className="why-us-icon-bg">
                <TrendingUp size={120} />
              </div>
              <h3 className="why-us-item-title">
                {t('В стеке SEO + PPC вы получаете готовый дашборд с воронкой продаж', 'With SEO + PPC stack you get a ready dashboard with sales funnel')}
              </h3>
              <p className="why-us-item-text">
                {t('Работаете только с теми показателями, которые реально влияют на результат.', 'You work only with metrics that really affect results.')}
              </p>
            </div>
            <div className={`why-us-item why-us-item-6 ${whyUsVisible.has(5) ? 'why-us-item-visible' : ''}`} data-why-us-index="5">
              <div className="why-us-icon-bg">
                <Lightbulb size={120} />
              </div>
              <h3 className="why-us-item-title">
                {t('Собственная методология', 'Our own methodology')}
              </h3>
              <p className="why-us-item-text">
                {t('Мы обучаем этому же в нашей школе цифровых профессий Go2 Academy.', 'We teach this at our digital professions school Go2 Academy.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="cases" id="cases">
        <div className="container">
          <h2 className="section-title">
            {t('Кейсы', 'Cases')}
          </h2>
          
          <div className="cases-category">
            <h3 className="cases-category-title">{t('SEO + Google PPC', 'SEO + Google PPC')}</h3>
            <div className="cases-grid">
              <div className="case-card">
                <div className="case-image case-image-with-hover">
                  <img src="/img/Portfolio_SEO_PPC_1.webp" alt="PPC Case" />
                </div>
                <div className="case-content">
                  <p className="case-niche">{t('Услуги', 'Services')}</p>
                  <div className="case-attr">
                    <span>{t('Проект продажи домиков на колесах и модульных домов', 'RV and modular homes sales project')}</span>
                  </div>
                  <div className="case-geo-wrapper">
                    <MapPin size={16} color="#F15A29" />
                    <span className="case-geo-text">{t('Германия', 'Germany')}</span>
                  </div>
                  <div className="case-attr">
                    <Megaphone color="#F15A29" />
                    <span>{t('7 (рекламных кампаний)', '7 (advertising campaigns)')}</span>
                  </div>
                  <div className="case-divider"></div>
                  <p className="case-results">
                    {t('За', 'In')} {t('8 месяцев', '8 months')} {t('работы с проектом было получено', 'of work with the project we received')} {t('2 560 конверсий', '2,560 conversions')} ({t('отправка формы обратной связи, Отправка имэйл, Телефонный звонок', 'contact form submission, email submission, phone call')}). {t('Из них', 'Of these')} {t('709 форм обратной связи', '709 contact forms')}.
                  </p>
                </div>
              </div>
              <div className="case-card">
                <div className="case-image case-image-with-hover">
                  <img src="/img/Portfolio_SEO_PPC_2.webp" alt="PPC Case 2" />
                </div>
                <div className="case-content">
                  <p className="case-niche">{t('Услуги', 'Services')}</p>
                  <div className="case-attr">
                    <span>{t('Проект по предоставлению услуг ремонта бытовой техники', 'Home appliance repair services project')}</span>
                  </div>
                  <div className="case-geo-wrapper">
                    <MapPin size={16} color="#F15A29" />
                    <span className="case-geo-text">{t('Канада, Миссиссауга', 'Canada, Mississauga')}</span>
                  </div>
                  <div className="case-attr">
                    <Megaphone color="#F15A29" />
                    <span>{t('2 (рекламных кампаний)', '2 (advertising campaigns)')}</span>
                  </div>
                  <div className="case-divider"></div>
                  <p className="case-results">
                    {t('Было получено', 'We received')} {t('252 конверсии', '252 conversions')} ({t('отправка формы обратной связи, Отправка имэйл, Телефонный звонок', 'contact form submission, email submission, phone call')}). {t('Из них', 'Of these')} {t('73 форм обратной связи', '73 contact forms')}, {t('16 заявок через имэйл', '16 email requests')}, {t('104 онлайн заказа', '104 online orders')}.
                  </p>
                </div>
              </div>
              <div className="case-card">
                <div className="case-image case-image-with-hover">
                  <img src="/img/Portfolio_SEO_PPC_3.webp" alt="PPC Case 3" />
                </div>
                <div className="case-content">
                  <p className="case-niche">e-com</p>
                  <div className="case-attr">
                    <span>{t('Проект HoReCa продажа кухонного оборудования', 'HoReCa kitchen equipment sales project')}</span>
                  </div>
                  <div className="case-geo-wrapper">
                    <MapPin size={16} color="#F15A29" />
                    <span className="case-geo-text">{t('Германия', 'Germany')}</span>
                  </div>
                  <div className="case-attr">
                    <Megaphone color="#F15A29" />
                    <span>{t('25 (рекламных кампаний)', '25 (advertising campaigns)')}</span>
                  </div>
                  <div className="case-divider"></div>
                  <p className="case-results">
                    {t('Была проведена', 'We conducted')} {t('реструктуризация рекламного кабинета', 'advertising account restructuring')}. {t('С момента начала работы с проектом, увеличив расходы на', 'Since the start of work on the project, increasing spending by')} {t('2 945 евро', '€2,945')} {t('или', 'or')} {t('1,43%', '1.43%')} {t('год к году,', 'year over year,')} {t('оборот увеличился на 132 606', 'revenue increased by 132,606')} {t('или', 'or')} {t('9,4%', '9.4%')}. {t('При этом', 'At the same time')} {t('ROAS был увеличен на 52%', 'ROAS was increased by 52%')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="cases-category">
            <h3 className="cases-category-title">{t('AI-автоматизации', 'AI automation')}</h3>
            <div className="cases-grid">
              <div className="case-card">
                <div className="case-image case-image-with-hover">
                  <img src="/img/Portfolio_Automatization_1.webp" alt="Automation Case" />
                </div>
                <div className="case-content">
                  <p className="case-niche">{t('IT-продукты', 'IT products')}</p>
                  <p className="case-geo">{t('Платформа:', 'Platform:')} <img src="/img/N8n-logo-new.svg" alt="n8n" className="case-platform-logo" /></p>
                  <p className="case-results">
                    {t('Выявление ошибок сервера (500+) и доступности проекта. Каждые 10 минут сервис отправляет HTTP‑запросы с более чем 56 IP разных стран. При обнаружении ошибки телеграм‑бот присылает уведомление.', 'Server error detection (500+) and project availability monitoring. Every 10 minutes the service sends HTTP requests from over 56 IPs from different countries. When an error is detected, a Telegram bot sends a notification.')}
                  </p>
                </div>
              </div>
              <div className="case-card">
                <div className="case-image case-image-with-hover">
                  <img src="/img/Portfolio_Automatization_3.webp" alt="Automation Case 3" />
                </div>
                <div className="case-content">
                  <p className="case-niche">{t('IT-продукты', 'IT products')}</p>
                  <p className="case-geo">{t('Платформа:', 'Platform:')} <img src="/img/N8n-logo-new.svg" alt="n8n" className="case-platform-logo" /></p>
                  <p className="case-results">
                    {t('Автоматизация генерации товарных описаний. Система создает описания товаров на основе названия, бренда и характеристик по заданной структуре с помощью ИИ. Результат формируется в трех версиях: текст на испанском, HTML на испанском и HTML на английском. Учитываются ключевые слова с контролем их вхождения. Решение ускоряет подготовку контента и стандартизирует описания для eCommerce.', 'Product description generation automation. The system creates product descriptions based on name, brand and characteristics using AI according to a given structure. Results are generated in three versions: Spanish text, Spanish HTML and English HTML. Keywords are included with frequency control. The solution speeds up content preparation and standardizes descriptions for eCommerce.')}
                  </p>
                </div>
              </div>
              <div className="case-card">
                <div className="case-image case-image-with-hover">
                  <img src="/img/Portfolio_Automatization_2.webp" alt="Automation Case 2" />
                </div>
                <div className="case-content">
                  <p className="case-niche">{t('IT-продукты', 'IT products')}</p>
                  <p className="case-geo">{t('Платформа:', 'Platform:')} <img src="/img/N8n-logo-new.svg" alt="n8n" className="case-platform-logo" /></p>
                  <p className="case-results">
                    {t('Автоматическая минусация нерелевантных ключевых запросов. Система берет ключи из Google Sheets и с помощью ИИ проверяет их по правилам для конкретной товарной группы. Запросы помечаются как релевантные или нет с комментарием причины. Решение сокращает ручную работу и упрощает масштабирование рекламных кампаний.', 'Automatic negative keyword filtering for irrelevant search queries. The system takes keywords from Google Sheets and uses AI to check them against rules for a specific product group. Queries are marked as relevant or not with a reason comment. The solution reduces manual work and simplifies campaign scaling.')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="cases-category">
            <h3 className="cases-category-title">{t('Разработка IT-проектов', 'IT project development')}</h3>
            <div className="cases-grid">
              <div className="case-card">
                <div className="case-image case-image-with-hover">
                  <img src="/img/Portfolio_web_1.webp" alt="Web Development Case" />
                </div>
                <div className="case-content">
                  <p className="case-niche">{t('Сайт компании', 'Company website')}</p>
                  <div className="case-geo-wrapper">
                    <Globe size={16} color="#F15A29" />
                    <span className="case-geo-text">montowire.ca</span>
                  </div>
                  <div className="case-geo-wrapper">
                    <MapPin size={16} color="#F15A29" />
                    <span className="case-geo-text">{t('Канада', 'Canada')}</span>
                  </div>
                  <div className="case-attr">
                    <strong>{t('Стек:', 'Stack:')}</strong>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
                      <img src="/img/wp_icon.webp" alt="WordPress" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/bootstrap_icon.webp" alt="Bootstrap" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/HTML5_icon.webp" alt="HTML5" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/css_icon.webp" alt="CSS" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/js_icon.webp" alt="JavaScript" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                    </span>
                  </div>
                  <p className="case-results">
                    {t('Разработка сайта платежной системы Montowire. В комплекс работ входила верстка сайта, а также адаптация под WordPress с настройкой всего необходимого функционала', 'Development of Montowire payment system website. The scope of work included website layout and WordPress adaptation with setup of all necessary functionality')}
                  </p>
                </div>
              </div>
              <div className="case-card">
                <div className="case-image case-image-with-hover">
                  <img src="/img/Portfolio_web_2.webp" alt="Web Development Case 2" />
                </div>
                <div className="case-content">
                  <p className="case-niche">{t('Интернет-магазин', 'E-commerce store')}</p>
                  <div className="case-geo-wrapper">
                    <Globe size={16} color="#F15A29" />
                    <span className="case-geo-text">benjuriy.shop</span>
                  </div>
                  <div className="case-geo-wrapper">
                    <MapPin size={16} color="#F15A29" />
                    <span className="case-geo-text">{t('Европа', 'Europe')}</span>
                  </div>
                  <div className="case-attr">
                    <strong>{t('Стек:', 'Stack:')}</strong>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
                      <img src="/img/opencart_icon.webp" alt="OpenCart" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/HTML5_icon.webp" alt="HTML5" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/css_icon.webp" alt="CSS" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/js_icon.webp" alt="JavaScript" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                    </span>
                  </div>
                  <p className="case-results">{t('Доработка существующего функционала магазина. Улучшен UI / UX каталога, карточки товара и чекаута, произведена оптимизация скриптов, кода, увеличена производительность', 'Improvement of existing store functionality. Improved UI/UX of catalog, product card and checkout, optimized scripts and code, increased performance')}</p>
                </div>
              </div>
              <div className="case-card">
                <div className="case-image case-image-with-hover">
                  <img src="/img/Portfolio_web_3.webp" alt="Web Development Case 3" />
                </div>
                <div className="case-content">
                  <p className="case-niche">{t('Сайт компании', 'Company website')}</p>
                  <div className="case-geo-wrapper">
                    <Globe size={16} color="#F15A29" />
                    <span className="case-geo-text">splintara.com</span>
                  </div>
                  <div className="case-geo-wrapper">
                    <MapPin size={16} color="#F15A29" />
                    <span className="case-geo-text">{t('США', 'USA')}</span>
                  </div>
                  <div className="case-attr">
                    <strong>{t('Стек:', 'Stack:')}</strong>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
                      <img src="/img/nodejs_icon.webp" alt="Node.js" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/HTML5_icon.webp" alt="HTML5" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/css_icon.webp" alt="CSS" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/js_icon.webp" alt="JavaScript" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                    </span>
                  </div>
                  <p className="case-results">{t('Вайб-код решение для диджитал-агентства Сплинтара, проект был реализован одним сотрудником без привлечения дизайнера, верстальщика и разработчиков', 'Vibe-code solution for Splintara digital agency, the project was implemented by one employee without involving a designer, layout designer and developers')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stages Section */}
      <section className="stages">
        <div className="container">
          <h2 className="section-title">
            {t('Этапы работы с проектом', 'Project workflow')}
          </h2>
          <div className="stages-list-wrapper">
            <div className="stages-timeline">
              <div className="stages-timeline-line">
                <div className="stages-timeline-progress" style={{ height: `${stageProgress}%` }}></div>
                <div className={`stages-timeline-dot ${stagesVisible.has(0) ? 'active' : ''}`} style={{ top: '0%' }}></div>
                <div className={`stages-timeline-dot ${stagesVisible.has(1) ? 'active' : ''}`} style={{ top: '16.66%' }}></div>
                <div className={`stages-timeline-dot ${stagesVisible.has(2) ? 'active' : ''}`} style={{ top: '33.33%' }}></div>
                <div className={`stages-timeline-dot ${stagesVisible.has(3) ? 'active' : ''}`} style={{ top: '50%' }}></div>
                <div className={`stages-timeline-dot ${stagesVisible.has(4) ? 'active' : ''}`} style={{ top: '66.66%' }}></div>
                <div className={`stages-timeline-dot ${stagesVisible.has(5) ? 'active' : ''}`} style={{ top: '83.33%' }}></div>
              </div>
            </div>
            <div className="stages-list">
            <div className={`stage-item ${stagesVisible.has(0) ? 'stage-visible' : ''}`} data-stage-index="0">
              <div className="stage-content">
                <div className="stage-number">01</div>
                <div className="stage-text">
                  <h3 className="stage-title">{t('Анализ бизнеса и целей', 'Business and goals analysis')}</h3>
                  <p className="stage-description">{t('Разбираем продукт, экономику и цели, чтобы маркетинг работал на результат, а не "по ощущениям".', 'We analyze the product, economics and goals so that marketing works for results, not "by feel".')}</p>
                </div>
              </div>
              <div className="stage-illustration">
                <Search size={120} color="#F15A29" strokeWidth={1.5} />
              </div>
            </div>
            <div className={`stage-item ${stagesVisible.has(1) ? 'stage-visible' : ''}`} data-stage-index="1">
              <div className="stage-content">
                <div className="stage-number">02</div>
                <div className="stage-text">
                  <h3 className="stage-title">{t('Аудит рекламы / конкурентов / сайта / данных', 'Advertising / competitors / website / data audit')}</h3>
                  <p className="stage-description">{t('Находим точки роста и утечки бюджета в рекламе, сайте, аналитике и действиях конкурентов.', 'We find growth points and budget leaks in advertising, website, analytics and competitor actions.')}</p>
                </div>
              </div>
              <div className="stage-illustration">
                <BarChart3 size={120} color="#F15A29" strokeWidth={1.5} />
              </div>
            </div>
            <div className={`stage-item ${stagesVisible.has(2) ? 'stage-visible' : ''}`} data-stage-index="2">
              <div className="stage-content">
                <div className="stage-number">03</div>
                <div className="stage-text">
                  <h3 className="stage-title">{t('Стратегия и медиаплан', 'Strategy and media plan')}</h3>
                  <p className="stage-description">{t('Определяем каналы, бюджеты и KPI, формируем план действий на основе данных и целей бизнеса.', 'We determine channels, budgets and KPIs, form an action plan based on data and business goals.')}</p>
                </div>
              </div>
              <div className="stage-illustration">
                <Target size={120} color="#F15A29" strokeWidth={1.5} />
              </div>
            </div>
            <div className={`stage-item ${stagesVisible.has(3) ? 'stage-visible' : ''}`} data-stage-index="3">
              <div className="stage-content">
                <div className="stage-number">04</div>
                <div className="stage-text">
                  <h3 className="stage-title">{t('Запуск и настройка', 'Launch and setup')}</h3>
                  <p className="stage-description">{t('Настраиваем рекламу и аналитику так, чтобы весь путь пользователя был под контролем.', 'We set up advertising and analytics so that the entire user journey is under control.')}</p>
                </div>
              </div>
              <div className="stage-illustration">
                <Rocket size={120} color="#F15A29" strokeWidth={1.5} />
              </div>
            </div>
            <div className={`stage-item ${stagesVisible.has(4) ? 'stage-visible' : ''}`} data-stage-index="4">
              <div className="stage-content">
                <div className="stage-number">05</div>
                <div className="stage-text">
                  <h3 className="stage-title">{t('Аналитика и оптимизация', 'Analytics and optimization')}</h3>
                  <p className="stage-description">{t('Анализируем данные, улучшаем показатели и усиливаем то, что реально приносит продажи.', 'We analyze data, improve metrics and strengthen what really brings sales.')}</p>
                </div>
              </div>
              <div className="stage-illustration">
                <TrendingUp size={120} color="#F15A29" strokeWidth={1.5} />
              </div>
            </div>
            <div className={`stage-item ${stagesVisible.has(5) ? 'stage-visible' : ''}`} data-stage-index="5">
              <div className="stage-content">
                <div className="stage-number">06</div>
                <div className="stage-text">
                  <h3 className="stage-title">{t('Масштабирование и автоматизация', 'Scaling and automation')}</h3>
                  <p className="stage-description">{t('Готовим систему к росту через автоматизацию и оптимизацию процессов', 'We prepare the system for growth through automation and process optimization')}</p>
                </div>
              </div>
              <div className="stage-illustration">
                <Zap size={120} color="#F15A29" strokeWidth={1.5} />
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-section-icon-bg">
          <Rocket size={400} strokeWidth={1.5} />
        </div>
        <div className="cta-container">
          <div className="cta-content">
            <div className="cta-header">
              <Star size={16} color="rgba(255, 255, 255, 0.7)" />
              <span className="cta-label">
                {t('КОНТАКТ', 'CONTACT')}
              </span>
            </div>
            <h2 className="cta-title">
              {t('Готовы построить систему продаж?', 'Ready to build a sales system?')}
            </h2>
            <p className="cta-description">
              {t(
                'Оставьте заявку — мы разберём ваш проект, покажем точки роста и предложим понятный план действий с цифрами, сроками и приоритетами.',
                'Leave a request — we will analyze your project, find growth points and propose a clear action plan with numbers, timing and priorities.'
              )}
            </p>
            <div className="cta-features">
              <div className="cta-feature">
                <FileCheck size={20} color="rgba(255, 255, 255, 0.9)" />
                <span>{t('бесплатный аудит проекта', 'free project audit')}</span>
              </div>
              <div className="cta-feature">
                <ClipboardCheck size={20} color="rgba(255, 255, 255, 0.9)" />
                <span>{t('план работ с чек-листами и этапами', 'action plan with checklists and stages')}</span>
              </div>
              <div className="cta-feature">
                <Rocket size={20} color="rgba(255, 255, 255, 0.9)" />
                <span>{t('быстрый отклик', 'fast response')}</span>
              </div>
            </div>
          </div>
          <div className="cta-form-wrapper">
            <form className="cta-form" onSubmit={(e) => {
              e.preventDefault();
              // Валидация
              const errors: typeof contactFormErrors = {
                firstName: '',
                site: '',
                email: '',
                phone: ''
              };
              
              let isValid = true;

              if (!contactFormData.firstName.trim()) {
                errors.firstName = t('Имя обязательно для заполнения', 'First name is required');
                isValid = false;
              }

              if (!contactFormData.site.trim()) {
                errors.site = t('Сайт обязателен для заполнения', 'Site is required');
                isValid = false;
              } else {
                const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
                if (!urlPattern.test(contactFormData.site)) {
                  errors.site = t('Введите корректный URL сайта', 'Enter a valid website URL');
                  isValid = false;
                }
              }

              if (!contactFormData.email.trim()) {
                errors.email = t('Email обязателен для заполнения', 'Email is required');
                isValid = false;
              } else {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(contactFormData.email)) {
                  errors.email = t('Введите корректный email', 'Enter a valid email');
                  isValid = false;
                }
              }

              const phoneDigits = contactFormData.phone.replace(/\D/g, '');
              if (!phoneDigits) {
                errors.phone = t('Номер телефона обязателен для заполнения', 'Phone number is required');
                isValid = false;
              } else {
                let minLength = 10;
                if (contactPhoneCountry === '+380') minLength = 9;
                else if (contactPhoneCountry === '+1') minLength = 10;
                else if (contactPhoneCountry === '+34') minLength = 9;
                else if (contactPhoneCountry === '+39') minLength = 10;
                if (phoneDigits.length < minLength) {
                  errors.phone = t('Введите корректный номер телефона', 'Enter a valid phone number');
                  isValid = false;
                }
              }

              setContactFormErrors(errors);

              if (isValid) {
                console.log('Form submitted:', contactFormData);
                // Здесь будет отправка формы
              }
            }}>
              <div className="cta-form-row">
                <div className="cta-form-field">
                  <label htmlFor="firstName">First name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    placeholder={t('Иван*', 'John*')}
                    value={contactFormData.firstName}
                    onChange={(e) => setContactFormData({ ...contactFormData, firstName: e.target.value })}
                    className={contactFormErrors.firstName ? 'error' : ''}
                  />
                  {contactFormErrors.firstName && <span className="form-error">{contactFormErrors.firstName}</span>}
                </div>
                <div className="cta-form-field">
                  <label htmlFor="site">Site</label>
                  <input 
                    type="url" 
                    id="site" 
                    name="site" 
                    placeholder="https://example.com*"
                    value={contactFormData.site}
                    onChange={(e) => setContactFormData({ ...contactFormData, site: e.target.value })}
                    className={contactFormErrors.site ? 'error' : ''}
                  />
                  {contactFormErrors.site && <span className="form-error">{contactFormErrors.site}</span>}
                </div>
              </div>
              <div className="cta-form-field">
                <label htmlFor="email">Email address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="hello@example.com*"
                  value={contactFormData.email}
                  onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                  className={contactFormErrors.email ? 'error' : ''}
                />
                {contactFormErrors.email && <span className="form-error">{contactFormErrors.email}</span>}
              </div>
              <div className="cta-form-field">
                <label htmlFor="phone">Phone number</label>
                <div className="phone-input-wrapper">
                  <select 
                    className="phone-country-select"
                    value={contactPhoneCountry}
                    onChange={(e) => {
                      setContactPhoneCountry(e.target.value);
                      setContactFormData({ ...contactFormData, phone: '' });
                    }}
                  >
                    <option value="+380">🇺🇦 +380</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+48">🇵🇱 +48</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+39">🇮🇹 +39</option>
                  </select>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    placeholder={contactPhoneCountry === '+380' ? '12 345 67 89*' : contactPhoneCountry === '+1' ? '(999) 123-4567*' : contactPhoneCountry === '+34' ? '123 456 789*' : contactPhoneCountry === '+39' ? '123 456 7890*' : '123 456 789*'}
                    value={contactFormData.phone}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value, contactPhoneCountry);
                      setContactFormData({ ...contactFormData, phone: formatted });
                    }}
                    className={contactFormErrors.phone ? 'error' : ''}
                  />
                </div>
                {contactFormErrors.phone && <span className="form-error">{contactFormErrors.phone}</span>}
              </div>
              <button type="submit" className="cta-form-submit">
                {t('Отправить сообщение', 'Send message')}
                <ArrowUpRight size={20} />
              </button>
              <p className="cta-form-legal">
                {t('Заполняя форму, вы соглашаетесь с нашими', 'By filling out the form, you agree to our')} <a href={`/terms?lang=${language}`}>{t('Условиями', 'Terms')}</a> {t('и', 'and')} <a href={`/privacy?lang=${language}`}>{t('Политикой конфиденциальности', 'Privacy Policy')}</a>.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="testimonials-icons-background">
          <BarChart3 className="testimonials-icon-bg" size={40} />
          <TrendingUp className="testimonials-icon-bg" size={40} />
          <Search className="testimonials-icon-bg" size={40} />
          <Laptop className="testimonials-icon-bg" size={40} />
          <Rocket className="testimonials-icon-bg" size={40} />
          <Zap className="testimonials-icon-bg" size={40} />
          <Target className="testimonials-icon-bg" size={40} />
          <Globe className="testimonials-icon-bg" size={40} />
          <Star className="testimonials-icon-bg" size={40} />
          <MessageCircle className="testimonials-icon-bg" size={40} />
        </div>
        <div className="container">
          <h2 className="section-title">
            {t('Отзывы клиентов', 'Client reviews')}
          </h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                {t('Проблема была в качестве заявок — их было достаточно, но большая часть плохо конвертировала в продажи так как клиенты приходили с запросами не имеющими отношения к нашему продукту. Вместе с командой мы перебрали семантику и нашли слабые места в функционале и посадочных страницах, исправили технические ошибки влияющие на рекламную кампанию.', 'The problem was in the quality of leads — there were enough of them, but most converted poorly into sales because clients came with queries unrelated to our product. Together with the team, we reviewed the semantics and found weak points in functionality and landing pages, fixed technical errors affecting the advertising campaign.')}
              </p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar">
                  <img src="/img/Testemonials_1.webp" alt="Iryna Savchenko" />
                </div>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">Iryna Savchenko</h3>
                  <p className="testimonial-role">Founder</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                {t('Запустили рекламу и настроили аналитику. Уже через месяц увидел первые заявки, а через три месяца ROI вырос на 40%. Особенно ценна для меня была обратная связь и прозрачность. Ребята максимально подробно объясняли каждый этап работы, за что отдельное спасибо. В общем продолжаем работать, рекомендую', 'We launched advertising and set up analytics. I saw the first leads within a month, and after three months ROI increased by 40%. What was especially valuable for me was the feedback and transparency. The team explained every stage of work in maximum detail, for which special thanks. In general, we continue to work, I recommend')}
              </p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar">
                  <img src="/img/Testemonials_3.webp" alt="Oleksandr Petrov" />
                </div>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">Oleksandr Petrov</h3>
                  <p className="testimonial-role">Founder & CEO</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                {t('Понравился скрупулезный подход. Цели, которые были поставлены, реализованы с небольшой задержкой, что в нашем случае приемлемо, так как были вопросы и на нашей стороне. Благодарен за работу', 'I liked the meticulous approach. The goals that were set were implemented with a slight delay, which in our case is acceptable, as there were questions on our side as well. Thank you for the work')}
              </p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar">
                  <img src="/img/Testemonials_2.webp" alt="Serhii Fridman" />
                </div>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">Serhii Fridman</h3>
                  <p className="testimonial-role">Founder</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                {t('Большим дополнением и удивлением в работе был формат работы с данными. Сделали критический путь пользователя с воронкой, весьма неплохо оформили отчеты в Looker Studio с основными показателями. Раньше пользовался Google Analytics, сейчас он практически не нужен, все что важно есть под рукой на дашбордах. Результатами работы более чем доволен, получили уже первые 25 звонков на этапе SEO и до запуска PPC, что удивило и конечно порадовало.', 'A big addition and surprise in the work was the data work format. They created a critical user path with a funnel, quite well formatted reports in Looker Studio with key metrics. I used to use Google Analytics, now it\'s practically not needed, everything important is at hand on dashboards. I\'m more than satisfied with the results, we already received the first 25 calls at the SEO stage and before launching PPC, which surprised and of course pleased.')}
              </p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar">
                  <img src="/img/Testemonials_5.webp" alt="Potap Lisica" />
                </div>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">Potap Lisica</h3>
                  <p className="testimonial-role">Product Owner</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                {t('Работаем второй год. Спасибо Сергею и Алексею за нормальный человеческий подход. Нравится, что я задаю минимум вопросов по результатам, данные говорят сами за себя', 'We\'ve been working for the second year. Thanks to Serhii and Oleksii for a normal human approach. I like that I ask minimal questions about results, the data speaks for itself')}
              </p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar">
                  <img src="/img/Testemonials_4.webp" alt="Tony Sanders" />
                </div>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">Tony Sanders</h3>
                  <p className="testimonial-role">CEO</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                Пришли к ребятам с болью и слезами, предыдущие подрядчики допустили ряд ошибок, в результате стоимость лида пробила X3 от первоначальной, для нас это был большой стресс. Продажи перестали себя окупать. За несколько месяцев ситуация была исправлена, убрали критические ошибки и заново собрали весь процесс продаж. Сейчас уже в 2 раза уменьшили стоимость лида и надеемся, не предел
              </p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar">
                  <img src="/img/Testemonials_6.webp" alt="Kristina W." />
                </div>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">Kristina W.</h3>
                  <p className="testimonial-role">Product Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="clients">
        <div className="container">
          <h2 className="clients-title">
            {t('Наши клиенты', 'Our clients')}
          </h2>
          <div className="clients-slider-wrapper">
            <div className="clients-slider clients-slider-top">
              <div className="clients-slider-track">
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_3.webp" alt="Client Logo 3" />
                </div>
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_4.webp" alt="Client Logo 4" />
                </div>
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_5.webp" alt="Client Logo 5" />
                </div>
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_7.webp" alt="Client Logo 7" />
                </div>
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_8.webp" alt="Client Logo 8" />
                </div>
                {/* Дублируем для бесшовной анимации */}
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_3.webp" alt="Client Logo 3" />
                </div>
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_4.webp" alt="Client Logo 4" />
                </div>
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_5.webp" alt="Client Logo 5" />
                </div>
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_7.webp" alt="Client Logo 7" />
                </div>
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_8.webp" alt="Client Logo 8" />
                </div>
              </div>
            </div>
            <div className="clients-slider clients-slider-bottom">
              <div className="clients-slider-track clients-slider-track-reverse">
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_1.webp" alt="Client Logo 1" />
                </div>
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_2.webp" alt="Client Logo 2" />
                </div>
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_6.webp" alt="Client Logo 6" />
                </div>
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_9.webp" alt="Client Logo 9" />
                </div>
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_10.webp" alt="Client Logo 10" />
                </div>
                {/* Дублируем для бесшовной анимации */}
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_1.webp" alt="Client Logo 1" />
                </div>
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_2.webp" alt="Client Logo 2" />
                </div>
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_6.webp" alt="Client Logo 6" />
                </div>
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_9.webp" alt="Client Logo 9" />
                </div>
                <div className="client-logo client-logo-with-image">
                  <img src="/img/Client_logo_10.webp" alt="Client Logo 10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <div className="faq-header">
            <h2 className="faq-title">
              {t('Часто задаваемые вопросы', 'Frequently asked questions')}
            </h2>
            <p className="faq-subtitle">
              {t(
                'Здесь собраны ответы на часто задаваемые вопросы о нашей работе, процессах и услугах. Если не нашли нужный ответ — свяжитесь с нами, мы поможем.',
                'Here you can find answers to common questions about our work, processes and services. If you do not find the answer you need — contact us and we will help.'
              )}
            </p>
          </div>
          <div className="faq-content">
            <div className="faq-categories">
              <button 
                className={`faq-category-btn ${activeFaqCategory === 'general' ? 'active' : ''}`}
                onClick={() => { setActiveFaqCategory('general'); setActiveFaq(null); }}
              >
                <span>{t('Общие вопросы', 'General questions')}</span>
                <ChevronRight size={20} />
              </button>
              <button 
                className={`faq-category-btn ${activeFaqCategory === 'support' ? 'active' : ''}`}
                onClick={() => { setActiveFaqCategory('support'); setActiveFaq(null); }}
              >
                <span>{t('Результаты работы и аналитика', 'Results and analytics')}</span>
                <ChevronRight size={20} />
              </button>
              <button 
                className={`faq-category-btn ${activeFaqCategory === 'misc' ? 'active' : ''}`}
                onClick={() => { setActiveFaqCategory('misc'); setActiveFaq(null); }}
              >
                <span>Go2 Academy</span>
                <ChevronRight size={20} />
              </button>
              <button 
                className={`faq-category-btn ${activeFaqCategory === 'academy-business' ? 'active' : ''}`}
                onClick={() => { setActiveFaqCategory('academy-business'); setActiveFaq(null); }}
              >
                <span>Go2 Academy For Business</span>
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="faq-list">
              {activeFaqCategory === 'general' && (
                <>
                  <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(0)}>
                      <span>{t('С какими проектами вы работаете?', 'What projects do you work with?')}</span>
                      {activeFaq === 0 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('Мы работаем с бизнес-проектами, e-commerce, сервисными компаниями и IT-продуктами. Берём в работу как новые проекты на старте, так и действующие, где требуется рост, масштабирование или наведение порядка в данных и процессах. Важен не размер бизнеса, а готовность работать с цифрами и системой.', 'We work with business projects, e-commerce, service companies and IT products. We take on both new projects at the start and existing ones that require growth, scaling or bringing order to data and processes. What matters is not the size of the business, but the willingness to work with numbers and systems.')}
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(1)}>
                      <span>{t('Какой бюджет на рекламу?', 'What is the advertising budget?')}</span>
                      {activeFaq === 1 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('Минимальный рекламный бюджет зависит от ниши, конкуренции и целей проекта. Мы не называем цифры «вслепую» — сначала анализируем рынок и считаем экономику, после чего предлагаем реалистичный диапазон бюджета. Наша задача — сделать бюджет управляемым и прогнозируемым.', 'The minimum advertising budget depends on the niche, competition and project goals. We don\'t name numbers "blindly" — first we analyze the market and calculate the economics, then we offer a realistic budget range. Our task is to make the budget manageable and predictable.')}
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(2)}>
                      <span>{t('Какие формы оплаты?', 'What payment methods?')}</span>
                      {activeFaq === 2 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('Мы работаем по договору и принимаем оплату по безналичному расчёту. Формат оплаты зависит от типа проекта: фикс за этапы, ежемесячное сопровождение или комбинированная модель. Все условия и объём работ фиксируются заранее.', 'We work under a contract and accept payment by bank transfer. Payment format depends on the project type: fixed per stages, monthly support or combined model. All terms and scope of work are fixed in advance.')}
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(3)}>
                      <span>{t('Как будет выстроена совместная работа?', 'How will the collaboration be structured?')}</span>
                      {activeFaq === 3 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('Работа начинается с анализа и формирования плана с этапами, сроками и чек-листами. Далее мы согласовываем приоритеты, запускаем работы и регулярно синхронизируемся по результатам. Вы всегда понимаете, на каком этапе находится проект и какие задачи выполняются.', 'Work begins with analysis and forming a plan with stages, deadlines and checklists. Then we coordinate priorities, launch work and regularly synchronize on results. You always understand what stage the project is at and what tasks are being performed.')}
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 4 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(4)}>
                      <span>{t('Есть ли у вас платные консультации?', 'Do you offer paid consultations?')}</span>
                      {activeFaq === 4 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('Да, у нас есть платная консультация: мы детально изучим ваше направление, после чего дадим развёрнутый ответ с аудитом и рекомендациями по продвижению с комментарием каждого этапа. Длительность консультации — 60–90 минут.', 'Yes, we offer paid consultations: we will study your direction in detail, then provide a comprehensive answer with an audit and recommendations for promotion with comments on each stage. Consultation duration is 60–90 minutes.')}
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeFaqCategory === 'support' && (
                <>
                  <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(0)}>
                      <span>{t('Когда я увижу результаты работы?', 'When will I see the results?')}</span>
                      {activeFaq === 0 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('Первые данные и сигналы появляются уже после запуска рекламы и настройки аналитики. SEO — это более долгосрочный процесс, но его влияние на качество трафика и рекламы заметно уже на ранних этапах. Мы показываем прогресс по каждому этапу, а не «ждём чуда через несколько месяцев».', 'First data and signals appear right after launching advertising and setting up analytics. SEO is a more long-term process, but its impact on traffic and advertising quality is noticeable already at early stages. We show progress at each stage, not "waiting for a miracle in a few months".')}
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(1)}>
                      <span>{t('Как вы отчитываетесь?', 'How do you report?')}</span>
                      {activeFaq === 1 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('Мы строим критический путь пользователя — от первого касания до заявки или покупки. Все данные выводятся в дашборды, которые показывают ситуацию в реальном времени: трафик, конверсии, стоимость и результат. Отчёт — это не PDF, а живая система принятия решений.', 'We build a critical user path — from first touch to lead or purchase. All data is displayed in dashboards that show the situation in real time: traffic, conversions, cost and results. A report is not a PDF, but a live decision-making system.')}
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(2)}>
                      <span>{t('Что если не получится?', 'What if it doesn\'t work?')}</span>
                      {activeFaq === 2 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('Наша система позволяет сразу увидеть, на каком этапе возникает проблема: трафик, сайт, конверсия или аналитика. Благодаря дашбордам и критическому пути пользователя мы быстро находим узкое место и корректируем стратегию. Мы не ждём «плохого месяца», чтобы понять, что что-то пошло не так.', 'Our system allows you to immediately see at what stage the problem arises: traffic, website, conversion or analytics. Thanks to dashboards and the critical user path, we quickly find the bottleneck and adjust the strategy. We don\'t wait for a "bad month" to understand that something went wrong.')}
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(3)}>
                      <span>{t('Как вы считаете эффективность: по лидам, продажам или ROI?', 'How do you measure effectiveness: by leads, sales or ROI?')}</span>
                      {activeFaq === 3 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('Мы считаем эффективность по тем метрикам, которые важны для конкретного бизнеса: лидам, продажам, выручке и ROI. Все показатели связаны между собой и считаются в одной системе аналитики. Главное — не количество действий, а реальный вклад в результат бизнеса.', 'We measure effectiveness by metrics that are important for a specific business: leads, sales, revenue and ROI. All indicators are interconnected and calculated in one analytics system. The main thing is not the number of actions, but the real contribution to business results.')}
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 4 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(4)}>
                      <span>{t('Какие результаты я получу от SEO?', 'What results will I get from SEO?')}</span>
                      {activeFaq === 4 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('SEO и PPC работают в одной системе: качество рекламы напрямую зависит от SEO-базы сайта. Результатом SEO-работы является валидная структура сайта, адаптированная под семантику и требования поисковых систем, корректное наполнение страниц и устранение технических ошибок. При необходимости проводится внешняя оптимизация и линкбилдинг, чтобы усилить позиции и качество трафика.', 'SEO and PPC work in one system: advertising quality directly depends on the site\'s SEO foundation. The result of SEO work is a valid site structure adapted to semantics and search engine requirements, correct page content and elimination of technical errors. If necessary, external optimization and link building are carried out to strengthen positions and traffic quality.')}
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeFaqCategory === 'misc' && (
                <>
                  <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(0)}>
                      <span>{t('Чему вы учите?', 'What do you teach?')}</span>
                      {activeFaq === 0 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('Наш основной 4 месячный курс - Эффективная система продаж с Google PPC, в рамках которого мы разбираем детально запуск рекламы, аналитику, структуру продаж и автоматизацию процессов. Курс написан по авторской методике и включает исчерпывающий объем знаний применимый не только в рекламе но и в бизнесе.', 'Our main 4-month course is Effective Sales System with Google PPC, within which we analyze in detail advertising launch, analytics, sales structure and process automation. The course is written according to our own methodology and includes a comprehensive volume of knowledge applicable not only in advertising but also in business.')}
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(1)}>
                      <span>{t('Сколько стоит обучение?', 'How much does training cost?')}</span>
                      {activeFaq === 1 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('По пакетам обучения и их наполнению вы можете детально ознакомится на сайте нашей академии *Сайт*. По окончанию студенты получают сертификаты (Bronze, Silver, Gold), согласно их продуктивности во время обучения, и количеству выполненных заданий.', 'You can learn more about training packages and their content on our academy website *Site*. Upon completion, students receive certificates (Bronze, Silver, Gold) according to their productivity during training and the number of completed assignments.')}
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(2)}>
                      <span>{t('На каком языке проходят лекции?', 'What language are the lectures in?')}</span>
                      {activeFaq === 2 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('Лекции проходят на русском языке.', 'Lectures are conducted in Russian.')}
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(3)}>
                      <span>{t('Лекции в записи или живые встречи?', 'Recorded lectures or live meetings?')}</span>
                      {activeFaq === 3 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('Часть лекций проходит в реальном времени, ты сможешь задать вопрос преподавателю, также тебе доступны все записи лекций.', 'Some lectures are held in real time, you can ask the instructor a question, and all lecture recordings are also available to you.')}
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 4 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(4)}>
                      <span>{t('Какой процент теории и практики?', 'What percentage of theory and practice?')}</span>
                      {activeFaq === 4 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('80% практики. Каждый студент запускает свои проекты и видит живой результат.', '80% practice. Each student launches their own projects and sees live results.')}
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeFaqCategory === 'academy-business' && (
                <>
                  <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(0)}>
                      <span>{t('Что такое Go2 Academy For Business?', 'What is Go2 Academy For Business?')}</span>
                      {activeFaq === 0 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('Go2 Academy For Business — это корпоративное обучение для вашей команды. Мы помогаем развивать навыки в области цифрового маркетинга, SEO, автоматизации и разработки IT-продуктов.', 'Go2 Academy For Business is corporate training for your team. We help develop skills in digital marketing, SEO, automation and IT product development.')}
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(1)}>
                      <span>{t('Какие форматы обучения доступны для бизнеса?', 'What training formats are available for business?')}</span>
                      {activeFaq === 1 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('Мы предлагаем офлайн и онлайн обучение, индивидуальные программы для команд, воркшопы и долгосрочные курсы. Формат подбирается под потребности вашей компании.', 'We offer offline and online training, individual programs for teams, workshops and long-term courses. The format is selected according to your company\'s needs.')}
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(2)}>
                      <span>{t('Можно ли адаптировать программу под специфику нашей компании?', 'Can the program be adapted to our company\'s specifics?')}</span>
                      {activeFaq === 2 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('Да, мы создаём индивидуальные программы обучения с учётом вашей отрасли, бизнес-процессов и целей. Программа разрабатывается после анализа потребностей вашей команды.', 'Yes, we create individual training programs taking into account your industry, business processes and goals. The program is developed after analyzing your team\'s needs.')}
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(3)}>
                      <span>{t('Какие результаты можно ожидать после обучения?', 'What results can be expected after training?')}</span>
                      {activeFaq === 3 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('После обучения ваша команда сможет самостоятельно применять инструменты цифрового маркетинга, настраивать автоматизацию, оптимизировать процессы и принимать решения на основе данных.', 'After training, your team will be able to independently apply digital marketing tools, set up automation, optimize processes and make data-driven decisions.')}
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 4 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(4)}>
                      <span>{t('Предоставляете ли вы сертификаты по окончании обучения?', 'Do you provide certificates upon completion of training?')}</span>
                      {activeFaq === 4 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {t('Да, по завершении программы все участники получают сертификаты Go2 Academy For Business, подтверждающие освоение навыков.', 'Yes, upon completion of the program, all participants receive Go2 Academy For Business certificates confirming skill mastery.')}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contacts">
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3 className="footer-title">Go2Agency</h3>
              <p className="footer-description">
                {t('Digital-агентство: запуск рекламы PPC, SEO оптимизация, автоматизация на n8n и разработка сайтов.', 'Digital agency: PPC advertising launch, SEO optimization, n8n automation and website development.')}
              </p>
              <div className="footer-contact">
                <p className="footer-email">Email: <a href="mailto:go2agency.info@gmail.com">go2agency.info@gmail.com</a></p>
                <p className="footer-telegram">Telegram: <a href="https://t.me/go2agency" target="_blank">@go2agency</a></p>
              </div>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">{t('Навигация', 'Navigation')}</h3>
              <ul className="footer-links">
                <li><a href="#main">{t('Главная', 'Home')}</a></li>
                <li><a href="#services">{t('Направления', 'Services')}</a></li>
                <li><a href="#why-us">{t('Почему мы?', 'Why us?')}</a></li>
                <li><a href="#cases">{t('Кейсы', 'Cases')}</a></li>
                <li><a href="#contacts">{t('Контакты', 'Contacts')}</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">{t('Услуги', 'Services')}</h3>
              <ul className="footer-links">
                <li><a href="#services">SEO + Google PPC</a></li>
                <li><a href="#services">{t('AI-автоматизация', 'AI automation')}</a></li>
                <li><a href="#services">{t('Разработка сайтов', 'Website development')}</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">{t('Документы', 'Documents')}</h3>
              <ul className="footer-links">
                <li><a href={`/privacy?lang=${language}`}>{t('Политика конфиденциальности', 'Privacy Policy')}</a></li>
                <li><a href={`/terms?lang=${language}`}>{t('Условия использования', 'Terms of Service')}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">© 2025 Go2Agency. {t('Все права защищены.', 'All rights reserved.')}</p>
            <div className="footer-made-wrapper">
              <p className="footer-made">
                {t('Сделано с любовью с помощью вайб-код решений. Ни один разработчик не пострадал', 'Made with love using vibe-code solutions. No developers were harmed')} <Heart size={16} className="heart" />
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Audit Modal */}
      {auditModalOpen && (
        <div className="modal-overlay" onClick={() => setAuditModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setAuditModalOpen(false)}>
              <X size={24} />
            </button>
            <h2 className="modal-title">{modalType === 'audit' ? t('Бесплатный аудит', 'Book a Free Audit') : t('Обсудить проект', 'Discuss the project')}</h2>
            <form className="audit-form" onSubmit={(e) => {
              e.preventDefault();
              // Здесь будет обработка отправки формы
              console.log('Form submitted:', formData);
              setAuditModalOpen(false);
            }}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  {t('Имя', 'Name')} <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  {t('Номер телефона', 'Phone number')} <span className="required">*</span>
                </label>
                <div className="phone-input-wrapper">
                  <select 
                    className="phone-country-select"
                    value={phoneCountry}
                    onChange={(e) => {
                      setPhoneCountry(e.target.value);
                      setFormData({ ...formData, phone: '' });
                    }}
                  >
                    <option value="+380">🇺🇦 +380</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+48">🇵🇱 +48</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+39">🇮🇹 +39</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    className="form-input phone-input"
                    required
                    placeholder={phoneCountry === '+380' ? '12 345 67 89' : phoneCountry === '+1' ? '(999) 123-4567' : phoneCountry === '+34' ? '123 456 789' : phoneCountry === '+39' ? '123 456 7890' : '123 456 789'}
                    value={formData.phone}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value, phoneCountry);
                      setFormData({ ...formData, phone: formatted });
                    }}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="site" className="form-label">
                  {t('Сайт', 'Site')} <span className="required">*</span>
                </label>
                <input
                  type="url"
                  id="site"
                  className="form-input"
                  required
                  placeholder="https://example.com"
                  value={formData.site}
                  onChange={(e) => setFormData({ ...formData, site: e.target.value })}
                />
              </div>
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    required
                    checked={formData.agree}
                    onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                  />
                  <span>{t('Я согласен на обработку моих персональных данных в соответствии с', 'I agree to the processing of my personal data in accordance with')} <a href={`/privacy?lang=${language}`} className="form-link">{t('Политикой конфиденциальности', 'Privacy Policy')}</a>.</span>
                </label>
              </div>
              <button type="submit" className="btn btn-primary form-submit">
                {t('Отправить запрос', 'Send request')}
              </button>
              <p className="form-footer-text">
                {t('Мы используем ваши данные только для ответа на ваш запрос.', 'We use your data only to respond to your request.')}
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default App
