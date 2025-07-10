import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data/data.json');

function readData() {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

export function getAllEventos(req, res) {
  const eventos = readData();
  res.json(eventos);
}

export function getEventoById(req, res) {
  const eventos = readData();
  const evento = eventos.find(e => e.id === req.params.id);
  if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
  res.json(evento);
}

export function createEvento(req, res) {
  const eventos = readData();
  const nuevoEvento = {
    id: uuidv4(),
    ...req.body
  };
  eventos.push(nuevoEvento);
  writeData(eventos);
  res.status(201).json(nuevoEvento);
}

export function updateEvento(req, res) {
  const eventos = readData();
  const index = eventos.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Evento no encontrado' });

  eventos[index] = {
    ...eventos[index],
    ...req.body
  };
  writeData(eventos);
  res.json(eventos[index]);
}

export function deleteEvento(req, res) {
  const eventos = readData();
  const index = eventos.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Evento no encontrado' });

  const eliminado = eventos.splice(index, 1)[0];
  writeData(eventos);
  res.json({ mensaje: 'Evento eliminado', evento: eliminado });
}
