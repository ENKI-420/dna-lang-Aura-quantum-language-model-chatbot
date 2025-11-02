"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { EvolutionStatus, FitnessTelemetry } from "@/lib/dna-lang-sdk"

interface GroverEvolutionPanelProps {
  status: EvolutionStatus | null
}

export function GroverEvolutionPanel({ status }: GroverEvolutionPanelProps) {
  if (!status) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No active Grover evolution. Click "Start Evolution" to begin.</p>
      </div>
    )
  }

  const telemetry = status.telemetry as FitnessTelemetry

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Evolution Status</h3>
          <p className="text-sm text-muted-foreground">
            {telemetry.generation ? `Generation ${telemetry.generation}` : "Running"}
          </p>
        </div>
        <Badge variant={status.status === "COMPLETED" ? "default" : "secondary"}>{status.status}</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Max Fitness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{telemetry.max_fitness.toFixed(4)}</div>
            <Progress value={telemetry.max_fitness * 100} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Avg Fitness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{telemetry.avg_fitness.toFixed(4)}</div>
            <Progress value={telemetry.avg_fitness * 100} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Iterations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{telemetry.iterations}</div>
            <p className="text-xs text-muted-foreground mt-1">Grover iterations</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Oracle Phase</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold font-mono">{telemetry.oracle_phase.toFixed(6)}</span>
            <Badge variant="outline">radians</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Optimized phase angle for quantum oracle</p>
        </CardContent>
      </Card>
    </div>
  )
}
