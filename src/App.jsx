import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import StudentApp from './pages/student/StudentApp';
import StaffApp from './pages/staff/StaffApp';

export default function App() {
  const { session } = useAuth();

  if (!session) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (session.role === 'student') {
    return (
      <Routes>
        <Route path="/app/*" element={<StudentApp />} />
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/staff/*" element={<StaffApp />} />
      <Route path="*" element={<Navigate to="/staff" replace />} />
    </Routes>
  );
}
