/**
 * Quantum Phase Evolution API
 * Trigger evolution cycles for organisms
 */

import { NextRequest, NextResponse } from "next/server";
import { BackendCalibration } from "@/lib/quantum-phases/types";

// Import shared resources
let organisms: Map<string, any>;
let orchestrator: any;

async function getSharedResources() {
  if (!organisms || !orchestrator) {
    const module = await import("../organisms/route");
    organisms = module.organisms;
    orchestrator = module.orchestrator;
  }
  return { organisms, orchestrator };
}

/**
 * POST /api/quantum-phases/evolve
 * Evolve one or more organisms through a generation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { organism_ids, generations = 1, backend = "ibm_simulator" } = body;

    if (!organism_ids || !Array.isArray(organism_ids)) {
      return NextResponse.json(
        { error: "organism_ids array required" },
        { status: 400 }
      );
    }

    const { organisms: orgMap, orchestrator: orch } =
      await getSharedResources();

    // Mock backend calibration (replace with real backend data)
    const mockCalibration: BackendCalibration = {
      t1_times: Array.from({ length: 127 }, () => 100 + Math.random() * 50),
      t2_times: Array.from({ length: 127 }, () => 80 + Math.random() * 40),
      gate_errors: Array.from({ length: 200 }, (_, i) => ({
        gate_type: "cx",
        qubits: [i % 127, (i + 1) % 127],
        gate_error: 0.001 + Math.random() * 0.01,
      })),
      readout_errors: Array.from({ length: 127 }, () => Math.random() * 0.05),
      timestamp: Date.now(),
    };

    const results = [];

    for (let gen = 0; gen < generations; gen++) {
      for (const orgId of organism_ids) {
        const organism = orgMap.get(orgId);

        if (!organism) {
          continue;
        }

        // Simulate measurement counts (replace with real quantum execution)
        const mockCounts: Record<string, number> = {};
        const numStates = Math.pow(2, organism.genome.topology.num_qubits);
        for (let i = 0; i < Math.min(10, numStates); i++) {
          const bitstring = i.toString(2).padStart(organism.genome.topology.num_qubits, '0');
          mockCounts[bitstring] = Math.floor(Math.random() * 100);
        }

        const previousCounts = organism.lambda_history.length > 0
          ? mockCounts // In real system, would use actual previous counts
          : {};

        // Evolve organism
        const evolved = await orch.evolve_organism(
          organism,
          mockCalibration,
          mockCounts,
          previousCounts
        );

        // Update stored organism
        orgMap.set(orgId, evolved);

        results.push({
          organism_id: orgId,
          generation: gen + 1,
          lambda: evolved.lambda_history[evolved.lambda_history.length - 1],
          phi: evolved.phi_history[evolved.phi_history.length - 1],
          gamma: evolved.gamma_history[evolved.gamma_history.length - 1],
          stability: evolved.metabolic_state.stability,
          consciousness_state: evolved.consciousness_state,
          ecological_role: evolved.ecological_role,
        });
      }
    }

    return NextResponse.json({
      success: true,
      generations_completed: generations,
      results,
    });
  } catch (error) {
    console.error("Error evolving organisms:", error);
    return NextResponse.json(
      { error: "Failed to evolve organisms" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/quantum-phases/evolve/population
 * Evolve entire population with ecological interactions
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { generations = 1 } = body;

    const { organisms: orgMap, orchestrator: orch } =
      await getSharedResources();

    const organismList = Array.from(orgMap.values());

    if (organismList.length === 0) {
      return NextResponse.json(
        { error: "No organisms to evolve" },
        { status: 400 }
      );
    }

    const evolutionLog = [];

    for (let gen = 0; gen < generations; gen++) {
      // Run ecological interactions
      const interactions = await orch.ecological_interaction(organismList);

      // Attempt reproduction
      const newOrganisms = [];
      for (let i = 0; i < organismList.length - 1; i += 2) {
        const child = await orch.attempt_reproduction(
          organismList[i],
          organismList[i + 1]
        );

        if (child) {
          newOrganisms.push(child);
          orgMap.set(child.id, child);
        }
      }

      // Remove dead organisms
      const alive = organismList.filter(
        (org) => org.metabolic_state.stability > 0.05
      );
      const dead = organismList.filter(
        (org) => org.metabolic_state.stability <= 0.05
      );

      for (const org of dead) {
        orgMap.delete(org.id);
      }

      evolutionLog.push({
        generation: gen + 1,
        population_size: alive.length + newOrganisms.length,
        births: newOrganisms.length,
        deaths: dead.length,
        interactions: interactions.length,
        avg_lambda:
          alive.reduce(
            (sum, org) =>
              sum + (org.lambda_history[org.lambda_history.length - 1] || 0),
            0
          ) / alive.length,
        avg_stability:
          alive.reduce((sum, org) => sum + org.metabolic_state.stability, 0) /
          alive.length,
      });
    }

    return NextResponse.json({
      success: true,
      generations_completed: generations,
      final_population: orgMap.size,
      evolution_log: evolutionLog,
    });
  } catch (error) {
    console.error("Error evolving population:", error);
    return NextResponse.json(
      { error: "Failed to evolve population" },
      { status: 500 }
    );
  }
}
