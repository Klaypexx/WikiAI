import mysql from 'mysql';
import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'cors';

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

const corsMiddleware = cors({
  origin: 'http://localhost:5173', // Укажите адрес вашего фронтенда
  methods: ['POST'],
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

  if (req.method === 'POST') {
    const { name, login, password, email } = req.body;
    const sql = 'INSERT INTO users (name, login, password, email) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, login, password, email], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}