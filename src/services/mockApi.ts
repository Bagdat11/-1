import { announcementsData } from '../data/mock/announcements'
import { calendarData } from '../data/mock/calendar'
import { facultiesData } from '../data/mock/faculties'
import { scheduleData } from '../data/mock/schedule'
import { specialtiesData } from '../data/mock/specialties'
import { studentsData } from '../data/mock/students'
import { subjectsData } from '../data/mock/subjects'
import { teachersData } from '../data/mock/teachers'
import { usersData } from '../data/mock/users'
import type { EntityType } from '../types'

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

const stores: Record<EntityType, { id: string }[]> = {
  users: [...usersData],
  students: [...studentsData],
  teachers: [...teachersData],
  faculties: [...facultiesData],
  specialties: [...specialtiesData],
  subjects: [...subjectsData],
  schedule: [...scheduleData],
  calendar: [...calendarData],
  announcements: [...announcementsData],
}

export async function getList<T extends { id: string }>(entity: EntityType): Promise<T[]> {
  await delay()
  return [...stores[entity]] as T[]
}

export async function getById<T extends { id: string }>(entity: EntityType, id: string): Promise<T | undefined> {
  await delay()
  return stores[entity].find((item) => item.id === id) as T | undefined
}

export async function create<T extends { id: string }>(entity: EntityType, item: T): Promise<T> {
  await delay()
  stores[entity].unshift(item)
  return item
}

export async function remove(entity: EntityType, id: string): Promise<void> {
  await delay()
  const idx = stores[entity].findIndex((item) => item.id === id)
  if (idx >= 0) stores[entity].splice(idx, 1)
}
