import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import { DataTable } from '../../components/ui/DataTable'
import { PageHeader } from '../../components/ui/PageHeader'
import { useEntityList } from '../../hooks/useEntityList'
import type { CalendarEvent } from '../../types'

export function AcademicCalendarPage() {
  const { t } = useTranslation()
  const { data, loading } = useEntityList<CalendarEvent>('calendar')
  const columns = [
    { key: 'event', header: 'Event' },
    { key: 'date', header: 'Date' },
    { key: 'type', header: 'Type' },
  ]
  return (
    <div>
      <PageHeader title={t('pages.academicCalendar')} action={<button type="button" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"><Plus className="h-4 w-4" />{t('common.add')}</button>} />
      {!loading && <DataTable columns={columns} data={data} searchKeys={['event', 'type']} />}
    </div>
  )
}
