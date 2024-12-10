# Используем официальный образ Node.js
FROM node:16

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файл package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код приложения в контейнер
COPY . .

# Строим приложение
RUN npm run build

# Открываем порт, на котором будет работать приложение
EXPOSE 3000

# Указываем команду для запуска приложения
CMD ["npm", "start"]
