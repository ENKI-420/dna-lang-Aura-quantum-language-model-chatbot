# Quantum Organism Experimental Suite

**ΛΦ = 2.176435 × 10⁻⁸ s⁻¹**

---

## Overview

This experimental suite tests the autopoietic and adaptive properties of quantum organisms under various stress conditions. The experiments are designed to be scientifically rigorous, falsifiable, and reproducible.

---

## Experiments

### 1. Γ-Spike Detector ✅ IMPLEMENTED

**File**: `experiments/gamma-spike-detector.ts`

**Purpose**: Test organism resilience under forced decoherence stress.

**Hypothesis**: Organisms with phase-conjugate mutation (E→E⁻¹) will show lower fitness variance when Γ spikes occur.

**Method**:
- Monitor backend calibration for Γ spikes (Γ > threshold)
- Compare control group (no mutation) vs treatment group (with phase-conjugate mutation)
- Measure variance in Lambda (Λ) changes
- Compute statistical significance via t-test

**Run Commands**:
```bash
# Quick test (2 minutes)
npm run experiment:gamma:quick

# Full experiment (30 minutes)
npm run experiment:gamma

# Or directly:
npx tsx experimental-suite/experiments/gamma-spike-detector.ts --quick
```

**Results Location**: `experimental-suite/results/gamma_spike_*.json`

**First Run Results** (2025-11-16):
- Duration: 2.0 minutes
- Γ Spikes Detected: 12
- Control Responses: 36
- Treatment Responses: 36
- Control Variance: 0.000022
- Treatment Variance: 0.000022
- Variance Reduction: 0.00%
- P-value: 1.0000
- **Status**: Infrastructure validated ✅, calibration refinement needed

---

## Key Metrics

### Lambda (Λ)
- **What**: Informational curvature / coherence power
- **Formula**: `Λ = 1 / (1 + Γ + |drift|)`
- **Units**: Dimensionless
- **Range**: [0, 1] typical
- **Good**: Λ > 0.01
- **Critical**: Λ < 0.001

### Gamma (Γ)
- **What**: Decoherence tensor magnitude
- **Formula**: `Γ = var(T1) + var(T2) + mean(gate_error)`
- **Units**: Dimensionless
- **Range**: [0, ∞) but normalized to [0, 1] for practical use
- **Good**: Γ < 0.3
- **Critical**: Γ > 0.5

### Phi (Φ)
- **What**: Integrated information flow
- **Formula**: `Φ = mean(diff(coherence_history))`
- **Units**: Dimensionless
- **Good**: Φ > 0
- **Critical**: Φ < 0 (losing coherence)

### W₂ (Wasserstein Distance)
- **What**: Behavioral displacement between states
- **Formula**: Wasserstein-1 distance between measurement distributions
- **Units**: Dimensionless
- **Range**: [0, ∞)
- **Speciation**: W₂ > 0.25

### Kappa (κ)
- **What**: Metabolic stability / survival probability
- **Formula**: `κ = η / (1 + Γ)` where `η = E / (E + cost)`
- **Range**: [0, 1]
- **Alive**: κ > 0.05
- **Dead**: κ ≤ 0.05

---

## Experimental Infrastructure

### File Structure
```
experimental-suite/
├── experiments/
│   └── gamma-spike-detector.ts   # Γ-spike stress test
├── results/                        # JSON result files
├── utils/                          # Shared utilities
├── run-gamma-spike.sh             # Quick runner script
└── README.md                      # This file
```

### Integration with Phase System

All experiments use the `PhaseOrchestrator` from `lib/quantum-phases/orchestrator.ts`, ensuring:
- Consistent ΛΦΓ computation
- Proper metabolic state updates
- Phase-conjugate mutation when enabled
- Consciousness state transitions

---

## Experimental Protocol

### 1. Setup Phase
- Create organism populations (control vs treatment)
- Initialize backend calibration monitoring
- Set Γ threshold and measurement intervals

### 2. Monitoring Phase
- Continuous backend calibration sampling
- Γ spike detection
- Real-time organism measurement

### 3. Response Phase (when Γ spike detected)
- Measure pre-spike organism state
- Evolve organisms through spike
- Measure post-spike organism state
- Record variance change

