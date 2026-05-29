import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import { DataTable } from '../../components/ui/DataTable'
import { PageHeader } from '../../components/ui/PageHeader'
import { useEntityList } from '../../hooks/useEntityList'
import type { ScheduleItem } from '../../types'

export function SchedulePage() {
  const { t } = useTranslation()
  const { data, loading } = useEntityList<ScheduleItem>('schedule')
  const columns = [
    { key: 'day', header: 'Day' },
    { key: 'time', header: 'Time' },
    { key: 'subject', header: 'Subject' },
    { key: 'room', header: 'Room' },
    { key: 'group', header: 'Group' },
  ]
  return (
    <div>
      <PageHeader title={t('pages.schedule')} action={<button type="button" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"><Plus className="h-4 w-4" />{t('common.add')}</button>} />
      {!loading && <DataTable columns={columns} data={data} searchKeys={['subject', 'group', 'day']} />}
    </div>
  )
}
