export default function StatusBadge({ value }) {
  const cls = (value ?? '').toLowerCase().replace(/\s+/g, '_');
  return <span className={`admin-badge ${cls}`}>{value}</span>;
}
