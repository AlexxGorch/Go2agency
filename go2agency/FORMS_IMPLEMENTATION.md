# Contact Forms Implementation

## Overview
Все формы обратной связи модифицированы для отправки данных на backend endpoint `/api/contact` с полем `source` для идентификации источника заявки.

## Типы данных

### ContactFormData
```typescript
interface ContactFormData {
  name?: string;           // Для модальных форм
  firstName?: string;      // Для CTA формы
  email: string;
  phone: string;          // Формат: "+380 12 345 67 89"
  site: string;
  agree?: boolean;         // Согласие на обработку данных
  source: ContactFormSource; // Источник формы (обязательно)
}
```

### ContactFormSource
```typescript
type ContactFormSource = 
  | 'header_discuss_project'  // Кнопка "Discuss Your Project" в header
  | 'hero_free_audit'          // Кнопка "Free Audit" в hero секции
  | 'sales_system_form';       // Форма "Ready to build a sales system?"
```

## API функция

### submitContactForm()
```typescript
import { submitContactForm } from './api/contact';

// Пример использования
await submitContactForm({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+380 12 345 67 89',
  site: 'https://example.com',
  agree: true,
  source: 'header_discuss_project'
});
```

**Endpoint:** `POST /api/contact`

**Backend responsibilities:**
- Принимает данные формы с полем `source`
- Вставляет `source` в текст письма
- Отправляет email на Gmail используя backend SMTP конфигурацию

## Состояния форм

Каждая форма имеет состояние:
```typescript
interface ContactFormState {
  loading: boolean;    // Отправка в процессе
  success: boolean;    // Успешная отправка
  error: string | null; // Сообщение об ошибке
}
```

## Формы и их источники

### 1. Модальное окно "Discuss Project" (Header)
**Источник:** `header_discuss_project`

**Где задается:**
```typescript
// App.tsx, строка ~2207
const source: ContactFormSource = modalType === 'discuss' 
  ? 'header_discuss_project' 
  : 'hero_free_audit';
```

**Триггер:** Кнопка "Discuss Your Project" в header (строка ~807)

### 2. Модальное окно "Free Audit" (Hero Section)
**Источник:** `hero_free_audit`

**Где задается:**
```typescript
// App.tsx, строка ~2207
const source: ContactFormSource = modalType === 'discuss' 
  ? 'header_discuss_project' 
  : 'hero_free_audit';
```

**Триггер:** Кнопка "Book a Free Audit" в hero секции (строка ~824)

### 3. CTA форма "Ready to build a sales system?"
**Источник:** `sales_system_form`

**Где задается:**
```typescript
// App.tsx, строка ~1562
submitContactForm({
  firstName: contactFormData.firstName,
  email: contactFormData.email,
  phone: `${contactPhoneCountry} ${contactFormData.phone}`,
  site: contactFormData.site,
  source: 'sales_system_form'  // ← Здесь
})
```

**Триггер:** Форма в CTA секции (строка ~1487)

## Пример обработчика onSubmit

```typescript
<form onSubmit={async (e) => {
  e.preventDefault();
  
  // Определяем source
  const source: ContactFormSource = 'header_discuss_project';
  
  // Устанавливаем loading
  setFormState({ loading: true, success: false, error: null });

  try {
    // Отправляем данные
    await submitContactForm({
      name: formData.name,
      email: formData.email,
      phone: `${phoneCountry} ${formData.phone}`,
      site: formData.site,
      agree: formData.agree,
      source  // ← Передаем source
    });

    // Успех
    setFormState({ loading: false, success: true, error: null });
    
    // Сброс формы
    setFormData({
      name: '',
      email: '',
      phone: '',
      site: '',
      agree: false
    });

    // Закрытие модального окна через 2 секунды
    setTimeout(() => {
      setModalOpen(false);
      setFormState({ loading: false, success: false, error: null });
    }, 2000);
  } catch (error) {
    // Ошибка
    setFormState({
      loading: false,
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit form'
    });
  }
}}>
```

## UI состояния

### Успешная отправка
```jsx
{formState.success ? (
  <div className="form-success-message">
    Thank you! We will contact you shortly.
  </div>
) : (
  // Форма
)}
```

### Ошибка
```jsx
{formState.error && (
  <div className="form-error-message">
    {formState.error}
  </div>
)}
```

### Loading состояние
```jsx
<button 
  type="submit" 
  disabled={formState.loading}
>
  {formState.loading ? 'Sending...' : 'Send request'}
</button>
```

## Файлы

- `src/types/contact.ts` - TypeScript типы
- `src/api/contact.ts` - API функция отправки
- `src/App.tsx` - Модифицированные формы
- `src/App.css` - Стили для сообщений (form-success-message, form-error-message)

## Backend требования

Backend должен:
1. Принимать POST запросы на `/api/contact`
2. Валидировать входящие данные
3. Извлекать поле `source` из тела запроса
4. Вставлять `source` в текст email
5. Отправлять email на Gmail используя SMTP

**Пример тела запроса:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+380 12 345 67 89",
  "site": "https://example.com",
  "agree": true,
  "source": "header_discuss_project"
}
```
