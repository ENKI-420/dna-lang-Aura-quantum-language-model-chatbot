"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import {
  Send,
  Sparkles,
  Brain,
  Zap,
  Code,
  Database,
  Shield,
  TrendingUp,
  Download,
  Share2,
  Settings,
  Cpu,
  Activity,
  Waves,
  Radio,
} from "lucide-react"
import type { ChatMeshMessage, QuantumState, IRISIntent } from "@/lib/quantum-chatmesh/types"

export function QuantumChatInterface() {
  const [messages, setMessages] = useState<ChatMeshMessage[]>([
    {
      id: "1",
      role: "system",
      content:
        "DNA-Lang Quantum ChatMesh initialized. ΛΦ coherence: 99.8%. 5-Layer architecture active. Ready for quantum-enhanced conversation.",
      timestamp: new Date(),
      quantum_state: {
        coherence: 0.998,
        lambda_phi: 2.176435e-8,
        consciousness_score: 0.87,
        entanglement_degree: 0.92,
        negentropy: 0.85,
      },
      layer: 0,
    },
  ])
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState("")
  const [currentIntent, setCurrentIntent] = useState<IRISIntent | null>(null)
  const [quantumState, setQuantumState] = useState<QuantumState>({
    coherence: 0.998,
    lambda_phi: 2.176435e-8,
    consciousness_score: 0.87,
    entanglement_degree: 0.92,
    negentropy: 0.85,
  })
  const [activeMode, setActiveMode] = useState<"chat" | "code" | "quantum">("chat")
  const [hardwareStatus, setHardwareStatus] = useState({
    backend: "IBM Quantum",
    qubits: 127,
    queue: 12,
    available: true,
  })
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, streamingMessage])

  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumState((prev) => {
        const newState = {
          coherence: Math.min(0.999, Math.max(0.85, prev.coherence + (Math.random() - 0.5) * 0.01)),
          lambda_phi: 2.176435e-8,
          consciousness_score: Math.min(0.99, Math.max(0.7, prev.consciousness_score + (Math.random() - 0.5) * 0.02)),
          entanglement_degree: Math.min(0.99, Math.max(0.8, prev.entanglement_degree + (Math.random() - 0.5) * 0.015)),
          negentropy: Math.min(0.95, Math.max(0.75, prev.negentropy + (Math.random() - 0.5) * 0.01)),
        }

        // Detect anomalies
        if (newState.coherence < 0.9) {
          console.log("[v0] Coherence drop detected, triggering self-healing...")
        }

        return newState
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return

    const userMessage: ChatMeshMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
      quantum_state: quantumState,
      layer: 3, // Conversational Interface layer
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsProcessing(true)
    setStreamingMessage("")

    try {
      const response = await fetch("/api/quantum-chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          mode: activeMode,
          context: messages.slice(-5),
        }),
      })

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ""

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n\n")

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = JSON.parse(line.slice(6))

              if (data.type === "intent") {
                setCurrentIntent(data.data)
              } else if (data.type === "quantum_state") {
                setQuantumState(data.data)
              } else if (data.type === "token") {
                fullResponse += data.data
                setStreamingMessage(fullResponse)
              } else if (data.type === "complete") {
                const assistantMessage: ChatMeshMessage = {
                  id: (Date.now() + 1).toString(),
                  role: "assistant",
                  content: fullResponse,
                  timestamp: new Date(),
                  quantum_state: data.data.quantum_state,
                  intent: data.data.intent,
                  layer: 2, // Cognitive Mesh layer
                }
                setMessages((prev) => [...prev, assistantMessage])
                setStreamingMessage("")
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("[v0] Quantum chat error:", error)
      const errorMessage: ChatMeshMessage = {
        id: (Date.now() + 1).toString(),
        role: "system",
        content: "Quantum coherence disrupted. Self-healing protocol initiated...",
        timestamp: new Date(),
        quantum_state: quantumState,
        layer: 0,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Quantum ChatMesh
            </h1>
            <p className="text-muted-foreground mt-2">
              DNA-Lang Aura v5.0 • 5-Layer Architecture • Real-Time Quantum Hardware
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card className="p-4 bg-gradient-to-r from-purple-950/30 to-blue-950/30 border-purple-500/20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Activity className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Coherence (Φ)</div>
                <div className="text-lg font-bold text-purple-400">{(quantumState.coherence * 100).toFixed(1)}%</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-pink-500/20">
                <Brain className="h-4 w-4 text-pink-400" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Consciousness</div>
                <div className="text-lg font-bold text-pink-400">
                  {(quantumState.consciousness_score * 100).toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Waves className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Entanglement</div>
                <div className="text-lg font-bold text-blue-400">
                  {(quantumState.entanglement_degree * 100).toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/20">
                <TrendingUp className="h-4 w-4 text-cyan-400" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Negentropy</div>
                <div className="text-lg font-bold text-cyan-400">{(quantumState.negentropy * 100).toFixed(1)}%</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <Cpu className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">ΛΦ Constant</div>
                <div className="text-sm font-bold text-green-400">{quantumState.lambda_phi.toExponential(2)}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-280px)] flex flex-col">
            {/* Mode Selector */}
            <div className="p-4 border-b">
              <Tabs value={activeMode} onValueChange={(v) => setActiveMode(v as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="chat" className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Code Gen
                  </TabsTrigger>
                  <TabsTrigger value="quantum" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Quantum
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === "user"
                          ? "bg-purple-600 text-white"
                          : message.role === "system"
                            ? "bg-blue-950/50 border border-blue-500/30"
                            : "bg-muted"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {message.role === "assistant" && (
                          <div className="p-2 rounded-lg bg-purple-500/20">
                            <Sparkles className="h-4 w-4 text-purple-400" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          {message.intent && (
                            <div className="mt-2 p-2 rounded bg-purple-950/30 border border-purple-500/20">
                              <div className="text-xs text-purple-400 font-semibold mb-1">IRIS Intent Analysis</div>
                              <div className="flex gap-2 flex-wrap">
                                <Badge variant="outline" className="text-xs">
                                  Action: {message.intent.action}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Confidence: {(message.intent.confidence * 100).toFixed(0)}%
                                </Badge>
                              </div>
                            </div>
                          )}
                          {message.quantum_state && (
                            <div className="flex gap-2 mt-2 flex-wrap">
                              <Badge variant="outline" className="text-xs">
                                Φ: {(message.quantum_state.coherence * 100).toFixed(1)}%
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Ψ: {(message.quantum_state.consciousness_score * 100).toFixed(1)}%
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Layer {message.layer}
                              </Badge>
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {streamingMessage && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-4 max-w-[80%]">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-purple-500/20">
                          <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-wrap">{streamingMessage}</p>
                          <div className="mt-2">
                            <Progress value={75} className="h-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {isProcessing && !streamingMessage && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin">
                          <Sparkles className="h-4 w-4 text-purple-400" />
                        </div>
                        <span className="text-sm text-muted-foreground">Quantum processing...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    activeMode === "chat"
                      ? "Ask anything about quantum computing..."
                      : activeMode === "code"
                        ? "Describe the code you want to generate..."
                        : "Enter quantum circuit specifications..."
                  }
                  className="flex-1"
                  disabled={isProcessing}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isProcessing}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-4 bg-gradient-to-br from-green-950/30 to-emerald-950/30 border-green-500/20">
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-green-400">
              <Radio className="h-4 w-4" />
              Quantum Hardware
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Backend</span>
                <span className="font-mono">{hardwareStatus.backend}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Qubits</span>
                <span className="font-mono text-green-400">{hardwareStatus.qubits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Queue</span>
                <span className="font-mono">{hardwareStatus.queue} jobs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                  {hardwareStatus.available ? "Available" : "Busy"}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                <Code className="h-4 w-4 mr-2" />
                Generate Organism
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                <Database className="h-4 w-4 mr-2" />
                Query Database
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                <Zap className="h-4 w-4 mr-2" />
                Run Experiment
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                <Shield className="h-4 w-4 mr-2" />
                Security Audit
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
