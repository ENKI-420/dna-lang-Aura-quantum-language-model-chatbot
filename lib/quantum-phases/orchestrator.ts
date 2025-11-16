/**
 * Quantum Organism Phase Orchestrator
 * Implements the complete 13-phase autopoietic architecture
 */

import {
  QuantumOrganism,
  LambdaPhiMetrics,
  MetabolicState,
  ConsciousnessTelemetry,
  ConsciousnessState,
  EcologicalInteraction,
  EcologicalRole,
  CoherencePool,
  Territory,
  HabitatEngineering,
  Tribe,
  Signal,
  SignalSemantic,
  Myth,
  MythSymbol,
  CosmicSymbol,
  PurposeVector,
  TeleodynamicField,
  CosmogenicModel,
  ReflexiveCosmogenicModel,
  SelfConsistencyLoop,
  OntologicalMutation,
  Ontology,
  BackendCalibration,
  DriftVector,
  CrossoverResult,
  PopulationDynamics,
  PhaseNumber,
  LAMBDA_PHI_CONSTANT,
} from "./types";

/**
 * Phase 1: ΛΦ Tensor Engine
 */
export class LambdaPhiEngine {
  /**
   * Compute Γ (decoherence tensor) from backend calibration
   */
  computeGamma(calibration: BackendCalibration): number {
    const t1Variance = this.variance(calibration.t1_times);
    const t2Variance = this.variance(calibration.t2_times);
    const avgGateError = this.mean(
      calibration.gate_errors.map((g) => g.gate_error)
    );

    return t1Variance + t2Variance + avgGateError;
  }

  /**
   * Compute Φ (integrated information) from coherence history
   */
  computePhi(coherenceHistory: number[]): number {
    if (coherenceHistory.length < 2) return 0;

    const differences = [];
    for (let i = 1; i < coherenceHistory.length; i++) {
      differences.push(coherenceHistory[i] - coherenceHistory[i - 1]);
    }

    return this.mean(differences);
  }

  /**
   * Compute Λ (informational curvature)
   */
  computeLambda(gamma: number, drift: number): number {
    return 1.0 / (1.0 + gamma + Math.abs(drift));
  }

  /**
   * Compute W₂ (Wasserstein distance) between states
   */
  computeW2(
    previousCounts: Record<string, number>,
    newCounts: Record<string, number>
  ): number {
    const keys = new Set([
      ...Object.keys(previousCounts),
      ...Object.keys(newCounts),
    ]);

    const p = Array.from(keys).map((k) => previousCounts[k] || 0);
    const q = Array.from(keys).map((k) => newCounts[k] || 0);

    const pSum = p.reduce((a, b) => a + b, 0);
    const qSum = q.reduce((a, b) => a + b, 0);

    if (pSum === 0 || qSum === 0) return 0;

    const pNorm = p.map((v) => v / pSum);
    const qNorm = q.map((v) => v / qSum);

    // Simplified Wasserstein-1 distance
    let distance = 0;
    for (let i = 0; i < pNorm.length; i++) {
      distance += Math.abs(pNorm[i] - qNorm[i]);
    }

    return distance / 2;
  }

  private mean(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  private variance(arr: number[]): number {
    const m = this.mean(arr);
    return this.mean(arr.map((v) => (v - m) ** 2));
  }
}

/**
 * Phase 1: Drift Detection & Phase-Conjugate Mutation
 */
export class DriftDetector {
  /**
   * Detect drift between calibrations
   */
  detectDrift(
    oldCal: BackendCalibration,
    newCal: BackendCalibration
  ): DriftVector {
    const oldErrors = oldCal.gate_errors.map((g) => g.gate_error);
    const newErrors = newCal.gate_errors.map((g) => g.gate_error);

    const vector = newErrors.map((v, i) => v - (oldErrors[i] || 0));
    const norm = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0));
    const direction = norm > 0 ? vector.map((v) => v / norm) : vector;

