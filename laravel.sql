-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: db
-- Время создания: Дек 25 2024 г., 10:34
-- Версия сервера: 9.1.0
-- Версия PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `laravel`
--

-- --------------------------------------------------------

--
-- Структура таблицы `authors`
--

CREATE TABLE `authors` (
  `id` bigint UNSIGNED NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `biography` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `authors`
--

INSERT INTO `authors` (`id`, `firstname`, `lastname`, `slug`, `biography`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Харуки', 'Мураками', 'xaruki-murakami', 'Хару́ки Мурака́ми — японский писатель, лауреат ряда национальных и международных литературных наград. Его работы переведены более чем на 50 языков и стали бестселлерами как в Японии, так и за её пределами.', 'authors/images/Yc2nBDXZnpTx60iymPWqcxSGzY5NzJON9inFQvcg.jpg', '2024-12-25 10:21:19', '2024-12-25 10:21:19'),
(2, 'Сильвия', 'Плат', 'silviia-plat', 'Си́львия Плат — американская поэтесса и писательница, считающаяся одной из основательниц жанра «исповедальной поэзии» в англоязычной литературе. При жизни Плат вышли лишь поэтический сборник «Колосс» и полуавтобиографический роман «Под стеклянным колпаком».', 'authors/images/7iTsRojQ60Fj3tQ07Aim3F04qhbobXGm5BB4gXrj.jpg', '2024-12-25 10:22:24', '2024-12-25 10:22:24'),
(3, 'Ханья', 'Янагихара', 'xania-ianagixara', 'Первый роман Янагихары «Люди среди деревьев» увидел свет в 2013 году. Образ центрального персонажа целиком основан на Дэниеле Гайдузеке — педиатре и вирусологе, лауреате Нобелевской премии по физиологии и медицине, который в 1996 году был арестован по обвинению в педофилии и впоследствии признал свою вину. Роман написан в форме дневника, и сексуальность главного героя является одной из центральных его тем.\r\nУспех Янагихаре принес ее второй роман «Маленькая жизнь», рассказывающий о четырех друзьях детства. Роман стал бестселлером и получил положительные отзывы критиков. Так, литературный обозреватель портала Meduza Галина Юзефович отметила его универсальность:', 'authors/images/L2N0aIse8JL8wsH3n2wW3QccInNsv6BCjr3Ahm5d.jpg', '2024-12-25 10:23:09', '2024-12-25 10:23:09'),
(4, 'Элизабет', 'Вуртцель', 'elizabet-vurtcel', 'Элизабет Ли Вурцель была американской писательницей, журналисткой и юристом, известной своими исповедальными мемуарами «Нация прозака», которые она опубликовала в возрасте 27 лет. Ее работа часто была сосредоточена на ведении хроники ее личных проблем с депрессией, зависимостью, карьерой и отношениями.', 'authors/images/Xh0edndMHRKUPE6sJ4VuHXTyAuZD9w7C64CfDqrW.jpg', '2024-12-25 10:23:54', '2024-12-25 10:23:54'),
(5, 'Томас', 'Кеннили', 'tomas-kennili', 'Томас Майкл Кенилли — австралийский писатель, драматург, автор документальной прозы. Наиболее известен благодаря роману «Ковчег Шиндлера», написанному под впечатлениями от жизни Леопольда Пфефферберга, который пережил Холокост. Произведение получило Букеровскую премию в 1982 году.', 'authors/images/ywhUjiHr5sg0hJJMHLj28HPv4raCMqoIiPCFHFhn.png', '2024-12-25 10:24:59', '2024-12-25 10:24:59');

-- --------------------------------------------------------

--
-- Структура таблицы `auths`
--

CREATE TABLE `auths` (
  `id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `books`
--

CREATE TABLE `books` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `author_id` bigint UNSIGNED NOT NULL,
  `genre_id` bigint UNSIGNED NOT NULL,
  `published_year` int NOT NULL,
  `cover_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `books`
--

INSERT INTO `books` (`id`, `title`, `slug`, `description`, `author_id`, `genre_id`, `published_year`, `cover_image`, `file_path`, `created_at`, `updated_at`) VALUES
(1, 'Список Шиндлера', 'spisok-sindlera', 'Тот, кто спас единственную жизнь, спас весь мир» – эти слова из Талмуда написали заключенные на кольце, которое подарили своему спасителю – Оскару Шиндлеру. Человеку, который избавил от мученической смерти больше тысячи людей', 5, 2, 1982, 'books/images/e8e34e77-cde6-4ee6-9733-3339d09ac4bb.jpg', 'books/files/2991ecfb-5cb4-4d45-ad0a-aa86976903a9.pdf', '2024-12-25 10:28:50', '2024-12-25 10:28:50'),
(2, 'Нация прозака', 'naciia-prozaka', 'Это поколение молилось на Курта Кобейна, Сюзанну Кейсен и Сида Вишеса. Отвергнутая обществом, непонятая современниками молодежь искала свое место в мире в перерывах между нервными срывами, попытками самоубийства и употреблением запрещенных препаратов.', 4, 1, 1994, 'books/images/4116f13f-ac67-4f5c-aee3-5239e3d3a624.png', 'books/files/666bad13-743c-4f18-9d82-447261733f5b.pdf', '2024-12-25 10:30:15', '2024-12-25 10:30:15'),
(3, 'Маленькая жизнь', 'malenkaia-zizn', 'Книга повествует о жизни четырёх друзей — юриста Джуда, актёра Виллема, художника Джей-Би и архитектора Малькольма. Начинаясь как обычное жизнеописание четырёх друзей, сюжет постепенно фокусируется на жизни Джуда, на психологических травмах, которые он получил в детстве, и на его отношениях с Виллемом и с приобретённой семьёй.\r\nЖестокие и страшные события жизни Джуда ломают его веру в людей. Несмотря на то, что он сумел найти настоящих друзей и даже обрести любящих родителей, Джуд не верит, что кто-то способен по-настоящему его полюбить. Жестокость партнёра и утрата друзей окончательно рвут душу Джуда — и ни родители, ни лечащий врач, человек решительный, грубоватый, но добрый и искренне любящий своего самого тяжёлого пациента, не в силах его спасти.', 3, 3, 2015, 'books/images/a253f192-2872-4e2d-911a-3d17da15289e.jpg', 'books/files/083fc199-5735-46ef-8459-7fe92e57d61a.pdf', '2024-12-25 10:31:16', '2024-12-25 10:31:16'),
(4, 'Под стеклянным колпаком', 'pod-stekliannym-kolpakom', 'Эстер Гринвуд (Esther Greenwood), девушка из пригорода Бостона, штат Массачусетс, получает в качестве приза возможность стажироваться в престижном нью-йоркском журнале и поступает под начало редактора Джей Си (Jay Cee). Общается она в основном с двумя подругами: остроумной, саркастичной Дорин и богобоязненной, «положительной» Бетси. Морально и материально Эстер помогает известная писательница Филомена Гини.', 2, 5, 1963, 'books/images/567d6857-2d36-4a66-8c18-0eb4990225f9.jpg', 'books/files/fbc9a5d6-5505-40a1-b402-bf9065276021.pdf', '2024-12-25 10:32:53', '2024-12-25 10:32:53'),
(5, 'Норвежский лес', 'norvezskii-les', 'Действие происходит в Токио 1960-х годов, когда японские студенты вместе со студентами всего мира протестовали против установившегося порядка[2]. Мураками занимают потери, которые каждый человек несёт с ходом жизни[3]. Главный герой и рассказчик — Тоору Ватанабэ, который вспоминает свои былые дни в качестве студента одного из токийских колледжей[4]. Посредством его воспоминаний читатель знакомится с развитием его отношений с двумя совершенно разными девушками — прекрасной, но психологически травмированной Наоко, и эмоциональной, живой Мидори', 1, 4, 1987, 'books/images/484897de-5f3c-4ebe-8a0b-3cae243c9b8b.jpeg', 'books/files/8de339f8-9928-4c3f-bf74-cfd84a08488c.pdf', '2024-12-25 10:33:43', '2024-12-25 10:33:43');

-- --------------------------------------------------------

--
-- Структура таблицы `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `genres`
--

CREATE TABLE `genres` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `genres`
--

INSERT INTO `genres` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Роман', 'roman', '2024-12-25 10:19:14', '2024-12-25 10:19:14'),
(2, 'История', 'istoriia', '2024-12-25 10:19:24', '2024-12-25 10:19:24'),
(3, 'Детектив', 'detektiv', '2024-12-25 10:19:33', '2024-12-25 10:19:33'),
(4, 'Комедия', 'komediia', '2024-12-25 10:19:51', '2024-12-25 10:19:51'),
(5, 'True crime', 'true-crime', '2024-12-25 10:20:12', '2024-12-25 10:20:12');

-- --------------------------------------------------------

--
-- Структура таблицы `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_00_000000_create_users_table', 1),
(2, '0001_01_01_000000_create_password_reset_tokens_table', 1),
(3, '0001_01_01_000000_create_sessions_table', 1),
(4, '0001_01_01_000001_create_cache_table', 1),
(5, '0001_01_01_000002_create_jobs_table', 1),
(6, '2024_11_28_13019_create_authors_table', 1),
(7, '2024_11_28_13019_create_genres_table', 1),
(8, '2024_11_28_13020_create_books_table', 1),
(9, '2024_11_28_130504_create_auths_table', 1),
(10, '2024_12_17_215108_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('wlQYsmFx0rhMcGQA9Xjv4qILlGd88Y8M1JAnd8uW', 1, '172.18.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiTGpQQ2hOWEVveW5UekhaNnRDcWFvRHh5NXVrYkg3VGhEQ3RoSnJqQSI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czozNToiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FkbWluL2F1dGhvcnMiO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyNzoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FkbWluIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1735122854);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `avatar`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'Boss', 'admin@example.com', NULL, NULL, '$2y$12$Yxmrqi4kRUxs1OeHMvnyLuxiyyBeveLRI2WKvm5.UH3JqV2c49rVK', NULL, '2024-12-25 10:19:07', '2024-12-25 10:19:07');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `authors_slug_unique` (`slug`);

--
-- Индексы таблицы `auths`
--
ALTER TABLE `auths`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `books_slug_unique` (`slug`),
  ADD KEY `books_author_id_foreign` (`author_id`),
  ADD KEY `books_genre_id_foreign` (`genre_id`);

--
-- Индексы таблицы `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Индексы таблицы `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Индексы таблицы `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Индексы таблицы `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `genres_slug_unique` (`slug`);

--
-- Индексы таблицы `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Индексы таблицы `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Индексы таблицы `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Индексы таблицы `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `authors`
--
ALTER TABLE `authors`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `auths`
--
ALTER TABLE `auths`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `genres`
--
ALTER TABLE `genres`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `books_genre_id_foreign` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
