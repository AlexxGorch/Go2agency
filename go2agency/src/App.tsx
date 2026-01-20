import { useState, useEffect } from 'react'
import './App.css'
import { Rocket, Bot, Wrench, BarChart3, TrendingUp, Target, Zap, Code, Heart, Search, Globe, Lightbulb, Link, Palette, Settings, Laptop, Smartphone, MapPin, Megaphone, Star, ArrowUpRight, ChevronRight, X, Plus, FileCheck, ClipboardCheck, MessageCircle } from 'lucide-react'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('general');
  const [isScrolled, setIsScrolled] = useState(false);
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

    const originalText = servicesTitle.textContent?.trim() || '';
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
  }, [servicesTitleAnimated]);

  // Эффект пишущей машинки для заголовка "Почему мы?"
  useEffect(() => {
    const whyUsTitle = document.querySelector('.why-us .section-title');
    if (!whyUsTitle) return;

    const originalText = whyUsTitle.textContent?.trim() || '';
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
  }, [whyUsTitleAnimated]);

  // Эффект пишущей машинки для заголовка "Кейсы"
  useEffect(() => {
    const casesTitle = document.querySelector('.cases .section-title');
    if (!casesTitle) return;

    const originalText = casesTitle.textContent?.trim() || '';
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
  }, [casesTitleAnimated]);


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
              <li><a href="#main" className="nav-link">Главная</a></li>
              <li><a href="#services" className="nav-link">Направления</a></li>
              <li><a href="#why-us" className="nav-link">Почему мы?</a></li>
              <li><a href="#cases" className="nav-link">Кейсы</a></li>
              <li><a href="#contacts" className="nav-link">Контакты</a></li>
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
              <li><a href="#main" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Главная</a></li>
              <li><a href="#services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Направления</a></li>
              <li><a href="#why-us" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Почему мы?</a></li>
              <li><a href="#cases" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Кейсы</a></li>
              <li><a href="#contacts" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Контакты</a></li>
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
              <span className="hero-title-gradient">Performance</span> маркетинг с результатом
            </h1>
            <p className="hero-subtitle hero-subtitle-animate">
              <strong>SEO + Google PPC</strong> в комплексе, автоматизируем процессы, проектируем и развиваем <strong>IT-продукты</strong>, обучаем команды и специалистов
            </p>
              <div className="hero-cta hero-cta-animate">
                <div className="hero-cta-buttons">
                  <button className="btn btn-primary btn-large" onClick={() => {
                setModalType('audit');
                setAuditModalOpen(true);
              }}>Бесплатный аудит</button>
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
                <div className="stat-label">лет опыта в IT и digital-маркетинге</div>
              </div>
              <div className="stat-item">
                <div className="stat-number stat-number-4in1">
                  <span className={`stat-4 ${stat4Visible ? 'visible' : ''}`}>4</span>
                  <span className={`stat-v ${stat4Visible ? 'visible' : ''}`}>в</span>
                  <span className={`stat-1 ${stat4Visible ? 'visible' : ''}`}>1</span>
                </div>
                <div className="stat-label">Комплекс: SEO + PPC + аналитика + автоматизация</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stat300}+</div>
                <div className="stat-label">Обученных специалистов по собственной методологии</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stat80}%</div>
                <div className="stat-label">решений — из реальных проектов и живых данных</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>

      {/* Services Section */}
      <section className={`services ${servicesVisible ? 'services-visible' : ''}`} id="services">
        <div className="container">
          <h2 className={`section-title ${servicesVisible ? 'section-title-animate' : ''}`}>Направления</h2>
          <div className="services-grid">
            <div className={`service-card ${servicesVisible ? 'service-card-animate' : ''}`}>
              <div className="service-icon">
                <Rocket size={40} color="#F15A29" />
              </div>
              <h3 className="service-title">SEO + Google PPC</h3>
              <p className="service-description">
                <strong>SEO + Google PPC</strong> работают в одной системе продаж.
              </p>
              <div className="service-result">
                <p className="service-result-title">Что делаем:</p>
                <ul className="service-list">
                  <li>Анализ конкурентов</li>
                  <li>Сбор и кластеризация семантики</li>
                  <li>SEO-подготовка сайта (структура, контент, техничка)</li>
                  <li>Настройка аналитики: GA4 + GTM + конверсии</li>
                  <li>Запуск Google Ads: Search, Shopping, Performance Max, Remarketing</li>
                  <li>Оптимизация кампаний на основе данных</li>
                </ul>
              </div>
              <div className="service-result">
                <p className="service-result-title">Результат:</p>
                <p className="service-result-text">Предсказуемый трафик, контроль CPA/ROAS и понятная воронка продаж.</p>
              </div>
            </div>

            <div className={`service-card ${servicesVisible ? 'service-card-animate' : ''}`}>
              <div className="service-icon">
                <Bot size={40} color="#F15A29" />
              </div>
              <h3 className="service-title">AI-агенты и автоматизация (n8n)</h3>
              <p className="service-description">
                Автоматизируем маркетинг, аналитику и бизнес-процессы.
              </p>
              <div className="service-result">
                <p className="service-result-title">Примеры задач:</p>
                <ul className="service-list">
                  <li>Оптимизация и масштабирование рекламных кампаний</li>
                  <li>Ресерч цен, ассортимента и активности конкурентов</li>
                  <li>Создание карточек товара на основе семантики и лидеров рынка</li>
                  <li>AI-анализ рекламных кампаний и UI сайта</li>
                  <li>Любые кастомные бизнес-сценарии и интеграции через n8n</li>
                </ul>
              </div>
              <div className="service-result">
                <p className="service-result-title">Результат:</p>
                <p className="service-result-text">Меньше ручной работы, быстрее реакции, больше контроля.</p>
              </div>
            </div>

            <div className={`service-card ${servicesVisible ? 'service-card-animate' : ''}`}>
              <div className="service-icon">
                <Wrench size={40} color="#F15A29" />
              </div>
              <h3 className="service-title">Разработка IT-продуктов и сайтов</h3>
              <p className="service-description">
                Создаём сайты, готовые к продвижению и масштабированию.
              </p>
              <div className="service-result">
                <p className="service-result-title">Что разрабатываем:</p>
                <ul className="service-list">
                  <li>Лендинги под рекламу</li>
                  <li>Сайты-визитки</li>
                  <li>Интернет-магазины</li>
                  <li>MVP и страницы под запуск IT-продуктов</li>
                </ul>
              </div>
              <div className="service-result">
                <p className="service-result-title">В работе учитываем:</p>
                <ul className="service-list">
                  <li>SEO-базу</li>
                  <li>UX/UI</li>
                  <li>Аналитику и события</li>
                  <li>Подготовку под Google Ads</li>
                </ul>
              </div>
              <div className="service-result">
                <p className="service-result-title">Результат:</p>
                <p className="service-result-text">Сайт как инструмент продаж.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="why-us" id="why-us">
        <div className="container">
          <h2 className="section-title">Почему мы?</h2>
          <div className="why-us-grid">
            <div className={`why-us-item why-us-item-1 ${whyUsVisible.has(0) ? 'why-us-item-visible' : ''}`} data-why-us-index="0">
              <div className="why-us-icon-bg">
                <Rocket size={120} />
              </div>
              <h3 className="why-us-item-title">Имеем экспертизу в построении и масштабировании IT-проектов</h3>
              <p className="why-us-item-text">Понимаем не только рекламу, но и экономику, воронку и логику роста продукта.</p>
            </div>
            <div className={`why-us-item why-us-item-2 ${whyUsVisible.has(1) ? 'why-us-item-visible' : ''}`} data-why-us-index="1">
              <div className="why-us-icon-bg">
                <BarChart3 size={120} />
              </div>
              <h3 className="why-us-item-title">Комплексный подход: SEO + PPC + автоматизация</h3>
              <p className="why-us-item-text">Даёт контроль и понимание всех процессов, которые влияют на продажи услуг или продукта.</p>
            </div>
            <div className={`why-us-item why-us-item-3 ${whyUsVisible.has(2) ? 'why-us-item-visible' : ''}`} data-why-us-index="2">
              <div className="why-us-icon-bg">
                <Search size={120} />
              </div>
              <h3 className="why-us-item-title">Работа строится на аналитике конкурентов и семантике</h3>
              <p className="why-us-item-text">Мы понимаем, кто ваш клиент, как он ищет продукт и почему выбирает конкурентов.</p>
            </div>
            <div className={`why-us-item why-us-item-4 ${whyUsVisible.has(3) ? 'why-us-item-visible' : ''}`} data-why-us-index="3">
              <div className="why-us-icon-bg">
                <Code size={120} />
              </div>
              <h3 className="why-us-item-title">Получаете готовый алгоритм работы</h3>
              <p className="why-us-item-text">План проекта, чек-листы и логику действий, которые можно использовать и в других проектах.</p>
            </div>
            <div className={`why-us-item why-us-item-5 ${whyUsVisible.has(4) ? 'why-us-item-visible' : ''}`} data-why-us-index="4">
              <div className="why-us-icon-bg">
                <TrendingUp size={120} />
              </div>
              <h3 className="why-us-item-title">В стеке SEO + PPC вы получаете готовый дашборд с воронкой продаж</h3>
              <p className="why-us-item-text">Работаете только с теми показателями, которые реально влияют на результат.</p>
            </div>
            <div className={`why-us-item why-us-item-6 ${whyUsVisible.has(5) ? 'why-us-item-visible' : ''}`} data-why-us-index="5">
              <div className="why-us-icon-bg">
                <Lightbulb size={120} />
              </div>
              <h3 className="why-us-item-title">Собственная методология</h3>
              <p className="why-us-item-text">Мы обучаем этому же в нашей школе цифровых профессий Go2 Academy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="cases" id="cases">
        <div className="container">
          <h2 className="section-title">Кейсы</h2>
          
          <div className="cases-category">
            <h3 className="cases-category-title">SEO + Google PPC</h3>
            <div className="cases-grid">
              <div className="case-card">
                <div className="case-image case-image-with-hover">
                  <img src="/img/Portfolio_SEO_PPC_1.webp" alt="PPC Case" />
                </div>
                <div className="case-content">
                  <p className="case-niche">Услуги</p>
                  <div className="case-attr">
                    <span>Проект продажи домиков на колесах и модульных домов</span>
                  </div>
                  <div className="case-geo-wrapper">
                    <MapPin size={16} color="#F15A29" />
                    <span className="case-geo-text">Германия</span>
                  </div>
                  <div className="case-attr">
                    <Megaphone color="#F15A29" />
                    <span>7 (рекламных кампаний)</span>
                  </div>
                  <div className="case-divider"></div>
                  <p className="case-results">За <strong>8 месяцев</strong> работы с проектом было получено <strong>2 560 конверсий</strong> (отправка формы обратной связи, Отправка имэйл, Телефонный звонок). Из них <strong>709 форм обратной связи</strong>.</p>
                </div>
              </div>
              <div className="case-card">
                <div className="case-image case-image-with-hover">
                  <img src="/img/Portfolio_SEO_PPC_2.webp" alt="PPC Case 2" />
                </div>
                <div className="case-content">
                  <p className="case-niche">Услуги</p>
                  <div className="case-attr">
                    <span>Проект по предоставлению услуг ремонта бытовой техники</span>
                  </div>
                  <div className="case-geo-wrapper">
                    <MapPin size={16} color="#F15A29" />
                    <span className="case-geo-text">Канада, Миссиссауга</span>
                  </div>
                  <div className="case-attr">
                    <Megaphone color="#F15A29" />
                    <span>2 (рекламных кампаний)</span>
                  </div>
                  <div className="case-divider"></div>
                  <p className="case-results">Было получено <strong>252 конверсии</strong> (отправка формы обратной связи, Отправка имэйл, Телефонный звонок). Из них <strong>73 форм обратной связи</strong>, <strong>16 заявок через имэйл</strong>, <strong>104 онлайн заказа</strong>.</p>
                </div>
              </div>
              <div className="case-card">
                <div className="case-image case-image-with-hover">
                  <img src="/img/Portfolio_SEO_PPC_3.webp" alt="PPC Case 3" />
                </div>
                <div className="case-content">
                  <p className="case-niche">e-com</p>
                  <div className="case-attr">
                    <span>Проект HoReCa продажа кухонного оборудования</span>
                  </div>
                  <div className="case-geo-wrapper">
                    <MapPin size={16} color="#F15A29" />
                    <span className="case-geo-text">Германия</span>
                  </div>
                  <div className="case-attr">
                    <Megaphone color="#F15A29" />
                    <span>25 (рекламных кампаний)</span>
                  </div>
                  <div className="case-divider"></div>
                  <p className="case-results">Была проведена <strong>реструктуризация рекламного кабинета</strong>. С момента начала работы с проектом, увеличив расходы на <strong>2 945 евро</strong> или <strong>1,43%</strong> год к году, <strong>оборот увеличился на 132 606</strong> или <strong>9,4%</strong>. При этом <strong>ROAS был увеличен на 52%</strong></p>
                </div>
              </div>
            </div>
          </div>

          <div className="cases-category">
            <h3 className="cases-category-title">AI-автоматизации</h3>
            <div className="cases-grid">
              <div className="case-card">
                <div className="case-image case-image-with-hover">
                  <img src="/img/Portfolio_Automatization_1.webp" alt="Automation Case" />
                </div>
                <div className="case-content">
                  <p className="case-niche">IT-продукты</p>
                  <p className="case-geo">Платформа: <img src="/img/N8n-logo-new.svg" alt="n8n" className="case-platform-logo" /></p>
                  <p className="case-results">Выявление ошибок сервера (500+) и доступности проекта. Каждые 10 минут сервис отправляет HTTP‑запросы с более чем 56 IP разных стран. При обнаружении ошибки телеграм‑бот присылает уведомление.</p>
                </div>
              </div>
              <div className="case-card">
                <div className="case-image case-image-with-hover">
                  <img src="/img/Portfolio_Automatization_3.webp" alt="Automation Case 3" />
                </div>
                <div className="case-content">
                  <p className="case-niche">IT-продукты</p>
                  <p className="case-geo">Платформа: <img src="/img/N8n-logo-new.svg" alt="n8n" className="case-platform-logo" /></p>
                  <p className="case-results">Автоматизация генерации товарных описаний. Система создает описания товаров на основе названия, бренда и характеристик по заданной структуре с помощью ИИ. Результат формируется в трех версиях: текст на испанском, HTML на испанском и HTML на английском. Учитываются ключевые слова с контролем их вхождения. Решение ускоряет подготовку контента и стандартизирует описания для eCommerce.</p>
                </div>
              </div>
              <div className="case-card">
                <div className="case-image case-image-with-hover">
                  <img src="/img/Portfolio_Automatization_2.webp" alt="Automation Case 2" />
                </div>
                <div className="case-content">
                  <p className="case-niche">IT-продукты</p>
                  <p className="case-geo">Платформа: <img src="/img/N8n-logo-new.svg" alt="n8n" className="case-platform-logo" /></p>
                  <p className="case-results">Автоматическая минусация нерелевантных ключевых запросов. Система берет ключи из Google Sheets и с помощью ИИ проверяет их по правилам для конкретной товарной группы. Запросы помечаются как релевантные или нет с комментарием причины. Решение сокращает ручную работу и упрощает масштабирование рекламных кампаний.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="cases-category">
            <h3 className="cases-category-title">Разработка IT-проектов</h3>
            <div className="cases-grid">
              <div className="case-card">
                <div className="case-image case-image-with-hover">
                  <img src="/img/Portfolio_web_1.webp" alt="Web Development Case" />
                </div>
                <div className="case-content">
                  <p className="case-niche">Сайт компании</p>
                  <div className="case-geo-wrapper">
                    <Globe size={16} color="#F15A29" />
                    <span className="case-geo-text">montowire.ca</span>
                  </div>
                  <div className="case-geo-wrapper">
                    <MapPin size={16} color="#F15A29" />
                    <span className="case-geo-text">Канада</span>
                  </div>
                  <div className="case-attr">
                    <strong>Стек:</strong>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
                      <img src="/img/wp_icon.webp" alt="WordPress" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/bootstrap_icon.webp" alt="Bootstrap" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/HTML5_icon.webp" alt="HTML5" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/css_icon.webp" alt="CSS" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/js_icon.webp" alt="JavaScript" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                    </span>
                  </div>
                  <p className="case-results">Разработка сайта платежной системы Montowire. В комплекс работ входила верстка сайта, а также адаптация под WordPress с настройкой всего необходимого функционала</p>
                </div>
              </div>
              <div className="case-card">
                <div className="case-image case-image-with-hover">
                  <img src="/img/Portfolio_web_2.webp" alt="Web Development Case 2" />
                </div>
                <div className="case-content">
                  <p className="case-niche">Интернет-магазин</p>
                  <div className="case-geo-wrapper">
                    <Globe size={16} color="#F15A29" />
                    <span className="case-geo-text">benjuriy.shop</span>
                  </div>
                  <div className="case-geo-wrapper">
                    <MapPin size={16} color="#F15A29" />
                    <span className="case-geo-text">Европа</span>
                  </div>
                  <div className="case-attr">
                    <strong>Стек:</strong>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
                      <img src="/img/opencart_icon.webp" alt="OpenCart" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/HTML5_icon.webp" alt="HTML5" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/css_icon.webp" alt="CSS" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/js_icon.webp" alt="JavaScript" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                    </span>
                  </div>
                  <p className="case-results">Доработка существующего функционала магазина. Улучшен UI / UX каталога, карточки товара и чекаута, произведена оптимизация скриптов, кода, увеличена производительность</p>
                </div>
              </div>
              <div className="case-card">
                <div className="case-image case-image-with-hover">
                  <img src="/img/Portfolio_web_3.webp" alt="Web Development Case 3" />
                </div>
                <div className="case-content">
                  <p className="case-niche">Сайт компании</p>
                  <div className="case-geo-wrapper">
                    <Globe size={16} color="#F15A29" />
                    <span className="case-geo-text">splintara.com</span>
                  </div>
                  <div className="case-geo-wrapper">
                    <MapPin size={16} color="#F15A29" />
                    <span className="case-geo-text">США</span>
                  </div>
                  <div className="case-attr">
                    <strong>Стек:</strong>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
                      <img src="/img/nodejs_icon.webp" alt="Node.js" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/HTML5_icon.webp" alt="HTML5" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/css_icon.webp" alt="CSS" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                      <img src="/img/js_icon.webp" alt="JavaScript" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                    </span>
                  </div>
                  <p className="case-results">Вайб-код решение для диджитал-агентства Сплинтара, проект был реализован одним сотрудником без привлечения дизайнера, верстальщика и разработчиков</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stages Section */}
      <section className="stages">
        <div className="container">
          <h2 className="section-title">Этапы работы с проектом</h2>
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
                  <h3 className="stage-title">Анализ бизнеса и целей</h3>
                  <p className="stage-description">Разбираем продукт, экономику и цели, чтобы маркетинг работал на результат, а не "по ощущениям".</p>
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
                  <h3 className="stage-title">Аудит рекламы / конкурентов / сайта / данных</h3>
                  <p className="stage-description">Находим точки роста и утечки бюджета в рекламе, сайте, аналитике и действиях конкурентов.</p>
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
                  <h3 className="stage-title">Стратегия и медиаплан</h3>
                  <p className="stage-description">Определяем каналы, бюджеты и KPI, формируем план действий на основе данных и целей бизнеса.</p>
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
                  <h3 className="stage-title">Запуск и настройка</h3>
                  <p className="stage-description">Настраиваем рекламу и аналитику так, чтобы весь путь пользователя был под контролем.</p>
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
                  <h3 className="stage-title">Аналитика и оптимизация</h3>
                  <p className="stage-description">Анализируем данные, улучшаем показатели и усиливаем то, что реально приносит продажи.</p>
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
                  <h3 className="stage-title">Масштабирование и автоматизация</h3>
                  <p className="stage-description">Готовим систему к росту через автоматизацию и оптимизацию процессов</p>
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
              <span className="cta-label">КОНТАКТ</span>
            </div>
            <h2 className="cta-title">Готовы построить систему продаж?</h2>
            <p className="cta-description">
              Оставьте заявку — мы разберём ваш проект, покажем точки роста и предложим понятный план действий с цифрами, сроками и приоритетами.
            </p>
            <div className="cta-features">
              <div className="cta-feature">
                <FileCheck size={20} color="rgba(255, 255, 255, 0.9)" />
                <span>бесплатный аудит проекта</span>
              </div>
              <div className="cta-feature">
                <ClipboardCheck size={20} color="rgba(255, 255, 255, 0.9)" />
                <span>план работ с чек-листами и этапами</span>
              </div>
              <div className="cta-feature">
                <Rocket size={20} color="rgba(255, 255, 255, 0.9)" />
                <span>быстрый отклик</span>
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
                errors.firstName = 'Имя обязательно для заполнения';
                isValid = false;
              }

              if (!contactFormData.site.trim()) {
                errors.site = 'Сайт обязателен для заполнения';
                isValid = false;
              } else {
                const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
                if (!urlPattern.test(contactFormData.site)) {
                  errors.site = 'Введите корректный URL сайта';
                  isValid = false;
                }
              }

              if (!contactFormData.email.trim()) {
                errors.email = 'Email обязателен для заполнения';
                isValid = false;
              } else {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(contactFormData.email)) {
                  errors.email = 'Введите корректный email';
                  isValid = false;
                }
              }

              const phoneDigits = contactFormData.phone.replace(/\D/g, '');
              if (!phoneDigits) {
                errors.phone = 'Номер телефона обязателен для заполнения';
                isValid = false;
              } else {
                let minLength = 10;
                if (contactPhoneCountry === '+380') minLength = 9;
                else if (contactPhoneCountry === '+1') minLength = 10;
                else if (contactPhoneCountry === '+34') minLength = 9;
                else if (contactPhoneCountry === '+39') minLength = 10;
                if (phoneDigits.length < minLength) {
                  errors.phone = 'Введите корректный номер телефона';
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
                    placeholder="Иван*"
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
                Отправить сообщение
                <ArrowUpRight size={20} />
              </button>
              <p className="cta-form-legal">
                Заполняя форму, вы соглашаетесь с нашими <a href="#">Условиями</a> и <a href="#">Политикой конфиденциальности</a>.
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
          <h2 className="section-title">Отзывы клиентов</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                Проблема была в качестве заявок — их было достаточно, но большая часть плохо конвертировала в продажи так как клиенты приходили с запросами не имеющими отношения к нашему продукту. Вместе с командой мы перебрали семантику и нашли слабые места в функционале и посадочных страницах, исправили технические ошибки влияющие на рекламную кампанию.
              </p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar">
                  <img src="/img/Testemonials_1.webp" alt="Ирина Савченко" />
                </div>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">Ирина Савченко</h3>
                  <p className="testimonial-role">Founder</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                Запустили рекламу и настроили аналитику. Уже через месяц увидел первые заявки, а через три месяца ROI вырос на 40%. Особенно ценна для меня была обратная связь и прозрачность. Ребята максимально подробно объясняли каждый этап работы, за что отдельное спасибо. В общем продолжаем работать, рекомендую
              </p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar">
                  <img src="/img/Testemonials_3.webp" alt="Александр Петров" />
                </div>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">Александр Петров</h3>
                  <p className="testimonial-role">Founder & CEO</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                Понравился скрупулезный подход. Цели, которые были поставлены, реализованы с небольшой задержкой, что в нашем случае приемлемо, так как были вопросы и на нашей стороне. Благодарен за работу
              </p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar">
                  <img src="/img/Testemonials_2.webp" alt="Сергей Фридман" />
                </div>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">Сергей Фридман</h3>
                  <p className="testimonial-role">Founder</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                Большим дополнением и удивлением в работе был формат работы с данными. Сделали критический путь пользователя с воронкой, весьма неплохо оформили отчеты в Looker Studio с основными показателями. Раньше пользовался Google Analytics, сейчас он практически не нужен, все что важно есть под рукой на дашбордах. Результатами работы более чем доволен, получили уже первые 25 звонков на этапе SEO и до запуска PPC, что удивило и конечно порадовало.
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
                Работаем второй год. Спасибо Сергею и Алексею за нормальный человеческий подход. Нравится, что я задаю минимум вопросов по результатам, данные говорят сами за себя
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
          <h2 className="clients-title">Наши клиенты</h2>
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
            <h2 className="faq-title">Часто задаваемые вопросы</h2>
            <p className="faq-subtitle">Здесь собраны ответы на часто задаваемые вопросы о нашей работе, процессах и услугах. Если не нашли нужный ответ — свяжитесь с нами, мы поможем.</p>
          </div>
          <div className="faq-content">
            <div className="faq-categories">
              <button 
                className={`faq-category-btn ${activeFaqCategory === 'general' ? 'active' : ''}`}
                onClick={() => { setActiveFaqCategory('general'); setActiveFaq(null); }}
              >
                <span>Общие вопросы</span>
                <ChevronRight size={20} />
              </button>
              <button 
                className={`faq-category-btn ${activeFaqCategory === 'support' ? 'active' : ''}`}
                onClick={() => { setActiveFaqCategory('support'); setActiveFaq(null); }}
              >
                <span>Результаты работы и аналитика</span>
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
                      <span>С какими проектами вы работаете?</span>
                      {activeFaq === 0 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        Мы работаем с бизнес-проектами, e-commerce, сервисными компаниями и IT-продуктами. Берём в работу как новые проекты на старте, так и действующие, где требуется рост, масштабирование или наведение порядка в данных и процессах. Важен не размер бизнеса, а готовность работать с цифрами и системой.
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(1)}>
                      <span>Какой бюджет на рекламу?</span>
                      {activeFaq === 1 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        Минимальный рекламный бюджет зависит от ниши, конкуренции и целей проекта. Мы не называем цифры «вслепую» — сначала анализируем рынок и считаем экономику, после чего предлагаем реалистичный диапазон бюджета. Наша задача — сделать бюджет управляемым и прогнозируемым.
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(2)}>
                      <span>Какие формы оплаты?</span>
                      {activeFaq === 2 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        Мы работаем по договору и принимаем оплату по безналичному расчёту. Формат оплаты зависит от типа проекта: фикс за этапы, ежемесячное сопровождение или комбинированная модель. Все условия и объём работ фиксируются заранее.
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(3)}>
                      <span>Как будет выстроена совместная работа?</span>
                      {activeFaq === 3 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        Работа начинается с анализа и формирования плана с этапами, сроками и чек-листами. Далее мы согласовываем приоритеты, запускаем работы и регулярно синхронизируемся по результатам. Вы всегда понимаете, на каком этапе находится проект и какие задачи выполняются.
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 4 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(4)}>
                      <span>Есть ли у вас платные консультации?</span>
                      {activeFaq === 4 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        Да, у нас есть платная консультация: мы детально изучим ваше направление, после чего дадим развёрнутый ответ с аудитом и рекомендациями по продвижению с комментарием каждого этапа. Длительность консультации — 60–90 минут.
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeFaqCategory === 'support' && (
                <>
                  <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(0)}>
                      <span>Когда я увижу результаты работы?</span>
                      {activeFaq === 0 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        Первые данные и сигналы появляются уже после запуска рекламы и настройки аналитики. SEO — это более долгосрочный процесс, но его влияние на качество трафика и рекламы заметно уже на ранних этапах. Мы показываем прогресс по каждому этапу, а не «ждём чуда через несколько месяцев».
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(1)}>
                      <span>Как вы отчитываетесь?</span>
                      {activeFaq === 1 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        Мы строим критический путь пользователя — от первого касания до заявки или покупки. Все данные выводятся в дашборды, которые показывают ситуацию в реальном времени: трафик, конверсии, стоимость и результат. Отчёт — это не PDF, а живая система принятия решений.
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(2)}>
                      <span>Что если не получится?</span>
                      {activeFaq === 2 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        Наша система позволяет сразу увидеть, на каком этапе возникает проблема: трафик, сайт, конверсия или аналитика. Благодаря дашбордам и критическому пути пользователя мы быстро находим узкое место и корректируем стратегию. Мы не ждём «плохого месяца», чтобы понять, что что-то пошло не так.
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(3)}>
                      <span>Как вы считаете эффективность: по лидам, продажам или ROI?</span>
                      {activeFaq === 3 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        Мы считаем эффективность по тем метрикам, которые важны для конкретного бизнеса: лидам, продажам, выручке и ROI. Все показатели связаны между собой и считаются в одной системе аналитики. Главное — не количество действий, а реальный вклад в результат бизнеса.
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 4 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(4)}>
                      <span>Какие результаты я получу от SEO?</span>
                      {activeFaq === 4 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        SEO и PPC работают в одной системе: качество рекламы напрямую зависит от SEO-базы сайта. Результатом SEO-работы является валидная структура сайта, адаптированная под семантику и требования поисковых систем, корректное наполнение страниц и устранение технических ошибок. При необходимости проводится внешняя оптимизация и линкбилдинг, чтобы усилить позиции и качество трафика.
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeFaqCategory === 'misc' && (
                <>
                  <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(0)}>
                      <span>Чему вы учите?</span>
                      {activeFaq === 0 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        Наш основной 4 месячный курс - Эффективная система продаж с Google PPC, в рамках которого мы разбираем детально запуск рекламы, аналитику, структуру продаж и автоматизацию процессов. Курс написан по авторской методике и включает исчерпывающий объем знаний применимый не только в рекламе но и в бизнесе.
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(1)}>
                      <span>Сколько стоит обучение?</span>
                      {activeFaq === 1 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        По пакетам обучения и их наполнению вы можете детально ознакомится на сайте нашей академии *Сайт*. По окончанию студенты получают сертификаты (Bronze, Silver, Gold), согласно их продуктивности во время обучения, и количеству выполненных заданий.
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(2)}>
                      <span>На каком языке проходят лекции?</span>
                      {activeFaq === 2 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        Лекции проходят на русском языке.
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(3)}>
                      <span>Лекции в записи или живые встречи?</span>
                      {activeFaq === 3 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        Часть лекций проходит в реальном времени, ты сможешь задать вопрос преподавателю, также тебе доступны все записи лекций.
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 4 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(4)}>
                      <span>Какой процент теории и практики?</span>
                      {activeFaq === 4 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        80% практики. Каждый студент запускает свои проекты и видит живой результат.
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeFaqCategory === 'academy-business' && (
                <>
                  <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(0)}>
                      <span>Что такое Go2 Academy For Business?</span>
                      {activeFaq === 0 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        Go2 Academy For Business — это корпоративное обучение для вашей команды. Мы помогаем развивать навыки в области цифрового маркетинга, SEO, автоматизации и разработки IT-продуктов.
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(1)}>
                      <span>Какие форматы обучения доступны для бизнеса?</span>
                      {activeFaq === 1 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        Мы предлагаем офлайн и онлайн обучение, индивидуальные программы для команд, воркшопы и долгосрочные курсы. Формат подбирается под потребности вашей компании.
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(2)}>
                      <span>Можно ли адаптировать программу под специфику нашей компании?</span>
                      {activeFaq === 2 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        Да, мы создаём индивидуальные программы обучения с учётом вашей отрасли, бизнес-процессов и целей. Программа разрабатывается после анализа потребностей вашей команды.
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(3)}>
                      <span>Какие результаты можно ожидать после обучения?</span>
                      {activeFaq === 3 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        После обучения ваша команда сможет самостоятельно применять инструменты цифрового маркетинга, настраивать автоматизацию, оптимизировать процессы и принимать решения на основе данных.
                      </div>
                    </div>
                  </div>
                  <div className={`faq-item ${activeFaq === 4 ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(4)}>
                      <span>Предоставляете ли вы сертификаты по окончании обучения?</span>
                      {activeFaq === 4 ? <X size={20} /> : <Plus size={20} />}
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        Да, по завершении программы все участники получают сертификаты Go2 Academy For Business, подтверждающие освоение навыков.
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
                Digital-агентство: запуск рекламы PPC, SEO оптимизация, автоматизация на n8n и разработка сайтов.
              </p>
              <div className="footer-contact">
                <p className="footer-email">Email: <a href="mailto:go2agency.info@gmail.com">go2agency.info@gmail.com</a></p>
                <p className="footer-telegram">Telegram: <a href="https://t.me/go2agency" target="_blank">@go2agency</a></p>
              </div>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Навигация</h3>
              <ul className="footer-links">
                <li><a href="#main">Главная</a></li>
                <li><a href="#services">Направления</a></li>
                <li><a href="#why-us">Почему мы?</a></li>
                <li><a href="#cases">Кейсы</a></li>
                <li><a href="#contacts">Контакты</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Услуги</h3>
              <ul className="footer-links">
                <li><a href="#services">SEO + Google PPC</a></li>
                <li><a href="#services">AI-автоматизация</a></li>
                <li><a href="#services">Разработка сайтов</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Документы</h3>
              <ul className="footer-links">
                <li><a href="/privacy">Политика конфиденциальности</a></li>
                <li><a href="/terms">Условия использования</a></li>
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

      {/* Audit Modal */}
      {auditModalOpen && (
        <div className="modal-overlay" onClick={() => setAuditModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setAuditModalOpen(false)}>
              <X size={24} />
            </button>
            <h2 className="modal-title">{modalType === 'audit' ? 'Бесплатный аудит' : 'Обсудить проект'}</h2>
            <form className="audit-form" onSubmit={(e) => {
              e.preventDefault();
              // Здесь будет обработка отправки формы
              console.log('Form submitted:', formData);
              setAuditModalOpen(false);
            }}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Имя <span className="required">*</span>
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
                  Номер телефона <span className="required">*</span>
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
                  Сайт <span className="required">*</span>
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
                  <span>Я согласен на обработку моих персональных данных в соответствии с <a href="#" className="form-link">Политикой конфиденциальности</a>.</span>
                </label>
              </div>
              <button type="submit" className="btn btn-primary form-submit">
                Отправить запрос
              </button>
              <p className="form-footer-text">
                Мы используем ваши данные только для ответа на ваш запрос.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default App
