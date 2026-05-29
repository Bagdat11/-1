import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, Lock, Shield, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { LanguageSwitcher } from '../../components/ui/LanguageSwitcher'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80'

export function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ username?: string; password?: string; auth?: string }>({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const next: typeof errors = {}
    if (!username.trim()) next.username = t('login.required')
    if (!password.trim()) next.password = t('login.required')
    setErrors(next)
    if (Object.keys(next).length) return

    setLoading(true)
    const ok = await login(username.trim(), password, remember)
    setLoading(false)
    if (ok) navigate('/admin/dashboard')
    else setErrors({ auth: t('login.invalidCredentials') })
  }

  const showComingSoon = () => {
    setToast(t('login.comingSoon'))
    setTimeout(() => setToast(''), 2500)
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <section
        className="relative flex min-h-[280px] flex-1 flex-col justify-between bg-cover bg-center p-8 text-white lg:min-h-screen"
        style={{ backgroundImage: `linear-gradient(rgba(26,43,75,0.75), rgba(29,78,216,0.6)), url(${HERO_IMAGE})` }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-bold text-primary">
            Q
          </div>
          <div>
            <p className="text-xl font-bold">{t('brand.name')}</p>
            <p className="text-sm text-white/80">{t('brand.tagline')}</p>
          </div>
        </div>
        <div className="my-8 max-w-lg">
          <h1 className="text-3xl font-bold leading-tight lg:text-4xl">{t('login.heroTitle')}</h1>
          <p className="mt-4 text-white/90">{t('login.heroSubtitle')}</p>
        </div>
        <footer className="flex flex-wrap gap-4 text-sm text-white/70">
          <span>{t('login.copyright')}</span>
          <button type="button" className="hover:text-white">
            {t('login.privacy')}
          </button>
          <button type="button" className="hover:text-white">
            {t('login.support')}
          </button>
        </footer>
      </section>

      <section className="flex flex-1 flex-col justify-center bg-white px-6 py-10 sm:px-12 lg:px-16">
        <div className="mb-8 flex justify-end">
          <LanguageSwitcher />
        </div>
        <div className="mx-auto w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900">{t('login.welcome')}</h2>
          <p className="mt-2 text-gray-500">{t('login.subtitle')}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                {t('login.username')}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t('login.usernamePlaceholder')}
                  className={`w-full rounded-xl border bg-input-bg py-3 pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                    errors.username ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
              </div>
              {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                {t('login.password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login.passwordPlaceholder')}
                  className={`w-full rounded-xl border bg-input-bg py-3 pl-11 pr-11 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                    errors.password ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            {errors.auth && <p className="text-sm text-red-500">{errors.auth}</p>}

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                {t('login.remember')}
              </label>
              <button type="button" onClick={showComingSoon} className="text-sm font-medium text-primary hover:underline">
                {t('login.forgot')}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? '...' : t('login.signIn')}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-3 text-gray-500">{t('login.orContinue')}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={showComingSoon}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Shield className="h-5 w-5 text-primary" />
              {t('login.sso')}
            </button>
            <button
              type="button"
              onClick={showComingSoon}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <span className="text-lg font-bold text-teal-600">e</span>
              {t('login.egov')}
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            {t('login.trouble')}{' '}
            <button type="button" onClick={showComingSoon} className="font-medium text-primary hover:underline">
              {t('login.itSupport')}
            </button>
          </p>
        </div>
      </section>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}
