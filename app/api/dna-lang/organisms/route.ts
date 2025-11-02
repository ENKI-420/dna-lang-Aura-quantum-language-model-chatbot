import { type NextRequest, NextResponse } from "next/server"
import { NQREApiService } from "@/lib/dna-lang-sdk"

const BACKEND_URL = process.env.DNALANG_API_URL || "http://localhost:8000"
const API_KEY = process.env.DNALANG_API_KEY || "dev-key"

export async function GET() {
  try {
    const nqreApi = new NQREApiService(BACKEND_URL, API_KEY)
    const organisms = await nqreApi.listOrganisms()
    return NextResponse.json(organisms)
  } catch (error) {
    console.error("[v0] List organisms error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const organism = await request.json()
    const nqreApi = new NQREApiService(BACKEND_URL, API_KEY)
    const created = await nqreApi.createOrganism(organism)
    return NextResponse.json(created)
  } catch (error) {
    console.error("[v0] Create organism error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
