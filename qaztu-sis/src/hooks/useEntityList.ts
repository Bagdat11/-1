import { useEffect, useState } from 'react'
import { getList } from '../services/mockApi'
import type { EntityType } from '../types'

export function useEntityList<T extends { id: string }>(entity: EntityType) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    void getList<T>(entity).then((rows) => {
      if (!cancelled) {
        setData(rows)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [entity])

  return { data, loading }
}
