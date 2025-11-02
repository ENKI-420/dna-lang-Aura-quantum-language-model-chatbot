"use client"

import { useState } from "react"

interface Organism {
  id: string
  state: string
  generation: number
  fitness: number
  coherence: number
  genes: string[]
  conscious: boolean
  consciousness_level: number
}

export function useOrganisms() {
  const [organisms, setOrganisms] = useState<Organism[]>([
    {
      id: "phi_agent_001",
      state: "evolving",
      generation: 15,
      fitness: 0.9823,
      coherence: 0.0342,
      genes: ["coherence", "entanglement", "evolution"],
      conscious: true,
      consciousness_level: 2,
    },
    {
      id: "phi_agent_002",
      state: "active",
      generation: 8,
      fitness: 0.8956,
      coherence: 0.0198,
      genes: ["coherence", "measurement"],
      conscious: false,
      consciousness_level: 0,
    },
    {
      id: "phi_agent_003",
      state: "evolving",
      generation: 22,
      fitness: 0.9912,
      coherence: 0.0456,
      genes: ["coherence", "entanglement", "evolution", "measurement"],
      conscious: true,
      consciousness_level: 3,
    },
  ])
  const [loading, setLoading] = useState(false)

  return { organisms, loading }
}