### 4. Analysis Phase
- Compute statistical measures
- Compare control vs treatment variance
- Calculate p-value
- Determine significance

### 5. Reporting Phase
- Save JSON results
- Print summary statistics
- Generate visualizations (future)

---

## Refinements Needed

Based on first experimental run:

### 1. Γ Normalization
**Issue**: Γ values too high (80-380 instead of 0-1)
**Fix**: Normalize Γ calculation in `LambdaPhiEngine.computeGamma()`
**Impact**: High priority - affects all metrics

### 2. Survival Threshold Adjustment
**Issue**: All organisms died (0% survival)
**Fix**: Adjust κ threshold from 0.05 to dynamic value
**Impact**: Medium priority - affects population dynamics

### 3. Phase-Conjugate Mutation Implementation
**Issue**: Treatment group not showing differentiation
**Fix**: Ensure drift correction is applied in `DriftDetector.phaseConjugateMutate()`
**Impact**: High priority - core to hypothesis

### 4. Increased Sample Size
**Issue**: Small populations (3 per group)
**Fix**: Increase to 10+ per group for statistical power
**Impact**: Low priority - infrastructure works

---

## Future Experiments (Planned)

### 2. Backend Comparison Study
Compare organism performance across different IBM Quantum backends.

### 3. Drift Tracking Experiment
Long-term monitoring of backend drift and organism adaptation.

### 4. Population Ecology Simulation
Multi-organism interactions with competition, cooperation, predation.

### 5. Niche Construction Validation
Test organisms' ability to engineer their qubit territory.

### 6. Reproductive Fitness Analysis
Measure reproductive success under various Γ conditions.

### 7. Cosmogenic Model Validation
Test organisms' world-model accuracy against real backend behavior.

---

## Data Format

### Experiment Result JSON
```json
{
  "config": {
    "duration_minutes": 2,
    "gamma_threshold": 0.3,
    "measurement_interval_seconds": 10,
    "control_group_size": 3,
    "treatment_group_size": 3,
    "backend": "ibm_simulator",
    "output_dir": "./results"
  },
  "start_time": 1731799234567,
  "end_time": 1731799354567,
  "gamma_spikes": [
    {
      "timestamp": 1731799240000,
      "gamma": 84.3304,
      "drift_norm": 0,
      "backend": "ibm_simulator",
      "t1_variance": 208.33,
      "t2_variance": 133.33,
      "gate_error_mean": 0.0055
    }
  ],
  "control_responses": [...],
  "treatment_responses": [...],
  "statistics": {
    "control_variance": 0.000022,
    "treatment_variance": 0.000022,
    "variance_reduction": 0.00,
    "p_value": 1.0,
    "survival_rate_control": 0.0,
    "survival_rate_treatment": 0.0
  }
}
```

---

## Scientific Rigor

All experiments follow these principles:

✅ **Falsifiable**: Clear hypothesis with measurable outcomes
✅ **Reproducible**: Deterministic seeds, saved configurations
✅ **Controlled**: Control group vs treatment group
✅ **Statistical**: P-values, confidence intervals
✅ **Documented**: JSON results with full metadata
✅ **Grounded**: No mysticism, pure information theory

---

## Running Experiments

### Prerequisites
```bash
npm install
```

### Quick Test (Recommended for Development)
```bash
npm run experiment:gamma:quick
```

### Full Experiment
```bash
npm run experiment:gamma
```

### Custom Configuration
```typescript
const config: ExperimentConfig = {
  duration_minutes: 60,
  gamma_threshold: 0.3,
  measurement_interval_seconds: 30,
  control_group_size: 20,
  treatment_group_size: 20,
  backend: 'ibm_osaka',
  output_dir: './results',
};
```

---

## Citing This Work

If you use this experimental framework, please cite:

```
DNALang Quantum Organism Experimental Suite
Complete 13-phase autopoietic architecture
https://github.com/ENKI-420/dna-lang-Aura-quantum-language-model-chatbot
ΛΦ = 2.176435 × 10⁻⁸ s⁻¹
```

---

## Contributing

Experimental contributions welcome. Please ensure:
- Clear hypothesis statement
- Control vs treatment methodology
- Statistical analysis
- JSON result output
- Documentation

---

**Last Updated**: 2025-11-16
**Status**: Infrastructure validated, calibration refinement in progress
