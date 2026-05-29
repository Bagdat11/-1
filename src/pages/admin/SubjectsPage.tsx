import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import { DataTable } from '../../components/ui/DataTable'
import { PageHeader } from '../../components/ui/PageHeader'
import { useEntityList } from '../../hooks/useEntityList'
import type { Subject } from '../../types'

export function SubjectsPage() {
  const { t } = useTranslation()
  const { data, loading } = useEntityList<Subject>('subjects')
  const columns = [
    { key: 'name', header: 'Subject' },
    { key: 'credits', header: 'Credits' },
    { key: 'semester', header: 'Semester' },
    { key: 'faculty', header: 'Faculty' },
  ]
  return (
    <div>
      <PageHeader title={t('pages.subjects')} action={<button type="button" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"><Plus className="h-4 w-4" />{t('common.add')}</button>} />
      {!loading && <DataTable columns={columns} data={data} searchKeys={['name', 'faculty']} />}
    </div>
  )
}
