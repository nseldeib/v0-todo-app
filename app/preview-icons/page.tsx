"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Icon components rendered directly
const IconOption1 = ({ size = 32 }: { size?: number }) => (
  <div
    style={{
      fontSize: size * 0.5625,
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      width: size,
      height: size,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      borderRadius: size * 0.1875,
      fontWeight: "bold",
    }}
  >
    ✓
  </div>
)

const IconOption2 = ({ size = 32 }: { size?: number }) => {
  const squareSize = size * 0.1875
  const gap = size * 0.0625
  return (
    <div
      style={{
        background: "#1f2937",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: size * 0.1875,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap }}>
        <div style={{ display: "flex", gap }}>
          <div style={{ width: squareSize, height: squareSize, background: "#10b981", borderRadius: 1 }} />
          <div style={{ width: squareSize, height: squareSize, background: "#3b82f6", borderRadius: 1 }} />
        </div>
        <div style={{ display: "flex", gap }}>
          <div style={{ width: squareSize, height: squareSize, background: "#f59e0b", borderRadius: 1 }} />
          <div style={{ width: squareSize, height: squareSize, background: "#ef4444", borderRadius: 1 }} />
        </div>
      </div>
    </div>
  )
}

const IconOption3 = ({ size = 32 }: { size?: number }) => (
  <div
    style={{
      fontSize: size * 0.625,
      background: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)",
      width: size,
      height: size,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      borderRadius: size * 0.1875,
      fontFamily: "system-ui",
    }}
  >
    T
  </div>
)

const IconOption4 = ({ size = 32 }: { size?: number }) => {
  const dotSize = size * 0.125
  const lineHeight = size * 0.0625
  const gap = size * 0.09375
  return (
    <div
      style={{
        background: "#ffffff",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: size * 0.1875,
        border: "1px solid #e5e7eb",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap, alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap }}>
          <div style={{ width: dotSize, height: dotSize, background: "#10b981", borderRadius: "50%" }} />
          <div style={{ width: size * 0.375, height: lineHeight, background: "#6b7280", borderRadius: 1 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap }}>
          <div style={{ width: dotSize, height: dotSize, background: "#3b82f6", borderRadius: "50%" }} />
          <div style={{ width: size * 0.3125, height: lineHeight, background: "#6b7280", borderRadius: 1 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap }}>
          <div style={{ width: dotSize, height: dotSize, background: "#f59e0b", borderRadius: "50%" }} />
          <div style={{ width: size * 0.25, height: lineHeight, background: "#6b7280", borderRadius: 1 }} />
        </div>
      </div>
    </div>
  )
}

const IconOption5 = ({ size = 32 }: { size?: number }) => {
  const circleSize = size * 0.5
  const borderWidth = size * 0.09375
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: size * 0.1875,
      }}
    >
      <div
        style={{
          width: circleSize,
          height: circleSize,
          border: `${borderWidth}px solid rgba(255,255,255,0.3)`,
          borderTop: `${borderWidth}px solid white`,
          borderRadius: "50%",
        }}
      />
    </div>
  )
}

const IconOption6 = ({ size = 32 }: { size?: number }) => {
  const diamondSize = size * 0.375
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: size * 0.1875,
      }}
    >
      <div
        style={{
          width: diamondSize,
          height: diamondSize,
          background: "white",
          transform: "rotate(45deg)",
          borderRadius: size * 0.0625,
        }}
      />
    </div>
  )
}

export default function PreviewIconsPage() {
  const iconOptions = [
    {
      id: 1,
      name: "Minimalist Checkmark",
      description: "Purple gradient with checkmark - represents task completion",
      component: IconOption1,
      style: "Modern minimalist",
    },
    {
      id: 2,
      name: "Geometric Squares",
      description: "Colored squares on dark background - represents organization",
      component: IconOption2,
      style: "Clean geometric",
    },
    {
      id: 3,
      name: "TaskFlow 'T'",
      description: "Bold 'T' letter with blue gradient - brand focused",
      component: IconOption3,
      style: "Typography based",
    },
    {
      id: 4,
      name: "Task List",
      description: "Clean task list with colored dots - functional design",
      component: IconOption4,
      style: "Functional minimal",
    },
    {
      id: 5,
      name: "Progress Circle",
      description: "Circular progress indicator - represents productivity",
      component: IconOption5,
      style: "Progress focused",
    },
    {
      id: 6,
      name: "Diamond Shape",
      description: "Diamond with pink gradient - represents focus and clarity",
      component: IconOption6,
      style: "Abstract modern",
    },
  ]

  const copyIconCode = (optionId: number) => {
    const codeText = `// To use this icon, rename app/icon-option-${optionId}.tsx to app/icon.tsx`
    navigator.clipboard.writeText(codeText)
    toast({
      title: "Instructions copied!",
      description: `Copy the icon-option-${optionId}.tsx file to icon.tsx to use this icon.`,
    })
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">App Icon Preview</h1>
        <p className="text-muted-foreground">
          Preview all icon options for your TaskFlow app. Each icon is shown at different sizes to see how it will look
          in various contexts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {iconOptions.map((option) => {
          const IconComponent = option.component
          return (
            <Card key={option.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{option.name}</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => copyIconCode(option.id)} className="h-8 w-8 p-0">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{option.style}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Icon preview at different sizes */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex flex-col items-center gap-2">
                    <IconComponent size={32} />
                    <span className="text-xs text-muted-foreground">32px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconComponent size={48} />
                    <span className="text-xs text-muted-foreground">48px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconComponent size={64} />
                    <span className="text-xs text-muted-foreground">64px</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{option.description}</p>

                <Button variant="default" size="sm" className="w-full" onClick={() => copyIconCode(option.id)}>
                  <Check className="h-4 w-4 mr-2" />
                  Choose This Icon
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">How to Apply Your Chosen Icon</h2>
        <div className="space-y-3 text-sm">
          <div>
            <strong>1. Choose an icon above</strong>
            <p className="text-muted-foreground ml-4">
              Click "Choose This Icon" on your preferred option to copy the implementation instructions.
            </p>
          </div>
          <div>
            <strong>2. Rename the file:</strong>
            <p className="text-muted-foreground ml-4">
              Rename <code className="bg-white px-1 rounded">app/icon-option-X.tsx</code> to{" "}
              <code className="bg-white px-1 rounded">app/icon.tsx</code>
            </p>
          </div>
          <div>
            <strong>3. Test it:</strong>
            <p className="text-muted-foreground ml-4">
              Refresh your browser to see the new icon in the browser tab, bookmark it to see it in bookmarks, or add to
              home screen on mobile.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
