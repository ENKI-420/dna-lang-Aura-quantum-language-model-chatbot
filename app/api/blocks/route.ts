import { type NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

interface Block {
  blockId: string
  timestamp: string
  cosmologicalTermLambda: number
  phiFieldMean: number
  coherenceIndex: number
  properTimeInterval: number
  ipfsCid: string
  verified: boolean
}

// GET /api/blocks - Retrieve recent blocks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10", 10)
    const offset = Number.parseInt(searchParams.get("offset") || "0", 10)

    // Retrieve blocks from Redis sorted set
    const blockIds = await redis.zrange("blocks:timeline", offset, offset + limit - 1, {
      rev: true,
    })

    if (!blockIds || blockIds.length === 0) {
      return NextResponse.json({ blocks: [], total: 0 })
    }

    // Fetch block details
    const blocks = await Promise.all(
      blockIds.map(async (id) => {
        const block = await redis.get(`block:${id}`)
        return block
      }),
    )

    const total = await redis.zcard("blocks:timeline")

    return NextResponse.json({
      blocks: blocks.filter(Boolean),
      total,
      limit,
      offset,
    })
  } catch (error) {
    console.error("[v0] Error fetching blocks:", error)
    return NextResponse.json({ error: "Failed to fetch blocks" }, { status: 500 })
  }
}

// POST /api/blocks - Store a new block
export async function POST(request: NextRequest) {
  try {
    const block: Block = await request.json()

    // Validate block data
    if (!block.blockId || !block.timestamp) {
      return NextResponse.json({ error: "Invalid block data: blockId and timestamp are required" }, { status: 400 })
    }

    // Store block in Redis
    const timestamp = new Date(block.timestamp).getTime()

    // Add to sorted set for timeline queries
    await redis.zadd("blocks:timeline", {
      score: timestamp,
      member: block.blockId,
    })

    // Store block details
    await redis.set(`block:${block.blockId}`, JSON.stringify(block), {
      ex: 86400 * 7, // Expire after 7 days
    })

    // Update metrics
    await redis.hincrby("metrics:blocks", "total", 1)
    if (block.verified) {
      await redis.hincrby("metrics:blocks", "verified", 1)
    }

    return NextResponse.json({ success: true, blockId: block.blockId })
  } catch (error) {
    console.error("[v0] Error storing block:", error)
    return NextResponse.json({ error: "Failed to store block" }, { status: 500 })
  }
}
