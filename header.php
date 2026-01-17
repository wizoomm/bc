<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo isset($pageTitle) ? $pageTitle : 'Beauty Club'; ?></title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <!-- Хэдер -->
<header>
  <a class="logo" href="index.html">BC</a>

  <!-- Кнопка-бургер для мобильных -->
  <button class="burger" id="burgerBtn" aria-label="Открыть меню" aria-expanded="false" aria-controls="siteNav">
    <img src="img/burger.svg" alt="" width="28" height="28">
  </button>

  <nav id="siteNav">
    <a href="index.php">О НАС</a>
    <a href="services.php">УСЛУГИ</a>
    <a href="#">ЗАПИСЬ</a>
    <a href="#">АКЦИИ</a>
    <a href="#">РЕКОМЕНДАЦИИ</a>
    <a href="#">ВОПРОСЫ</a>
  </nav>
</header>


