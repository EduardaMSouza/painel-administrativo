const jwt = require('jsonwebtoken');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
require('dotenv').config();

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
const expiresIn = '24h';

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(middlewares);

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return false;
  }
}

function authenticate(req, res, next) {
  if (req.method === 'POST' && req.url === '/auth/login' || req.method === 'POST' && req.url === '/users') {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Autenticação necessária' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ message: 'Token inválido ou expirado' });
  }

  req.user = decoded;
  next();
}

function authorize(req, res, next) {
  if (req.method === 'PUT' || req.method === 'DELETE') {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }
  }
  next();
}

server.use(authenticate); 
server.use(authorize); 

server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  const db = router.db;
  const user = db.get('users').find({ email, password }).value();

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = createToken({ id: user.id, role: user.role });
  return res.status(200).json({ token });
});

server.get('/admin/data', (req, res) => {
  return res.status(200).json({ message: 'Bem-vindo, administrador!' });
});

server.get('/users', (req, res) => {
  const db = router.db;
  const users = db.get('users').value();
  res.status(200).json(users);
});

server.post('/users', (req, res) => {
  const { name, email, password, role } = req.body;
  const db = router.db;
  const newUser = {
    id: db.get('users').value().length + 1,
    name,
    email,
    password,
    role
  };
  db.get('users').push(newUser).write();
  res.status(201).json(newUser);
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const db = router.db;
  const user = db.get('users').find({ id: Number(id) }).value();
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  res.status(200).json(user);
});

server.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  const db = router.db;
  const user = db.get('users').find({ id: Number(id) }).value();
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  db.get('users').find({ id: Number(id) }).assign({ name, email, password, role }).write();
  res.status(200).json({ id: Number(id), name, email, password, role });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const db = router.db;
  const user = db.get('users').find({ id: Number(id) }).value();
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  db.get('users').remove({ id: Number(id) }).write();
  res.status(200).json({ message: 'Usuário removido com sucesso' });
});

server.get('/me', (req, res) => {
  
  if (!req.user) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  const db = router.db;
  const userId = req.user.id;
  const user = db.get('users').find({ id: userId }).value();
  
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  
  res.status(200).json({ role: user.role });
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server está rodando na porta 3001');
});

module.exports = server
