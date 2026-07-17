const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio.'],
      trim: true,
      minlength: [4, 'El título debe tener al menos 4 caracteres.'],
      maxlength: [120, 'El título no puede superar 120 caracteres.'],
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es obligatoria.'],
      trim: true,
      minlength: [10, 'La descripción debe tener al menos 10 caracteres.'],
      maxlength: [1000, 'La descripción no puede superar 1000 caracteres.'],
    },
    categoria: {
      type: String,
      required: [true, 'La categoría es obligatoria.'],
      enum: {
        values: ['Red', 'Hardware', 'Software'],
        message: 'La categoría debe ser Red, Hardware o Software.',
      },
    },
    prioridad: {
      type: String,
      required: [true, 'La prioridad es obligatoria.'],
      enum: {
        values: ['Alta', 'Media', 'Baja'],
        message: 'La prioridad debe ser Alta, Media o Baja.',
      },
    },
    estado: {
      type: String,
      default: 'Abierto',
      enum: {
        values: ['Abierto', 'En Progreso', 'Cerrado'],
        message: 'El estado debe ser Abierto, En Progreso o Cerrado.',
      },
    },
  },
  {
    timestamps: {
      createdAt: 'fechaCreacion',
      updatedAt: 'fechaActualizacion',
    },
    versionKey: false,
  },
);

// Índice útil para consultas por estado y prioridad.
ticketSchema.index({ estado: 1, prioridad: 1 });

module.exports = mongoose.model('Ticket', ticketSchema);
