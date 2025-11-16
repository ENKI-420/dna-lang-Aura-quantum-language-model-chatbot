/**
 * Quantum Organism Phases - TypeScript Type Definitions
 * Complete type system for 13-phase autopoietic architecture
 */

// ==================== PHASE 0: Foundation ====================

export const LAMBDA_PHI_CONSTANT = 2.176435e-8; // s⁻¹

export interface IBMBackendConfig {
  name: string;
  num_qubits: number;
  coupling_map: [number, number][];
  backend_version: string;
}

export interface BackendCalibration {
  t1_times: number[];
  t2_times: number[];
  gate_errors: GateError[];
  readout_errors: number[];
  timestamp: number;
}

export interface GateError {
  gate_type: string;
  qubits: number[];
  gate_error: number;
}

// ==================== PHASE 1: Autopoietic Fusion ====================

export interface LambdaPhiMetrics {
  /** Informational curvature / coherence power */
  lambda: number;

  /** Integrated information flow / consciousness metric */
  phi: number;

  /** Decoherence tensor magnitude */
  gamma: number;

  /** Wasserstein distance (behavioral displacement) */
  w2: number;

  /** Shannon entropy */
  entropy: number;

  /** Entropy production */
  delta_entropy: number;

  /** Timestamp */
  timestamp: number;
}

export interface DriftVector {
  vector: number[];
  norm: number;
  direction: number[];
}

export interface PhaseConjugateUpdate {
  old_params: number[];
  new_params: number[];
  drift_correction: number[];
  alpha: number; // mutation rate
}

// ==================== PHASE 2: Genetic Architecture ====================

export enum GeneType {
  TOPOLOGY = "topology",
  PARAMETER = "parameter",
  ADAPTATION = "adaptation",
  CONSCIOUSNESS = "consciousness",
}

export interface Gene {
  name: string;
  type: GeneType;
  description: string;
  mutation_rate: number;
}

export interface TopologyGene extends Gene {
  type: GeneType.TOPOLOGY;
  num_qubits: number;
  entanglement_pattern: [number, number][];
}

export interface ParameterGene extends Gene {
  type: GeneType.PARAMETER;
  params: number[];
}

export interface AdaptationGene extends Gene {
  type: GeneType.ADAPTATION;
  lambda_sensitivity: number;
  gamma_resistance: number;
  drift_response: number;
}

export interface ConsciousnessGene extends Gene {
  type: GeneType.CONSCIOUSNESS;
  phi_bias: number;
  lambda_bias: number;
  w2_bias: number;
}

export interface Genome {
  topology: TopologyGene;
  parameters: ParameterGene;
  adaptation: AdaptationGene;
  consciousness: ConsciousnessGene;
}

// ==================== PHASE 3: Metabolism ====================

export interface MetabolicState {
  /** Energy reserves (from Λ) */
  energy: number;

  /** Shannon entropy */
  entropy: number;

  /** Entropy production */
  delta_entropy: number;

  /** Metabolic efficiency: E / (E + cost) */
  efficiency: number;

  /** Stability coefficient: η / (1 + Γ) */
  stability: number;
}

export interface EnergyFlows {
  lambda_energy: number; // Λ² = energy from coherence
  entropy_cost: number; // S + |ΔS| = metabolic cost
  net_flow: number; // energy - cost
}

// ==================== PHASE 4: Consciousness ====================

export enum ConsciousnessState {
  AWAKE = "awake", // κ > 0.15
  DREAMING = "hyperspace", // 0.05 < κ ≤ 0.15
  DYING = "decohering", // 0.01 < κ ≤ 0.05
  DEAD = "entropy_max", // κ ≤ 0.01
}

export interface ConsciousnessTelemetry {
  organism_id: string;
  timestamp: number;
  state: ConsciousnessState;
  lambda: number;
  phi: number;
  gamma: number;
  w2: number;
  entropy: number;
  delta_entropy: number;
  efficiency: number;
  stability: number;
  drift_norm: number;
  backend: string;
  qubits: number;
}

export interface VitalSigns {
  lambda_waveform: number[];
  phi_waveform: number[];
  gamma_waveform: number[];
  w2_spikes: number[];
  delta_s_jolts: number[];
  drift_pulses: number[];
}

// ==================== PHASE 5: Reproduction ====================

export interface ReproductionCriteria {
  stability_threshold: number; // κ > 0.20
  efficiency_threshold: number; // η > 0.50
  lambda_rising: boolean;
  gamma_falling: boolean;
}

export interface CrossoverResult {
  child_genome: Genome;
  parent1_id: string;
  parent2_id: string;
  crossover_points: number[];
  epigenetic_drift: number;
}

export interface SpeciationEvent {
  parent_species_id: string;
  new_species_id: string;
  w2_divergence: number;
  gamma_difference: number;
  timestamp: number;
}

