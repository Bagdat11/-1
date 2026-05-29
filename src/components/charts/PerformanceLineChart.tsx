import { useTranslation } from 'react-i18next'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { performanceData } from '../../data/mock/dashboard'

export function PerformanceLineChart() {
  const { t } = useTranslation()

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={performanceData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
        <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" domain={[60, 100]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="gpa"
          name={t('dashboard.gpaAvg')}
          stroke="#1a2b4b"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="passRate"
          name={t('dashboard.passRate')}
          stroke="#60a5fa"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
