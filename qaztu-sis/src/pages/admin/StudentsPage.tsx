import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import { DataTable } from '../../components/ui/DataTable'
import { PageHeader } from '../../components/ui/PageHeader'
import { useEntityList } from '../../hooks/useEntityList'
import type { Student } from '../../types'

export function StudentsPage() {
  const { t } = useTranslation()
  const { data, loading } = useEntityList<Student>('students')
  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'iin', header: 'IIN' },
    { key: 'faculty', header: 'Faculty' },
    { key: 'group', header: 'Group' },
    { key: 'gpa', header: 'GPA' },
  ]
  return (
    <div>
      <PageHeader title={t('pages.students')} action={<button type="button" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"><Plus className="h-4 w-4" />{t('common.add')}</button>} />
      {!loading && <DataTable columns={columns} data={data} searchKeys={['name', 'iin', 'faculty', 'group']} />}
    </div>
  )
}
