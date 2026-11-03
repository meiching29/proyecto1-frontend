import { useCallback, useEffect, useState } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
  /** true cuando la API respondió 404 (no hay resultados), no es un error real */
  notFound: boolean
  retry: () => void
}

/**
 * Hook genérico para hacer fetch con useEffect + async/await.
 * Maneja los estados de loading, error y "no encontrado".
 */
export function useFetch<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState<boolean>(false)
  const [attempt, setAttempt] = useState<number>(0)

  const retry = useCallback(() => setAttempt((a) => a + 1), [])

  useEffect(() => {
    const controller = new AbortController()

    const load = async () => {
      setLoading(true)
      setError(null)
      setNotFound(false)
      try {
        const res = await fetch(url, { signal: controller.signal })
        if (res.status === 404) {
          setData(null)
          setNotFound(true)
          return
        }
        if (!res.ok) throw new Error(`Error ${res.status}`)
        const json = (await res.json()) as T
        setData(json)
      } catch (err) {
        if ((err as Error).name === 'AbortError') return
        setData(null)
        setError('No se pudo cargar la información.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [url, attempt])

  return { data, loading, error, notFound, retry }
}
