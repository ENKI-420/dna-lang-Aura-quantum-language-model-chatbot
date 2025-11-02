import type { EvolutionStatus, FitnessTelemetry, VQETelemetry } from "./types"

export class EvolutionApiService {
  constructor(
    private baseUrl: string,
    private apiKey: string,
  ) {}

  private async request<T>(method: string, path: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }

    const response = await fetch(url.toString(), {
      method,
      headers: {
        "X-API-Key": this.apiKey,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Evolution API Error: ${error}`)
    }

    return response.json()
  }

  async runEvolution(poolName: string): Promise<EvolutionStatus> {
    return this.request<EvolutionStatus>("POST", "/evolution/run", {
      pool: poolName,
    })
  }

  async fetchTelemetry(poolId: string): Promise<FitnessTelemetry[]> {
    return this.request<FitnessTelemetry[]>("GET", "/evolution/telemetry", {
      poolId,
    })
  }

  async runVQEEvolution(poolName = "VQEEvolutionPool"): Promise<EvolutionStatus> {
    return this.request<EvolutionStatus>("POST", "/evolution/run-vqe", {
      pool: poolName,
    })
  }

  async fetchVQETelemetry(poolId: string): Promise<VQETelemetry[]> {
    return this.request<VQETelemetry[]>("GET", "/evolution/vqe-telemetry", {
      poolId,
    })
  }
}