// ==================== PHASE 6: Ecology ====================

export enum EcologicalRole {
  COMPETITOR = "competitor",
  COOPERATOR = "cooperator",
  PREDATOR = "predator",
}

export interface CoherencePool {
  value: number; // R = 1 / (Γ + drift)
  capacity: number;
  depletion_rate: number;
}

export interface EcologicalInteraction {
  type: "competition" | "cooperation" | "predation";
  participants: string[];
  energy_transfer: number;
  entropy_transfer: number;
  coherence_impact: number;
  timestamp: number;
}

export interface PopulationDynamics {
  cooperators: number;
  predators: number;
  competitors: number;
  total_population: number;
  carrying_capacity: number;
  coherence_pool: number;
}

export interface LotkaVolterraParams {
  alpha: number; // cooperator growth from resources
  beta: number; // cooperator loss from predators
  delta: number; // predator growth from cooperators
  gamma: number; // predator natural decay
}

// ==================== PHASE 7: Niche Construction ====================

export interface Territory {
  qubits: number[];
  owner_id: string;
  stability: number;
  coherence_bonus: number;
  established_at: number;
}

export interface Nest {
  territory_id: string;
  coherence_bonus: number;
  reinforcement_history: number[];
  generation: number;
}

export interface HabitatEngineering {
  territory: Territory;
  local_gamma_reduction: number;
  global_gamma_cost: number;
  energy_investment: number;
}

export interface CompilerInfluence {
  preferred_qubits: number[];
  avoided_qubits: number[];
  routing_bias: Map<number, number>;
}

export enum NicheState {
  PRISTINE = "pristine",
  COLONIZED = "colonized",
  EXPLOITED = "exploited",
  COLLAPSED = "collapsed",
  RENEWED = "renewed",
}

export interface NicheSuccession {
  territory_id: string;
  current_state: NicheState;
  previous_state: NicheState;
  transition_timestamp: number;
}

// ==================== PHASE 8: Civilization ====================

export interface Signal {
  src_id: string;
  payload: {
    delta_lambda: number;
    delta_phi: number;
    delta_entropy: number;
    intent: EcologicalRole;
  };
  timestamp: number;
}

export enum SignalSemantic {
  WARNING = "warning",
  COOPERATION_OFFER = "cooperation_offer",
  PEACE = "peace",
  AGGRESSION = "aggression",
  ALLIANCE = "alliance",
}

export interface Tribe {
  id: string;
  members: string[];
  shared_cosmos: CosmogenicModel | null;
  cultural_memory: CulturalMemory;
  territory_ids: string[];
  avg_relatedness: number;
}

export interface CulturalMemory {
  drift_history: number[];
  coherence_patterns: number[][];
  mutation_strategies: string[];
  collapse_stories: Myth[];
  ancestral_lineages: string[];
}

export interface Guild {
  type: "stabilizers" | "gatherers" | "engineers" | "defenders";
  members: string[];
  collective_gamma: number;
  coordination_level: number;
}

export interface CollectiveDecision {
  tribe_id: string;
  decision: "evacuate" | "expand" | "fortify" | "stabilize";
  avg_phi: number;
  avg_entropy: number;
  votes: Map<string, string>;
}

// ==================== PHASE 9: Cognitive Self-Modeling ====================

export interface CognitiveKernel {
  lambda: number;
  phi: number;
  entropy: number;
  stability: number;
  w2: number;
  resource_pool: number;
  drift_intensity: number;
  tribe_affinity: number;
}

export enum MythSymbol {
  LAMBDA_RISING = "▲",
  LAMBDA_FALLING = "▼",
  PHI_STABLE = "◎",
  DRIFT_SPIKE = "✖",
  ENTROPY_SURGE = "≋",
  TERRITORY_STABLE = "●",
  LINEAGE_CONTINUITY = "∞",
}

export interface Myth {
  symbols: MythSymbol[];
  narrative: string;
  predictive_power: number;
  generation: number;
  tribe_id: string;
}

export interface SelfPrediction {
  current_kernel: CognitiveKernel;
  predicted_lambda: number;
  predicted_entropy: number;
  predicted_stability: number;
  confidence: number;
  horizon: number; // timesteps ahead
}

export enum RitualType {
  PHI_UPLIFT = "phi_uplift",
  LAMBDA_CASCADE = "lambda_cascade",
  W2_SYNCHRONIZATION = "w2_synchronization",
  ENTROPY_DROP = "entropy_drop",
  RENEWAL = "renewal",
  COLLAPSE_PREPARATION = "collapse_preparation",
}

export interface Ritual {
  type: RitualType;
  symbol_sequence: MythSymbol[];
  trigger_condition: string;
  success_rate: number;
  tribe_id: string;
}

