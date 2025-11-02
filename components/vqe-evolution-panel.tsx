"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { EvolutionStatus, VQETelemetry } from "@/lib/dna-lang-sdk"

interface VQEEvolutionPanelProps {
  status: EvolutionStatus | null
}

export function VQEEvolutionPanel({ status }: VQEEvolutionPanelProps) {
  if (!status) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No active VQE evolution. Click "Start Evolution" to begin.</p>
      </div>
    )
  }

  const telemetry = status.telemetry as VQETelemetry

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Evolution Status</h3>
          <p className="text-sm text-muted-foreground">Generation {telemetry.generation}</p>
        </div>
        <Badge variant={status.status === "COMPLETED" ? "default" : "secondary"}>{status.status}</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Energy Error</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{telemetry.min_energy_error.toFixed(6)}</div>
            <p className="text-xs text-muted-foreground mt-1">Avg: {telemetry.avg_energy_error.toFixed(6)}</p>
            <Progress value={(1 - telemetry.min_energy_error) * 100} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Circuit Complexity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{telemetry.circuit_depth}</div>
            <p className="text-xs text-muted-foreground mt-1">Gates in circuit depth</p>
            <Progress value={(telemetry.circuit_depth / 20) * 100} className="mt-3" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Rotation Angles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {telemetry.rotation_angles.map((angle, idx) => (
              <Badge key={idx} variant="outline">
                θ{idx}: {angle.toFixed(4)}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {telemetry.objective_metrics && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Multi-Objective Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Cost:</span>
              <span className="font-mono">{telemetry.objective_metrics.total_cost.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Runtime Penalty:</span>
              <span className="font-mono">{telemetry.objective_metrics.runtime_penalty.toFixed(4)}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
