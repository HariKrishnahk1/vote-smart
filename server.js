import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import path from 'path';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new Database('users.db');

// Create users table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voterId TEXT UNIQUE,
    username TEXT UNIQUE,
    password TEXT
  )
`);

// Register Endpoint
app.post('/api/register', (req, res) => {
  const { voterId, username, password } = req.body;

  if (!voterId || !username || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const stmt = db.prepare('INSERT INTO users (voterId, username, password) VALUES (?, ?, ?)');
    stmt.run(voterId, username, password);
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      res.status(400).json({ error: 'Voter ID or Username already exists.' });
    } else {
      res.status(500).json({ error: 'Database error.' });
    }
  }
});

// Login Endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const stmt = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
    const user = stmt.get(username, password);

    if (user) {
      res.status(200).json({ message: 'Login successful.', user: { id: user.id, username: user.username } });
    } else {
      res.status(401).json({ error: 'Invalid username or password.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Database error.' });
  }
});

app.use(express.static('dist'));

app.use((req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
