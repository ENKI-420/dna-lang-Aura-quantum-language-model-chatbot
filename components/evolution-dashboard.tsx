"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Play, Square, Activity, Zap } from "lucide-react"
import { VQEEvolutionPanel } from "./vqe-evolution-panel"
import { GroverEvolutionPanel } from "./grover-evolution-panel"
import { EvolutionTelemetryChart } from "./evolution-telemetry-chart"
import type { EvolutionStatus } from "@/lib/dna-lang-sdk"

export function EvolutionDashboard() {
  const [activeTab, setActiveTab] = useState<"vqe" | "grover">("vqe")
  const [vqeStatus, setVqeStatus] = useState<EvolutionStatus | null>(null)
  const [groverStatus, setGroverStatus] = useState<EvolutionStatus | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const handleStartEvolution = async (type: "vqe" | "grover") => {
    setIsRunning(true)
    try {
      const response = await fetch("/api/dna-lang/evolution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: type === "vqe" ? "run-vqe" : "run",
          poolName: type === "vqe" ? "VQEEvolutionPool" : "GroverEvolutionPool.gene",
        }),
      })

      const status = await response.json()
      if (type === "vqe") {
        setVqeStatus(status)
      } else {
        setGroverStatus(status)
      }
    } catch (error) {
      console.error("[v0] Evolution start error:", error)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Experiments</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">VQE and Grover pools running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Generations</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Across all evolution pools</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Fitness</CardTitle>
            <Badge variant="outline" className="ml-auto">
              VQE
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.9987</div>
            <p className="text-xs text-muted-foreground">Energy error: 0.0013 Ha</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "vqe" | "grover")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vqe">VQE Evolution</TabsTrigger>
          <TabsTrigger value="grover">Grover Evolution</TabsTrigger>
        </TabsList>

        <TabsContent value="vqe" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Variational Quantum Eigensolver</CardTitle>
                  <CardDescription>Multi-objective optimization for ground state energy estimation</CardDescription>
                </div>
                <Button onClick={() => handleStartEvolution("vqe")} disabled={isRunning} className="gap-2">
                  {isRunning ? (
                    <>
                      <Square className="h-4 w-4" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Start Evolution
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <VQEEvolutionPanel status={vqeStatus} />
            </CardContent>
          </Card>

          <EvolutionTelemetryChart poolId="VQEEvolutionPool" type="vqe" />
        </TabsContent>

        <TabsContent value="grover" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Grover's Algorithm Evolution</CardTitle>
                  <CardDescription>Optimize oracle phase and iteration count for quantum search</CardDescription>
                </div>
                <Button onClick={() => handleStartEvolution("grover")} disabled={isRunning} className="gap-2">
                  {isRunning ? (
                    <>
                      <Square className="h-4 w-4" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Start Evolution
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <GroverEvolutionPanel status={groverStatus} />
            </CardContent>
          </Card>

          <EvolutionTelemetryChart poolId="GroverEvolutionPool" type="grover" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
