"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Square, Zap, Activity, Plus } from "lucide-react"
import type { NQREOrganism } from "@/lib/dna-lang-sdk"

export function OrganismsDashboard() {
  const [organisms, setOrganisms] = useState<NQREOrganism[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrganisms()
  }, [])

  const fetchOrganisms = async () => {
    try {
      const response = await fetch("/api/dna-lang/organisms")
      const data = await response.json()
      setOrganisms(data)
    } catch (error) {
      console.error("[v0] Fetch organisms error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleOrganismAction = async (id: string, action: string) => {
    try {
      await fetch(`/api/dna-lang/organisms/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })
      fetchOrganisms()
    } catch (error) {
      console.error("[v0] Organism action error:", error)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading organisms...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="grid gap-4 md:grid-cols-3 flex-1 mr-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Organisms</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{organisms.filter((o) => o.status === "running").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Evolving</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{organisms.filter((o) => o.status === "evolving").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Organisms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{organisms.length}</div>
            </CardContent>
          </Card>
        </div>

        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Organism
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {organisms.map((organism) => (
          <Card key={organism.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{organism.name}</CardTitle>
                  <CardDescription>{organism.domain}</CardDescription>
                </div>
                <Badge
                  variant={
                    organism.status === "running" ? "default" : organism.status === "evolving" ? "secondary" : "outline"
                  }
                >
                  {organism.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Genes:</span>
                  <span className="ml-2 font-medium">{organism.dna.genes.length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Circuits:</span>
                  <span className="ml-2 font-medium">{organism.dna.circuits.length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Workflows:</span>
                  <span className="ml-2 font-medium">{organism.dna.workflows.length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Policies:</span>
                  <span className="ml-2 font-medium">{organism.dna.policies.length}</span>
                </div>
              </div>

              <div className="flex gap-2">
                {organism.status === "running" ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-2 bg-transparent"
                    onClick={() => handleOrganismAction(organism.id, "stop")}
                  >
                    <Square className="h-3 w-3" />
                    Stop
                  </Button>
                ) : (
                  <Button size="sm" className="flex-1 gap-2" onClick={() => handleOrganismAction(organism.id, "start")}>
                    <Play className="h-3 w-3" />
                    Start
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="secondary"
                  className="flex-1 gap-2"
                  onClick={() => handleOrganismAction(organism.id, "evolve")}
                >
                  <Zap className="h-3 w-3" />
                  Evolve
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
