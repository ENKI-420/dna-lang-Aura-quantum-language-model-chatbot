import { Suspense } from "react"
import { OrganismsDashboard } from "@/components/organisms-dashboard"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "NQRE Organisms | DNA-Lang",
  description: "Manage self-evolving quantum computing organisms",
}

export default function NQREOrganismsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            NQRE Organism Laboratory
          </h1>
          <p className="text-muted-foreground text-lg">
            Create and manage autopoietic quantum computing organisms with SENSE-ACT-EVOLVE loops
          </p>
        </div>

        <Suspense fallback={<Skeleton className="h-[600px]" />}>
          <OrganismsDashboard />
        </Suspense>
      </div>
    </div>
  )
}
