import Joi from 'joi';

const eventoSchema = Joi.object({
  titulo: Joi.string().min(3).required(),
  descripcion: Joi.string().optional(),
  fecha: Joi.date().iso().required(),
  lugar: Joi.string().optional()
});

export default function validateEvento(req, res, next) {
  const { error } = eventoSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
}
