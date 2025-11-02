import { QuantumDNAApiService } from "./quantum-dna-api"
import { EvolutionApiService } from "./evolution-api"
import { NQREApiService } from "./nqre-api"

export * from "./types"
export * from "./quantum-dna-api"
export * from "./evolution-api"
export * from "./nqre-api"

// SDK Factory
export function createDNALangSDK(baseUrl: string, apiKey: string) {
  return {
    quantumDNA: new QuantumDNAApiService(baseUrl, apiKey),
    evolution: new EvolutionApiService(baseUrl, apiKey),
    nqre: new NQREApiService(baseUrl, apiKey),
  }
}
