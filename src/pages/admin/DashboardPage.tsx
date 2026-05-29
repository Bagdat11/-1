import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  BarChart3,
  BookOpen,
  Building2,
  GraduationCap,
  Megaphone,
  Settings,
  UserCircle,
  UserPlus,
  Users,
} from 'lucide-react'
import { announcementsData } from '../../data/mock/announcements'
import { recentActivity, statCards } from '../../data/mock/dashboard'
import { FacultyDonutChart } from '../../components/charts/FacultyDonutChart'
import { PerformanceLineChart } from '../../components/charts/PerformanceLineChart'
import { Card } from '../../components/ui/Card'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'graduation-cap': GraduationCap,
  users: Users,
  building: Building2,
  'book-open': BookOpen,
  'user-circle': UserCircle,
}

export function DashboardPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const quickActions = [
    { label: t('dashboard.addStudent'), icon: UserPlus, path: '/admin/students', color: 'bg-blue-100 text-blue-600' },
    { label: t('dashboard.addTeacher'), icon: Users, path: '/admin/teachers', color: 'bg-green-100 text-green-600' },
    { label: t('dashboard.newCourse'), icon: BookOpen, path: '/admin/subjects', color: 'bg-purple-100 text-purple-600' },
    { label: t('dashboard.postAnnouncement'), icon: Megaphone, path: '/admin/announcements', color: 'bg-teal-100 text-teal-600' },
    { label: t('dashboard.generateReport'), icon: BarChart3, path: '/admin/reports', color: 'bg-orange-100 text-orange-600' },
    { label: t('dashboard.systemSettings'), icon: Settings, path: '/admin/settings', color: 'bg-gray-100 text-gray-600' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {statCards.map((stat) => {
          const Icon = iconMap[stat.icon] ?? Users
          return (
            <Card key={stat.key} className="!p-4">
              <div className="flex items-start justify-between">
                <div className={`rounded-full p-2.5 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                {stat.change !== 0 && (
                  <span
                    className={`text-xs font-semibold ${
                      stat.change > 0 ? 'text-green-600' : 'text-gray-400'
                    }`}
                  >
                    {stat.change > 0 ? '+' : ''}
                    {stat.change}%
                  </span>
                )}
                {stat.change === 0 && <span className="text-xs font-semibold text-gray-400">0%</span>}
              </div>
              <p className="mt-3 text-2xl font-bold text-gray-900">
                {stat.value.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">{t(stat.labelKey)}</p>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">{t('dashboard.performance')}</h3>
          <PerformanceLineChart />
        </Card>
        <Card>
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            {t('dashboard.facultyDistribution')}
          </h3>
          <FacultyDonutChart />
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.latestAnnouncements')}</h3>
            <Link to="/admin/announcements" className="text-sm font-medium text-primary hover:underline">
              {t('dashboard.viewAll')}
            </Link>
          </div>
          <ul className="space-y-4">
            {announcementsData.slice(0, 4).map((a) => (
              <li key={a.id} className="border-b border-gray-50 pb-3 last:border-0">
                <p className="font-medium text-gray-900">{a.title}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {a.date} · {a.category}
                </p>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.recentActivity')}</h3>
            <button type="button" className="text-sm font-medium text-primary hover:underline">
              {t('dashboard.viewAll')}
            </button>
          </div>
          <ul className="space-y-4">
            {recentActivity.map((item) => (
              <li key={item.id} className="flex gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${item.color}`}
                >
                  {item.initials}
                </div>
                <div>
                  <p className="text-sm text-gray-700">{item.text}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h3 className="mb-4 text-lg font-semibold text-gray-900">{t('dashboard.quickActions')}</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 p-4 text-center transition hover:border-primary/30 hover:bg-gray-50"
              >
                <div className={`rounded-full p-2 ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
