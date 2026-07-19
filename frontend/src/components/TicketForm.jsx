import { useState } from 'react';
import { sanitizeText } from '../utils/sanitize';

const initialForm = {
  titulo: '',
  descripcion: '',
  categoria: 'Red',
  prioridad: 'Media',
  estado: 'Abierto',
};

export default function TicketForm({ onCreate, saving, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [validation, setValidation] = useState('');

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const clean = {
      ...form,
      titulo: sanitizeText(form.titulo, 120),
      descripcion: sanitizeText(form.descripcion, 1000),
    };

    if (clean.titulo.length < 4 || clean.descripcion.length < 10) {
      setValidation('El título debe tener al menos 4 caracteres y la descripción al menos 10.');
      return;
    }

    setValidation('');
    const created = await onCreate(clean);
    if (created) setForm(initialForm);
  };

  return (
    <section className="page-section narrow-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Registro de incidentes</span>
          <h1>Nuevo ticket de soporte</h1>
          <p>Complete la información para almacenarla en MongoDB mediante la API REST.</p>
        </div>
      </div>

      <form className="ticket-form" onSubmit={submit} noValidate>
        <label className="field full-field">
          <span>Título</span>
          <input name="titulo" value={form.titulo} onChange={updateField} maxLength="120" placeholder="Ej. Pérdida de conexión en laboratorio" required />
        </label>

        <label className="field full-field">
          <span>Descripción</span>
          <textarea name="descripcion" value={form.descripcion} onChange={updateField} maxLength="1000" rows="6" placeholder="Describa el problema, el equipo afectado y las pruebas realizadas." required />
          <small>{form.descripcion.length}/1000 caracteres</small>
        </label>

        <label className="field">
          <span>Categoría</span>
          <select name="categoria" value={form.categoria} onChange={updateField}>
            <option>Red</option><option>Hardware</option><option>Software</option>
          </select>
        </label>

        <label className="field">
          <span>Prioridad</span>
          <select name="prioridad" value={form.prioridad} onChange={updateField}>
            <option>Alta</option><option>Media</option><option>Baja</option>
          </select>
        </label>

        <label className="field">
          <span>Estado inicial</span>
          <select name="estado" value={form.estado} onChange={updateField}>
            <option>Abierto</option><option>En Progreso</option><option>Cerrado</option>
          </select>
        </label>

        {validation && <p className="form-error full-field" role="alert">{validation}</p>}

        <div className="form-actions full-field">
          <button className="secondary-button" type="button" onClick={onCancel}>Cancelar</button>
          <button className="primary-button" type="submit" disabled={saving}>{saving ? 'Guardando...' : 'Guardar ticket'}</button>
        </div>
      </form>
    </section>
  );
}
