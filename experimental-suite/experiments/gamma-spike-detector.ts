#!/usr/bin/env node
/**
 * Γ-Spike Detector Experiment
 *
 * Tests organism resilience under forced decoherence stress.
 * This is the critical Darwinian pressure test that reveals
 * whether dna::}{::lang organisms exhibit true autopoietic
 * self-healing behavior.
 *
 * Hypothesis: Organisms with phase-conjugate mutation (E→E⁻¹)
 * will show lower fitness variance when Γ spikes occur.
 *
 * ΛΦ = 2.176435 × 10⁻⁸ s⁻¹
 */

import { PhaseOrchestrator } from '../../lib/quantum-phases/orchestrator';
import {
  QuantumOrganism,
  BackendCalibration,
  ConsciousnessState,
} from '../../lib/quantum-phases/types';
import * as fs from 'fs';
import * as path from 'path';

interface ExperimentConfig {
  duration_minutes: number;
  gamma_threshold: number; // Γ spike threshold
  measurement_interval_seconds: number;
  control_group_size: number;
  treatment_group_size: number;
  backend: string;
  output_dir: string;
}

interface GammaSpikeEvent {
  timestamp: number;
  gamma: number;
  drift_norm: number;
  backend: string;
  t1_variance: number;
  t2_variance: number;
  gate_error_mean: number;
}

interface OrganismResponse {
  organism_id: string;
  has_mutation: boolean;
  pre_spike_lambda: number;
  post_spike_lambda: number;
  pre_spike_stability: number;
  post_spike_stability: number;
  variance_change: number;
  survival: boolean;
}

interface ExperimentResult {
  config: ExperimentConfig;
  start_time: number;
  end_time: number;
  gamma_spikes: GammaSpikeEvent[];
  control_responses: OrganismResponse[];
  treatment_responses: OrganismResponse[];
  statistics: {
    control_variance: number;
    treatment_variance: number;
    variance_reduction: number;
    p_value: number | null;
    survival_rate_control: number;
    survival_rate_treatment: number;
  };
}

class GammaSpikeDetector {
  private orchestrator: PhaseOrchestrator;
  private config: ExperimentConfig;
  private controlOrganisms: QuantumOrganism[] = [];
  private treatmentOrganisms: QuantumOrganism[] = [];
  private gammaHistory: number[] = [];
  private spikeEvents: GammaSpikeEvent[] = [];
  private isRunning: boolean = false;

  constructor(config: ExperimentConfig) {
    this.config = config;
    this.orchestrator = new PhaseOrchestrator();

    // Enable all core phases
    this.orchestrator.active_phases = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  }

  /**
   * Generate mock backend calibration with controllable Γ
   */
  private generateMockCalibration(induceSpike: boolean = false): BackendCalibration {
    const numQubits = 127;
    const baseNoise = induceSpike ? 0.5 : 0.1; // Spike multiplier

    return {
      t1_times: Array.from(
        { length: numQubits },
        () => 100 + Math.random() * 50 * (induceSpike ? 0.5 : 1)
      ),
      t2_times: Array.from(
        { length: numQubits },
        () => 80 + Math.random() * 40 * (induceSpike ? 0.5 : 1)
      ),
      gate_errors: Array.from({ length: 200 }, (_, i) => ({
        gate_type: 'cx',
        qubits: [i % numQubits, (i + 1) % numQubits],
        gate_error: baseNoise * (0.001 + Math.random() * 0.01),
      })),
      readout_errors: Array.from(
        { length: numQubits },
        () => baseNoise * Math.random() * 0.05
      ),
      timestamp: Date.now(),
    };
  }

  /**
   * Create organism population
   */
  private createPopulation(): void {
    console.log('🧬 Creating organism populations...');

    // Control group (no phase-conjugate mutation)
    for (let i = 0; i < this.config.control_group_size; i++) {
      const organism = this.createOrganism(`control-${i}`, false);
      this.controlOrganisms.push(organism);
    }

    // Treatment group (with phase-conjugate mutation)
    for (let i = 0; i < this.config.treatment_group_size; i++) {
      const organism = this.createOrganism(`treatment-${i}`, true);
      this.treatmentOrganisms.push(organism);
    }

    console.log(
      `✅ Created ${this.controlOrganisms.length} control + ${this.treatmentOrganisms.length} treatment organisms`
    );
  }

