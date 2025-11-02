import { type NextRequest, NextResponse } from "next/server"
import { EvolutionApiService } from "@/lib/dna-lang-sdk"

const BACKEND_URL = process.env.DNALANG_API_URL || "http://localhost:8000"
const API_KEY = process.env.DNALANG_API_KEY || "dev-key"

export async function POST(request: NextRequest) {
  try {
    const { action, poolName, poolId } = await request.json()
    const evolutionApi = new EvolutionApiService(BACKEND_URL, API_KEY)

    let result
    switch (action) {
      case "run":
        result = await evolutionApi.runEvolution(poolName)
        break
      case "run-vqe":
        result = await evolutionApi.runVQEEvolution(poolName)
        break
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Evolution API error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const poolId = searchParams.get("poolId")
    const type = searchParams.get("type") || "grover"

    if (!poolId) {
      return NextResponse.json({ error: "poolId required" }, { status: 400 })
    }

    const evolutionApi = new EvolutionApiService(BACKEND_URL, API_KEY)

    const telemetry =
      type === "vqe" ? await evolutionApi.fetchVQETelemetry(poolId) : await evolutionApi.fetchTelemetry(poolId)

    return NextResponse.json(telemetry)
  } catch (error) {
    console.error("[v0] Telemetry fetch error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
