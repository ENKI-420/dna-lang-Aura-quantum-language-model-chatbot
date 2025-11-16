# Experimental Suite Changelog

All notable changes to the experimental suite will be documented in this file.

---

## [1.1.0] - 2025-11-16

### Added
- **Statistical Analysis Module** (`utils/statistical-analysis.ts`)
  - Welch's t-test for unequal variances (more robust than standard t-test)
  - Cohen's d effect size calculation
  - Confidence interval computation
  - Descriptive statistics (mean, variance, std dev, min, max)
  - Group validation for statistical tests

- **Configuration Validation Module** (`utils/validation.ts`)
  - Experiment configuration validation with detailed error/warning messages
  - Organism count validation
  - Measurement data validation
  - Gamma value range checking
  - Prevents invalid configurations from running

- **Logging Infrastructure** (`utils/logger.ts`)
  - Structured logging with log levels (DEBUG, INFO, WARN, ERROR)
  - Metadata support for contextual information
  - Log export functionality
  - Error/warning count tracking
  - Console output toggling

- **Centralized Utility Exports** (`utils/index.ts`)
  - Single import point for all utilities
  - Convenience re-exports

### Improved
- **Error Handling**: All utilities now throw descriptive errors for invalid inputs
- **Type Safety**: Strict TypeScript types throughout
- **Code Organization**: Utilities separated into focused modules
- **Documentation**: JSDoc comments for all public functions

### Addressed Code Review Suggestions
- ✅ Better statistical rigor (Welch's t-test vs simple approximation)
- ✅ Input validation before computation
- ✅ Separation of concerns
- ✅ Reusable utility functions
- ✅ Proper error messages
- ✅ Type-safe interfaces
- ✅ Structured logging

---

## [1.0.0] - 2025-11-16

### Added
- **Γ-Spike Detector Experiment** (`experiments/gamma-spike-detector.ts`)
  - Control vs treatment group methodology
  - Real-time Γ spike detection
  - Organism response measurement
  - Statistical analysis
  - JSON result serialization

- **Experimental Documentation** (`README.md`)
  - Complete experimental protocol
  - Metric definitions
  - Usage instructions
  - Result interpretation guide

- **Quick Runner Script** (`run-gamma-spike.sh`)
  - Bash script for quick experiment execution
  - TypeScript compilation handling

### First Experimental Run
- Duration: 2.0 minutes
- Γ Spikes Detected: 12
- Infrastructure validated: ✅
- Identified refinements needed:
  - Γ normalization
  - Survival threshold adjustment
  - Phase-conjugate differentiation

---

## Planned for Next Release

### v1.2.0
- [ ] Improved Γ normalization in `LambdaPhiEngine`
- [ ] Dynamic survival threshold based on population statistics
- [ ] Enhanced phase-conjugate mutation differentiation
- [ ] Integration tests for experimental framework
- [ ] Visualization utilities for result analysis

### v2.0.0
- [ ] Backend Comparison Experiment
- [ ] Drift Tracking Experiment
- [ ] Population Ecology Simulation
- [ ] Real IBM Quantum backend integration
- [ ] WebSocket-based real-time monitoring
- [ ] Experiment dashboard UI

---

## Migration Guide

### Upgrading from 1.0.0 to 1.1.0

**New Dependencies**: None (pure TypeScript utilities)

**API Changes**: None (backwards compatible)

**New Features**:
```typescript
// Use improved statistical analysis
import { welchTTest, cohensD } from './utils';

const result = welchTTest(controlGroup, treatmentGroup);
console.log(`T-statistic: ${result.t_statistic}`);
console.log(`P-value: ${result.p_value}`);
console.log(`Significant: ${result.significant}`);

const effectSize = cohensD(controlGroup, treatmentGroup);
console.log(`Cohen's d: ${effectSize}`);
```

```typescript
// Validate configuration before running
import { validateExperimentConfig } from './utils';

const validation = validateExperimentConfig(config);
if (!validation.valid) {
  console.error('Invalid configuration:', validation.errors);
  process.exit(1);
}
if (validation.warnings.length > 0) {
  console.warn('Warnings:', validation.warnings);
}
```

```typescript
// Use structured logging
import { ExperimentLogger, LogLevel } from './utils';

const logger = new ExperimentLogger(LogLevel.INFO);
logger.info('Starting experiment', { organisms: 20 });
logger.warn('High gamma detected', { gamma: 0.45 });
logger.error('Experiment failed', { reason: 'Backend timeout' });

// Export logs
console.log(logger.exportLogs());
```

---

## Contributors

- Claude (Anthropic) - Initial implementation and utility modules

---

## License

MIT
