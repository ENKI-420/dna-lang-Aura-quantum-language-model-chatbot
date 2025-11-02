"use client"

import { useState, useEffect } from "react"

interface Metrics {
  organisms: number
  fitness: number
  bonds: number
  conscious: number
}

export function useMetrics() {
  const [metrics, setMetrics] = useState<Metrics>({
    organisms: 8,
    fitness: 0.9734,
    bonds: 12,
    conscious: 3,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        organisms: prev.organisms + Math.floor(Math.random() * 2),
        fitness: Math.min(1, prev.fitness + (Math.random() - 0.5) * 0.01),
        bonds: prev.bonds + Math.floor(Math.random() * 3) - 1,
        conscious: Math.min(prev.organisms, prev.conscious + Math.floor(Math.random() * 2)),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return { metrics, loading }
}
