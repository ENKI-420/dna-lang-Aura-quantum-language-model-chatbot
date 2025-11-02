export async function GET() {
  try {
    // Attempt to connect to Python backend
    const response = await fetch("http://localhost:8000/api/health", {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Backend unavailable")
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    // Return simulation mode data
    return Response.json({
      status: "simulation",
      lambda_phi: 2.176435e-8,
      lambda_phi_normalized: 1.11265e-17,
      version: "4.0-transcendent",
      features: ["simulation_mode", "local_compute", "decoherence_resistance", "information_preservation"],
    })
  }
}
