function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
}

function errorHandler(error, req, res, next) {
  // Evita la advertencia de parámetro no utilizado y mantiene la firma de Express.
  void next;

  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map((item) => item.message);

    return res.status(400).json({
      success: false,
      message: 'Los datos enviados no son válidos.',
      errors,
    });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'El identificador proporcionado no es válido.',
    });
  }

  console.error(error);

  return res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Error interno del servidor.',
  });
}

module.exports = { notFound, errorHandler };
