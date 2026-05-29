import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import { DataTable } from '../../components/ui/DataTable'
import { PageHeader } from '../../components/ui/PageHeader'
import { useEntityList } from '../../hooks/useEntityList'
import type { Faculty } from '../../types'

export function FacultiesPage() {
  const { t } = useTranslation()
  const { data, loading } = useEntityList<Faculty>('faculties')
  const columns = [
    { key: 'name', header: 'Faculty' },
    { key: 'dean', header: 'Dean' },
    { key: 'studentCount', header: 'Students' },
  ]
  return (
    <div>
      <PageHeader title={t('pages.faculties')} action={<button type="button" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"><Plus className="h-4 w-4" />{t('common.add')}</button>} />
      {!loading && <DataTable columns={columns} data={data} searchKeys={['name', 'dean']} />}
    </div>
  )
}
