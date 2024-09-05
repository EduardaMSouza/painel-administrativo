const jwt = require('jsonwebtoken');
import jsonServer from 'json-server';

const bodyParser = require('body-parser');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const SECRET_KEY = 'your_secret_key';
const expiresIn = '1h';

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

server.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  const db = router.db; 
  const user = db.get('users').find({ username, password }).value();

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = createToken({ username: user.username, role: user.role });
  return res.status(200).json({ token });
});

server.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
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
  }
  next();
});

server.get('/admin/data', (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado' });
  }

  return res.status(200).json({ message: 'Bem-vindo, administrador!' });
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server está rodando na porta 3000');
});
