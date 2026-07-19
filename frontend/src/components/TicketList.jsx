import { useMemo, useState } from 'react';
import { formatDate } from '../utils/sanitize';

function TicketCard({ ticket, onUpdate, onDelete, updatingId }) {
  const nextState = ticket.estado === 'Abierto' ? 'En Progreso' : ticket.estado === 'En Progreso' ? 'Cerrado' : 'Abierto';
  const isUpdating = updatingId === ticket._id;

  return (
    <article className="ticket-card">
      <div className="ticket-card-top">
        <div>
          <span className={`priority-dot ${ticket.prioridad.toLowerCase()}`} aria-label={`Prioridad ${ticket.prioridad}`} />
          <span className="ticket-category">{ticket.categoria}</span>
        </div>
        <span className={`status-pill ${ticket.estado.toLowerCase().replace(' ', '-')}`}>{ticket.estado}</span>
      </div>
      <h3>{ticket.titulo}</h3>
      <p>{ticket.descripcion}</p>
      <dl className="ticket-meta">
        <div><dt>Prioridad</dt><dd>{ticket.prioridad}</dd></div>
        <div><dt>Creado</dt><dd>{formatDate(ticket.fechaCreacion)}</dd></div>
      </dl>
      <div className="ticket-actions">
        <button className="secondary-button compact" type="button" disabled={isUpdating} onClick={() => onUpdate(ticket._id, { estado: nextState })}>
          {isUpdating ? 'Actualizando...' : `Cambiar a ${nextState}`}
        </button>
        <button className="danger-button compact" type="button" onClick={() => onDelete(ticket)}>Eliminar</button>
      </div>
    </article>
  );
}

export default function TicketList({ tickets, onUpdate, onDelete, updatingId, onRefresh }) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return tickets.filter((ticket) => {
      const matchesText = !needle || `${ticket.titulo} ${ticket.descripcion}`.toLowerCase().includes(needle);
      return matchesText && (!status || ticket.estado === status) && (!category || ticket.categoria === category);
    });
  }, [tickets, search, status, category]);

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Listado de tickets</span>
          <h1>Incidentes registrados</h1>
          <p>Consulte, filtre, actualice o elimine tickets en tiempo real.</p>
        </div>
        <button className="secondary-button" type="button" onClick={onRefresh}>Actualizar datos</button>
      </div>

      <div className="filters-card">
        <label><span>Buscar</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Título o descripción" /></label>
        <label><span>Estado</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="">Todos</option><option>Abierto</option><option>En Progreso</option><option>Cerrado</option></select></label>
        <label><span>Categoría</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">Todas</option><option>Red</option><option>Hardware</option><option>Software</option></select></label>
        <strong>{filtered.length} resultado(s)</strong>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state"><strong>No se encontraron tickets</strong><p>Cambie los filtros o registre un nuevo incidente.</p></div>
      ) : (
        <div className="tickets-grid">
          {filtered.map((ticket) => <TicketCard key={ticket._id} ticket={ticket} onUpdate={onUpdate} onDelete={onDelete} updatingId={updatingId} />)}
        </div>
      )}
    </section>
  );
}