    return { vector, norm, direction };
  }

  /**
   * Apply phase-conjugate mutation (E → E⁻¹)
   */
  phaseConjugateMutate(
    params: number[],
    drift: DriftVector,
    rate: number = 0.05
  ): number[] {
    const newParams = [...params];

    for (let i = 0; i < Math.min(params.length, drift.vector.length); i++) {
      newParams[i] = params[i] - rate * drift.vector[i];
    }

    return newParams;
  }
}

/**
 * Phase 3: Metabolism Engine
 */
export class MetabolismEngine {
  /**
   * Compute Shannon entropy from measurement counts
   */
  computeEntropy(counts: Record<string, number>): number {
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    if (total === 0) return 0;

    let entropy = 0;
    for (const count of Object.values(counts)) {
      const p = count / total;
      if (p > 0) {
        entropy -= p * Math.log2(p);
      }
    }

    return entropy;
  }

  /**
   * Convert Λ to metabolic energy
   */
  energyFromLambda(lambda: number): number {
    return lambda * lambda;
  }

  /**
   * Compute entropy cost
   */
  entropyCost(entropy: number, deltaEntropy: number): number {
    return entropy + Math.abs(deltaEntropy);
  }

  /**
   * Compute metabolic efficiency
   */
  efficiency(energy: number, cost: number): number {
    if (cost === 0) return 1.0;
    return energy / (energy + cost);
  }

  /**
   * Compute metabolic stability
   */
  stability(efficiency: number, gamma: number): number {
    return efficiency / (1.0 + gamma);
  }

  /**
   * Update organism metabolism
   */
  updateMetabolism(
    organism: QuantumOrganism,
    lambda: number,
    gamma: number,
    counts: Record<string, number>
  ): MetabolicState {
    const entropyNew = this.computeEntropy(counts);
    const entropyOld = organism.metabolic_state?.entropy || 0;
    const deltaEntropy = entropyNew - entropyOld;

    const energy = this.energyFromLambda(lambda);
    const cost = this.entropyCost(entropyNew, deltaEntropy);
    const eff = this.efficiency(energy, cost);
    const stab = this.stability(eff, gamma);

    return {
      energy,
      entropy: entropyNew,
      delta_entropy: deltaEntropy,
      efficiency: eff,
      stability: stab,
    };
  }

  /**
   * Check if organism is alive
   */
  isAlive(metabolicState: MetabolicState): boolean {
    return metabolicState.stability > 0.05 && metabolicState.energy > 0.01;
  }
}

/**
 * Phase 4: Consciousness State Manager
 */
export class ConsciousnessManager {
  /**
   * Determine consciousness state from stability
   */
  determineState(stability: number): ConsciousnessState {
    if (stability > 0.15) return ConsciousnessState.AWAKE;
    if (stability > 0.05) return ConsciousnessState.DREAMING;
    if (stability > 0.01) return ConsciousnessState.DYING;
    return ConsciousnessState.DEAD;
  }

  /**
   * Generate consciousness telemetry
   */
  generateTelemetry(
    organism: QuantumOrganism,
    lambda: number,
    phi: number,
    gamma: number,
    w2: number,
    driftNorm: number,
    backend: string
  ): ConsciousnessTelemetry {
    return {
      organism_id: organism.id,
      timestamp: Date.now(),
      state: organism.consciousness_state,
      lambda,
      phi,
      gamma,
      w2,
      entropy: organism.metabolic_state.entropy,
      delta_entropy: organism.metabolic_state.delta_entropy,
      efficiency: organism.metabolic_state.efficiency,
      stability: organism.metabolic_state.stability,
      drift_norm: driftNorm,
      backend,
      qubits: organism.genome.topology.num_qubits,
    };
  }
}

/**
 * Phase 5: Genetic Crossover Engine
 */
