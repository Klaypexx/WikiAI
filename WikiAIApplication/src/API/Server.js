import express from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

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
/*app.post('/check-user', (req, res) => {
  const { login } = req.body;
  connection.query('SELECT * FROM user WHERE login = ?', [login], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Ошибка при проверке пользователя' });
    }
    res.json({ exists: results.length > 0 });
  });
});*/

app.post('/check-user', (req, res) => {
  console.log('Тело запроса:', req.body); // Логирование тела запроса
  const { login } = req.body;

  if (!login) {
    return res.status(400).json({ error: 'Поле login обязательно' });
  }

  connection.query('SELECT * FROM user WHERE login = ?', [login], (error, results) => {
    if (error) {
      console.error('Ошибка при выполнении запроса:', error); // Логирование ошибки
      return res.status(500).json({ error: 'Ошибка при проверке пользователя' });
    }
    res.json({ exists: results.length > 0 });
  });
});

// Регистрация нового пользователя
app.post('/register', (req, res) => {
  const { name, login, password, email } = req.body;

  // Проверка наличия обязательных полей
  if (!name || !login || !password || !email) {
    return res.status(400).json({ error: 'Все поля обязательны' });
  }

  // Вставка данных в базу данных
  connection.query(
    'INSERT INTO user (name, login, password, `e-mail`) VALUES (?, ?, ?, ?)',
    [name, login, password, email],
    (error, results) => {
      if (error) {
        console.error('Ошибка при регистрации пользователя:', error); // Логирование ошибки
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