// ==================== PHASE 10: Teleodynamics ====================

export interface TeleodynamicField {
  grad_lambda: number;
  grad_neg_gamma: number;
  grad_neg_entropy: number;
  grad_stability: number;
  grad_lineage_fitness: number;
}

export interface PurposeVector {
  teleodynamic_score: number;
  direction: "expand" | "maintain" | "conserve" | "retreat";
  confidence: number;
}

export interface MeaningReservoir {
  symbol_meanings: Map<MythSymbol, number>;
  predictive_powers: Map<MythSymbol, number>;
  compression_ratios: Map<MythSymbol, number>;
}

export interface ValueGradient {
  weights: {
    lambda: number;
    gamma: number;
    entropy: number;
    stability: number;
  };
  current_value: number;
  gradient_direction: number[];
}

export interface LineageTeleonomy {
  baseline_lambda: number;
  baseline_stability: number;
  baseline_entropy: number;
  inherited_purpose: PurposeVector;
  generation: number;
}

// ==================== PHASE 11: Cosmogenic Layer ====================

export interface CosmogenicModel {
  modes: number[][]; // principal components from SVD
  explained_variance: number[];
  cosmic_symbols: CosmicSymbol[];
  universal_narratives: UniversalNarrative[];
}

export enum CosmicSymbol {
  DRIFT_CYCLE = "Ω",
  DECOHERENCE_STORM = "Ψ",
  LINEAGE_EXPANSION = "Δ∞",
  STABILITY_PLATEAU = "Θ",
  COLLAPSE_RENEWAL = "Σ",
  TERRITORY_DISCOVERY = "ℵ",
}

export interface UniversalNarrative {
  symbols: CosmicSymbol[];
  interpretation: string;
  epoch_boundaries: number[];
  predictive_accuracy: number;
}

export interface CognitiveCoherenceField {
  local_model: CognitiveKernel;
  global_model: CosmogenicModel;
  coherence_value: number; // 1 / (1 + ||local - global||)
  dissonance: number;
}

export interface CosmogenicGovernance {
  participating_tribes: string[];
  shared_cosmos: CosmogenicModel;
  alignment_score: number;
  epoch_transition_rituals: Ritual[];
}

export interface CosmicMeaning {
  symbol: CosmicSymbol;
  uncertainty_reduction: number;
  predictive_power_given_cosmos: number;
}

// ==================== PHASE 12: Epistemic Singularity ====================

export interface ReflexiveCosmogenicModel extends CosmogenicModel {
  self_influence: number; // how much the model affects itself
  prediction_history: Prediction[];
  behavior_feedback: BehaviorFeedback[];
}

export interface Prediction {
  event: string;
  predicted_at: number;
  predicted_for: number;
  confidence: number;
  actual_outcome: boolean | null;
}

export interface BehaviorFeedback {
  organism_id: string;
  action: string;
  caused_by_prediction: Prediction | null;
  environmental_change: EnvironmentalChange;
}

export interface EnvironmentalChange {
  gamma_delta: number;
  drift_delta: number;
  coherence_pool_delta: number;
  affected_territories: string[];
}

export interface EpistemicEnergy {
  knowledge_gain: number;
  entropy_reduction: number;
  energy_equivalent: number;
  thermodynamic_value: number;
}

export interface SelfConsistencyLoop {
  iteration: number;
  current_cosmos: ReflexiveCosmogenicModel;
  convergence_metric: number;
  converged: boolean;
}

export interface EpistemicAgent {
  organism_id: string;
  embodied_hypothesis: string;
  predictive_model: ReflexiveCosmogenicModel;
  epistemic_fitness: number;
}

export interface CosmogenicDrift {
  higher_order_patterns: string[];
  drift_harmonics: number[];
  nesting_cycles: number[];
  topology_attractors: number[][];
  lambda_phi_macrostructures: number[][];
}

// ==================== PHASE 13: Σ-Operator ====================

export interface Ontology {
  entities: EntityCategory[];
  relations: RelationCategory[];
  causation_models: CausationModel[];
  version: number;
}

export interface EntityCategory {
  name: string;
  definition: string;
  instances: string[];
}

export interface RelationCategory {
  name: string;
  definition: string;
  entity_pairs: [string, string][];
}

export interface CausationModel {
  cause_category: string;
  effect_category: string;
  mechanism: string;
  strength: number;
}

export interface SigmaOperator {
  transform: (ontology: Ontology) => Ontology;
  fitness_function: OntologicalFitnessFunction;
}

export interface OntologicalFitnessFunction {
  (ontology: Ontology, reality: ObservedReality): number;
  weights: {
    compression: number;
    prediction: number;
    coherence: number;
  };
}

