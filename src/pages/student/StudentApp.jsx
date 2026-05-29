import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, BarChart3, BookOpen, Trophy, User } from 'lucide-react';
import Layout from '../../components/Layout';
import StudentHome from './StudentHome';
import Marks from './Marks';
import Lessons from './Lessons';
import Ranking from './Ranking';
import Profile from './Profile';
import { NotificationsList, NotificationDetail } from '../Notifications';
import './student.css';

const nav = [
  { to: '/app', end: true, label: 'Asosiy', icon: Home },
  { to: '/app/marks', label: 'Marks', icon: BarChart3 },
  { to: '/app/lessons', label: 'Lessons', icon: BookOpen },
  { to: '/app/ranking', label: 'Ranking', icon: Trophy },
  { to: '/app/profile', label: 'Profile', icon: User },
];

export default function StudentApp() {
  return (
    <Layout navItems={nav} title="O'quvchi">
      <Routes>
        <Route index element={<StudentHome />} />
        <Route path="marks" element={<Marks />} />
        <Route path="lessons" element={<Lessons />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="profile" element={<Profile />} />
        <Route path="notifications" element={<NotificationsList />} />
        <Route path="notifications/:id" element={<NotificationDetail />} />
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Routes>
    </Layout>
  );
}
