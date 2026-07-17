const mongoose = require('mongoose');

/**
 * Abre la conexión con MongoDB mediante la URI definida en el archivo .env.
 */
async function connectDatabase() {
  const connection = await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });

  console.log(
    `MongoDB conectado: ${connection.connection.host}/${connection.connection.name}`,
  );

  return connection;
}

module.exports = connectDatabase;
