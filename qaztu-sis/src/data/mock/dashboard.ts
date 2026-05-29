import type { ActivityItem, FacultySlice, PerformancePoint, StatCard } from '../../types'

export const statCards: StatCard[] = [
  { key: 'students', labelKey: 'dashboard.totalStudents', value: 12480, change: 8.2, icon: 'graduation-cap', color: 'bg-blue-100 text-blue-600' },
  { key: 'teachers', labelKey: 'dashboard.totalTeachers', value: 784, change: 3.1, icon: 'users', color: 'bg-green-100 text-green-600' },
  { key: 'faculties', labelKey: 'dashboard.totalFaculties', value: 18, change: 0, icon: 'building', color: 'bg-purple-100 text-purple-600' },
  { key: 'subjects', labelKey: 'dashboard.totalSubjects', value: 1230, change: 12, icon: 'book-open', color: 'bg-teal-100 text-teal-600' },
  { key: 'users', labelKey: 'dashboard.totalUsers', value: 14096, change: 5.4, icon: 'user-circle', color: 'bg-orange-100 text-orange-600' },
]

export const performanceData: PerformancePoint[] = [
  { month: 'Sep', gpa: 72, passRate: 68 },
  { month: 'Oct', gpa: 75, passRate: 71 },
  { month: 'Nov', gpa: 78, passRate: 74 },
  { month: 'Dec', gpa: 80, passRate: 78 },
  { month: 'Jan', gpa: 82, passRate: 80 },
  { month: 'Feb', gpa: 84, passRate: 82 },
  { month: 'Mar', gpa: 85, passRate: 84 },
  { month: 'Apr', gpa: 87, passRate: 86 },
]

export const facultyDistribution: FacultySlice[] = [
  { name: 'Engineering', value: 32, color: '#1d4ed8' },
  { name: 'Economics', value: 24, color: '#3b82f6' },
  { name: 'IT & CS', value: 22, color: '#60a5fa' },
  { name: 'Medicine', value: 14, color: '#93c5fd' },
  { name: 'Law', value: 8, color: '#bfdbfe' },
]

export const recentActivity: ActivityItem[] = [
  { id: '1', initials: 'AS', color: 'bg-blue-500', text: 'Aibek Seitkali submitted assignment Calculus II', time: '2 min ago' },
  { id: '2', initials: 'GB', color: 'bg-green-500', text: 'Gulnara Bekturova updated course schedule', time: '15 min ago' },
  { id: '3', initials: 'MD', color: 'bg-purple-500', text: 'Marat Duisenov registered new student', time: '1 hour ago' },
  { id: '4', initials: 'AN', color: 'bg-orange-500', text: 'Aigerim Nurpeisova posted announcement', time: '3 hours ago' },
]
