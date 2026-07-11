import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './database.js';

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'dropkit_secret_key_123';

// Auth Routes
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hash = bcrypt.hashSync(password, 10);
    const stmt = db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)');
    const info = stmt.run(name, email, hash);

    const user = { id: info.lastInsertRowid, name, email, role: 'user' };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const valid = bcrypt.compareSync(password, user.password_hash);
    if (!valid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const payload = { id: user.id, name: user.name, email: user.email, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: payload });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Products Routes
app.get('/api/products', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products').all();
    
    // Parse JSON fields
    const parsedProducts = products.map(p => ({
      ...p,
      details: p.details ? JSON.parse(p.details) : [],
      fabric: p.fabric ? JSON.parse(p.fabric) : {},
      colors: p.colors ? JSON.parse(p.colors) : [],
      sizes: p.sizes ? JSON.parse(p.sizes) : []
    }));

    res.json(parsedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/products', (req, res) => {
  try {
    const p = req.body;
    const stmt = db.prepare(`
      INSERT INTO products (id, name, codename, price, category, description, details, fabric, colors, sizes, image, backImage)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      p.id, p.name, p.codename, p.price, p.category, p.description,
      JSON.stringify(p.details || []), JSON.stringify(p.fabric || {}),
      JSON.stringify(p.colors || []), JSON.stringify(p.sizes || []),
      p.image, p.backImage
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', (req, res) => {
  try {
    const p = req.body;
    const stmt = db.prepare(`
      UPDATE products 
      SET name=?, codename=?, price=?, category=?, description=?, details=?, fabric=?, colors=?, sizes=?, image=?, backImage=?
      WHERE id=?
    `);
    stmt.run(
      p.name, p.codename, p.price, p.category, p.description,
      JSON.stringify(p.details || []), JSON.stringify(p.fabric || {}),
      JSON.stringify(p.colors || []), JSON.stringify(p.sizes || []),
      p.image, p.backImage, req.params.id
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM products WHERE id=?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
