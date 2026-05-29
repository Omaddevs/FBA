import { Routes, Route, Navigate } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, Megaphone, GraduationCap, ShieldCheck, UserCog } from 'lucide-react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { canRole, usePerms } from '../../data/rolesStore';
import StaffDashboard from './StaffDashboard';
import HR from './HR';
import SSM from './SSM';
import Sales from './Sales';
import Tutor from './Tutor';
import SMM from './SMM';
import Permissions from './Permissions';
import Teachers from './Teachers';
import { NotificationsList, NotificationDetail } from '../Notifications';
import './staff.css';

export default function StaffApp() {
  const { session } = useAuth();
  const role = session.role;
  usePerms(); // ruxsat o'zgarsa navigatsiya yangilansin

  const nav = [{ to: '/staff', end: true, label: 'Boshqaruv', icon: LayoutDashboard }];
  if (canRole(role, 'attendance.view_all') || canRole(role, 'students.view_all')) nav.push({ to: '/staff/ssm', label: 'SSM', icon: Users });
  if (canRole(role, 'attendance.mark') || canRole(role, 'grades.view')) nav.push({ to: '/staff/tutor', label: 'O\'qituvchi', icon: GraduationCap });
  if (canRole(role, 'students.add') || canRole(role, 'messages.broadcast')) nav.push({ to: '/staff/sales', label: 'Sales', icon: Briefcase });
  if (canRole(role, 'news.publish')) nav.push({ to: '/staff/smm', label: 'SMM', icon: Megaphone });
  if (canRole(role, 'hr.dashboard')) nav.push({ to: '/staff/hr', label: 'HR', icon: Briefcase });
  if (canRole(role, 'staff.manage')) nav.push({ to: '/staff/teachers', label: 'O\'qituvchilar', icon: UserCog });
  if (canRole(role, 'roles.create') || canRole(role, 'staff.manage')) nav.push({ to: '/staff/permissions', label: 'Ruxsatlar', icon: ShieldCheck });

  return (
    <Layout navItems={nav} title="Hodim paneli">
      <Routes>
        <Route index element={<StaffDashboard />} />
        <Route path="ssm" element={<SSM />} />
        <Route path="tutor" element={<Tutor />} />
        <Route path="sales" element={<Sales />} />
        <Route path="smm/*" element={<SMM />} />
        <Route path="hr/*" element={<HR />} />
        <Route path="permissions" element={<Permissions />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="notifications" element={<NotificationsList />} />
        <Route path="notifications/:id" element={<NotificationDetail />} />
        <Route path="*" element={<Navigate to="/staff" replace />} />
      </Routes>
    </Layout>
  );
}
