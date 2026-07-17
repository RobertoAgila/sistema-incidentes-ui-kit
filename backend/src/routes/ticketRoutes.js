const express = require('express');
const {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');

const router = express.Router();

router.route('/').get(getTickets).post(createTicket);
router
  .route('/:id')
  .get(getTicketById)
  .put(updateTicket)
  .delete(deleteTicket);

module.exports = router;
