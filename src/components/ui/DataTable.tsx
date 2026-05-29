import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'

export interface Column<T> {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
}

interface DataTableProps<T extends object> {
  columns: Column<T>[]
  data: T[]
  searchKeys?: (keyof T)[]
  pageSize?: number
}

export function DataTable<T extends object>({
  columns,
  data,
  searchKeys,
  pageSize = 5,
}: DataTableProps<T>) {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortAsc, setSortAsc] = useState(true)

  const filtered = useMemo(() => {
    let rows = [...data]
    if (search.trim() && searchKeys?.length) {
      const q = search.toLowerCase()
      rows = rows.filter((row) =>
        searchKeys.some((k) => String(row[k] ?? '').toLowerCase().includes(q)),
      )
    }
    if (sortKey) {
      rows.sort((a, b) => {
        const av = String((a as Record<string, unknown>)[sortKey] ?? '')
        const bv = String((b as Record<string, unknown>)[sortKey] ?? '')
        return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av)
      })
    }
    return rows
  }, [data, search, searchKeys, sortKey, sortAsc])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const from = filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const to = Math.min(currentPage * pageSize, filtered.length)

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortAsc(!sortAsc)
    else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  return (
    <div className="rounded-xl bg-white shadow-sm">
      <div className="border-b border-gray-100 p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            placeholder={t('common.search')}
            className="w-full rounded-lg border border-gray-200 bg-input-bg py-2 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-500">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="cursor-pointer px-4 py-3 font-semibold hover:text-gray-700"
                  onClick={() => toggleSort(col.key)}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                  {t('common.noResults')}
                </td>
              </tr>
            ) : (
              paged.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/80">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-gray-700">
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-3 text-sm text-gray-500">
        <span>{t('common.showing', { from, to, total: filtered.length })}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            {t('common.previous')}
          </button>
          <span className="font-medium text-gray-700">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 disabled:opacity-40"
          >
            {t('common.next')}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
