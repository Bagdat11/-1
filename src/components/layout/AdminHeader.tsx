import { Bell, Menu } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { pageTitleKeys } from '../../config/navigation'
import { useAuth } from '../../context/AuthContext'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'

interface AdminHeaderProps {
  onMenuClick: () => void
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const { user } = useAuth()
  const titleKey = pageTitleKeys[pathname] ?? 'dashboard.title'

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 py-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">{t(titleKey)}</h1>
      </div>
      <div className="flex items-center gap-4">
        <LanguageSwitcher variant="dropdown" />
        <button type="button" className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            3
          </span>
        </button>
        <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            {user?.name
              ?.split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2) ?? 'AB'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">{user?.name ?? 'Askar Bekmukhanov'}</p>
            <p className="text-xs text-gray-500">{t('header.role')}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
