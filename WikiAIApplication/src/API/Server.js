import express from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

app.post('/get-id', (req, res) => {
  console.log('Тело запроса:', req.body); // Логирование тела запроса
  const { login } = req.body;

  // Проверяем, передан ли логин в теле запроса
  if (!login) {
    return res.status(400).json({ error: 'Логин не указан' });
  }

  connection.query('SELECT id FROM user WHERE login = ?', [login], (error, results) => {
    if (error) {
      console.error('Ошибка при выполнении запроса:', error); // Логирование ошибки
      return res.status(500).json({ error: 'Ошибка при проверке пользователя' });
    }

    // Если пользователь найден, возвращаем его id
    if (results.length > 0) {
      const userId = results[0].id; // Получаем id из результата запроса
      return res.json({ exists: true, id: userId }); // Возвращаем exists и id
    } else {
      // Если пользователь не найден, возвращаем exists: false
      return res.json({ exists: false });
    }
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

app.get('/my-articles', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'userId не указан' });
  }

  connection.query('SELECT * FROM articles WHERE userId = ?', [userId], (error, results) => {
    if (error) {
      console.error('Ошибка при выполнении запроса:', error);
      return res.status(500).json({ error: 'Ошибка при получении статей' });
    }

    res.json(results);
  });
});

app.get('/themes', (req, res) => {
  connection.query('SELECT id, name, slug FROM topics ORDER BY name', (error, results) => {
    if (error) {
      console.error('Ошибка при получении тем:', error);
      return res.status(500).json({ error: 'Ошибка при получении списка тем' });
    }
    
    res.json(results);
  });
});

// Настройка загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads', 'articles');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Недопустимый тип файла. Разрешены только JPEG, PNG и WebP'));
    }
  }
});

app.post('/post-article', upload.single('preview'), (req, res) => {
  let themes = req.body.themes;
  
  // Если themes пришло как строка (например, "1,2,3")
  if (typeof themes === 'string') {
    themes = themes.split(',').map(id => parseInt(id.trim()));
  } 
  // Если themes пришло как массив в FormData (themes[]=1&themes[]=2)
  else if (req.body['themes[]']) {
    themes = Array.isArray(req.body['themes[]']) 
      ? req.body['themes[]'].map(id => parseInt(id))
      : [parseInt(req.body['themes[]'])];
  }
  // Если themes не пришло
  else {
    themes = [];
  }

  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Необходимо указать заголовок, содержание и автора' });
  }

  // Начинаем транзакцию
  connection.beginTransaction(err => {
    if (err) {
      console.error('Ошибка начала транзакции:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }

    // 1. Создаем статью
    connection.query(
      'INSERT INTO article_in_storage (title, text, author_id) VALUES (?, ?, ?)',
      [title, content, author],
      (error, results) => {
        if (error) {
          return connection.rollback(() => {
            console.error('Ошибка создания статьи:', error);
            res.status(500).json({ error: 'Ошибка при создании статьи' });
          });
        }

        const articleId = results.insertId;
        const operations = [];

        // 2. Сохраняем превью если есть
        if (req.file) {
          operations.push(new Promise((resolve, reject) => {
            connection.query(
              `INSERT INTO article_preview 
              (article_id, file_path, file_name, mime_type, size) 
              VALUES (?, ?, ?, ?, ?)`,
              [
                articleId,
                req.file.path,
                req.file.originalname,
                req.file.mimetype,
                req.file.size
              ],
              (error) => {
                if (error) reject(error);
                else resolve();
              }
            );
          }));
        }

        // 3. Привязываем темы если есть
        if (themes.length > 0) {
          operations.push(new Promise((resolve, reject) => {
            connection.query(
              'INSERT INTO article_have_topic (article_id, theme_id) VALUES ?',
              [themes.map(id => [articleId, id])],
              (error) => {
                if (error) reject(error);
                else resolve();
              }
            );
          }));
        }

        // Выполняем все операции
        Promise.all(operations)
          .then(() => {
            connection.commit(err => {
              if (err) {
                return connection.rollback(() => {
                  console.error('Ошибка коммита транзакции:', err);
                  res.status(500).json({ error: 'Ошибка при сохранении статьи' });
                });
              }
              res.status(201).json({ 
                success: true,
                articleId,
                message: 'Статья успешно создана'
              });
            });
          })
          .catch(error => {
            connection.rollback(() => {
              // Удаляем загруженный файл при ошибке
              if (req.file?.path) {
                fs.unlink(req.file.path, () => {});
              }
              console.error('Ошибка при сохранении данных статьи:', error);
              res.status(500).json({ error: 'Ошибка при сохранении данных статьи' });
            });
          });
      }
    );
  });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Ошибка Multer (загрузка файла)
    res.status(400).json({ error: err.message });
  } else if (err) {
    // Другие ошибки
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});