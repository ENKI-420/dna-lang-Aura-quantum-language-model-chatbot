import type { NextRequest } from "next/server"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

/**
 * Security utilities for production-grade web application
 */

// Input validation and sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove potential XSS vectors
    .trim()
    .substring(0, 1000) // Limit length
}

// Validate block ID format
export function isValidBlockId(blockId: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(blockId)
}

// Validate IPFS CID format
export function isValidIPFSCid(cid: string): boolean {
  return /^Qm[a-zA-Z0-9]{44}$/.test(cid)
}

// Extract client identifier for rate limiting
export function getClientIdentifier(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "unknown"
}

// CORS headers for API routes
export const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGINS || "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
}

// Security headers
export const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
}

// Rate limiting using Upstash Redis
/**
 * Rate limiting using Upstash Redis
 * Returns success status and remaining requests
 */
export async function rateLimit(request: NextRequest): Promise<{ success: boolean; remaining?: number }> {
  try {
    const identifier = getClientIdentifier(request)

    // If Redis is not configured, allow all requests
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      return { success: true }
    }

    const redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })

    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10 seconds
    })

    const { success, remaining } = await ratelimit.limit(identifier)

    return { success, remaining }
  } catch (error) {
    console.error("[v0] Rate limit error:", error)
    // On error, allow the request to proceed
    return { success: true }
  }
}
