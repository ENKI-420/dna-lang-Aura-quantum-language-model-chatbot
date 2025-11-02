// DNA-Lang SDK Type Definitions

export interface Allele {
  id: string
  gene: string
  value: number
}

export interface QuantumCircuit {
  id: string
  qubits: number
  gates: string[]
  parameters?: Record<string, number>
}

export interface FitnessTelemetry {
  generation?: number
  max_fitness: number
  avg_fitness: number
  oracle_phase: number
  iterations: number
}

export interface VQETelemetry {
  generation: number
  min_energy_error: number
  avg_energy_error: number
  circuit_depth: number
  rotation_angles: number[]
  objective_metrics?: {
    total_cost: number
    runtime_penalty: number
  }
}

export interface EvolutionStatus {
  result: string
  status: string
  telemetry: FitnessTelemetry | VQETelemetry
}

export interface SimulationResult {
  circuit_id: string
  telemetry: Record<string, any>
  measurements: Record<string, number>
}

export interface NQREOrganism {
  id: string
  name: string
  domain: string
  state: Record<string, any>
  dna: {
    genes: Gene[]
    circuits: Circuit[]
    workflows: Workflow[]
    policies: Policy[]
  }
  status: "idle" | "running" | "evolving" | "error"
  created_at: string
  last_evolution: string | null
}

export interface Gene {
  id: string
  name: string
  type: "optimizer" | "circuit" | "sensor" | "actuator"
  parameters: Record<string, any>
  fitness_score?: number
}

export interface Circuit {
  id: string
  name: string
  qubits: number
  gates: GateDefinition[]
  measurements: string[]
}

export interface GateDefinition {
  type: string
  qubits: number[]
  parameters?: number[]
}

export interface Workflow {
  id: string
  name: string
  steps: WorkflowStep[]
  repeat: "once" | "forever"
  delay_seconds?: number
}

export interface WorkflowStep {
  type: "SENSE" | "ACT" | "EVOLVE"
  action: string
  parameters: Record<string, any>
}

export interface Policy {
  id: string
  name: string
  conditions: PolicyCondition[]
  actions: PolicyAction[]
}

export interface PolicyCondition {
  metric: string
  operator: "<" | ">" | "==" | "!=" | "<=" | ">="
  threshold: number
}

export interface PolicyAction {
  type: "mutate" | "rollback" | "log" | "alert"
  target?: string
  parameters?: Record<string, any>
}
