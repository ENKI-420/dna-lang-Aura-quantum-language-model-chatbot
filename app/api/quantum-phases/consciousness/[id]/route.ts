/**
 * Consciousness Telemetry API
 * Real-time streaming of organism consciousness metrics
 */

import { NextRequest, NextResponse } from "next/server";
import { ConsciousnessTelemetry } from "@/lib/quantum-phases/types";

// Import organisms from the main route (in production, use a shared store/database)
let organisms: Map<string, any>;

// Lazy import to avoid circular dependency issues
async function getOrganisms() {
  if (!organisms) {
    const module = await import("../../organisms/route");
    organisms = module.organisms;
  }
  return organisms;
}

/**
 * GET /api/quantum-phases/consciousness/[id]
 * Get current consciousness telemetry for an organism
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const organisms = await getOrganisms();
    const organism = organisms.get(params.id);

    if (!organism) {
      return NextResponse.json(
        { error: "Organism not found" },
        { status: 404 }
      );
    }

    // Generate consciousness telemetry
    const telemetry: ConsciousnessTelemetry = {
      organism_id: organism.id,
      timestamp: Date.now(),
      state: organism.consciousness_state,
      lambda: organism.lambda_history[organism.lambda_history.length - 1] || 0,
      phi: organism.phi_history[organism.phi_history.length - 1] || 0,
      gamma: organism.gamma_history[organism.gamma_history.length - 1] || 0,
      w2: organism.w2_history[organism.w2_history.length - 1] || 0,
      entropy: organism.metabolic_state.entropy,
      delta_entropy: organism.metabolic_state.delta_entropy,
      efficiency: organism.metabolic_state.efficiency,
      stability: organism.metabolic_state.stability,
      drift_norm: 0, // Would come from orchestrator in production
      backend: "ibm_simulator", // Would come from actual backend
      qubits: organism.genome.topology.num_qubits,
    };

    return NextResponse.json(telemetry);
  } catch (error) {
    console.error("Error fetching consciousness telemetry:", error);
    return NextResponse.json(
      { error: "Failed to fetch telemetry" },
      { status: 500 }
    );
  }
}
