function Metric({ label, value, tone }) {
  return (
    <article className={`metric-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

export default function Dashboard({ tickets, onNavigate }) {
  const opened = tickets.filter((ticket) => ticket.estado === 'Abierto').length;
  const progress = tickets.filter((ticket) => ticket.estado === 'En Progreso').length;
  const closed = tickets.filter((ticket) => ticket.estado === 'Cerrado').length;
  const high = tickets.filter((ticket) => ticket.prioridad === 'Alta').length;
  const recent = tickets.slice(0, 4);

  return (
    <section className="page-section">
      <div className="hero-panel">
        <div>
          <span className="eyebrow">Panel operativo</span>
          <h1>Gestione los incidentes desde un solo lugar</h1>
          <p>Registre, priorice y dé seguimiento a los tickets conectados con la API REST y MongoDB.</p>
        </div>
        <button className="primary-button" type="button" onClick={() => onNavigate('new')}>
          Registrar incidente
        </button>
      </div>

      <div className="metrics-grid" aria-label="Resumen de tickets">
        <Metric label="Total" value={tickets.length} tone="neutral" />
        <Metric label="Abiertos" value={opened} tone="open" />
        <Metric label="En progreso" value={progress} tone="progress" />
        <Metric label="Cerrados" value={closed} tone="closed" />
        <Metric label="Prioridad alta" value={high} tone="high" />
      </div>

      <div className="dashboard-grid">
        <article className="content-card">
          <div className="card-heading">
            <div>
              <span className="eyebrow">Actividad reciente</span>
              <h2>Últimos tickets</h2>
            </div>
            <button className="text-button" type="button" onClick={() => onNavigate('tickets')}>Ver todos</button>
          </div>
          {recent.length === 0 ? (
            <p className="muted">Todavía no existen tickets registrados.</p>
          ) : (
            <ul className="recent-list">
              {recent.map((ticket) => (
                <li key={ticket._id}>
                  <div>
                    <strong>{ticket.titulo}</strong>
                    <small>{ticket.categoria} · {ticket.prioridad}</small>
                  </div>
                  <span className={`status-pill ${ticket.estado.toLowerCase().replace(' ', '-')}`}>{ticket.estado}</span>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="content-card quick-guide">
          <span className="eyebrow">Flujo de trabajo</span>
          <h2>Proceso de atención</h2>
          <ol>
            <li><span>1</span> Registrar el incidente.</li>
            <li><span>2</span> Asignar categoría y prioridad.</li>
            <li><span>3</span> Actualizar el estado del ticket.</li>
            <li><span>4</span> Cerrar o eliminar el registro.</li>
          </ol>
        </article>
      </div>
    </section>
  );
}
