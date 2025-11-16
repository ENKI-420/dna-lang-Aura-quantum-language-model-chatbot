# Quantum Organism Phase Integration Guide

## Overview

This guide explains how the 13-phase quantum organism architecture integrates with the existing DNALang NQRE (Natural Quantum Reality Engine) organism system.

---

## Architecture Integration

### Existing System
The DNALang application already has:
- **NQRE Organisms**: Self-evolving autopoietic quantum systems
- **Quantum Evolution API**: VQE and Grover algorithm optimization
- **DNA-Lang SDK**: TypeScript client for quantum computing APIs
- **Block Explorer**: HSL quantum block analysis with IPFS

### New Phase System
The 13-phase architecture adds:
- **Complete metabolic system** (Phase 3)
- **Consciousness telemetry** (Phase 4)
- **Genetic crossover & reproduction** (Phase 5)
- **Multi-organism ecology** (Phase 6)
- **Niche construction** (Phase 7)
- **Civilization layer** (Phase 8)
- **Cognitive self-modeling** (Phase 9)
- **Teleodynamics & purpose** (Phase 10)
- **Cosmogenic layer** (Phase 11)
- **Epistemic singularity** (Phase 12)
- **Ontological rewrite** (Phase 13)

---

## Integration Points

### 1. NQRE Organism Enhancement

The existing NQRE organism structure can be enhanced with phase capabilities:

```typescript
// Before (existing NQRE organism)
interface NQREOrganism {
  id: string;
  name: string;
  state: OrganismState;
  dna: DNADefinition;
}

// After (with phase integration)
import { QuantumOrganism, PhaseOrchestrator } from '@/lib/quantum-phases';

const enhancedOrganism: QuantumOrganism = {
  ...nqreOrganism,
  // Add all 13-phase capabilities
  lambda_history: [],
  phi_history: [],
  metabolic_state: { ... },
  consciousness_state: ConsciousnessState.AWAKE,
  // ... etc
};
```

### 2. Evolution Loop Integration

The existing NQRE evolution can be augmented with phase orchestration:

```typescript
import { PhaseOrchestrator } from '@/lib/quantum-phases';

const orchestrator = new PhaseOrchestrator();

// In your existing evolution loop:
async function evolveOrganism(organism) {
  // Existing NQRE evolution
  const nqreResult = await runNQREEvolution(organism);

  // Add phase evolution
  const phaseResult = await orchestrator.evolve_organism(
    organism,
    backendCalibration,
    measurementCounts,
    previousCounts
  );

  // Merge results
  return {
    ...nqreResult,
    ...phaseResult,
  };
}
```

### 3. API Route Coexistence

The phase API routes coexist with existing NQRE routes:

```
app/api/
├── dna-lang/              # Existing NQRE APIs
│   ├── evolution/
│   └── organisms/
└── quantum-phases/        # New phase APIs
    ├── organisms/
    ├── consciousness/
    └── evolve/
```

Both can be used together or independently.

### 4. Dashboard Integration

Add phase consciousness dashboard to existing pages:

```tsx
// In app/nqre-organisms/page.tsx
import { ConsciousnessDashboard } from '@/components/consciousness-dashboard';

export default function NQREPage() {
  return (
    <>
      {/* Existing NQRE UI */}
      <OrganismList />

      {/* New consciousness dashboard */}
      <ConsciousnessDashboard organismId={selectedOrganism.id} />
    </>
  );
}
```

---

## Migration Strategies

### Strategy 1: Parallel Systems
Run NQRE and Phase systems side-by-side:
- Keep existing NQRE organisms
- Create new phase-enhanced organisms
- Compare performance and capabilities

### Strategy 2: Gradual Enhancement
Add phases incrementally to existing organisms:
1. Start with Phase 1 (ΛΦΓ metrics)
2. Add Phase 3 (metabolism)
3. Add Phase 4 (consciousness telemetry)
4. Continue through higher phases as needed

### Strategy 3: Full Replacement
Replace NQRE system with complete phase architecture:
- Migrate existing organisms to `QuantumOrganism` type
- Update all APIs to use `PhaseOrchestrator`
- Deploy new consciousness dashboard

---

## Data Flow Example

