import { Router } from 'express';
import {
  getAllEventos,
  getEventoById,
  createEvento,
  updateEvento,
  deleteEvento
} from '../controllers/recursoController.js';

import validateEvento from '../middlewares/validateData.js';

const router = Router();

router.get('/', getAllEventos);
router.get('/:id', getEventoById);
router.post('/', validateEvento, createEvento);
router.put('/:id', validateEvento, updateEvento);
router.delete('/:id', deleteEvento);

export default router;
