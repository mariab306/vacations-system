import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { Vacations } from './pages/Vacations';
import { Ai } from './pages/Ai';
import { Mcp } from './pages/Mcp';
import { Admin } from './pages/Admin';
import { AddVacation } from './pages/AddVacation';
import { EditVacation } from './pages/EditVacation';
import { Reports } from './pages/Reports';
import { About } from './pages/About';

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/about" element={<About />} />

        <Route path="/vacations" element={<ProtectedRoute><Vacations /></ProtectedRoute>} />
        <Route path="/ai" element={<ProtectedRoute><Ai /></ProtectedRoute>} />
        <Route path="/mcp" element={<ProtectedRoute><Mcp /></ProtectedRoute>} />

        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/admin/add" element={<AdminRoute><AddVacation /></AdminRoute>} />
        <Route path="/admin/edit/:id" element={<AdminRoute><EditVacation /></AdminRoute>} />
        <Route path="/admin/reports" element={<AdminRoute><Reports /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;