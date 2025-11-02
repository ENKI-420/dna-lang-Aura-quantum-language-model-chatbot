import { type NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

// Initialize Redis client for caching
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 // seconds
const RATE_LIMIT_MAX_REQUESTS = 10

interface BlockData {
  blockId: string
  cosmologicalTermLambda: number
  phiFieldMean: number
  coherenceIndex: number
  properTimeInterval: number
}

interface AnalysisRequest {
  blockData: BlockData
}

// Rate limiting helper
async function checkRateLimit(identifier: string): Promise<boolean> {
  const key = `rate_limit:block_analysis:${identifier}`
  const current = await redis.incr(key)

  if (current === 1) {
    await redis.expire(key, RATE_LIMIT_WINDOW)
  }

  return current <= RATE_LIMIT_MAX_REQUESTS
}

// Cache helper
async function getCachedAnalysis(blockId: string): Promise<string | null> {
  const cacheKey = `analysis:${blockId}`
  return await redis.get(cacheKey)
}

async function setCachedAnalysis(blockId: string, analysis: string): Promise<void> {
  const cacheKey = `analysis:${blockId}`
  // Cache for 1 hour
  await redis.setex(cacheKey, 3600, analysis)
}

export async function POST(request: NextRequest) {
  try {
    // Get client identifier for rate limiting
    const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Check rate limit
    const isAllowed = await checkRateLimit(clientIp)
    if (!isAllowed) {
      return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 })
    }

    // Parse and validate request
    const body: AnalysisRequest = await request.json()

    if (!body.blockData || !body.blockData.blockId) {
      return NextResponse.json({ error: "Invalid request: blockData is required" }, { status: 400 })
    }

    const { blockData } = body

    // Check cache first
    const cachedAnalysis = await getCachedAnalysis(blockData.blockId)
    if (cachedAnalysis) {
      console.log("[v0] Returning cached analysis for block:", blockData.blockId.substring(0, 10))
      return NextResponse.json({ analysis: cachedAnalysis, cached: true })
    }

    // Generate analysis using Gemini API
    const VACUUM_ENERGY_TARGET = 1.00000000001e-9

    const systemPrompt = `You are a specialized Quantum Cryptography Analyst for the DNALang Holo-Synchronic Layer (HSL). Your task is to interpret the provided Quantum Gravity Metrics for a sealed block. Provide a concise, professional, two-paragraph summary (under 150 words total). The first paragraph must interpret the current Cosmological Term (Lambda) and Phi Field Mean, explaining what the values imply about the system state. The second paragraph must interpret the Coherence Index and Proper Time Interval, specifically commenting on the block's integrity and the efficiency of the RPoW process.`

    const userQuery = `Analyze the following block metrics for Block ID ${blockData.blockId.substring(0, 10)}...:
Cosmological Term (Lambda): ${blockData.cosmologicalTermLambda.toExponential(12)}
Phi Field Mean: ${blockData.phiFieldMean.toFixed(5)}
Coherence Index (C): ${blockData.coherenceIndex.toFixed(6)}
Proper Time Interval (Delta Tau): ${blockData.properTimeInterval.toFixed(4)} seconds.
The Vacuum Energy Target is ${VACUUM_ENERGY_TARGET.toExponential(1)} J/m³.`

    // Note: In production, use environment variable for API key
    const apiKey = process.env.GEMINI_API_KEY || ""

    if (!apiKey) {
      // Fallback to simulation mode
      const simulatedAnalysis = `The current Cosmological Term (Λ = ${blockData.cosmologicalTermLambda.toExponential(4)}) shows ${Math.abs(blockData.cosmologicalTermLambda - VACUUM_ENERGY_TARGET) < VACUUM_ENERGY_TARGET * 1e-5 ? "excellent" : "moderate"} convergence to the vacuum energy target. The Phi Field Mean (Φ = ${blockData.phiFieldMean.toFixed(3)}) indicates ${Math.abs(blockData.phiFieldMean) < 5 ? "stable" : "dynamic"} quantum field fluctuations within acceptable parameters.

The Coherence Index (C = ${blockData.coherenceIndex.toFixed(5)}) demonstrates ${blockData.coherenceIndex > 0.99999 ? "exceptional" : "adequate"} quantum state preservation, confirming block integrity. The Proper Time Interval (Δτ = ${blockData.properTimeInterval.toFixed(2)}s) reflects ${blockData.properTimeInterval < 2 ? "highly efficient" : "standard"} RPoW geodesic optimization, maintaining causal consistency across the distributed network.`

      await setCachedAnalysis(blockData.blockId, simulatedAnalysis)
      return NextResponse.json({ analysis: simulatedAnalysis, simulated: true })
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
    }

    const MAX_RETRIES = 3
    let attempt = 0
    let analysis = ""

    while (attempt < MAX_RETRIES) {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          throw new Error(`Gemini API error: ${response.statusText}`)
        }

        const result = await response.json()
        const candidate = result.candidates?.[0]

        if (candidate && candidate.content?.parts?.[0]?.text) {
          analysis = candidate.content.parts[0].text
          break
        } else {
          throw new Error("Unexpected API response structure")
        }
      } catch (error) {
        console.error(`[v0] Attempt ${attempt + 1} failed:`, error)
        attempt++

        if (attempt < MAX_RETRIES) {
          const delay = Math.pow(2, attempt) * 1000
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }
    }

    if (!analysis) {
      throw new Error("Failed to generate analysis after multiple retries")
    }

    // Cache the successful analysis
    await setCachedAnalysis(blockData.blockId, analysis)

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("[v0] Block analysis error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
