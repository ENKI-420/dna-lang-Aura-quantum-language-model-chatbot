"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

interface SystemHealth {
  status: string
  lambda_phi: number
  version: string
  features: string[]
}

export function SystemStatus() {
  const [health, setHealth] = useState<SystemHealth | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await fetch("/api/health")
        if (!response.ok) throw new Error("Runtime unavailable")
        const data = await response.json()
        setHealth(data)
        setError(null)
      } catch (err) {
        setError("ΛΦ Runtime offline - using simulation mode")
        setHealth({
          status: "simulation",
          lambda_phi: 2.176435e-8,
          version: "4.0-transcendent",
          features: ["simulation_mode", "local_compute"],
        })
      } finally {
        setLoading(false)
      }
    }

    fetchHealth()
    const interval = setInterval(fetchHealth, 10000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Connecting to ΛΦ Runtime...</span>
        </div>
      </Card>
    )
  }

  const isOnline = health?.status === "operational"

  return (
    <Card className="p-6 bg-gradient-to-r from-card to-card/50">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3">
            {isOnline ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : (
              <AlertCircle className="h-6 w-6 text-yellow-500" />
            )}
            <div>
              <h2 className="text-lg font-semibold">ΛΦ Runtime {isOnline ? "Online" : "Simulation Mode"}</h2>
              <p className="text-sm text-muted-foreground">
                Universal Memory Constant: {health?.lambda_phi.toExponential(6)}
              </p>
            </div>
          </div>

          {error && (
            <div className="text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {health?.features.map((feature) => (
              <Badge key={feature} variant="secondary" className="text-xs">
                {feature.replace(/_/g, " ")}
              </Badge>
            ))}
          </div>
        </div>

        <Badge variant={isOnline ? "default" : "outline"} className="ml-4">
          v{health?.version}
        </Badge>
      </div>
    </Card>
  )
}
