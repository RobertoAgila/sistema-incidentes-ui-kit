const mongoose = require('mongoose');
const Ticket = require('../models/Ticket');

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// GET /api/tickets
async function getTickets(req, res, next) {
  try {
    const filter = {};

    if (req.query.categoria) filter.categoria = req.query.categoria;
    if (req.query.prioridad) filter.prioridad = req.query.prioridad;
    if (req.query.estado) filter.estado = req.query.estado;

    const tickets = await Ticket.find(filter).sort({ fechaCreacion: -1 });

    res.status(200).json({
      success: true,
      total: tickets.length,
      data: tickets,
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/tickets/:id
async function getTicketById(req, res, next) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'El identificador del ticket no es válido.',
      });
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket no encontrado.',
      });
    }

    return res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    return next(error);
  }
}

// POST /api/tickets
async function createTicket(req, res, next) {
  try {
    const ticket = await Ticket.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Ticket registrado correctamente.',
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
}

// PUT /api/tickets/:id
async function updateTicket(req, res, next) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'El identificador del ticket no es válido.',
      });
    }

    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket no encontrado.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Ticket actualizado correctamente.',
      data: ticket,
    });
  } catch (error) {
    return next(error);
  }
}

// DELETE /api/tickets/:id
async function deleteTicket(req, res, next) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'El identificador del ticket no es válido.',
      });
    }

    const ticket = await Ticket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket no encontrado.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Ticket eliminado correctamente.',
      data: ticket,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};
