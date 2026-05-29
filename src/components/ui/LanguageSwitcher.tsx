import { useTranslation } from 'react-i18next'
import { setLanguage } from '../../i18n'

const langs = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'kz', label: 'KZ' },
] as const

interface LanguageSwitcherProps {
  variant?: 'segment' | 'dropdown'
}

export function LanguageSwitcher({ variant = 'segment' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation()
  const current = i18n.language?.slice(0, 2) ?? 'en'

  if (variant === 'dropdown') {
    return (
      <select
        value={current}
        onChange={(e) => setLanguage(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        {langs.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    )
  }

  return (
    <div className="inline-flex rounded-lg bg-gray-100 p-1">
      {langs.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLanguage(l.code)}
          className={`rounded-md px-4 py-1.5 text-sm font-semibold transition ${
            current === l.code
              ? 'bg-primary text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
