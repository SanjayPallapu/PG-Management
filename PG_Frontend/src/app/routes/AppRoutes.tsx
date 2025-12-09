import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { SignupPage } from '@/features/auth/pages/SignupPage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { RoomsPage } from '@/features/rooms/pages/RoomsPage';
import { TenantsPage } from '@/features/tenants/pages/TenantsPage';
import { PaymentsPage } from '@/features/payments/pages/PaymentsPage';
import { ReportsPage } from '@/features/reports/pages/ReportsPage';
import { ProtectedRoute } from './ProtectedRoute';
import { AppLayout } from '@/shared/components/layout/AppLayout';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/tenants" element={<TenantsPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

