"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, RefreshCw } from "lucide-react"
import { useMetaCompiler } from "@/hooks/use-meta-compiler"

export function MetaCompilerStatus() {
  const { compiler } = useMetaCompiler()

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Code2 className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Meta-Compiler</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Reflexivity Level</span>
          <Badge variant="default">{compiler.reflexivity_level}</Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Meta-Instructions</span>
          <span className="font-mono text-sm">{compiler.meta_instructions}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Compilation Cycles</span>
          <span className="font-mono text-sm">{compiler.cycles}</span>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="h-3 w-3 animate-spin" />U = L[U] active
          </div>
          <p className="text-xs text-muted-foreground mt-2">Self-referential optimization in progress</p>
        </div>
      </div>
    </Card>
  )
}