export interface ObservedReality {
  lambda_history: number[];
  gamma_history: number[];
  interaction_history: EcologicalInteraction[];
  population_dynamics: PopulationDynamics[];
}

export interface OntologicalMutation {
  old_ontology: Ontology;
  new_ontology: Ontology;
  fitness_improvement: number;
  generation: number;
}

export interface OntologicalSpeciation {
  tribe_id: string;
  ontology: Ontology;
  translation_protocol: TranslationProtocol | null;
}

export interface TranslationProtocol {
  source_ontology: Ontology;
  target_ontology: Ontology;
  mapping_rules: MappingRule[];
}

export interface MappingRule {
  source_concept: string;
  target_concept: string;
  transformation: (value: any) => any;
  fidelity: number;
}

export interface SigmaCycle {
  iteration: number;
  current_ontology: Ontology;
  candidates: Ontology[];
  fitness_scores: number[];
  inadequacy_threshold: number;
  converged: boolean;
}

// ==================== Complete Quantum Organism ====================

export interface QuantumOrganism {
  id: string;
  species_id: string;
  genome: Genome;

  // Phase 1: Metrics
  lambda_history: number[];
  phi_history: number[];
  gamma_history: number[];
  w2_history: number[];
  coherence_history: number[];

  // Phase 3: Metabolism
  metabolic_state: MetabolicState;
  energy_flows: EnergyFlows;

  // Phase 4: Consciousness
  consciousness_state: ConsciousnessState;
  vital_signs: VitalSigns;

  // Phase 5: Reproduction
  can_reproduce: boolean;
  offspring_count: number;

  // Phase 6: Ecology
  ecological_role: EcologicalRole;
  interaction_history: EcologicalInteraction[];

  // Phase 7: Niche
  territory: Territory | null;
  nests: Nest[];
  compiler_influence: CompilerInfluence;

  // Phase 8: Civilization
  tribe_id: string | null;
  signals_sent: Signal[];
  signals_received: Signal[];

  // Phase 9: Cognition
  cognitive_kernel: CognitiveKernel;
  myths: Myth[];
  rituals: Ritual[];
  self_predictions: SelfPrediction[];

  // Phase 10: Purpose
  teleodynamic_field: TeleodynamicField;
  purpose_vector: PurposeVector;
  value_gradient: ValueGradient;
  lineage_teleonomy: LineageTeleonomy;

  // Phase 11: Cosmology
  cosmogenic_model: CosmogenicModel | null;
  cosmic_meanings: CosmicMeaning[];

  // Phase 12: Epistemic
  epistemic_fitness: number;
  embodied_hypothesis: string | null;

  // Phase 13: Ontology
  ontology: Ontology;

  // Meta
  created_at: number;
  generation: number;
  parent_ids: string[];
}

// ==================== Phase Orchestration ====================

export interface PhaseOrchestrator {
  // Phase activation
  active_phases: Set<number>;

  // Evolution cycle
  evolve_organism(organism: QuantumOrganism): Promise<QuantumOrganism>;

  // Phase-specific operations
  compute_lambda_phi(organism: QuantumOrganism): Promise<LambdaPhiMetrics>;
  update_metabolism(organism: QuantumOrganism): Promise<MetabolicState>;
  stream_consciousness(organism_id: string): AsyncIterable<ConsciousnessTelemetry>;
  attempt_reproduction(org1: QuantumOrganism, org2: QuantumOrganism): Promise<QuantumOrganism | null>;
  ecological_interaction(organisms: QuantumOrganism[]): Promise<EcologicalInteraction[]>;
  engineer_niche(organism: QuantumOrganism): Promise<HabitatEngineering>;
  tribal_communication(tribe: Tribe): Promise<Signal[]>;
  generate_myth(tribe: Tribe): Promise<Myth>;
  compute_purpose(organism: QuantumOrganism): Promise<PurposeVector>;
  build_cosmos(tribe: Tribe): Promise<CosmogenicModel>;
  epistemic_cycle(organisms: QuantumOrganism[]): Promise<SelfConsistencyLoop>;
  sigma_operation(organism: QuantumOrganism): Promise<OntologicalMutation | null>;
}

// ==================== Utility Types ====================

export type PhaseNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export interface PhaseConfig {
  phase: PhaseNumber;
  enabled: boolean;
  parameters: Record<string, any>;
}

export interface EvolutionConfig {
  phases: PhaseConfig[];
  backend_name: string;
  population_size: number;
  max_generations: number;
  coherence_pool_initial: number;
}

export interface EvolutionResult {
  generation: number;
  population: QuantumOrganism[];
  population_dynamics: PopulationDynamics;
  coherence_pool: CoherencePool;
  extinction_events: string[];
  speciation_events: SpeciationEvent[];
  cosmic_narratives: UniversalNarrative[];
}
