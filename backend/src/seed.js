require('dotenv').config();

const mongoose = require('mongoose');
const connectDatabase = require('./config/database');
const Ticket = require('./models/Ticket');

const sampleTickets = [
  {
    titulo: 'Sin conexión a Internet',
    descripcion: 'El equipo de la oficina administrativa no puede acceder a Internet.',
    categoria: 'Red',
    prioridad: 'Alta',
    estado: 'Abierto',
  },
  {
    titulo: 'Teclado con teclas dañadas',
    descripcion: 'Varias teclas dejaron de responder y se requiere revisión del periférico.',
    categoria: 'Hardware',
    prioridad: 'Media',
    estado: 'En Progreso',
  },
  {
    titulo: 'Error al iniciar el sistema contable',
    descripcion: 'La aplicación muestra un mensaje de error al intentar iniciar sesión.',
    categoria: 'Software',
    prioridad: 'Alta',
    estado: 'Abierto',
  },
  {
    titulo: 'Impresora no detectada',
    descripcion: 'Windows no reconoce la impresora conectada mediante el puerto USB.',
    categoria: 'Hardware',
    prioridad: 'Baja',
    estado: 'Cerrado',
  },
];

async function seed() {
  try {
    await connectDatabase();
    await Ticket.deleteMany({});
    const inserted = await Ticket.insertMany(sampleTickets);
    console.log(`${inserted.length} tickets de prueba insertados.`);
  } catch (error) {
    console.error('No se pudieron insertar los datos:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seed();
