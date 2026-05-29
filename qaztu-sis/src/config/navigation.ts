import {
  BarChart3,
  BookOpen,
  Building2,
  Calendar,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  Settings,
  Users,
  UserCircle,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  path: string
  labelKey: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { path: '/admin/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
  { path: '/admin/users', labelKey: 'nav.users', icon: Users },
  { path: '/admin/students', labelKey: 'nav.students', icon: GraduationCap },
  { path: '/admin/teachers', labelKey: 'nav.teachers', icon: UserCircle },
  { path: '/admin/faculties', labelKey: 'nav.faculties', icon: Building2 },
  { path: '/admin/specialties', labelKey: 'nav.specialties', icon: BookOpen },
  { path: '/admin/subjects', labelKey: 'nav.subjects', icon: BookOpen },
  { path: '/admin/schedule', labelKey: 'nav.schedule', icon: Calendar },
  { path: '/admin/academic-calendar', labelKey: 'nav.academicCalendar', icon: CalendarDays },
  { path: '/admin/announcements', labelKey: 'nav.announcements', icon: Megaphone },
  { path: '/admin/reports', labelKey: 'nav.reports', icon: BarChart3 },
  { path: '/admin/settings', labelKey: 'nav.settings', icon: Settings },
]

export const pageTitleKeys: Record<string, string> = {
  '/admin/dashboard': 'dashboard.title',
  '/admin/users': 'pages.users',
  '/admin/students': 'pages.students',
  '/admin/teachers': 'pages.teachers',
  '/admin/faculties': 'pages.faculties',
  '/admin/specialties': 'pages.specialties',
  '/admin/subjects': 'pages.subjects',
  '/admin/schedule': 'pages.schedule',
  '/admin/academic-calendar': 'pages.academicCalendar',
  '/admin/announcements': 'pages.announcements',
  '/admin/reports': 'pages.reports',
  '/admin/settings': 'pages.settings',
}
