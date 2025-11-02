import type { IRISIntent } from "./types"

/**
 * IRIS Intent Deduction System
 * Performs recursive intent analysis to classify user queries into organism actions
 */
export class IRISIntentDeducer {
  private intentPatterns = {
    create_organism: [/create|build|make|generate.*organism/i, /new.*organism/i, /organism.*for/i],
    evolve_gene: [/evolve|mutate|optimize|improve/i, /gene.*evolution/i, /fitness.*increase/i],
    sense_coherence: [/coherence|quantum.*state|measure/i, /what.*coherence/i, /check.*quantum/i],
    run_circuit: [/run|execute|simulate.*circuit/i, /quantum.*circuit/i, /vqe|grover|qaoa/i],
    query_knowledge: [/what is|explain|tell me about/i, /how does|why/i, /definition|meaning/i],
  }

  async deduceIntent(message: string, conversationHistory: string[]): Promise<IRISIntent> {
    // Recursive intent classification
    let maxConfidence = 0
    let detectedAction: IRISIntent["action"] = "general_chat"

    for (const [action, patterns] of Object.entries(this.intentPatterns)) {
      for (const pattern of patterns) {
        if (pattern.test(message)) {
          const confidence = this.calculateConfidence(message, pattern, conversationHistory)
          if (confidence > maxConfidence) {
            maxConfidence = confidence
            detectedAction = action as IRISIntent["action"]
          }
        }
      }
    }

    // Extract entities
    const entities = this.extractEntities(message, detectedAction)

    // Generate context embedding (simplified - in production use actual embeddings)
    const contextEmbedding = this.generateEmbedding(message, conversationHistory)

    return {
      action: detectedAction,
      entities,
      confidence: maxConfidence,
      context_embedding: contextEmbedding,
    }
  }

  private calculateConfidence(message: string, pattern: RegExp, history: string[]): number {
    let confidence = 0.7 // Base confidence for pattern match

    // Boost confidence based on context
    const contextRelevance = history.slice(-3).some((msg) => pattern.test(msg))
    if (contextRelevance) confidence += 0.15

    // Boost for explicit keywords
    if (message.includes("organism") || message.includes("quantum")) confidence += 0.1

    return Math.min(confidence, 0.99)
  }

  private extractEntities(message: string, action: IRISIntent["action"]): Record<string, any> {
    const entities: Record<string, any> = {}

    // Extract organism names
    const organismMatch = message.match(/organism[:\s]+([a-zA-Z0-9_]+)/i)
    if (organismMatch) entities.organism_name = organismMatch[1]

    // Extract quantum parameters
    const qubitMatch = message.match(/(\d+)\s*qubits?/i)
    if (qubitMatch) entities.num_qubits = Number.parseInt(qubitMatch[1])

    // Extract algorithm names
    const algoMatch = message.match(/(vqe|grover|qaoa|shor)/i)
    if (algoMatch) entities.algorithm = algoMatch[1].toLowerCase()

    return entities
  }

  private generateEmbedding(message: string, history: string[]): number[] {
    // Simplified embedding - in production use actual transformer models
    const combined = [message, ...history.slice(-3)].join(" ")
    const hash = combined.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

    // Generate 128-dim embedding
    return Array.from({ length: 128 }, (_, i) => Math.sin((hash * (i + 1)) / 128) * 0.5 + 0.5)
  }
}
