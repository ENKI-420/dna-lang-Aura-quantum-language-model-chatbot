import { Suspense } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { SystemStatus } from "@/components/system-status"
import { QuantumOrganisms } from "@/components/quantum-organisms"
import { MetricsOverview } from "@/components/metrics-overview"
import { EntanglementNetwork } from "@/components/entanglement-network"
import { MetaCompilerStatus } from "@/components/meta-compiler-status"
import { ActivityFeed } from "@/components/activity-feed"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Dna, Zap, Activity, Sparkles, Rocket } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* System Status Banner */}
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <SystemStatus />
        </Suspense>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/quantum-chatbot" className="group">
            <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border-purple-200 dark:border-purple-900">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <CardTitle>Quantum AI Chatbot</CardTitle>
                    <CardDescription>QAAS Platform</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Advanced quantum-enhanced conversational AI with DNA-Lang organism integration
                </p>
                <div className="flex items-center text-sm text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                  Launch Chatbot <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/deployment-strategy" className="group">
            <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border-cyan-200 dark:border-cyan-900">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
                    <Rocket className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <CardTitle>Deployment Strategy</CardTitle>
                    <CardDescription>Production Ready</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive DNA-Lang deployment for quantum-native web applications
                </p>
                <div className="flex items-center text-sm text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
                  View Strategy <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/quantum-evolution" className="group">
            <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border-green-200 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle>Quantum Evolution</CardTitle>
                    <CardDescription>VQE & Grover algorithms</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Run evolutionary quantum computing experiments with real-time telemetry
                </p>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400 group-hover:translate-x-1 transition-transform">
                  Open Lab <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/nqre-organisms" className="group">
            <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border-orange-200 dark:border-orange-900">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <Dna className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <CardTitle>NQRE Organisms</CardTitle>
                    <CardDescription>Self-evolving systems</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage autopoietic quantum organisms with SENSE-ACT-EVOLVE loops
                </p>
                <div className="flex items-center text-sm text-orange-600 dark:text-orange-400 group-hover:translate-x-1 transition-transform">
                  Manage Organisms <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/block-explorer" className="group">
            <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border-blue-200 dark:border-blue-900">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle>Block Explorer</CardTitle>
                    <CardDescription>HSL quantum blocks</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore quantum gravity metrics and IPFS-stored block data
                </p>
                <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  Explore Blocks <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Metrics Grid */}
        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <MetricsOverview />
        </Suspense>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Organisms */}
          <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <QuantumOrganisms />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <EntanglementNetwork />
            </Suspense>
          </div>

          {/* Right Column - Status & Activity */}
          <div className="space-y-6">
            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <MetaCompilerStatus />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <ActivityFeed />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
