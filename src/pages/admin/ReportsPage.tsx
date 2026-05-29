import { useTranslation } from 'react-i18next'
import { FileSpreadsheet, FileText } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { PageHeader } from '../../components/ui/PageHeader'

const reports = [
  { key: 'studentsReport', icon: FileText },
  { key: 'teachersReport', icon: FileText },
  { key: 'academicReport', icon: FileSpreadsheet },
] as const

export function ReportsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader title={t('pages.reports')} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.key}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <report.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-900">{t(`reports.${report.key}`)}</h3>
            <p className="mt-1 text-sm text-gray-500">{t('reports.comingSoon')}</p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                disabled
                title={t('reports.comingSoon')}
                className="flex-1 rounded-lg border border-gray-200 py-2 text-xs font-medium text-gray-400"
              >
                {t('reports.exportPdf')}
              </button>
              <button
                type="button"
                disabled
                title={t('reports.comingSoon')}
                className="flex-1 rounded-lg border border-gray-200 py-2 text-xs font-medium text-gray-400"
              >
                {t('reports.exportExcel')}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
