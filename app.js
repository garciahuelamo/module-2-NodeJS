import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import eventoRoutes from './routes/recursoRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/eventos', eventoRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
