import { Suspense } from "react"
import { EvolutionDashboard } from "@/components/evolution-dashboard"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Quantum Evolution | DNA-Lang",
  description: "Monitor and control quantum algorithm evolution experiments",
}

export default function QuantumEvolutionPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Quantum Evolution Laboratory
          </h1>
          <p className="text-muted-foreground text-lg">
            Run and monitor evolutionary quantum computing experiments using VQE and Grover algorithms
          </p>
        </div>

        <Suspense fallback={<DashboardSkeleton />}>
          <EvolutionDashboard />
        </Suspense>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
      </div>
      <Skeleton className="h-[500px]" />
    </div>
  )
}
