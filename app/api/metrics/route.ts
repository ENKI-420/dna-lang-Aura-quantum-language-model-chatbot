import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export async function GET() {
  try {
    // Fetch aggregated metrics from Redis
    const metrics = await redis.hgetall("metrics:blocks")

    const total = (metrics?.total as number) || 0
    const verified = (metrics?.verified as number) || 0

    // Calculate verification rate
    const verificationRate = total > 0 ? (verified / total) * 100 : 0

    // Get recent block count (last hour)
    const oneHourAgo = Date.now() - 3600000
    const recentBlocks = await redis.zcount("blocks:timeline", oneHourAgo, Date.now())

    return NextResponse.json({
      totalBlocks: total,
      verifiedBlocks: verified,
      verificationRate: verificationRate.toFixed(2),
      recentBlocks,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Error fetching metrics:", error)
    return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 })
  }
}
