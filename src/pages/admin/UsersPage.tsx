import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import { DataTable } from '../../components/ui/DataTable'
import { PageHeader } from '../../components/ui/PageHeader'
import { useEntityList } from '../../hooks/useEntityList'
import type { User } from '../../types'

export function UsersPage() {
  const { t } = useTranslation()
  const { data, loading } = useEntityList<User>('users')

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
    { key: 'email', header: 'Email' },
    {
      key: 'status',
      header: t('common.status'),
      render: (row: User) => (
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            row.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {row.status === 'active' ? t('common.active') : t('common.inactive')}
        </span>
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        title={t('pages.users')}
        action={
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            {t('common.add')}
          </button>
        }
      />
      {loading ? (
        <div className="rounded-xl bg-white p-8 text-center text-gray-500">Loading...</div>
      ) : (
        <DataTable columns={columns} data={data} searchKeys={['name', 'email', 'role']} />
      )}
    </div>
  )
}