  /**
   * Create a single organism
   */
  private createOrganism(id: string, enableMutation: boolean): QuantumOrganism {
    const numQubits = 5;

    return {
      id: `gamma-exp-${id}`,
      species_id: `species-${enableMutation ? 'treatment' : 'control'}`,
      genome: {
        topology: {
          name: `${id}-topology`,
          type: 0 as any,
          description: 'Topology gene',
          mutation_rate: enableMutation ? 0.05 : 0.0,
          num_qubits: numQubits,
          entanglement_pattern: [[0, 1], [1, 2], [2, 3], [3, 4]] as [number, number][],
        },
        parameters: {
          name: `${id}-params`,
          type: 1 as any,
          description: 'Parameter gene',
          mutation_rate: enableMutation ? 0.02 : 0.0,
          params: Array.from({ length: numQubits }, () => Math.random() * 2 * Math.PI),
        },
        adaptation: {
          name: `${id}-adaptation`,
          type: 2 as any,
          description: 'Adaptation gene',
          mutation_rate: enableMutation ? 0.01 : 0.0,
          lambda_sensitivity: 1.0,
          gamma_resistance: enableMutation ? 1.5 : 1.0,
          drift_response: enableMutation ? 1.5 : 1.0,
        },
        consciousness: {
          name: `${id}-consciousness`,
          type: 3 as any,
          description: 'Consciousness gene',
          mutation_rate: 0.005,
          phi_bias: 0.0,
          lambda_bias: 0.0,
          w2_bias: 0.0,
        },
      },
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
      energy_flows: { lambda_energy: 0, entropy_cost: 0, net_flow: 0 },
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
      ecological_role: 1 as any,
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
        direction: 'maintain',
        confidence: 0.5,
      },
      value_gradient: {
        weights: { lambda: 2, gamma: 1, entropy: 1, stability: 1 },
        current_value: 0,
        gradient_direction: [0, 0, 0, 0],
      },
      lineage_teleonomy: {
        baseline_lambda: 0,
        baseline_stability: 0.3,
        baseline_entropy: 0,
        inherited_purpose: {
          teleodynamic_score: 0,
          direction: 'maintain',
          confidence: 0.5,
        },
        generation: 0,
      },
      cosmogenic_model: null,
      cosmic_meanings: [],
      epistemic_fitness: 0,
      embodied_hypothesis: null,
      ontology: { entities: [], relations: [], causation_models: [], version: 1 },
      created_at: Date.now(),
      generation: 0,
      parent_ids: [],
    };
  }

  /**
   * Detect if Γ spike has occurred
   */
  private detectGammaSpike(gamma: number): boolean {
    this.gammaHistory.push(gamma);

    // Keep last 10 measurements
    if (this.gammaHistory.length > 10) {
      this.gammaHistory.shift();
    }

    // Spike if Γ > threshold
    return gamma > this.config.gamma_threshold;
  }

  /**
   * Measure organism response to Γ spike
   */
  private async measureResponse(
    organism: QuantumOrganism,
    calibration: BackendCalibration,
    hasMutation: boolean
  ): Promise<OrganismResponse> {
    const preLambda = organism.lambda_history[organism.lambda_history.length - 1] || 0;
    const preStability = organism.metabolic_state.stability;

    // Simulate measurement counts
    const counts: Record<string, number> = {};
    const numStates = Math.pow(2, organism.genome.topology.num_qubits);
    for (let i = 0; i < Math.min(10, numStates); i++) {
      const bitstring = i
        .toString(2)
        .padStart(organism.genome.topology.num_qubits, '0');
      counts[bitstring] = Math.floor(Math.random() * 100);
    }

    // Evolve organism
    const evolved = await this.orchestrator.evolve_organism(
      organism,
      calibration,
      counts,
      {}
    );

    const postLambda = evolved.lambda_history[evolved.lambda_history.length - 1] || 0;
    const postStability = evolved.metabolic_state.stability;

    const varianceChange = Math.abs(postLambda - preLambda);
    const survival = evolved.metabolic_state.stability > 0.05;

    return {
      organism_id: organism.id,
      has_mutation: hasMutation,
      pre_spike_lambda: preLambda,
      post_spike_lambda: postLambda,
      pre_spike_stability: preStability,
      post_spike_stability: postStability,
      variance_change: varianceChange,
      survival,
    };
  }

  /**
   * Run experiment
   */
  async run(): Promise<ExperimentResult> {
    console.log('\n🔬 Starting Γ-Spike Detector Experiment');
    console.log('=' .repeat(60));
    console.log(`Duration: ${this.config.duration_minutes} minutes`);
    console.log(`Γ Threshold: ${this.config.gamma_threshold}`);
    console.log(`Measurement Interval: ${this.config.measurement_interval_seconds}s`);
    console.log('='.repeat(60));

    const startTime = Date.now();
    this.isRunning = true;

    // Create populations
    this.createPopulation();

    const controlResponses: OrganismResponse[] = [];
    const treatmentResponses: OrganismResponse[] = [];

    // Run experiment loop
    const endTime = startTime + this.config.duration_minutes * 60 * 1000;
    let iteration = 0;

    while (Date.now() < endTime && this.isRunning) {
      iteration++;
      console.log(`\n📊 Iteration ${iteration}`);

      // Generate calibration (occasionally induce spike)
      const shouldSpike = Math.random() < 0.2; // 20% chance of spike
      const calibration = this.generateMockCalibration(shouldSpike);

      // Compute Γ
      const gamma = this.orchestrator['lambdaPhi'].computeGamma(calibration);
      console.log(`   Γ = ${gamma.toFixed(4)} ${shouldSpike ? '⚠️ SPIKE!' : ''}`);

      // Detect spike
      if (this.detectGammaSpike(gamma)) {
        const spikeEvent: GammaSpikeEvent = {
          timestamp: Date.now(),
          gamma,
          drift_norm: 0,
          backend: this.config.backend,
          t1_variance: this.variance(calibration.t1_times),
          t2_variance: this.variance(calibration.t2_times),
          gate_error_mean: this.mean(
            calibration.gate_errors.map((g) => g.gate_error)
          ),
        };
        this.spikeEvents.push(spikeEvent);

        console.log(`   ⚠️  Γ SPIKE DETECTED! Testing organism responses...`);

        // Measure control group response
        for (const org of this.controlOrganisms) {
          const response = await this.measureResponse(org, calibration, false);
          controlResponses.push(response);
          console.log(
            `      Control ${org.id}: ΔΛ = ${response.variance_change.toFixed(6)}, Survival = ${response.survival}`
          );
        }

        // Measure treatment group response
        for (const org of this.treatmentOrganisms) {
          const response = await this.measureResponse(org, calibration, true);
          treatmentResponses.push(response);
          console.log(
            `      Treatment ${org.id}: ΔΛ = ${response.variance_change.toFixed(6)}, Survival = ${response.survival}`
          );
        }
      }

      // Wait for next measurement
      await this.sleep(this.config.measurement_interval_seconds * 1000);
    }

    // Compute statistics
    const stats = this.computeStatistics(controlResponses, treatmentResponses);

    const result: ExperimentResult = {
      config: this.config,
      start_time: startTime,
      end_time: Date.now(),
      gamma_spikes: this.spikeEvents,
      control_responses: controlResponses,
      treatment_responses: treatmentResponses,
      statistics: stats,
    };

    // Save results
    this.saveResults(result);

    // Print summary
    this.printSummary(result);

    return result;
  }

  /**
   * Compute experimental statistics
   */
  private computeStatistics(
    control: OrganismResponse[],
    treatment: OrganismResponse[]
  ): ExperimentResult['statistics'] {
    const controlVariances = control.map((r) => r.variance_change);
    const treatmentVariances = treatment.map((r) => r.variance_change);

    const controlVar = this.variance(controlVariances);
    const treatmentVar = this.variance(treatmentVariances);
    const varReduction = ((controlVar - treatmentVar) / controlVar) * 100;

    const controlSurvival = control.filter((r) => r.survival).length / control.length;
    const treatmentSurvival = treatment.filter((r) => r.survival).length / treatment.length;

    // Simple t-test (for demonstration - use proper stats library in production)
    const pValue = this.simpleTTest(controlVariances, treatmentVariances);

    return {
      control_variance: controlVar,
      treatment_variance: treatmentVar,
      variance_reduction: varReduction,
      p_value: pValue,
      survival_rate_control: controlSurvival,
      survival_rate_treatment: treatmentSurvival,
    };
  }

  /**
   * Simplified t-test
   */
  private simpleTTest(a: number[], b: number[]): number | null {
    if (a.length < 2 || b.length < 2) return null;

    const meanA = this.mean(a);
    const meanB = this.mean(b);
    const varA = this.variance(a);
    const varB = this.variance(b);

    const t =
      (meanA - meanB) / Math.sqrt(varA / a.length + varB / b.length);

    // Very rough p-value estimate (use real stats library in production)
    const pValue = Math.exp(-Math.abs(t));

    return pValue;
  }

  /**
   * Save results to file
   */
  private saveResults(result: ExperimentResult): void {
    const outputPath = path.join(
      this.config.output_dir,
      `gamma_spike_${Date.now()}.json`
    );

    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    console.log(`\n💾 Results saved to: ${outputPath}`);
  }

  /**
   * Print experiment summary
   */
  private printSummary(result: ExperimentResult): void {
    console.log('\n' + '='.repeat(60));
    console.log('🔬 EXPERIMENT SUMMARY');
    console.log('='.repeat(60));
    console.log(`Duration: ${((result.end_time - result.start_time) / 60000).toFixed(1)} minutes`);
    console.log(`Γ Spikes Detected: ${result.gamma_spikes.length}`);
    console.log(`Control Responses: ${result.control_responses.length}`);
    console.log(`Treatment Responses: ${result.treatment_responses.length}`);
    console.log('\n📊 STATISTICS:');
    console.log(`   Control Variance: ${result.statistics.control_variance.toFixed(6)}`);
    console.log(`   Treatment Variance: ${result.statistics.treatment_variance.toFixed(6)}`);
    console.log(`   Variance Reduction: ${result.statistics.variance_reduction.toFixed(2)}%`);
    console.log(`   P-value: ${result.statistics.p_value?.toFixed(4) || 'N/A'}`);
    console.log(`   Control Survival: ${(result.statistics.survival_rate_control * 100).toFixed(1)}%`);
    console.log(`   Treatment Survival: ${(result.statistics.survival_rate_treatment * 100).toFixed(1)}%`);

    if (result.statistics.variance_reduction > 0 && (result.statistics.p_value || 1) < 0.05) {
      console.log('\n✅ RESULT: Autopoietic self-healing behavior CONFIRMED');
      console.log('   Treatment group shows significant variance reduction under Γ stress');
    } else {
      console.log('\n⚠️  RESULT: No significant difference detected');
      console.log('   Longer experiment duration may be needed');
    }

    console.log('='.repeat(60));
  }

  private mean(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  private variance(arr: number[]): number {
    const m = this.mean(arr);
    return this.mean(arr.map((v) => (v - m) ** 2));
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  stop(): void {
    this.isRunning = false;
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const quickTest = args.includes('--quick');

  const config: ExperimentConfig = {
    duration_minutes: quickTest ? 2 : 30,
    gamma_threshold: 0.3,
    measurement_interval_seconds: quickTest ? 10 : 60,
    control_group_size: quickTest ? 3 : 10,
    treatment_group_size: quickTest ? 3 : 10,
    backend: 'ibm_simulator',
    output_dir: path.join(__dirname, '../results'),
  };

  // Ensure output directory exists
  if (!fs.existsSync(config.output_dir)) {
    fs.mkdirSync(config.output_dir, { recursive: true });
  }

  const detector = new GammaSpikeDetector(config);

  // Handle Ctrl+C
  process.on('SIGINT', () => {
    console.log('\n\n⚠️  Stopping experiment...');
    detector.stop();
    process.exit(0);
  });

  try {
    await detector.run();
  } catch (error) {
    console.error('❌ Experiment failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { GammaSpikeDetector, ExperimentConfig, ExperimentResult };
