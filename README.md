#  Aston React-project

## 🐧 Порядок запуска проекта
- `Frontend`: cd frontend npm install npm run dev
- `BackEnd`: cd server npm install npm run dev
- `PostgreSQL`: cd frontend docker-compose up  
- `StoryBook`: cd frontend npm run storybook  
- `.env backEnd`: 'SECRET_KEY = 'ASTON'
- `.env frontEnd`: 'SECRET_KEY = 'ASTON'



---

## 🦄 1 уровень (необходимый минимум)
- Есть четкое разделение на умные и глупые компоненты: [**Smart**](https://github.com/szx231/AstonEmail/blob/frontend/src/pages/Mail/index.tsx), [**Silly**](https://github.com/szx231/AstonEmail/blob/frontend/src/components/FavoriteMessageCard/index.tsx)
- Есть рендеринг списков: [**List**](https://github.com/szx231/AstonEmail/blob/frontend/src/pages/AdminPanel/index.tsx), [**List2**](https://github.com/szx231/AstonEmail/blob/frontend/src/pages/FavoriteMessage/index.tsx)
- Реализована хотя бы одна форма: [**SignUp**](https://github.com/szx231/AstonEmail/blob/frontend/src/pages/Authorization/SignUp/index.tsx)
- Есть применение Контекст API: [**AuthContext**](https://github.com/szx231/AstonEmail/blob/frontend/src/components/Context/Auth/index.tsx)
- Есть применение предохранителя: [**ErrorBoundary**](https://github.com/szx231/AstonEmail/blob/frontend/src/App.tsx)
- Есть хотя бы один кастомный хук: [**Hook**](https://github.com/szx231/AstonEmail/blob/frontend/src/hooks/useAthorization/index.tsx)
- Хотя бы несколько компонентов используют PropTypes: [**PropTypes1**](https://github.com/szx231/AstonEmail/blob/frontend/src/components/FavoriteMessageCard/index.tsx), [**PropTypes2**](https://github.com/szx231/AstonEmail/blob/frontend/src/pages/AdminPanel/UserCard/index.tsx)
- Поиск не должен триггерить много запросов к серверу : [**Debounce**](https://github.com/szx231/AstonEmail/blob/frontend/src/components/UI/Search/index.tsx)
- Есть применение lazy + Suspense : [**Lazy+Suspense**](https://github.com/szx231/AstonEmail/blob/frontend/src/App.tsx)

---

## 🐗 Redux
- Используем слайсы : [**Slice1**](https://github.com/szx231/AstonEmail/blob/frontend/src/store/Favorite/index.ts), [**Slice2**](https://github.com/szx231/AstonEmail/blob/frontend/src/store/FilterUsersStatus/index.tsx)
- Есть хотя бы одна кастомная мидлвара : [**Slice1**](https://github.com/szx231/AstonEmail/blob/frontend/src/store/CustomMiddlware/PrintConsol/index.ts)
- Используем слайсы : [**Slice1**](https://github.com/szx231/AstonEmail/blob/frontend/src/store/Favorite/index.ts), [**Slice2**](https://github.com/szx231/AstonEmail/blob/frontend/src/store/FilterUsersStatus/index.tsx)
- Используется RTK Query : [**RTK API**](https://github.com/szx231/AstonEmail/blob/frontend/src/store/EmailsApi/index.tsx)
- Используется Transforming Responses : [**RTK API**](https://github.com/szx231/AstonEmail/blob/frontend/src/store/EmailsApi/index.tsx)


---

## 🐼 2 уровень (необязательный)
- Используются мемоизированные селекторы : [**CREATE SELECTOR**](https://github.com/szx231/AstonEmail/blob/frontend/src/store/Selectors/index.tsx)
- Использование TypeScript : ✔️ 
- Подключен storybook и созданы несколько сторисов: [**STORYBOOK**](https://github.com/szx231/AstonEmail/tree/frontend/.storybook), [**STORIES**](https://github.com/szx231/AstonEmail/tree/frontend/src/stories)
- Реализовать фичу “Поделиться в телеграм”, закрытую под фича флагом. : ✔️ 

[**Ссылка на компонент, где реализована кнопка поделиться**](https://github.com/szx231/AstonEmail/blob/frontend/src/pages/CurrentMessage/index.tsx)

[**Ссылка на контекст, из которого приложение узнает, что фича флаг активирован**](https://github.com/szx231/AstonEmail/blob/frontend/src/components/Context/FeatureFlag/index.tsx)
<img src="https://user-images.githubusercontent.com/82704685/224871606-7b2be014-fc08-4971-9bb3-e682c15de67f.jpg" width="500px" />



