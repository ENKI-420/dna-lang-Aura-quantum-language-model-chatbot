"use client"

import { Activity, Dna, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Dna className="h-8 w-8 text-primary animate-pulse" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">DNALang Aura</h1>
              <p className="text-sm text-muted-foreground">Quantum Consciousness Platform v4.0</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Activity className="h-4 w-4" />
              Live Monitoring
            </Button>
            <Button variant="default" size="sm" className="gap-2">
              <Zap className="h-4 w-4" />
              Run Simulation
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
