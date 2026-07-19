import { useCallback, useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import { API_BASE_URL, ticketApi } from './services/api';

export default function App() {
  const [view, setView] = useState('dashboard');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState('');
  const [notice, setNotice] = useState(null);

  const showNotice = (type, message) => {
    setNotice({ type, message });
    window.clearTimeout(window.__noticeTimer);
    window.__noticeTimer = window.setTimeout(() => setNotice(null), 4500);
  };

  const loadTickets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ticketApi.list();
      setTickets(response.data || []);
    } catch (error) {
      showNotice('error', `${error.message} Revise que el backend esté disponible en ${API_BASE_URL}.`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const createTicket = async (payload) => {
    setSaving(true);
    try {
      const response = await ticketApi.create(payload);
      setTickets((current) => [response.data, ...current]);
      showNotice('success', 'El ticket fue registrado correctamente.');
      setView('tickets');
      return true;
    } catch (error) {
      showNotice('error', error.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateTicket = async (id, changes) => {
    setUpdatingId(id);
    try {
      const response = await ticketApi.update(id, changes);
      setTickets((current) => current.map((ticket) => (ticket._id === id ? response.data : ticket)));
      showNotice('success', 'El estado del ticket fue actualizado.');
    } catch (error) {
      showNotice('error', error.message);
    } finally {
      setUpdatingId('');
    }
  };

  const deleteTicket = async (ticket) => {
    const confirmed = window.confirm(`¿Eliminar definitivamente el ticket “${ticket.titulo}”?`);
    if (!confirmed) return;
    try {
      await ticketApi.remove(ticket._id);
      setTickets((current) => current.filter((item) => item._id !== ticket._id));
      showNotice('success', 'El ticket fue eliminado.');
    } catch (error) {
      showNotice('error', error.message);
    }
  };

  return (
    <div className="app-shell">
      <Navigation currentView={view} onNavigate={setView} ticketCount={tickets.length} />
      <main>
        {loading ? (
          <div className="loading-panel"><span className="spinner" /> Cargando tickets...</div>
        ) : (
          <>
            {view === 'dashboard' && <Dashboard tickets={tickets} onNavigate={setView} />}
            {view === 'new' && <TicketForm onCreate={createTicket} saving={saving} onCancel={() => setView('dashboard')} />}
            {view === 'tickets' && <TicketList tickets={tickets} onUpdate={updateTicket} onDelete={deleteTicket} updatingId={updatingId} onRefresh={loadTickets} />}
          </>
        )}
      </main>
      <footer><span>Centro de Incidentes</span><span>Frontend React + API REST + MongoDB</span></footer>
      {notice && <div className={`toast ${notice.type}`} role="status">{notice.message}</div>}
    </div>
  );
}
