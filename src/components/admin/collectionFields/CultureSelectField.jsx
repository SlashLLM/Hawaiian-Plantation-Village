import React, { useEffect, useState } from 'react';

const ADD_NEW_VALUE = '__add_new__';

export default function CultureSelectField({ value, options, onChange }) {
  const [addingNew, setAddingNew] = useState(false);
  const [draft, setDraft] = useState('');

  const knownValues = options.map((option) => option.toLowerCase());
  const isKnown = value && knownValues.includes(value.toLowerCase());
  const selectValue = addingNew ? ADD_NEW_VALUE : (isKnown ? value : (value ? ADD_NEW_VALUE : ''));

  useEffect(() => {
    if (value && !knownValues.includes(value.toLowerCase())) {
      setAddingNew(true);
      setDraft(value);
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps -- sync custom value into add mode

  function handleSelectChange(e) {
    const next = e.target.value;
    if (next === ADD_NEW_VALUE) {
      setAddingNew(true);
      setDraft(value && !knownValues.includes(value.toLowerCase()) ? value : '');
      return;
    }
    setAddingNew(false);
    setDraft('');
    onChange?.(next);
  }

  function handleAdd() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    setAddingNew(false);
    setDraft('');
    onChange?.(trimmed);
  }

  return (
    <div className="admin-form-field">
      <label className="admin-form-label">Culture</label>
      <select
        className="admin-form-select"
        aria-label="Culture"
        value={selectValue}
        onChange={handleSelectChange}
      >
        <option value="">Select culture…</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
        <option value={ADD_NEW_VALUE}>Add new culture…</option>
      </select>
      {addingNew && (
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <input
            className="admin-form-input"
            aria-label="New culture name"
            placeholder="e.g. Vietnamese"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
          <button type="button" className="btn-secondary" onClick={handleAdd} disabled={!draft.trim()}>
            Add
          </button>
        </div>
      )}
    </div>
  );
}
