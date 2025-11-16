#!/bin/bash
#
# Γ-Spike Detector Runner
# Execute the critical Darwinian pressure test
#
# ΛΦ = 2.176435 × 10⁻⁸ s⁻¹

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║       Γ-Spike Detector Experiment                        ║${NC}"
echo -e "${BLUE}║       Autopoietic Self-Healing Test                      ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if quick test mode
QUICK_FLAG=""
if [ "$1" == "--quick" ] || [ "$1" == "-q" ]; then
    QUICK_FLAG="--quick"
    echo -e "${YELLOW}⚡ Quick test mode enabled (2 minutes)${NC}"
else
    echo -e "${YELLOW}⏱  Full experiment mode (30 minutes)${NC}"
    echo -e "${YELLOW}   Use --quick for 2-minute test${NC}"
fi

echo ""
echo -e "${GREEN}📋 Experiment Setup:${NC}"
echo "   • Γ threshold: 0.3"
echo "   • Control group: Phase-conjugate mutation OFF"
echo "   • Treatment group: Phase-conjugate mutation ON"
echo "   • Hypothesis: Treatment shows lower variance under Γ stress"
echo ""

# Build TypeScript
echo -e "${BLUE}🔨 Building experiment...${NC}"
cd "$(dirname "$0")/.."

if ! command -v npx &> /dev/null; then
    echo -e "${RED}❌ npx not found. Please install Node.js${NC}"
    exit 1
fi

# Compile TypeScript
npx tsc experimental-suite/experiments/gamma-spike-detector.ts \
    --outDir experimental-suite/experiments \
    --module commonjs \
    --target es2020 \
    --moduleResolution node \
    --esModuleInterop \
    --resolveJsonModule \
    --skipLibCheck \
    2>/dev/null || echo -e "${YELLOW}⚠️  Using pre-built experiment${NC}"

echo ""
echo -e "${GREEN}🚀 Starting experiment...${NC}"
echo ""

# Run experiment
node experimental-suite/experiments/gamma-spike-detector.js $QUICK_FLAG

echo ""
echo -e "${GREEN}✅ Experiment complete!${NC}"
echo -e "${BLUE}📊 Check results in experimental-suite/results/${NC}"
echo ""