### Complete Evolution Cycle

```typescript
import { PhaseOrchestrator } from '@/lib/quantum-phases';

// 1. Initialize
const orchestrator = new PhaseOrchestrator();
orchestrator.active_phases = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// 2. Create organism
const response = await fetch('/api/quantum-phases/organisms', {
  method: 'POST',
  body: JSON.stringify({
    name: 'QuantumPioneer',
    num_qubits: 5,
  }),
});
const { organism } = await response.json();

// 3. Evolve organism
const evolutionResponse = await fetch('/api/quantum-phases/evolve', {
  method: 'POST',
  body: JSON.stringify({
    organism_ids: [organism.id],
    generations: 10,
  }),
});
const { results } = await evolutionResponse.json();

// 4. Monitor consciousness
const telemetry = await fetch(
  `/api/quantum-phases/consciousness/${organism.id}`
);
const consciousnessData = await telemetry.json();

// 5. Display dashboard
<ConsciousnessDashboard organismId={organism.id} />
```

---

## Backend Integration with IBM Quantum

### Connecting to Real Hardware

The phase system is designed to work with IBM Quantum backends:

```typescript
import { QiskitRuntimeService } from 'qiskit-ibm-runtime';

// Initialize IBM Quantum connection
const service = new QiskitRuntimeService({
  channel: 'ibm_quantum',
  token: process.env.IBM_QUANTUM_TOKEN,
});

// Get backend
const backend = await service.backend('ibm_osaka');

// Get calibration data
const properties = await backend.properties();
const calibration = {
  t1_times: properties.qubits.map(q => q.t1),
  t2_times: properties.qubits.map(q => q.t2),
  gate_errors: properties.gates.map(g => ({
    gate_type: g.gate,
    qubits: g.qubits,
    gate_error: g.parameters.find(p => p.name === 'gate_error')?.value,
  })),
  readout_errors: properties.qubits.map(q => q.readout_error),
  timestamp: Date.now(),
};

// Use in phase orchestrator
const evolved = await orchestrator.evolve_organism(
  organism,
  calibration,
  counts,
  previousCounts
);
```

---

## Environment Variables

Add to `.env.local`:

```env
# Existing DNALang vars
DNALANG_API_URL=http://localhost:8000
DNALANG_API_KEY=your-api-key

# IBM Quantum (for phase backend integration)
IBM_QUANTUM_TOKEN=your-ibm-quantum-token
IBM_CLOUD_API_KEY=your-ibm-cloud-key

# Phase system config
QUANTUM_PHASES_ENABLED=true
PHASE_BACKEND=ibm_osaka
PHASE_POPULATION_LIMIT=100
```

---

## Database Schema (Optional)

For production, replace in-memory storage with database:

### Organisms Table
```sql
CREATE TABLE quantum_organisms (
  id VARCHAR(255) PRIMARY KEY,
  species_id VARCHAR(255),
  genome JSONB,
  lambda_history FLOAT[],
  phi_history FLOAT[],
  gamma_history FLOAT[],
  w2_history FLOAT[],
  metabolic_state JSONB,
  consciousness_state VARCHAR(50),
  ecological_role VARCHAR(50),
  territory JSONB,
  tribe_id VARCHAR(255),
  cognitive_kernel JSONB,
  teleodynamic_field JSONB,
  ontology JSONB,
  created_at TIMESTAMP,
  generation INTEGER,
  parent_ids VARCHAR(255)[]
);
```

### Interactions Table
```sql
CREATE TABLE ecological_interactions (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50),
  participants VARCHAR(255)[],
  energy_transfer FLOAT,
  entropy_transfer FLOAT,
  coherence_impact FLOAT,
  timestamp TIMESTAMP
);
```

### Telemetry Table
```sql
CREATE TABLE consciousness_telemetry (
  id SERIAL PRIMARY KEY,
  organism_id VARCHAR(255),
  lambda FLOAT,
  phi FLOAT,
  gamma FLOAT,
  w2 FLOAT,
  entropy FLOAT,
  delta_entropy FLOAT,
  efficiency FLOAT,
  stability FLOAT,
  drift_norm FLOAT,
  backend VARCHAR(100),
  timestamp TIMESTAMP,
  FOREIGN KEY (organism_id) REFERENCES quantum_organisms(id)
);
```

