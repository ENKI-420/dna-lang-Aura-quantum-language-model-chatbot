import { type NextRequest, NextResponse } from "next/server"
import { NQREApiService } from "@/lib/dna-lang-sdk"

const BACKEND_URL = process.env.DNALANG_API_URL || "http://localhost:8000"
const API_KEY = process.env.DNALANG_API_KEY || "dev-key"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const nqreApi = new NQREApiService(BACKEND_URL, API_KEY)
    const organism = await nqreApi.getOrganism(params.id)
    return NextResponse.json(organism)
  } catch (error) {
    console.error("[v0] Get organism error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { action, trigger } = await request.json()
    const nqreApi = new NQREApiService(BACKEND_URL, API_KEY)

    let result
    switch (action) {
      case "start":
        result = await nqreApi.startOrganism(params.id)
        break
      case "stop":
        result = await nqreApi.stopOrganism(params.id)
        break
      case "evolve":
        result = await nqreApi.evolveOrganism(params.id, trigger)
        break
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Organism action error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
