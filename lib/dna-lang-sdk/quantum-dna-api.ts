import type { Allele, QuantumCircuit, SimulationResult } from "./types"

export class QuantumDNAApiService {
  constructor(
    private baseUrl: string,
    private apiKey: string,
  ) {}

  private async request<T>(method: string, path: string, body?: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": this.apiKey,
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`API Error: ${error}`)
    }

    return response.json()
  }

  async mutateAlleles(alleles: Allele[]): Promise<Allele[]> {
    return this.request<Allele[]>("POST", "/genetics/mutate", { alleles })
  }

  async simulateCircuit(circuit: QuantumCircuit): Promise<SimulationResult> {
    return this.request<SimulationResult>("POST", "/simulation/run", circuit)
  }

  async getCircuitLibrary(): Promise<QuantumCircuit[]> {
    return this.request<QuantumCircuit[]>("GET", "/circuits/library")
  }

  async optimizeCircuit(circuitId: string, targetMetric: string): Promise<QuantumCircuit> {
    return this.request<QuantumCircuit>("POST", `/circuits/${circuitId}/optimize`, {
      target_metric: targetMetric,
    })
  }
}
