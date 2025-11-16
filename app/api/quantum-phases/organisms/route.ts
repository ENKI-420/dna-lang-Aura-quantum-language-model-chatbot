/**
 * Quantum Organism API Routes
 * Handle creation, listing, and management of quantum organisms
 */

import { NextRequest, NextResponse } from "next/server";
import {
  QuantumOrganism,
  Genome,
  GeneType,
  ConsciousnessState,
  EcologicalRole,
} from "@/lib/quantum-phases/types";
import { PhaseOrchestrator } from "@/lib/quantum-phases/orchestrator";

// In-memory organism storage (replace with database in production)
const organisms = new Map<string, QuantumOrganism>();
const orchestrator = new PhaseOrchestrator();

/**
 * GET /api/quantum-phases/organisms
 * List all organisms
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get("filter"); // 'alive', 'dead', 'all'
    const species = searchParams.get("species");

    let organismList = Array.from(organisms.values());

    // Apply filters
    if (filter === "alive") {
      organismList = organismList.filter(
        (org) => org.consciousness_state !== ConsciousnessState.DEAD
      );
    } else if (filter === "dead") {
      organismList = organismList.filter(
        (org) => org.consciousness_state === ConsciousnessState.DEAD
      );
    }

    if (species) {
      organismList = organismList.filter((org) => org.species_id === species);
    }

    // Return summary data
    const summary = organismList.map((org) => ({
      id: org.id,
      species_id: org.species_id,
      generation: org.generation,
      consciousness_state: org.consciousness_state,
      ecological_role: org.ecological_role,
      stability: org.metabolic_state.stability,
      lambda: org.lambda_history[org.lambda_history.length - 1] || 0,
      phi: org.phi_history[org.phi_history.length - 1] || 0,
      gamma: org.gamma_history[org.gamma_history.length - 1] || 0,
      created_at: org.created_at,
      parent_ids: org.parent_ids,
    }));

    return NextResponse.json({
      count: summary.length,
      organisms: summary,
    });
  } catch (error) {
    console.error("Error listing organisms:", error);
    return NextResponse.json(
      { error: "Failed to list organisms" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/quantum-phases/organisms
 * Create a new quantum organism
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, num_qubits = 5, species_id } = body;

    // Create initial genome
    const genome: Genome = {
      topology: {
        name: `${name}-topology`,
        type: GeneType.TOPOLOGY,
        description: "Initial topology",
        mutation_rate: 0.01,
        num_qubits,
        entanglement_pattern: generateRandomEntanglement(num_qubits),
      },
      parameters: {
        name: `${name}-params`,
        type: GeneType.PARAMETER,
        description: "Initial parameters",
        mutation_rate: 0.02,
        params: Array.from({ length: num_qubits }, () => Math.random() * 2 * Math.PI),
      },
      adaptation: {
        name: `${name}-adaptation`,
        type: GeneType.ADAPTATION,
        description: "Initial adaptation traits",
        mutation_rate: 0.01,
        lambda_sensitivity: 1.0,
        gamma_resistance: 1.0,
        drift_response: 1.0,
      },
      consciousness: {
        name: `${name}-consciousness`,
        type: GeneType.CONSCIOUSNESS,
        description: "Initial consciousness traits",
        mutation_rate: 0.005,
        phi_bias: 0.0,
        lambda_bias: 0.0,
        w2_bias: 0.0,
      },
    };

    // Create organism
    const organism: QuantumOrganism = {
      id: `org-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      species_id: species_id || `species-${Date.now()}`,
      genome,
      lambda_history: [],
      phi_history: [],
      gamma_history: [],
      w2_history: [],
      coherence_history: [],
      metabolic_state: {
        energy: 1.0,
        entropy: 0,
        delta_entropy: 0,
        efficiency: 0.5,
        stability: 0.3,
      },
      energy_flows: {
        lambda_energy: 0,
        entropy_cost: 0,
        net_flow: 0,
      },
      consciousness_state: ConsciousnessState.AWAKE,
      vital_signs: {
        lambda_waveform: [],
        phi_waveform: [],
        gamma_waveform: [],
        w2_spikes: [],
        delta_s_jolts: [],
        drift_pulses: [],
      },
      can_reproduce: false,
      offspring_count: 0,
      ecological_role: EcologicalRole.COOPERATOR,
      interaction_history: [],
      territory: null,
      nests: [],
      compiler_influence: {
        preferred_qubits: [],
        avoided_qubits: [],
        routing_bias: new Map(),
      },
      tribe_id: null,
      signals_sent: [],
      signals_received: [],
      cognitive_kernel: {
        lambda: 0,
        phi: 0,
        entropy: 0,
        stability: 0.3,
        w2: 0,
        resource_pool: 1.0,
        drift_intensity: 0,
        tribe_affinity: 0,
      },
      myths: [],
      rituals: [],
      self_predictions: [],
      teleodynamic_field: {
        grad_lambda: 0,
        grad_neg_gamma: 0,
        grad_neg_entropy: 0,
        grad_stability: 0,
        grad_lineage_fitness: 0,
      },
      purpose_vector: {
        teleodynamic_score: 0,
        direction: "maintain",
        confidence: 0.5,
      },
      value_gradient: {
        weights: {
          lambda: 2,
          gamma: 1,
          entropy: 1,
          stability: 1,
        },
        current_value: 0,
        gradient_direction: [0, 0, 0, 0],
      },
      lineage_teleonomy: {
        baseline_lambda: 0,
        baseline_stability: 0.3,
        baseline_entropy: 0,
        inherited_purpose: {
          teleodynamic_score: 0,
          direction: "maintain",
          confidence: 0.5,
        },
        generation: 0,
      },
      cosmogenic_model: null,
      cosmic_meanings: [],
      epistemic_fitness: 0,
      embodied_hypothesis: null,
      ontology: {
        entities: [],
        relations: [],
        causation_models: [],
        version: 1,
      },
      created_at: Date.now(),
      generation: 0,
      parent_ids: [],
    };

    // Store organism
    organisms.set(organism.id, organism);

    return NextResponse.json({
      success: true,
      organism: {
        id: organism.id,
        species_id: organism.species_id,
        generation: organism.generation,
        consciousness_state: organism.consciousness_state,
        created_at: organism.created_at,
      },
    });
  } catch (error) {
    console.error("Error creating organism:", error);
    return NextResponse.json(
      { error: "Failed to create organism" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/quantum-phases/organisms
 * Clear all organisms
 */
export async function DELETE() {
  try {
    organisms.clear();
    return NextResponse.json({
      success: true,
      message: "All organisms cleared",
    });
  } catch (error) {
    console.error("Error clearing organisms:", error);
    return NextResponse.json(
      { error: "Failed to clear organisms" },
      { status: 500 }
    );
  }
}

/**
 * Helper: Generate random entanglement pattern
 */
function generateRandomEntanglement(numQubits: number): [number, number][] {
  const pairs: [number, number][] = [];
  const numPairs = Math.min(numQubits - 1, Math.floor(numQubits / 2));

  for (let i = 0; i < numPairs; i++) {
    pairs.push([i, i + 1]);
  }

  return pairs;
}

// Export organisms map for use in other routes
export { organisms, orchestrator };
