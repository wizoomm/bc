<?php
// Подключаем файл с настройками базы данных
require_once 'db.php';

// Получаем данные из формы
$name = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');

// Валидация данных
$errors = [];

if (empty($name)) {
    $errors[] = 'Имя обязательно для заполнения';
} elseif (strlen($name) < 2) {
    $errors[] = 'Имя должно содержать минимум 2 символа';
} elseif (!preg_match('/^[а-яёА-ЯЁa-zA-Z\s]+$/u', $name)) {
    $errors[] = 'Имя может содержать только буквы и пробелы';
}

if (empty($phone)) {
    $errors[] = 'Телефон обязателен для заполнения';
} else {
    // Очищаем телефон от всех символов кроме цифр
    $phone = preg_replace('/\D/', '', $phone);
    if (strlen($phone) !== 11 || !preg_match('/^[78]/', $phone)) {
        $errors[] = 'Введите корректный номер телефона (11 цифр, начинающийся с 7 или 8)';
    }
}

// Если есть ошибки валидации, возвращаемся обратно
if (!empty($errors)) {
    $ref = $_SERVER['HTTP_REFERER'] ?? 'index.html';
    $sep = strpos($ref, '?') !== false ? '&' : '?';
    $errorMessage = implode(', ', $errors);
    header("Location: {$ref}{$sep}error=" . urlencode($errorMessage));
    exit;
}

try {
    // Подготавливаем запрос для вставки данных
    $stmt = $pdo->prepare('INSERT INTO consultations (full_name, phone, created_at) VALUES (:name, :phone, NOW())');
    $stmt->execute([
        ':name' => $name,
        ':phone' => $phone
    ]);
    
    // Если запись успешно добавлена, перенаправляем с сообщением об успехе
    $ref = $_SERVER['HTTP_REFERER'] ?? 'index.html';
    $sep = strpos($ref, '?') !== false ? '&' : '?';
    header("Location: {$ref}{$sep}success=1");
    exit;
    
} catch (PDOException $e) {
    // В случае ошибки базы данных, логируем ошибку и перенаправляем с сообщением об ошибке
    error_log("Ошибка базы данных: " . $e->getMessage());
    $ref = $_SERVER['HTTP_REFERER'] ?? 'index.html';
    $sep = strpos($ref, '?') !== false ? '&' : '?';
    header("Location: {$ref}{$sep}error=" . urlencode('Ошибка сервера. Попробуйте позже.'));
    exit;
}
?>



