export type EntityType =
  | 'users'
  | 'students'
  | 'teachers'
  | 'faculties'
  | 'specialties'
  | 'subjects'
  | 'schedule'
  | 'calendar'
  | 'announcements'

export interface User {
  id: string
  name: string
  role: string
  email: string
  status: 'active' | 'inactive'
}

export interface Student {
  id: string
  name: string
  iin: string
  faculty: string
  group: string
  gpa: number
}

export interface Teacher {
  id: string
  name: string
  department: string
  subjectsCount: number
  email: string
}

export interface Faculty {
  id: string
  name: string
  dean: string
  studentCount: number
}

export interface Specialty {
  id: string
  name: string
  faculty: string
  code: string
  duration: number
}

export interface Subject {
  id: string
  name: string
  credits: number
  semester: number
  faculty: string
}

export interface ScheduleItem {
  id: string
  day: string
  time: string
  subject: string
  room: string
  group: string
}

export interface CalendarEvent {
  id: string
  event: string
  date: string
  type: string
}

export interface Announcement {
  id: string
  title: string
  date: string
  category: string
}

export interface AuthUser {
  id: string
  name: string
  username: string
  role: string
}

export interface StatCard {
  key: string
  labelKey: string
  value: number
  change: number
  icon: string
  color: string
}

export interface PerformancePoint {
  month: string
  gpa: number
  passRate: number
}

export interface FacultySlice {
  name: string
  value: number
  color: string
}

export interface ActivityItem {
  id: string
  initials: string
  color: string
  text: string
  time: string
}
