import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { facultyDistribution } from '../../data/mock/dashboard'

export function FacultyDonutChart() {
  return (
    <div className="flex flex-col items-center gap-4 lg:flex-row">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={facultyDistribution}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={2}
            dataKey="value"
          >
            {facultyDistribution.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
      <ul className="space-y-2 text-sm">
        {facultyDistribution.map((item) => (
          <li key={item.name} className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-gray-700">{item.name}</span>
            <span className="font-semibold text-gray-900">{item.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
