(function () {
  const left      = document.getElementById('bookingLeft');
  const formEl    = document.getElementById('bookingForm');
  const againBtn  = document.getElementById('sendAgainBtn');

  if (!left || !formEl || !againBtn) return;

  // Проверяем URL параметры для показа состояния успеха или ошибки
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('success') === '1') {
    left.classList.remove('is-form');
    left.classList.add('is-success');
  } else if (urlParams.get('error')) {
    const errorMessage = urlParams.get('error');
    alert('Ошибка: ' + decodeURIComponent(errorMessage));
  }

  // Обработка кнопки "Оставить заявку повторно"
  againBtn.addEventListener('click', function () {
    left.classList.remove('is-success');
    left.classList.add('is-form');
    const nameInput = document.getElementById('name');
    if (nameInput) nameInput.focus();
    
    // Очищаем URL от параметров
    const url = new URL(window.location);
    url.search = '';
    window.history.replaceState({}, '', url);
  });
})();