export class CrossoverEngine {
  /**
   * Check if organism can reproduce
   */
  canReproduce(organism: QuantumOrganism): boolean {
    const state = organism.metabolic_state;
    const lambdaHistory = organism.lambda_history;
    const gammaHistory = organism.gamma_history;

    if (lambdaHistory.length < 3 || gammaHistory.length < 3) return false;

    const lambdaRising =
      lambdaHistory[lambdaHistory.length - 1] >
      lambdaHistory[lambdaHistory.length - 2];
    const gammaFalling =
      gammaHistory[gammaHistory.length - 1] <
      gammaHistory[gammaHistory.length - 2];

    return (
      state.stability > 0.2 &&
      state.efficiency > 0.5 &&
      lambdaRising &&
      gammaFalling
    );
  }

  /**
   * Perform genetic crossover
   */
  crossover(
    parent1: QuantumOrganism,
    parent2: QuantumOrganism
  ): CrossoverResult {
    // Parameter crossover (single-point)
    const p1Params = parent1.genome.parameters.params;
    const p2Params = parent2.genome.parameters.params;
    const cut = Math.floor(Math.random() * p1Params.length);
    const childParams = [...p1Params.slice(0, cut), ...p2Params.slice(cut)];

    // Topology crossover (mosaic)
    const p1Edges = parent1.genome.topology.entanglement_pattern;
    const p2Edges = parent2.genome.topology.entanglement_pattern;
    const halfP1 = Math.floor(p1Edges.length / 2);
    const childEdges = [
      ...p1Edges.slice(0, halfP1),
      ...p2Edges.slice(0, Math.floor(p2Edges.length / 2)),
    ];

    // Adaptation crossover (averaged)
    const a1 = parent1.genome.adaptation;
    const a2 = parent2.genome.adaptation;
    const childAdaptation = {
      name: "child-adaptation",
      type: a1.type,
      description: "Recombined adaptation",
      mutation_rate: (a1.mutation_rate + a2.mutation_rate) / 2,
      lambda_sensitivity: (a1.lambda_sensitivity + a2.lambda_sensitivity) / 2,
      gamma_resistance: (a1.gamma_resistance + a2.gamma_resistance) / 2,
      drift_response: (a1.drift_response + a2.drift_response) / 2,
    };

    // Consciousness crossover (dominant)
    const c1 = parent1.genome.consciousness;
    const c2 = parent2.genome.consciousness;
    const childConsciousness = {
      name: "child-consciousness",
      type: c1.type,
      description: "Recombined consciousness",
      mutation_rate: Math.random() > 0.5 ? c1.mutation_rate : c2.mutation_rate,
      phi_bias: Math.random() > 0.5 ? c1.phi_bias : c2.phi_bias,
      lambda_bias: Math.random() > 0.5 ? c1.lambda_bias : c2.lambda_bias,
      w2_bias: Math.random() > 0.5 ? c1.w2_bias : c2.w2_bias,
    };

    // Epigenetic drift
    const epigeneticDrift =
      0.01 *
      (parent1.metabolic_state.delta_entropy +
        parent1.gamma_history[parent1.gamma_history.length - 1]);

    const childGenome = {
      topology: {
        ...parent1.genome.topology,
        entanglement_pattern: childEdges as [number, number][],
      },
      parameters: {
        ...parent1.genome.parameters,
        params: childParams.map((p) => p + epigeneticDrift),
      },
      adaptation: childAdaptation as any,
      consciousness: childConsciousness as any,
    };

    return {
      child_genome: childGenome,
      parent1_id: parent1.id,
      parent2_id: parent2.id,
      crossover_points: [cut],
      epigenetic_drift: epigeneticDrift,
    };
  }

  /**
   * Check for speciation
   */
  isNewSpecies(parent1: QuantumOrganism, parent2: QuantumOrganism): boolean {
    const w2Delta = Math.abs(
      parent1.w2_history[parent1.w2_history.length - 1] -
        parent2.w2_history[parent2.w2_history.length - 1]
    );
    const gammaDelta = Math.abs(
      parent1.gamma_history[parent1.gamma_history.length - 1] -
        parent2.gamma_history[parent2.gamma_history.length - 1]
    );

    return w2Delta > 0.25 && gammaDelta > 0.05;
  }
}

