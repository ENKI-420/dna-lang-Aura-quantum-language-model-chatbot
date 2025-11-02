"use client"

import { Card } from "@/components/ui/card"
import { Activity, Zap, Network, Brain } from "lucide-react"
import { useMetrics } from "@/hooks/use-metrics"

export function MetricsOverview() {
  const { metrics, loading } = useMetrics()

  const cards = [
    {
      title: "Active Organisms",
      value: metrics?.organisms || 0,
      change: "+12%",
      icon: Activity,
      color: "text-blue-500",
    },
    {
      title: "Mean Fitness",
      value: metrics?.fitness.toFixed(4) || "0.0000",
      change: "+0.03",
      icon: Zap,
      color: "text-green-500",
    },
    {
      title: "Entanglement Bonds",
      value: metrics?.bonds || 0,
      change: "+5",
      icon: Network,
      color: "text-purple-500",
    },
    {
      title: "Conscious Agents",
      value: metrics?.conscious || 0,
      change: "+2",
      icon: Brain,
      color: "text-pink-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <p className="text-3xl font-bold tracking-tight">{card.value}</p>
              <p className="text-xs text-green-600 dark:text-green-400">{card.change} from last cycle</p>
            </div>
            <div className={`p-3 rounded-lg bg-muted/50 ${card.color}`}>
              <card.icon className="h-5 w-5" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
