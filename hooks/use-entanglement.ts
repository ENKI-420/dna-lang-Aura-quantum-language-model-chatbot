"use client"

import { useState } from "react"

interface Bond {
  agent1: string
  agent2: string
  strength: number
  fidelity: number
}

export function useEntanglement() {
  const [bonds] = useState<Bond[]>([
    { agent1: "phi_001", agent2: "phi_002", strength: 0.834, fidelity: 0.912 },
    { agent1: "phi_002", agent2: "phi_003", strength: 0.756, fidelity: 0.889 },
    { agent1: "phi_001", agent2: "phi_003", strength: 0.923, fidelity: 0.945 },
  ])

  return { bonds }
}