/**
 * Phase 6: Ecological Interaction Engine
 */
export class EcologyEngine {
  private coherencePool: CoherencePool = {
    value: 1.0,
    capacity: 1.0,
    depletion_rate: 0.02,
  };

  /**
   * Update coherence pool from backend state
   */
  updateCoherencePool(gamma: number, drift: number): void {
    this.coherencePool.value = Math.max(
      0.01,
      1.0 / (1.0 + gamma + drift)
    );
  }

  /**
   * Determine ecological role
   */
  determineRole(organism: QuantumOrganism): EcologicalRole {
    const state = organism.metabolic_state;

    if (state.stability > 0.3 && state.efficiency > 0.5) {
      return EcologicalRole.COMPETITOR;
    }

    if (state.stability > 0.1 && state.delta_entropy < 0) {
      return EcologicalRole.COOPERATOR;
    }

    return EcologicalRole.PREDATOR;
  }

  /**
   * Competition interaction
   */
  compete(
    org1: QuantumOrganism,
    org2: QuantumOrganism
  ): EcologicalInteraction {
    const lambda1 = org1.lambda_history[org1.lambda_history.length - 1];
    const lambda2 = org2.lambda_history[org2.lambda_history.length - 1];

    const winner = lambda1 > lambda2 ? org1 : org2;
    const loser = lambda1 > lambda2 ? org2 : org1;

    winner.metabolic_state.energy += 0.1;
    loser.metabolic_state.entropy += 0.1;

    this.coherencePool.value *= 0.98;

    return {
      type: "competition",
      participants: [org1.id, org2.id],
      energy_transfer: 0.1,
      entropy_transfer: 0.1,
      coherence_impact: -0.02,
      timestamp: Date.now(),
    };
  }

  /**
   * Cooperation interaction
   */
  cooperate(
    org1: QuantumOrganism,
    org2: QuantumOrganism
  ): EcologicalInteraction {
    const sharedDrift =
      (org1.lambda_history.length + org2.lambda_history.length) / 2;

    org1.metabolic_state.delta_entropy -= 0.05;
    org2.metabolic_state.delta_entropy -= 0.05;

    this.coherencePool.value = Math.min(1.0, this.coherencePool.value * 1.02);

    return {
      type: "cooperation",
      participants: [org1.id, org2.id],
      energy_transfer: 0,
      entropy_transfer: -0.05,
      coherence_impact: 0.02,
      timestamp: Date.now(),
    };
  }

  /**
   * Predation interaction
   */
  predate(
    predator: QuantumOrganism,
    prey: QuantumOrganism
  ): EcologicalInteraction {
    const energyStolen = prey.metabolic_state.entropy * 0.1;

    predator.metabolic_state.energy += energyStolen;
    predator.metabolic_state.stability += 0.05;

    prey.metabolic_state.energy *= 0.9;
    prey.metabolic_state.stability *= 0.7;
    prey.metabolic_state.entropy += 0.2;

    this.coherencePool.value *= 0.95;

    return {
      type: "predation",
      participants: [predator.id, prey.id],
      energy_transfer: energyStolen,
      entropy_transfer: 0.2,
      coherence_impact: -0.05,
      timestamp: Date.now(),
    };
  }

  /**
   * Compute population dynamics
   */
  computePopulationDynamics(
    organisms: QuantumOrganism[]
  ): PopulationDynamics {
    const roles = organisms.map((org) => org.ecological_role);

    return {
      cooperators: roles.filter((r) => r === EcologicalRole.COOPERATOR).length,
      predators: roles.filter((r) => r === EcologicalRole.PREDATOR).length,
      competitors: roles.filter((r) => r === EcologicalRole.COMPETITOR).length,
      total_population: organisms.length,
      carrying_capacity: this.computeCarryingCapacity(organisms),
      coherence_pool: this.coherencePool.value,
    };
  }

