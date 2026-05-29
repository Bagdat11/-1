import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '../../components/ui/Card'
import { PageHeader } from '../../components/ui/PageHeader'

const tabs = ['general', 'notifications', 'security'] as const

export function SettingsPage() {
  const { t } = useTranslation()
  const [active, setActive] = useState<(typeof tabs)[number]>('general')

  return (
    <div>
      <PageHeader title={t('pages.settings')} />
      <div className="mb-6 flex gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`border-b-2 px-4 py-2 text-sm font-medium transition ${
              active === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t(`settings.${tab}`)}
          </button>
        ))}
      </div>
      <Card className="max-w-xl">
        {active === 'general' && (
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">{t('settings.siteName')}</span>
              <input
                type="text"
                defaultValue="QazTU"
                className="mt-1 w-full rounded-lg border border-gray-200 bg-input-bg px-3 py-2 text-sm"
              />
            </label>
          </div>
        )}
        {active === 'notifications' && (
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded text-primary" />
            <span className="text-sm text-gray-700">{t('settings.emailNotifications')}</span>
          </label>
        )}
        {active === 'security' && (
          <label className="flex items-center gap-3">
            <input type="checkbox" className="h-4 w-4 rounded text-primary" />
            <span className="text-sm text-gray-700">{t('settings.twoFactor')}</span>
          </label>
        )}
        <button
          type="button"
          className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {t('common.save')}
        </button>
      </Card>
    </div>
  )
}
