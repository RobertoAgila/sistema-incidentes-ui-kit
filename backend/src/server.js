require('dotenv').config();

const app = require('./app');
const connectDatabase = require('./config/database');

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Falta la variable MONGODB_URI en el archivo .env.');
  }

  await connectDatabase();

  const server = app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
  });

  process.on('unhandledRejection', (error) => {
    console.error('Error no controlado:', error);
    server.close(() => process.exit(1));
  });
}

startServer().catch((error) => {
  console.error('No se pudo iniciar la aplicación:', error.message);
  process.exit(1);
});
