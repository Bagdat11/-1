import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AdminHeader } from './AdminHeader'
import { AdminSidebar } from './AdminSidebar'

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col lg:min-w-0">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
