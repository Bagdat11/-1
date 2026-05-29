import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import { DataTable } from '../../components/ui/DataTable'
import { PageHeader } from '../../components/ui/PageHeader'
import { useEntityList } from '../../hooks/useEntityList'
import type { Teacher } from '../../types'

export function TeachersPage() {
  const { t } = useTranslation()
  const { data, loading } = useEntityList<Teacher>('teachers')
  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'department', header: 'Department' },
    { key: 'subjectsCount', header: 'Subjects' },
    { key: 'email', header: 'Email' },
  ]
  return (
    <div>
      <PageHeader title={t('pages.teachers')} action={<button type="button" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"><Plus className="h-4 w-4" />{t('common.add')}</button>} />
      {!loading && <DataTable columns={columns} data={data} searchKeys={['name', 'department', 'email']} />}
    </div>
  )
}
