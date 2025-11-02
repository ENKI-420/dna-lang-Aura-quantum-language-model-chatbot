/**
 * Monitoring and observability utilities
 */

interface LogContext {
  [key: string]: unknown
}

export class Logger {
  private context: string

  constructor(context: string) {
    this.context = context
  }

  info(message: string, data?: LogContext) {
    console.log(
      JSON.stringify({
        level: "info",
        context: this.context,
        message,
        timestamp: new Date().toISOString(),
        ...data,
      }),
    )
  }

  error(message: string, error?: Error, data?: LogContext) {
    console.error(
      JSON.stringify({
        level: "error",
        context: this.context,
        message,
        error: error?.message,
        stack: error?.stack,
        timestamp: new Date().toISOString(),
        ...data,
      }),
    )
  }

  warn(message: string, data?: LogContext) {
    console.warn(
      JSON.stringify({
        level: "warn",
        context: this.context,
        message,
        timestamp: new Date().toISOString(),
        ...data,
      }),
    )
  }

  debug(message: string, data?: LogContext) {
    if (process.env.NODE_ENV === "development") {
      console.debug(
        JSON.stringify({
          level: "debug",
          context: this.context,
          message,
          timestamp: new Date().toISOString(),
          ...data,
        }),
      )
    }
  }
}

// Performance monitoring
export class PerformanceMonitor {
  private startTime: number
  private label: string

  constructor(label: string) {
    this.label = label
    this.startTime = performance.now()
  }

  end() {
    const duration = performance.now() - this.startTime
    console.log(`[Performance] ${this.label}: ${duration.toFixed(2)}ms`)
    return duration
  }
}

// Metrics collection
export async function recordMetric(name: string, value: number, tags?: Record<string, string>) {
  // In production, send to monitoring service (Datadog, New Relic, etc.)
  console.log(
    JSON.stringify({
      metric: name,
      value,
      tags,
      timestamp: new Date().toISOString(),
    }),
  )
}
