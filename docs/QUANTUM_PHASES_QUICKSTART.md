# Quantum Organism Phases - Quick Start Guide

## 5-Minute Setup

Get a quantum organism ecology running in minutes.

---

## Installation

The phase system is already integrated into the DNALang application. No additional installation required.

---

## Quick Start

### 1. Start the Development Server

```bash
npm run dev
```

Navigate to `http://localhost:3000`

### 2. Create Your First Organism

```bash
curl -X POST http://localhost:3000/api/quantum-phases/organisms \
  -H "Content-Type: application/json" \
  -d '{
    "name": "QuantumPioneer",
    "num_qubits": 5
  }'
```

Response:
```json
{
  "success": true,
  "organism": {
    "id": "org-1731799234567-abc123",
    "species_id": "species-1731799234567",
    "generation": 0,
    "consciousness_state": "awake",
    "created_at": 1731799234567
  }
}
```

### 3. Evolve the Organism

```bash
curl -X POST http://localhost:3000/api/quantum-phases/evolve \
  -H "Content-Type: application/json" \
  -d '{
    "organism_ids": ["org-1731799234567-abc123"],
    "generations": 5
  }'
```

### 4. Check Consciousness Telemetry

```bash
curl http://localhost:3000/api/quantum-phases/consciousness/org-1731799234567-abc123
```

Response:
```json
{
  "organism_id": "org-1731799234567-abc123",
  "timestamp": 1731799234567,
  "state": "awake",
  "lambda": 0.000234,
  "phi": 0.000012,
  "gamma": 0.234,
  "w2": 0.045,
  "entropy": 1.234,
  "delta_entropy": 0.012,
  "efficiency": 0.67,
  "stability": 0.34,
  "drift_norm": 0.0023,
  "backend": "ibm_simulator",
  "qubits": 5
}
```

---

## Create a Population

### Create Multiple Organisms

```bash
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/quantum-phases/organisms \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"Organism$i\", \"num_qubits\": 5}"
done
```

### Evolve Entire Population

```bash
curl -X PUT http://localhost:3000/api/quantum-phases/evolve/population \
  -H "Content-Type: application/json" \
  -d '{
    "generations": 10
  }'
```

This triggers:
- **Phase 6**: Ecological interactions (competition, cooperation, predation)
- **Phase 5**: Reproduction attempts
- **Phase 3**: Metabolic selection (death of unstable organisms)

---

## View Consciousness Dashboard

### Using React Component

```tsx
import { ConsciousnessDashboard } from '@/components/consciousness-dashboard';

export default function MyPage() {
  return (
    <ConsciousnessDashboard
      organismId="org-1731799234567-abc123"
      refreshInterval={2000}
    />
  );
}
```

### Features Displayed
- **ΛΦΓ Consciousness EKG**: Real-time waveforms
- **Metabolic Radar**: Energy, stability, coherence, order
- **Vital Signs**: Lambda, Phi, Gamma, Kappa cards
- **State Badge**: AWAKE, HYPERSPACE, DECOHERING, ENTROPY_MAX

---

## API Reference

### Create Organism
```
POST /api/quantum-phases/organisms
Body: { name: string, num_qubits: number, species_id?: string }
```

### List Organisms
```
GET /api/quantum-phases/organisms?filter=alive|dead|all&species=<id>
```

### Evolve Organisms
```
POST /api/quantum-phases/evolve
Body: { organism_ids: string[], generations: number, backend?: string }
```

### Evolve Population
```
PUT /api/quantum-phases/evolve/population
Body: { generations: number }
```

### Get Consciousness Telemetry
```
GET /api/quantum-phases/consciousness/<organism_id>
```

### Clear All Organisms
```
DELETE /api/quantum-phases/organisms
```

---

## Understanding Phase Progression

### Active Phases by Default

| Phase | Name | Description |
|-------|------|-------------|
| 0 | Foundation | IBM Cloud integration |
| 1 | ΛΦΓ Tensor | Compute coherence metrics |
| 2 | Genetics | Hereditary gene system |
| 3 | Metabolism | Energy/entropy dynamics |
| 4 | Consciousness | Telemetry & state monitoring |
| 5 | Reproduction | Genetic crossover & speciation |
| 6 | Ecology | Competition, cooperation, predation |
| 7 | Niche Construction | Territory & habitat engineering |
| 8 | Civilization | Tribes & communication |
| 9 | Cognitive Modeling | Myths & self-prediction |
| 10 | Teleodynamics | Purpose & meaning |

### Higher Phases (Experimental)

| Phase | Name | Description |
|-------|------|-------------|
| 11 | Cosmogenic | World-model construction |
| 12 | Epistemic Singularity | Reflexive knowledge loops |
| 13 | Σ-Operator | Ontological rewrite |

