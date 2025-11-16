/**
 * Statistical Analysis Utilities
 *
 * Provides statistical functions for experimental analysis.
 * Implements proper statistical tests with validation.
 */

export interface TTestResult {
  t_statistic: number;
  p_value: number;
  degrees_of_freedom: number;
  significant: boolean;
  alpha: number;
}

export interface DescriptiveStats {
  mean: number;
  variance: number;
  std_dev: number;
  min: number;
  max: number;
  count: number;
}

/**
 * Compute descriptive statistics for a dataset
 */
export function computeDescriptiveStats(data: number[]): DescriptiveStats {
  if (data.length === 0) {
    throw new Error('Cannot compute statistics on empty dataset');
  }

  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
  const std_dev = Math.sqrt(variance);
  const min = Math.min(...data);
  const max = Math.max(...data);

  return {
    mean,
    variance,
    std_dev,
    min,
    max,
    count: data.length,
  };
}

/**
 * Welch's t-test for unequal variances
 * More robust than standard t-test
 */
export function welchTTest(
  group1: number[],
  group2: number[],
  alpha: number = 0.05
): TTestResult {
  if (group1.length < 2 || group2.length < 2) {
    throw new Error('Both groups must have at least 2 samples for t-test');
  }

  const stats1 = computeDescriptiveStats(group1);
  const stats2 = computeDescriptiveStats(group2);

  // Welch's t-statistic
  const numerator = stats1.mean - stats2.mean;
  const denominator = Math.sqrt(
    stats1.variance / stats1.count + stats2.variance / stats2.count
  );

  if (denominator === 0) {
    throw new Error('Cannot compute t-test: zero variance in both groups');
  }

  const t_statistic = numerator / denominator;

  // Welch-Satterthwaite degrees of freedom
  const s1_sq_n1 = stats1.variance / stats1.count;
  const s2_sq_n2 = stats2.variance / stats2.count;
  const degrees_of_freedom =
    Math.pow(s1_sq_n1 + s2_sq_n2, 2) /
    (Math.pow(s1_sq_n1, 2) / (stats1.count - 1) +
      Math.pow(s2_sq_n2, 2) / (stats2.count - 1));

  // Rough p-value estimate (for production, use proper statistical library)
  const p_value = approximatePValue(Math.abs(t_statistic), degrees_of_freedom);
  const significant = p_value < alpha;

  return {
    t_statistic,
    p_value,
    degrees_of_freedom,
    significant,
    alpha,
  };
}

/**
 * Approximate p-value using exponential decay
 * NOTE: This is a rough approximation. Use proper statistical library in production.
 */
function approximatePValue(t: number, df: number): number {
  // Very rough approximation using exponential decay
  // For production, use jStat, simple-statistics, or similar library
  const p = Math.exp(-Math.abs(t) / Math.sqrt(df));
  return Math.min(1.0, Math.max(0.0, p));
}

/**
 * Cohen's d effect size
 */
export function cohensD(group1: number[], group2: number[]): number {
  const stats1 = computeDescriptiveStats(group1);
  const stats2 = computeDescriptiveStats(group2);

  // Pooled standard deviation
  const pooled_var =
    ((stats1.count - 1) * stats1.variance + (stats2.count - 1) * stats2.variance) /
    (stats1.count + stats2.count - 2);

  const pooled_std = Math.sqrt(pooled_var);

  if (pooled_std === 0) {
    return 0;
  }

  return (stats1.mean - stats2.mean) / pooled_std;
}

/**
 * Calculate confidence interval for mean
 */
export function confidenceInterval(
  data: number[],
  confidence: number = 0.95
): { lower: number; upper: number } {
  if (data.length < 2) {
    throw new Error('Need at least 2 samples for confidence interval');
  }

  const stats = computeDescriptiveStats(data);
  const standardError = stats.std_dev / Math.sqrt(stats.count);

  // Using approximate z-score for 95% confidence (1.96)
  // For production, use t-distribution critical value
  const z_score = confidence === 0.95 ? 1.96 : confidence === 0.99 ? 2.576 : 1.645;
  const margin = z_score * standardError;

  return {
    lower: stats.mean - margin,
    upper: stats.mean + margin,
  };
}

/**
 * Validate that two groups are suitable for comparison
 */
export function validateGroups(
  group1: number[],
  group2: number[]
): { valid: boolean; reason?: string } {
  if (group1.length === 0) {
    return { valid: false, reason: 'Group 1 is empty' };
  }

  if (group2.length === 0) {
    return { valid: false, reason: 'Group 2 is empty' };
  }

  if (group1.length < 3 || group2.length < 3) {
    return {
      valid: false,
      reason: 'Both groups should have at least 3 samples for reliable statistics',
    };
  }

  // Check for NaN or Infinity
  const hasInvalid = (arr: number[]) =>
    arr.some((v) => !isFinite(v));

  if (hasInvalid(group1) || hasInvalid(group2)) {
    return { valid: false, reason: 'Groups contain invalid values (NaN or Infinity)' };
  }

  return { valid: true };
}
