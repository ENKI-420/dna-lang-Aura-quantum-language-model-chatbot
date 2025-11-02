import { QuantumChatInterface } from "@/components/quantum-chat-interface"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quantum AI Chatbot | DNA-Lang QAAS",
  description: "Advanced quantum-enhanced conversational AI with DNA-Lang organism integration",
}

export default function QuantumChatbotPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-950/20 to-background">
      <QuantumChatInterface />
    </div>
  )
}
