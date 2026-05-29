import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AdminLayout } from './components/layout/AdminLayout'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { LoginPage } from './pages/auth/LoginPage'
import { DashboardPage } from './pages/admin/DashboardPage'
import { UsersPage } from './pages/admin/UsersPage'
import { StudentsPage } from './pages/admin/StudentsPage'
import { TeachersPage } from './pages/admin/TeachersPage'
import { FacultiesPage } from './pages/admin/FacultiesPage'
import { SpecialtiesPage } from './pages/admin/SpecialtiesPage'
import { SubjectsPage } from './pages/admin/SubjectsPage'
import { SchedulePage } from './pages/admin/SchedulePage'
import { AcademicCalendarPage } from './pages/admin/AcademicCalendarPage'
import { AnnouncementsPage } from './pages/admin/AnnouncementsPage'
import { ReportsPage } from './pages/admin/ReportsPage'
import { SettingsPage } from './pages/admin/SettingsPage'
import { useAuth } from './context/AuthContext'

function RootRedirect() {
  const { isAuthenticated } = useAuth()
  return <Navigate to={isAuthenticated ? '/admin/dashboard' : '/login'} replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="students" element={<StudentsPage />} />
              <Route path="teachers" element={<TeachersPage />} />
              <Route path="faculties" element={<FacultiesPage />} />
              <Route path="specialties" element={<SpecialtiesPage />} />
              <Route path="subjects" element={<SubjectsPage />} />
              <Route path="schedule" element={<SchedulePage />} />
              <Route path="academic-calendar" element={<AcademicCalendarPage />} />
              <Route path="announcements" element={<AnnouncementsPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