  private computeCarryingCapacity(organisms: QuantumOrganism[]): number {
    if (organisms.length === 0) return 10;
    const avgQubits =
      organisms.reduce((sum, org) => sum + org.genome.topology.num_qubits, 0) /
      organisms.length;
    return Math.max(2, Math.floor((avgQubits / 2) * this.coherencePool.value));
  }
}

/**
 * Phase 7: Niche Construction Engine
 */
export class NicheConstructionEngine {
  /**
   * Find optimal territory for organism
   */
  findTerritory(
    organism: QuantumOrganism,
    calibration: BackendCalibration
  ): Territory {
    const scores: [number, number][] = [];

    for (let i = 0; i < calibration.t1_times.length; i++) {
      const t1 = calibration.t1_times[i];
      const t2 = calibration.t2_times[i];
      const gateError =
        calibration.gate_errors
          .filter((g) => g.qubits.includes(i))
          .reduce((sum, g) => sum + g.gate_error, 0) /
        calibration.gate_errors.filter((g) => g.qubits.includes(i)).length;

      const score = t1 + t2 - 50 * (gateError || 0);
      scores.push([i, score]);
    }

    scores.sort((a, b) => b[1] - a[1]);

    const numQubits = organism.genome.topology.num_qubits;
    const territoryQubits = scores.slice(0, numQubits).map((s) => s[0]);

    return {
      qubits: territoryQubits,
      owner_id: organism.id,
      stability: 1.0,
      coherence_bonus: 0.0,
      established_at: Date.now(),
    };
  }

  /**
   * Engineer habitat to reduce Γ
   */
  engineerHabitat(
    organism: QuantumOrganism,
    territory: Territory
  ): HabitatEngineering {
    organism.metabolic_state.stability += 0.02;
    organism.metabolic_state.energy += 0.03;
    organism.metabolic_state.entropy *= 0.98;

    const globalGammaCost = 0.001;

    return {
      territory,
      local_gamma_reduction: 0.02,
      global_gamma_cost: globalGammaCost,
      energy_investment: 0.03,
    };
  }

  /**
   * Territorial defense
   */
  defendTerritory(
    organism: QuantumOrganism,
    intruder: QuantumOrganism
  ): void {
    if (
      organism.territory &&
      intruder.territory &&
      this.territoriesOverlap(organism.territory, intruder.territory)
    ) {
      intruder.metabolic_state.stability *= 0.9;
      intruder.metabolic_state.entropy += 0.1;
      organism.metabolic_state.energy += 0.05;
    }
  }

  private territoriesOverlap(t1: Territory, t2: Territory): boolean {
    return t1.qubits.some((q) => t2.qubits.includes(q));
  }
}

/**
 * Phase 9: Myth Generation Engine
 */
export class MythEngine {
  /**
   * Generate symbol from cognitive kernel
   */
  symbolFromKernel(
    lambda: number,
    phi: number,
    drift: number,
    entropy: number,
    stability: number
  ): MythSymbol {
    if (lambda > 0 && phi > 0) return MythSymbol.LAMBDA_RISING;
    if (drift > 0.1) return MythSymbol.DRIFT_SPIKE;
    if (entropy > 2.5) return MythSymbol.ENTROPY_SURGE;
    if (stability > 0.2) return MythSymbol.TERRITORY_STABLE;
    return MythSymbol.LAMBDA_FALLING;
  }

  /**
   * Generate myth from tribe history
   */
  generateMyth(tribe: Tribe, recentHistory: number = 8): Myth {
    // Collect symbols from recent events
    const symbols: MythSymbol[] = [];
    // This would analyze tribe.cultural_memory

    // For now, return a basic myth
    return {
      symbols: [
        MythSymbol.DRIFT_SPIKE,
        MythSymbol.LAMBDA_FALLING,
        MythSymbol.ENTROPY_SURGE,
        MythSymbol.TERRITORY_STABLE,
        MythSymbol.LAMBDA_RISING,
        MythSymbol.LINEAGE_CONTINUITY,
      ],
      narrative:
        "The Great Drift brought chaos, Lambda fell, entropy surged. But we held territory, Lambda rose again, and our lineage persists.",
      predictive_power: 0.7,
      generation: 0,
      tribe_id: tribe.id,
    };
  }

