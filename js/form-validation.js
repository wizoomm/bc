// Форма валидации и маски ввода
document.addEventListener('DOMContentLoaded', function() {
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const bookingForm = document.getElementById('bookingForm');
  const submitButton = bookingForm ? bookingForm.querySelector('button[type="submit"]') : null;

  // Функция проверки валидности формы
  function validateForm() {
    if (!nameInput || !phoneInput || !submitButton) return;
    
    const name = nameInput.value.trim();
    const phone = phoneInput.value.replace(/\D/g, '');
    
    const isNameValid = name.length >= 2 && /^[а-яёА-ЯЁa-zA-Z\s]+$/.test(name);
    const isPhoneValid = phone.length === 11 && /^[78]/.test(phone);
    
    // Включаем/выключаем кнопку в зависимости от валидности
    submitButton.disabled = !(isNameValid && isPhoneValid);
  }

  // Маска для поля "Имя" - только буквы
  if (nameInput) {
    nameInput.addEventListener('input', function(e) {
      // Удаляем все символы кроме букв и пробелов
      let value = e.target.value.replace(/[^а-яёА-ЯЁa-zA-Z\s]/g, '');
      
      // Убираем множественные пробелы
      value = value.replace(/\s+/g, ' ');
      
      // Убираем пробелы в начале и конце
      value = value.trim();
      
      e.target.value = value;
      
      // Проверяем валидность формы после каждого изменения
      validateForm();
    });
  }

  // Маска для поля "Телефон" - только цифры, максимум 11
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      // Удаляем все символы кроме цифр
      let value = e.target.value.replace(/\D/g, '');
      
      // Ограничиваем до 11 цифр
      if (value.length > 11) {
        value = value.substring(0, 11);
      }
      
      e.target.value = value;
      
      // Проверяем валидность формы после каждого изменения
      validateForm();
    });
  }

  // Обработка отправки формы
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      const name = nameInput.value.trim();
      const phone = phoneInput.value.replace(/\D/g, '');
      
      // Проверяем валидность полей
      const isNameValid = name.length >= 2 && /^[а-яёА-ЯЁa-zA-Z\s]+$/.test(name);
      const isPhoneValid = phone.length === 11 && /^[78]/.test(phone);
      
      // Если форма невалидна, предотвращаем отправку
      if (!isNameValid || !isPhoneValid) {
        e.preventDefault();
        return false;
      }
      
      // Если форма валидна, позволяем обычную отправку через POST
      // Показываем индикатор загрузки
      const submitButton = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'ОТПРАВЛЯЕМ...';
      submitButton.disabled = true;
    });
  }

  // Инициализация: кнопка изначально отключена
  validateForm();
});
