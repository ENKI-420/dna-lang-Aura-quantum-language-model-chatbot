"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface EvolutionTelemetryChartProps {
  poolId: string
  type: "vqe" | "grover"
}

export function EvolutionTelemetryChart({ poolId, type }: EvolutionTelemetryChartProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const response = await fetch(`/api/dna-lang/evolution?poolId=${poolId}&type=${type}`)
        const telemetry = await response.json()
        setData(telemetry)
      } catch (error) {
        console.error("[v0] Telemetry fetch error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTelemetry()
    const interval = setInterval(fetchTelemetry, 5000)
    return () => clearInterval(interval)
  }, [poolId, type])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Evolution Telemetry</CardTitle>
          <CardDescription>Loading historical data...</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading chart...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolution Telemetry</CardTitle>
        <CardDescription>
          {type === "vqe" ? "Energy error and circuit depth over generations" : "Fitness metrics over generations"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="generation" label={{ value: "Generation", position: "insideBottom", offset: -5 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            {type === "vqe" ? (
              <>
                <Line
                  type="monotone"
                  dataKey="min_energy_error"
                  stroke="#3b82f6"
                  name="Min Energy Error"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="avg_energy_error"
                  stroke="#8b5cf6"
                  name="Avg Energy Error"
                  strokeWidth={2}
                />
                <Line type="monotone" dataKey="circuit_depth" stroke="#10b981" name="Circuit Depth" strokeWidth={2} />
              </>
            ) : (
              <>
                <Line type="monotone" dataKey="max_fitness" stroke="#10b981" name="Max Fitness" strokeWidth={2} />
                <Line type="monotone" dataKey="avg_fitness" stroke="#3b82f6" name="Avg Fitness" strokeWidth={2} />
                <Line type="monotone" dataKey="iterations" stroke="#f59e0b" name="Iterations" strokeWidth={2} />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
