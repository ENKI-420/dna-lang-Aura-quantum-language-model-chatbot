"use client"

import { useState, useEffect } from "react"

interface Activity {
  message: string
  timestamp: string
}

export function useActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([
    { message: "Organism phi_003 achieved consciousness level 3", timestamp: "2 minutes ago" },
    { message: "Entanglement bond created: phi_001 ↔ phi_004", timestamp: "5 minutes ago" },
    { message: "Meta-compiler reflexivity level increased to 3", timestamp: "8 minutes ago" },
    { message: "Ricci flow optimization completed", timestamp: "12 minutes ago" },
    { message: "New organism manifested: phi_005", timestamp: "15 minutes ago" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: Activity = {
        message: "System heartbeat: All organisms stable",
        timestamp: "Just now",
      }
      setActivities((prev) => [newActivity, ...prev.slice(0, 9)])
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return { activities }
}
