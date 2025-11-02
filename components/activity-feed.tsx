"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity } from "lucide-react"
import { useActivityFeed } from "@/hooks/use-activity-feed"

export function ActivityFeed() {
  const { activities } = useActivityFeed()

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Activity Feed</h2>
      </div>

      <ScrollArea className="h-96">
        <div className="space-y-3">
          {activities.map((activity, idx) => (
            <div key={idx} className="flex gap-3 text-sm">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
              <div className="flex-1 space-y-1">
                <p className="text-foreground">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
