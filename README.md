# js-lessons
## Простой HTTP server используя только стандартные инструкции nodejs

Часто для разработки MPA/SPA/PWA приложенией требуется простой вебсервер.
Кстати ПВА это не клей :-) а СПА это не косметический салон, это виды веб приложений.
Если запустить такое приложение просто открыв стартовую страницу index.html,
браузер наложет множество ограничений и работа приложения будет нарушена или не полной.

Я люблю язык джаваскрипт и буду решать проблему используя только
доступные мне средства так сказать из "коробки".

Начнем с плана.

- Создать папку src - Рекомендуется весь свой код помещать в эту папку
- Если нет ноджс ставим его  https://nodejs.org/dist/v12.14.0/node-v12.14.0-x64.msi
на все вопросы инсталятора просто жмем дальше.
- Создадим папку src
- Создадим в папке `/lib` файл `index.js`
- Создадим в папке `/lib` папку `assets` - это будет папка в которой будут
- В папке проекта выполним комманду  ` npm init --yes ` - без флага `-- yes` инициализатор будет задавать много вопросов
- В файле `/package.json` поменяем свойство `"main": "index.js"` на `  "main": "lib/index.js"`
- В файле `/package.json` поменяем свойство `"test": "echo...."` на `  "run": "node lib/index.js"` - так мы сможем быстро запустить наш сервер используя команду `npm run`
- Откроем файл `/src/index.js`
- Напишем код сервера

Итак что мы знаем о том что должен делать наш сервер ?
- Обрабатывать запросы
- Читать файлы
- Отвечать на запрос содержимым файла
