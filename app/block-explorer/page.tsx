import { Suspense } from "react"
import { BlockExplorer } from "@/components/block-explorer"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "DNALang HSL Block Explorer | Quantum Gravity Verification",
  description: "Real-time verification and distributed trust via IPFS for DNALang Holo-Synchronic Layer",
}

export default function BlockExplorerPage() {
  return (
    <Suspense fallback={<Skeleton className="h-screen w-full" />}>
      <BlockExplorer />
    </Suspense>
  )
}
