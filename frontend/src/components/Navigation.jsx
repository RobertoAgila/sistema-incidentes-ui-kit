const items = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'new', label: 'Nuevo incidente' },
  { id: 'tickets', label: 'Listado de tickets' },
];

export default function Navigation({ currentView, onNavigate, ticketCount }) {
  return (
    <header className="topbar">
      <div className="brand" aria-label="Centro de Incidentes">
        <span className="brand-mark" aria-hidden="true">CI</span>
        <div>
          <strong>Centro de Incidentes</strong>
          <small>Soporte técnico y seguimiento</small>
        </div>
      </div>

      <nav className="main-nav" aria-label="Navegación principal">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={currentView === item.id ? 'nav-button active' : 'nav-button'}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
            {item.id === 'tickets' && <span className="nav-count">{ticketCount}</span>}
          </button>
        ))}
      </nav>
    </header>
  );
}
