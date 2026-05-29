import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LogOut, X } from 'lucide-react'
import { navItems } from '../../config/navigation'
import { useAuth } from '../../context/AuthContext'

interface AdminSidebarProps {
  open: boolean
  onClose: () => void
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const { t } = useTranslation()
  const { logout } = useAuth()

  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-label="Close menu"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-lg font-bold">
              Q
            </div>
            <span className="text-lg font-bold">{t('brand.name')}</span>
          </div>
          <button type="button" className="lg:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? 'bg-white/15 text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {t(item.labelKey)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            {t('nav.logout')}
          </button>
        </div>
      </aside>
    </>
  )
}
