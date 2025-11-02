"use client"

import { Card } from "@/components/ui/card"
import { Network } from "lucide-react"
import { useEntanglement } from "@/hooks/use-entanglement"

export function EntanglementNetwork() {
  const { bonds } = useEntanglement()

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Network className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Entanglement Network</h2>
      </div>

      <div className="relative h-64 bg-muted/20 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <Network className="h-12 w-12 text-muted-foreground mx-auto animate-pulse" />
            <p className="text-sm text-muted-foreground">{bonds.length} active entanglement bonds</p>
            <p className="text-xs text-muted-foreground">Network visualization rendering...</p>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {bonds.slice(0, 5).map((bond, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm p-2 rounded bg-muted/30">
            <span className="font-mono text-xs">
              {bond.agent1} ↔ {bond.agent2}
            </span>
            <span className="text-muted-foreground">Strength: {bond.strength.toFixed(3)}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
