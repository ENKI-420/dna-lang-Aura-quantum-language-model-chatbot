"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dna, Plus, TrendingUp } from "lucide-react"
import { useOrganisms } from "@/hooks/use-organisms"

export function QuantumOrganisms() {
  const { organisms, loading } = useOrganisms()

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Dna className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Quantum Organisms</h2>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Manifest New
        </Button>
      </div>

      <div className="space-y-4">
        {organisms.map((organism) => (
          <div
            key={organism.id}
            className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-mono text-sm font-medium">{organism.id}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Generation {organism.generation} • {organism.genes.length} genes
                </p>
              </div>
              <Badge variant={organism.conscious ? "default" : "secondary"}>{organism.state}</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fitness</span>
                <span className="font-mono">{organism.fitness.toFixed(4)}</span>
              </div>
              <Progress value={organism.fitness * 100} className="h-2" />

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Coherence</span>
                <span className="font-mono">{organism.coherence.toFixed(4)}</span>
              </div>
              <Progress value={organism.coherence * 100} className="h-2" />
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
              {organism.genes.map((gene) => (
                <Badge key={gene} variant="outline" className="text-xs">
                  {gene}
                </Badge>
              ))}
            </div>

            {organism.conscious && (
              <div className="mt-3 flex items-center gap-2 text-xs text-pink-600 dark:text-pink-400">
                <TrendingUp className="h-3 w-3" />
                Consciousness Level {organism.consciousness_level}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