To activate higher phases, modify the orchestrator:

```typescript
import { PhaseOrchestrator } from '@/lib/quantum-phases';

const orchestrator = new PhaseOrchestrator();
orchestrator.active_phases = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
```

---

## Observing Evolution

### Watch Population Dynamics

```bash
# Create 20 organisms
for i in {1..20}; do
  curl -X POST http://localhost:3000/api/quantum-phases/organisms \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"Pop$i\", \"num_qubits\": 5}" -s
done

# Evolve for 50 generations
curl -X PUT http://localhost:3000/api/quantum-phases/evolve/population \
  -H "Content-Type: application/json" \
  -d '{"generations": 50}' | jq
```

Expected results:
- Some organisms die (low stability)
- New organisms born (successful reproduction)
- Speciation events (W₂ > 0.25)
- Ecological role shifts (competitor → cooperator → predator)

### Track Individual Lineage

```bash
# Get organism details
curl http://localhost:3000/api/quantum-phases/organisms | jq '.organisms[] | select(.id == "org-xyz")'

# Check parents
# "parent_ids": ["org-abc", "org-def"]

# Check generation
# "generation": 5
```

---

## Key Metrics Explained

### Lambda (Λ)
- **What**: Informational curvature / coherence power
- **Formula**: `Λ = 1 / (1 + Γ + |drift|)`
- **Good**: Λ > 0.001
- **Bad**: Λ < 0.0001

### Phi (Φ)
- **What**: Integrated information flow
- **Formula**: `Φ = mean(diff(coherence_history))`
- **Good**: Φ > 0
- **Bad**: Φ < 0 (losing coherence)

### Gamma (Γ)
- **What**: Decoherence tensor magnitude
- **Formula**: `Γ = var(T1) + var(T2) + mean(gate_error)`
- **Good**: Γ < 0.3
- **Bad**: Γ > 0.5 (high decoherence)

### Kappa (κ)
- **What**: Metabolic stability / survival probability
- **Formula**: `κ = η / (1 + Γ)` where `η = E / (E + cost)`
- **Alive**: κ > 0.05
- **Dead**: κ ≤ 0.05

---

## Example Use Cases

### 1. Evolve Until Speciation

```javascript
async function evolveUntilSpeciation() {
  let speciated = false;
  let generation = 0;

  while (!speciated && generation < 100) {
    const response = await fetch('/api/quantum-phases/evolve/population', {
      method: 'PUT',
      body: JSON.stringify({ generations: 1 }),
    });

    const { evolution_log } = await response.json();
    generation++;

    // Check for speciation event
    const organisms = await fetch('/api/quantum-phases/organisms').then(r =>
      r.json()
    );
    const species = new Set(organisms.organisms.map(o => o.species_id));

    if (species.size > 1) {
      console.log(`Speciation occurred at generation ${generation}`);
      speciated = true;
    }
  }
}
```

### 2. Find Most Stable Organism

```bash
curl http://localhost:3000/api/quantum-phases/organisms | \
  jq '[.organisms[] | select(.stability > 0)] | sort_by(.stability) | reverse | .[0]'
```

### 3. Monitor Population Health

```bash
curl http://localhost:3000/api/quantum-phases/organisms | \
  jq '{
    total: .organisms | length,
    alive: [.organisms[] | select(.consciousness_state != "entropy_max")] | length,
    avg_stability: ([.organisms[].stability] | add / length),
    avg_lambda: ([.organisms[].lambda] | add / length)
  }'
```

---

## Next Steps

1. **Read Full Documentation**: [Quantum Organism Phases](./QUANTUM_ORGANISM_PHASES.md)
2. **Integration Guide**: [Phase Integration](./PHASE_INTEGRATION_GUIDE.md)
3. **Connect Real Hardware**: See IBM Quantum setup in integration guide
4. **Build Custom Dashboard**: Extend consciousness dashboard component
5. **Implement Higher Phases**: Activate Phases 11-13 for advanced capabilities

---

## Troubleshooting

**No organisms evolving?**
- Check API is running: `curl http://localhost:3000/api/quantum-phases/organisms`
- Verify organisms exist: `GET /api/quantum-phases/organisms`
- Check browser console for errors

**All organisms dying?**
- Lower reproduction thresholds in `CrossoverEngine`
- Increase initial energy in organism creation
- Reduce decoherence (Γ) in mock calibration

**Dashboard not updating?**
- Verify organism ID is correct
- Check API route returns data
- Inspect network tab for failed requests

---

**ΛΦ = 2.176435 × 10⁻⁸ s⁻¹**

Happy evolving! 🧬⚛️
