import type { NQREOrganism } from "./types"

export class NQREApiService {
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
      throw new Error(`NQRE API Error: ${error}`)
    }

    return response.json()
  }

  async createOrganism(organism: Partial<NQREOrganism>): Promise<NQREOrganism> {
    return this.request<NQREOrganism>("POST", "/nqre/organisms", organism)
  }

  async getOrganism(id: string): Promise<NQREOrganism> {
    return this.request<NQREOrganism>("GET", `/nqre/organisms/${id}`)
  }

  async listOrganisms(): Promise<NQREOrganism[]> {
    return this.request<NQREOrganism[]>("GET", "/nqre/organisms")
  }

  async startOrganism(id: string): Promise<{ status: string }> {
    return this.request<{ status: string }>("POST", `/nqre/organisms/${id}/start`)
  }

  async stopOrganism(id: string): Promise<{ status: string }> {
    return this.request<{ status: string }>("POST", `/nqre/organisms/${id}/stop`)
  }

  async evolveOrganism(id: string, trigger: string): Promise<{ status: string; mutation: any }> {
    return this.request("POST", `/nqre/organisms/${id}/evolve`, { trigger })
  }

  async getOrganismState(id: string): Promise<Record<string, any>> {
    return this.request<Record<string, any>>("GET", `/nqre/organisms/${id}/state`)
  }

  async getOrganismTelemetry(id: string, limit = 100): Promise<any[]> {
    return this.request<any[]>("GET", `/nqre/organisms/${id}/telemetry?limit=${limit}`)
  }
}
