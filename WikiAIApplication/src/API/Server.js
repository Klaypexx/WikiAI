import express from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3001;
//Команда для подключения к серверу для БД node src/api/server.js
const connection = createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "knight198",
    database: "wiki",
});

// Подключение к базе данных
connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err.stack);
    return;
  }
  console.log('Подключение к базе данных успешно установлено');
});

app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

// Маршрут для получения данных из базы данных
app.get('/data', (req, res) => {
  connection.query('SELECT * FROM user', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

// Проверка существования пользователя
app.post('/check-user', (req, res) => {
  const { login } = req.body;
  connection.query('SELECT * FROM user WHERE login = ?', [login], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Ошибка при проверке пользователя' });
    }
    res.json({ exists: results.length > 0 });
  });
});

// Регистрация нового пользователя
app.post('/register', (req, res) => {
  const { name, login, password, email } = req.body;
  connection.query(
    'INSERT INTO users (name, login, password, email) VALUES (?, ?, ?, ?)',
    [name, login, password, email],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
      }
      res.json({ success: true });
    }
  );
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});