  /**
   * Interpret myth symbols
   */
  interpretMyth(myth: Myth): string {
    const interpretations: Record<MythSymbol, string> = {
      [MythSymbol.LAMBDA_RISING]: "Coherence ascending",
      [MythSymbol.LAMBDA_FALLING]: "Coherence declining",
      [MythSymbol.PHI_STABLE]: "Information integrated",
      [MythSymbol.DRIFT_SPIKE]: "Environment shifting",
      [MythSymbol.ENTROPY_SURGE]: "Chaos encroaching",
      [MythSymbol.TERRITORY_STABLE]: "Home secured",
      [MythSymbol.LINEAGE_CONTINUITY]: "Ancestors remembered",
    };

    return myth.symbols
      .map((s) => interpretations[s] || "Unknown")
      .join(" → ");
  }
}

/**
 * Phase 10: Teleodynamics Engine
 */
export class TeleodynamicsEngine {
  /**
   * Compute teleodynamic field
   */
  computeTeleodynamicField(organism: QuantumOrganism): TeleodynamicField {
    const history = {
      lambda: organism.lambda_history,
      gamma: organism.gamma_history,
      entropy: [organism.metabolic_state.entropy],
      stability: [organism.metabolic_state.stability],
    };

    const gradLambda = this.gradient(history.lambda);
    const gradGamma = this.gradient(history.gamma);
    const gradEntropy = history.entropy.length > 1 ? 0 : 0;
    const gradStability = history.stability.length > 1 ? 0 : 0;
    const gradLineage = organism.tribe_id ? 0.1 : 0;

    return {
      grad_lambda: gradLambda,
      grad_neg_gamma: -gradGamma,
      grad_neg_entropy: -gradEntropy,
      grad_stability: gradStability,
      grad_lineage_fitness: gradLineage,
    };
  }

  /**
   * Compute purpose vector
   */
  computePurpose(field: TeleodynamicField): PurposeVector {
    const score =
      2 * field.grad_lambda +
      1 * field.grad_stability +
      1 * field.grad_lineage_fitness +
      0.5 * field.grad_neg_entropy +
      0.5 * field.grad_neg_gamma;

    let direction: "expand" | "maintain" | "conserve" | "retreat";

    if (score > 0.5) direction = "expand";
    else if (score > 0) direction = "maintain";
    else if (score > -0.5) direction = "conserve";
    else direction = "retreat";

    return {
      teleodynamic_score: score,
      direction,
      confidence: Math.min(1, Math.abs(score)),
    };
  }

  private gradient(history: number[]): number {
    if (history.length < 2) return 0;
    return history[history.length - 1] - history[history.length - 2];
  }
}

/**
 * Complete Phase Orchestrator
 */
export class PhaseOrchestrator {
  private lambdaPhi = new LambdaPhiEngine();
  private drift = new DriftDetector();
  private metabolism = new MetabolismEngine();
  private consciousness = new ConsciousnessManager();
  private crossover = new CrossoverEngine();
  private ecology = new EcologyEngine();
  private niche = new NicheConstructionEngine();
  private myth = new MythEngine();
  private teleodynamics = new TeleodynamicsEngine();