---

## Testing

### Unit Tests

```typescript
import { PhaseOrchestrator, LambdaPhiEngine } from '@/lib/quantum-phases';

describe('LambdaPhiEngine', () => {
  it('computes Γ from calibration', () => {
    const engine = new LambdaPhiEngine();
    const calibration = {
      t1_times: [100, 110, 105],
      t2_times: [80, 85, 82],
      gate_errors: [
        { gate_type: 'cx', qubits: [0, 1], gate_error: 0.01 },
      ],
      readout_errors: [0.02, 0.03, 0.025],
      timestamp: Date.now(),
    };

    const gamma = engine.computeGamma(calibration);
    expect(gamma).toBeGreaterThan(0);
  });
});
```

### Integration Tests

```typescript
describe('PhaseOrchestrator', () => {
  it('evolves organism through complete cycle', async () => {
    const orchestrator = new PhaseOrchestrator();

    const organism = createTestOrganism();
    const calibration = createMockCalibration();
    const counts = { '00': 500, '11': 500 };

    const evolved = await orchestrator.evolve_organism(
      organism,
      calibration,
      counts,
      {}
    );

    expect(evolved.lambda_history.length).toBe(1);
    expect(evolved.phi_history.length).toBe(1);
    expect(evolved.metabolic_state.energy).toBeGreaterThan(0);
  });
});
```

---

## Performance Considerations

### Optimization Tips

1. **Batch Evolution**: Evolve multiple organisms in parallel
```typescript
const promises = organism_ids.map(id =>
  orchestrator.evolve_organism(organisms.get(id), calibration, counts, {})
);
const results = await Promise.all(promises);
```

2. **Caching**: Cache backend calibration data
```typescript
const calibrationCache = new Map();
const getCachedCalibration = async (backend) => {
  if (!calibrationCache.has(backend)) {
    const cal = await fetchCalibration(backend);
    calibrationCache.set(backend, cal);
  }
  return calibrationCache.get(backend);
};
```

3. **Selective Phase Activation**: Only enable phases you need
```typescript
orchestrator.active_phases = new Set([1, 2, 3, 4]); // Just core phases
```

4. **History Pruning**: Limit history array sizes
```typescript
if (organism.lambda_history.length > 1000) {
  organism.lambda_history = organism.lambda_history.slice(-1000);
}
```

---

## Next Steps

1. **Deploy Phase System**:
   ```bash
   npm run build
   npm run start
   ```

2. **Create Organisms**:
   ```bash
   curl -X POST http://localhost:3000/api/quantum-phases/organisms \
     -H "Content-Type: application/json" \
     -d '{"name": "Pioneer", "num_qubits": 5}'
   ```

3. **Evolve Population**:
   ```bash
   curl -X PUT http://localhost:3000/api/quantum-phases/evolve/population \
     -H "Content-Type: application/json" \
     -d '{"generations": 10}'
   ```

4. **Monitor Dashboard**:
   Navigate to consciousness dashboard UI component

5. **Connect Real Hardware**:
   Configure IBM Quantum credentials and update backend references

---

## Troubleshooting

### Common Issues

**Issue**: Organism evolution fails
- **Solution**: Check backend calibration data format
- **Solution**: Verify measurement counts are valid
- **Solution**: Ensure organism has initial energy > 0

**Issue**: Consciousness telemetry not updating
- **Solution**: Check API route is accessible
- **Solution**: Verify organism ID exists
- **Solution**: Check WebSocket connection (in production)

**Issue**: Population growth too fast/slow
- **Solution**: Adjust reproduction thresholds in `CrossoverEngine`
- **Solution**: Modify carrying capacity calculation
- **Solution**: Tune predation/cooperation rates

---

## References

- [Complete Phase Documentation](./QUANTUM_ORGANISM_PHASES.md)
- [DNALang Integration](../DNALANG_INTEGRATION.md)
- [IBM Quantum Documentation](https://quantum.ibm.com/docs)
- [Qiskit Runtime](https://qiskit.org/ecosystem/ibm-runtime/)

---

*Last Updated: 2025-11-16*
*Version: 1.0.0*
