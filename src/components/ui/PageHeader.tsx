import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  action?: ReactNode
}

export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      {action}
    </div>
  )
}
