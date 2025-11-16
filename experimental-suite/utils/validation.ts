/**
 * Experimental Configuration Validation
 *
 * Ensures experimental configurations are valid before execution.
 */

import type { ExperimentConfig } from '../experiments/gamma-spike-detector';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate experiment configuration
 */
export function validateExperimentConfig(config: ExperimentConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Duration validation
  if (config.duration_minutes <= 0) {
    errors.push('Duration must be greater than 0 minutes');
  }
  if (config.duration_minutes > 1440) {
    warnings.push('Duration exceeds 24 hours - consider splitting into multiple runs');
  }

  // Gamma threshold validation
  if (config.gamma_threshold <= 0) {
    errors.push('Gamma threshold must be positive');
  }
  if (config.gamma_threshold > 1.0) {
    warnings.push(
      'Gamma threshold > 1.0 may never trigger (typical range: 0.1-0.5)'
    );
  }

  // Measurement interval validation
  if (config.measurement_interval_seconds <= 0) {
    errors.push('Measurement interval must be positive');
  }
  if (config.measurement_interval_seconds < 5) {
    warnings.push(
      'Very short measurement interval (<5s) may cause excessive overhead'
    );
  }
  if (config.measurement_interval_seconds > config.duration_minutes * 60) {
    errors.push(
      'Measurement interval cannot exceed total duration'
    );
  }

  // Population size validation
  if (config.control_group_size < 1) {
    errors.push('Control group must have at least 1 organism');
  }
  if (config.treatment_group_size < 1) {
    errors.push('Treatment group must have at least 1 organism');
  }
  if (config.control_group_size < 3 || config.treatment_group_size < 3) {
    warnings.push(
      'Small group sizes (<3) may reduce statistical power'
    );
  }
  if (
    config.control_group_size > 100 ||
    config.treatment_group_size > 100
  ) {
    warnings.push(
      'Large group sizes (>100) may cause memory/performance issues'
    );
  }

  // Backend validation
  if (!config.backend || config.backend.trim().length === 0) {
    errors.push('Backend name cannot be empty');
  }

  // Output directory validation
  if (!config.output_dir || config.output_dir.trim().length === 0) {
    errors.push('Output directory cannot be empty');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate organism counts
 */
export function validateOrganismCounts(
  controlCount: number,
  treatmentCount: number,
  expected: number
): boolean {
  return (
    controlCount === expected &&
    treatmentCount === expected &&
    controlCount > 0 &&
    treatmentCount > 0
  );
}

/**
 * Validate measurement data
 */
export function validateMeasurementData(
  counts: Record<string, number>
): { valid: boolean; reason?: string } {
  if (Object.keys(counts).length === 0) {
    return { valid: false, reason: 'Measurement counts are empty' };
  }

  for (const [bitstring, count] of Object.entries(counts)) {
    if (count < 0) {
      return {
        valid: false,
        reason: `Negative count for bitstring ${bitstring}`,
      };
    }
    if (!Number.isInteger(count)) {
      return {
        valid: false,
        reason: `Non-integer count for bitstring ${bitstring}`,
      };
    }
  }

  return { valid: true };
}

/**
 * Validate Γ value is in acceptable range
 */
export function validateGamma(
  gamma: number
): { valid: boolean; reason?: string } {
  if (!isFinite(gamma)) {
    return { valid: false, reason: 'Gamma is not finite' };
  }

  if (gamma < 0) {
    return { valid: false, reason: 'Gamma cannot be negative' };
  }

  // Warning for extremely high gamma
  if (gamma > 100) {
    return {
      valid: true,
      reason: 'Warning: Γ > 100 suggests calibration issue',
    };
  }

  return { valid: true };
}
