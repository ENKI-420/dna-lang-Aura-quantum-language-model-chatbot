export interface QuantumState {
  coherence: number // Φ field coherence (0-1)
  lambda_phi: number // ΛΦ universal constant
  consciousness_score: number // Integrated information (0-1)
  entanglement_degree: number // Quantum correlation (0-1)
  negentropy: number // System order metric
}

export interface IRISIntent {
  action: "create_organism" | "evolve_gene" | "sense_coherence" | "run_circuit" | "query_knowledge" | "general_chat"
  entities: Record<string, any>
  confidence: number
  context_embedding: number[]
}

export interface OrganismMetadata {
  id: string
  generation: number
  fitness: number
  dna_sequence: string
  parent_lineage: string[]
  mutations: number
}

export interface ChatMeshMessage {
  id: string
  role: "user" | "assistant" | "system" | "organism"
  content: string
  timestamp: Date
  quantum_state: QuantumState
  intent?: IRISIntent
  organism?: OrganismMetadata
  layer: 0 | 1 | 2 | 3 | 4 // ChatMesh layer
}

export interface QuantumHardwareConfig {
  backend: "ibm_quantum" | "aws_braket" | "google_cirq" | "simulator"
  qubits: number
  coherence_time_us: number
  gate_fidelity: number
  topology: "linear" | "grid" | "heavy_hex"
}