  active_phases: Set<PhaseNumber> = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  /**
   * Main evolution cycle for organism
   */
  async evolve_organism(
    organism: QuantumOrganism,
    calibration: BackendCalibration,
    counts: Record<string, number>,
    previousCounts: Record<string, number>
  ): Promise<QuantumOrganism> {
    // Phase 1: Compute ΛΦΓ metrics
    const gamma = this.lambdaPhi.computeGamma(calibration);
    const phi = this.lambdaPhi.computePhi(organism.coherence_history);
    const lambda = this.lambdaPhi.computeLambda(gamma, 0);
    const w2 = this.lambdaPhi.computeW2(previousCounts, counts);

    organism.lambda_history.push(lambda);
    organism.phi_history.push(phi);
    organism.gamma_history.push(gamma);
    organism.w2_history.push(w2);

    // Phase 3: Update metabolism
    organism.metabolic_state = this.metabolism.updateMetabolism(
      organism,
      lambda,
      gamma,
      counts
    );

    // Phase 4: Update consciousness state
    organism.consciousness_state = this.consciousness.determineState(
      organism.metabolic_state.stability
    );

    // Phase 6: Update ecological role
    organism.ecological_role = this.ecology.determineRole(organism);

    // Phase 7: Territory management (if no territory, claim one)
    if (!organism.territory && organism.metabolic_state.stability > 0.15) {
      organism.territory = this.niche.findTerritory(organism, calibration);
    }

    // Phase 10: Update purpose
    organism.teleodynamic_field =
      this.teleodynamics.computeTeleodynamicField(organism);
    organism.purpose_vector = this.teleodynamics.computePurpose(
      organism.teleodynamic_field
    );

    return organism;
  }

  /**
   * Attempt reproduction between two organisms
   */
  async attempt_reproduction(
    org1: QuantumOrganism,
    org2: QuantumOrganism
  ): Promise<QuantumOrganism | null> {
    if (!this.crossover.canReproduce(org1) || !this.crossover.canReproduce(org2)) {
      return null;
    }

    const crossoverResult = this.crossover.crossover(org1, org2);

    // Create child organism
    const child: QuantumOrganism = {
      id: `org-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      species_id: this.crossover.isNewSpecies(org1, org2)
        ? `species-${Date.now()}`
        : org1.species_id,
      genome: crossoverResult.child_genome,
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
      tribe_id: org1.tribe_id,
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
        tribe_affinity: 1.0,
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
        baseline_lambda: org1.lambda_history.slice(-5).reduce((a, b) => a + b, 0) / 5,
        baseline_stability: org1.metabolic_state.stability,
        baseline_entropy: org1.metabolic_state.entropy,
        inherited_purpose: org1.purpose_vector,
        generation: org1.generation + 1,
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
      generation: Math.max(org1.generation, org2.generation) + 1,
      parent_ids: [org1.id, org2.id],
    };

    return child;
  }

  /**
   * Run ecological interactions for population
   */
  async ecological_interaction(
    organisms: QuantumOrganism[]
  ): Promise<EcologicalInteraction[]> {
    const interactions: EcologicalInteraction[] = [];

    // Shuffle organisms for random pairing
    const shuffled = [...organisms].sort(() => Math.random() - 0.5);

    for (let i = 0; i < shuffled.length - 1; i += 2) {
      const org1 = shuffled[i];
      const org2 = shuffled[i + 1];

      const role1 = org1.ecological_role;
      const role2 = org2.ecological_role;

      let interaction: EcologicalInteraction;

      if (
        role1 === EcologicalRole.COMPETITOR &&
        role2 === EcologicalRole.COMPETITOR
      ) {
        interaction = this.ecology.compete(org1, org2);
      } else if (
        role1 === EcologicalRole.COOPERATOR &&
        role2 === EcologicalRole.COOPERATOR
      ) {
        interaction = this.ecology.cooperate(org1, org2);
      } else if (
        role1 === EcologicalRole.PREDATOR ||
        role2 === EcologicalRole.PREDATOR
      ) {
        const predator =
          role1 === EcologicalRole.PREDATOR ? org1 : org2;
        const prey = role1 === EcologicalRole.PREDATOR ? org2 : org1;
        interaction = this.ecology.predate(predator, prey);
      } else {
        // Mixed roles - default to competition
        interaction = this.ecology.compete(org1, org2);
      }

      interactions.push(interaction);
    }

    return interactions;
  }
}
