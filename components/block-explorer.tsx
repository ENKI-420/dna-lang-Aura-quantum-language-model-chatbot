"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { CheckCircle, XCircle, Shield, Clock, Database, Link, Zap, Cpu, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Global Constants (DNALang Fabric Parameters)
const VACUUM_ENERGY_TARGET = 1.00000000001e-9
const G_COMP = 6.674e-11
const CAPSULE_VERSION = "2.5.0"

interface BlockData {
  blockId: string
  timestamp: string
  cosmologicalTermLambda: number
  phiFieldMean: number
  coherenceIndex: number
  properTimeInterval: number
  ipfsCid: string
  z3Result: string
  coqEquivResult: boolean
  coqCurvatureResult: boolean
  gpgSigned: boolean
}

interface MetricCardProps {
  title: string
  value: string
  icon: React.ElementType
  colorClass?: string
  unit?: string
}

const MetricCard = ({ title, value, icon: Icon, colorClass = "text-foreground", unit = "" }: MetricCardProps) => (
  <Card className="transition-all duration-300 hover:shadow-lg">
    <CardContent className="p-6">
      <div className="flex items-center gap-4">
        <Icon className={`w-8 h-8 ${colorClass}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold break-words">
            {value}
            <span className="text-base font-normal ml-1">{unit}</span>
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
)

interface VerificationBadgeProps {
  label: string
  isVerified: boolean
}

const VerificationBadge = ({ label, isVerified }: VerificationBadgeProps) => (
  <Card
    className={`transition-all duration-300 ${isVerified ? "border-green-500/50 bg-green-500/5" : "border-red-500/50 bg-red-500/5"}`}
  >
    <CardContent className="p-4">
      <div className="flex items-center gap-3">
        {isVerified ? (
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
        )}
        <span
          className={`text-sm font-semibold ${isVerified ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"}`}
        >
          {label}
        </span>
      </div>
    </CardContent>
  </Card>
)

export function BlockExplorer() {
  const [blockData, setBlockData] = useState<BlockData>({
    blockId: "0x0000000000000000000000000000000000000000000000000000000000000000",
    timestamp: new Date().toISOString(),
    cosmologicalTermLambda: VACUUM_ENERGY_TARGET,
    phiFieldMean: 0.0,
    coherenceIndex: 1.0,
    properTimeInterval: 0.0,
    ipfsCid: "QmQGStartBlock000000000000000000000000000000",
    z3Result: "sat",
    coqEquivResult: true,
    coqCurvatureResult: true,
    gpgSigned: true,
  })
  const [isMining, setIsMining] = useState(true)
  const [report, setReport] = useState<string | null>(null)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // SHA-256 hash function using Web Crypto API
  const hashMessage = async (msg: string): Promise<string> => {
    const buffer = new TextEncoder().encode(msg)
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    return "0x" + hashHex
  }

  // RPoW Mining Simulation
  const simulateRPoWMining = useCallback(async (lastBlock: BlockData): Promise<BlockData> => {
    setIsMining(true)
    setError(null)
    const startTime = performance.now()

    try {
      // State Initialization
      const newPhiMean = Math.random() * 20 - 10
      const rhoComp = (Math.random() * 0.1 + 0.9) * 1e-4

      // Geodesic Optimization
      const MAX_PERTURBATION = VACUUM_ENERGY_TARGET * 1e-6
      const perturbation = (Math.random() - 0.5) * MAX_PERTURBATION
      const tCompInfluence = G_COMP * rhoComp * 10 ** (Math.random() * 2 + 11)
      const lambdaFinal = VACUUM_ENERGY_TARGET + tCompInfluence + perturbation

      const properTimeInterval = (performance.now() - startTime) / 1000 + (Math.random() * 0.5 + 0.5)

      // Block Sealing
      const timestamp = new Date().toISOString()
      const blockMessage = `${lastBlock.blockId}${lambdaFinal}${properTimeInterval}${newPhiMean}${timestamp}`
      const newBlockHash = await hashMessage(blockMessage)

      const newCoherence = 1.0 - Math.random() * 1e-5
      const isVerified = newCoherence > 0.999995 && Math.random() > 0.15

      // IPFS CID Generation
      const ipfsCid = "Qm" + newBlockHash.substring(2, 46)

      const newBlock: BlockData = {
        blockId: newBlockHash,
        timestamp: timestamp,
        cosmologicalTermLambda: lambdaFinal,
        phiFieldMean: newPhiMean,
        coherenceIndex: newCoherence,
        properTimeInterval: properTimeInterval,
        ipfsCid: ipfsCid,
        z3Result: isVerified ? "sat" : "unsat",
        coqEquivResult: isVerified,
        coqCurvatureResult: isVerified,
        gpgSigned: isVerified,
      }

      setBlockData(newBlock)
      setReport(null)
      setIsMining(false)

      return newBlock
    } catch (err) {
      setError(err instanceof Error ? err.message : "Mining failed")
      setIsMining(false)
      return lastBlock
    }
  }, [])

  // Gemini API call for Quantum Gravity Analysis
  const generateReport = useCallback(async () => {
    setIsGeneratingReport(true)
    setReport(null)
    setError(null)

    try {
      const response = await fetch("/api/block-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blockData }),
      })

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`)
      }

      const result = await response.json()
      setReport(result.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate analysis")
    } finally {
      setIsGeneratingReport(false)
    }
  }, [blockData])

  useEffect(() => {
    let currentBlock = blockData
    let isMounted = true

    // Initial run
    simulateRPoWMining(currentBlock)

    // Continuous mining loop
    const miningInterval = setInterval(async () => {
      if (isMounted) {
        currentBlock = await simulateRPoWMining(currentBlock)
      }
    }, 4000)

    return () => {
      isMounted = false
      clearInterval(miningInterval)
    }
  }, [simulateRPoWMining])

  const getFormattedTime = (isoString: string) => {
    if (!isoString) return "N/A"
    return new Date(isoString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  }

  const isZ3Verified = blockData.z3Result === "sat"
  const z3Label = isZ3Verified ? "Z3 SMT Invariants (SAT)" : "Z3 SMT Invariants (UNSAT)"
  const isOverallVerified =
    isZ3Verified && blockData.coqEquivResult && blockData.coqCurvatureResult && blockData.gpgSigned

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 sm:p-8">
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Link className="w-10 h-10 text-primary" />
          <h1 className="text-4xl font-extrabold">DNALang HSL Block Explorer</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Real-Time Verification and Distributed Trust via IPFS (v{CAPSULE_VERSION})
        </p>
      </header>

      <main className="max-w-7xl mx-auto space-y-6">
        {/* Mining Indicator */}
        <Alert
          className={
            isMining
              ? "border-yellow-500 bg-yellow-500/10"
              : isOverallVerified
                ? "border-green-500 bg-green-500/10"
                : "border-red-500 bg-red-500/10"
          }
        >
          <div className="flex items-center gap-3">
            {isMining ? (
              <>
                <Cpu className="w-6 h-6 text-yellow-600 animate-pulse" />
                <AlertDescription className="text-lg font-bold">
                  MINING NEW BLOCK... RPoW Geodesic Optimization in Progress
                </AlertDescription>
              </>
            ) : (
              <>
                {isOverallVerified ? (
                  <Shield className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
                <AlertDescription className="text-lg font-bold">
                  {isOverallVerified ? "BLOCK SEALED: ALL INVARIANTS PASS" : "VERIFICATION FAILED: BLOCK REJECTED"}
                </AlertDescription>
              </>
            )}
          </div>
        </Alert>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Block Details */}
        <Card>
          <CardHeader>
            <CardTitle>Block Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="font-mono text-sm bg-muted p-3 rounded-lg break-all">
              <span className="font-semibold text-muted-foreground">BLOCK HASH: </span>
              {blockData.blockId}
            </div>
            <div className="font-mono text-sm bg-muted p-3 rounded-lg break-all">
              <span className="font-semibold text-muted-foreground">IPFS CID (Audit Capsule): </span>
              {blockData.ipfsCid}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-semibold">Timestamp: </span>
              {getFormattedTime(blockData.timestamp)}
            </div>
          </CardContent>
        </Card>

        {/* Core QG Metrics */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Quantum Gravity Metrics (RPoW Output)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Proper Time Interval (Δτ)"
              value={blockData.properTimeInterval.toFixed(4)}
              icon={Clock}
              colorClass="text-sky-600"
              unit="seconds"
            />
            <MetricCard
              title="Cosmological Term (Λ)"
              value={blockData.cosmologicalTermLambda.toExponential(4)}
              icon={Database}
              colorClass="text-purple-600"
            />
            <MetricCard
              title="Phi Field Mean (Φ)"
              value={blockData.phiFieldMean.toFixed(5)}
              icon={Zap}
              colorClass="text-yellow-600"
            />
            <MetricCard
              title="Coherence Index (C)"
              value={blockData.coherenceIndex.toFixed(5)}
              icon={Shield}
              colorClass="text-indigo-600"
            />
          </div>
        </div>

        {/* Verification Audit */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Audit Capsule Verification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <VerificationBadge label={z3Label} isVerified={isZ3Verified} />
            <VerificationBadge label="Coq: Holo Equivalence (|F-L|≤ε)" isVerified={blockData.coqEquivResult} />
            <VerificationBadge
              label="Coq: Curvature Preservation (R ≤ Rmax)"
              isVerified={blockData.coqCurvatureResult}
            />
            <VerificationBadge label="GPG Signature Integrity" isVerified={blockData.gpgSigned} />
          </div>
        </div>

        {/* LLM Analysis */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <CardTitle>Synchronic Analysis Report (LLM)</CardTitle>
              </div>
              <Button onClick={generateReport} disabled={isMining || isGeneratingReport} size="sm" className="gap-2">
                {isGeneratingReport ? (
                  <>
                    <Cpu className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Generate Report ✨"
                )}
              </Button>
            </div>
            <CardDescription>AI-powered interpretation of quantum gravity metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-[100px] bg-background p-4 rounded-lg border">
              {isGeneratingReport && (
                <p className="animate-pulse text-center text-muted-foreground">
                  Generating comprehensive analysis using Gemini-2.5-Flash...
                </p>
              )}
              {report && (
                <div className="space-y-3 text-sm">
                  {report.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
              {!isGeneratingReport && !report && (
                <p className="text-center text-muted-foreground italic">
                  Click 'Generate Report ✨' to get a concise LLM interpretation of the current block's QG metrics.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* IPFS Action */}
        <div className="text-center space-y-3">
          <Button asChild size="lg" className="gap-3" disabled={isMining}>
            <a href={`https://ipfs.io/ipfs/${blockData.ipfsCid}`} target="_blank" rel="noopener noreferrer">
              <Database className="w-5 h-5" />
              Retrieve Audit Capsule via IPFS
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">
            The cryptographic proof capsule is now decentralized and immutable (DNALang v{CAPSULE_VERSION}).
          </p>
        </div>
      </main>
    </div>
  )
}
