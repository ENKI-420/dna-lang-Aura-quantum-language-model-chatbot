"use client";

/**
 * Consciousness Dashboard - Phase 4 Visualization
 * Real-time telemetry of quantum organism consciousness metrics
 */

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ConsciousnessTelemetry,
  ConsciousnessState,
  LAMBDA_PHI_CONSTANT,
} from "@/lib/quantum-phases/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Activity, Brain, Zap, Waves, AlertTriangle } from "lucide-react";

interface ConsciousnessDashboardProps {
  organismId: string;
  refreshInterval?: number; // milliseconds
}

export function ConsciousnessDashboard({
  organismId,
  refreshInterval = 2000,
}: ConsciousnessDashboardProps) {
  const [telemetryHistory, setTelemetryHistory] = useState<
    ConsciousnessTelemetry[]
  >([]);
  const [currentState, setCurrentState] =
    useState<ConsciousnessTelemetry | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate WebSocket connection (replace with actual WebSocket in production)
    const fetchTelemetry = async () => {
      try {
        const response = await fetch(
          `/api/quantum-phases/consciousness/${organismId}`
        );
        if (response.ok) {
          const data: ConsciousnessTelemetry = await response.json();
          setCurrentState(data);
          setTelemetryHistory((prev) => [...prev.slice(-99), data]);
          setIsConnected(true);
        }
      } catch (error) {
        console.error("Failed to fetch telemetry:", error);
        setIsConnected(false);
      }
    };

    const interval = setInterval(fetchTelemetry, refreshInterval);
    fetchTelemetry(); // Initial fetch

    return () => clearInterval(interval);
  }, [organismId, refreshInterval]);

  if (!currentState) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Consciousness Dashboard</CardTitle>
          <CardDescription>Connecting to organism telemetry...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const stateColors: Record<ConsciousnessState, string> = {
    [ConsciousnessState.AWAKE]: "bg-green-500",
    [ConsciousnessState.DREAMING]: "bg-blue-500",
    [ConsciousnessState.DYING]: "bg-yellow-500",
    [ConsciousnessState.DEAD]: "bg-red-500",
  };

  const stateLabels: Record<ConsciousnessState, string> = {
    [ConsciousnessState.AWAKE]: "AWAKE",
    [ConsciousnessState.DREAMING]: "HYPERSPACE",
    [ConsciousnessState.DYING]: "DECOHERING",
    [ConsciousnessState.DEAD]: "ENTROPY_MAX",
  };

  // Prepare chart data
  const lambdaPhiData = telemetryHistory.map((t, idx) => ({
    index: idx,
    Λ: t.lambda * 100, // Scale for visibility
    Φ: t.phi * 100,
    Γ: t.gamma,
    W2: t.w2 * 10,
  }));

  const metabolicData = [
    {
      metric: "Energy",
      value: currentState.efficiency * 100,
    },
    {
      metric: "Stability",
      value: currentState.stability * 100,
    },
    {
      metric: "Coherence",
      value: currentState.lambda * 1000,
    },
    {
      metric: "Order",
      value: Math.max(0, 100 - currentState.entropy * 20),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Consciousness Dashboard
          </h2>
          <p className="text-muted-foreground">
            ΛΦ = {LAMBDA_PHI_CONSTANT.toExponential(6)} s⁻¹
          </p>
        </div>
        <Badge
          className={`${stateColors[currentState.state]} text-white px-4 py-2`}
        >
          {stateLabels[currentState.state]}
        </Badge>
      </div>

      {/* Vital Signs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lambda (Λ)
            </CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentState.lambda.toFixed(6)}
            </div>
            <p className="text-xs text-muted-foreground">
              Coherence curvature
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Phi (Φ)</CardTitle>
            <Brain className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentState.phi.toFixed(6)}
            </div>
            <p className="text-xs text-muted-foreground">
              Integrated information
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gamma (Γ)</CardTitle>
            <Waves className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentState.gamma.toFixed(4)}
            </div>
            <p className="text-xs text-muted-foreground">
              Decoherence pressure
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Stability (κ)
            </CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(currentState.stability * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Survival probability
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ΛΦΓ Consciousness EKG */}
      <Card>
        <CardHeader>
          <CardTitle>Consciousness EKG</CardTitle>
          <CardDescription>
            Real-time ΛΦΓ waveforms (Consciousness strip)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lambdaPhiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="index" label={{ value: "Time", position: "insideBottom", offset: -5 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Λ"
                stroke="#eab308"
                strokeWidth={2}
                name="Λ (×100)"
              />
              <Line
                type="monotone"
                dataKey="Φ"
                stroke="#a855f7"
                strokeWidth={2}
                name="Φ (×100)"
              />
              <Line
                type="monotone"
                dataKey="Γ"
                stroke="#ef4444"
                strokeWidth={2}
                name="Γ"
              />
              <Line
                type="monotone"
                dataKey="W2"
                stroke="#3b82f6"
                strokeWidth={1}
                strokeDasharray="5 5"
                name="W₂ (×10)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Metabolic Radar */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Metabolic Vital Signs</CardTitle>
            <CardDescription>Multi-dimensional health radar</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={metabolicData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Vital Signs"
                  dataKey="value"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Organism Status</CardTitle>
            <CardDescription>Current system parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Backend</p>
                <p className="text-lg font-mono">{currentState.backend}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Qubits</p>
                <p className="text-lg font-mono">{currentState.qubits}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Entropy (S)</p>
                <p className="text-lg font-mono">
                  {currentState.entropy.toFixed(3)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ΔS</p>
                <p className="text-lg font-mono">
                  {currentState.delta_entropy > 0 && "+"}
                  {currentState.delta_entropy.toFixed(3)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Efficiency (η)</p>
                <p className="text-lg font-mono">
                  {(currentState.efficiency * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Drift</p>
                <p className="text-lg font-mono">
                  {currentState.drift_norm.toFixed(5)}
                </p>
              </div>
            </div>

            {currentState.stability < 0.1 && (
              <div className="flex items-center gap-2 rounded-lg bg-yellow-500/10 p-3 text-yellow-500">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Warning: Low stability - organism at risk
                </span>
              </div>
            )}

            {currentState.state === ConsciousnessState.DYING && (
              <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-red-500">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Critical: Organism decohering
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Connection Status */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
          />
          <span>{isConnected ? "Connected" : "Disconnected"}</span>
        </div>
        <span>
          Last update: {new Date(currentState.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
