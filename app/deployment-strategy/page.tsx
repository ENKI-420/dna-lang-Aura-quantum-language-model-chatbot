import { DeploymentStrategyDashboard } from "@/components/deployment-strategy-dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Deployment Strategy | DNA-Lang",
  description: "Comprehensive DNA-Lang deployment strategy for quantum-native web applications",
}

export default function DeploymentStrategyPage() {
  return <DeploymentStrategyDashboard />
}
