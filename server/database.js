import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, 'database.sqlite'));

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'user'
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    codename TEXT,
    price INTEGER NOT NULL,
    category TEXT,
    description TEXT,
    details TEXT,
    fabric TEXT,
    colors TEXT,
    sizes TEXT,
    image TEXT,
    backImage TEXT
  );
`);

// Seed Admin User
const seedAdmin = () => {
  const adminEmail = 'njnajath88@gmail.com';
  const stmt = db.prepare('SELECT id FROM users WHERE email = ?');
  const admin = stmt.get(adminEmail);

  if (!admin) {
    const hash = bcrypt.hashSync('admin', 10);
    const insert = db.prepare('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)');
    insert.run('Admin', adminEmail, hash, 'admin');
    console.log('Seeded admin user.');
  }
};

// Seed Products
const seedProducts = () => {
  const productsCount = db.prepare('SELECT COUNT(*) as count FROM products').get();
  
  if (productsCount.count === 0) {
    const initialProducts = [
      {
        id: 'js-01',
        name: 'MADRID 24/25 HOME KIT',
        codename: 'Madrid Club Edition',
        price: 195,
        category: 'club',
        description: 'A technical masterpiece engineered for professional pitch performance. Milled with lightweight speed-grids, bonded gold collar linings, and heat-pressed club crests to eliminate skin friction.',
        details: JSON.stringify([
          'Ultra-breathable AeroGrid jacquard weave',
          'Heat-applied ultra-light golden crest and star elements',
          'Laser-perforated cooling zones across the spine',
          'Seamless flatlock bonded cuffs and side seams',
          'Athletic slim fit optimized for high-acceleration movement'
        ]),
        fabric: JSON.stringify({
          composition: '100% Recycled Polyamide fibers',
          weight: '120 gsm',
          origin: 'Lombardy, Italy',
          features: ['Active Moisture Dissipation', 'Anti-cling Debossed Pattern', 'Odor-block Finish'],
          dragCoef: '0.315 CdA',
          reclaimedPercentage: '92%'
        }),
        colors: JSON.stringify([
          { name: 'Triple White & Gold', hex: '#F9F6F0' },
          { name: 'Carbon Black & Gold', hex: '#1E1E1E' }
        ]),
        sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL']),
        image: '/assets/jersey_football_madrid_front.png',
        backImage: '/assets/jersey_football_madrid_back.png'
      },
      // Insert another couple of samples here
      {
        id: 'js-02',
        name: 'ARGENTINA 24/25 HOME KIT',
        codename: 'Argentina World Cup Edition',
        price: 220,
        category: 'intl',
        description: 'Archival championship design re-engineered for the modern athlete.',
        details: JSON.stringify([]),
        fabric: JSON.stringify({}),
        colors: JSON.stringify([{ name: 'Celeste Blue & White', hex: '#87CEEB' }]),
        sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL']),
        image: '/assets/jersey_football_argentina.png',
        backImage: null
      }
    ];

    const insert = db.prepare(`
      INSERT INTO products (id, name, codename, price, category, description, details, fabric, colors, sizes, image, backImage)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    initialProducts.forEach(p => {
      insert.run(p.id, p.name, p.codename, p.price, p.category, p.description, p.details, p.fabric, p.colors, p.sizes, p.image, p.backImage);
    });
    console.log('Seeded initial products.');
  }
};

seedAdmin();
seedProducts();

export default db;
