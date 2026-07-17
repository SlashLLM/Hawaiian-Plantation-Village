import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

export default function AdminRoute() {
  const { session, isStaff, loading } = useAuth();

  if (loading) {
    return (
      <div className="admin-shell" style={{ padding: '3rem', textAlign: 'center' }}>
        <p>Loading staff session…</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isStaff) {
    return (
      <div className="admin-shell" style={{ padding: '3rem', textAlign: 'center' }}>
        <h2>Access denied</h2>
        <p>Your account does not have staff permissions.</p>
      </div>
    );
  }

  return <Outlet />;
}
