import http from 'http';
//Щоб код міг брати змінну PORT з .env, потрібно підключити пакет dotenv
import dotenv from 'dotenv';

// Завантажуємо змінні оточення, а саме з файлу .env
dotenv.config();

const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
    // Додайте сюди обробку
    res.end();
});

server.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
