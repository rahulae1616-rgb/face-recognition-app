import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Recognize from './pages/Recognize.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Layout from './components/Layout.jsx';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/recognize" element={<Recognize />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
