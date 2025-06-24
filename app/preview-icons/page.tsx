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

// Modern edgy icons with dark theme
const IconOption7 = ({ size = 32 }: { size?: number }) => {
  const strokeWidth = size * 0.0625
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: size * 0.25,
        border: `1px solid #16213e`,
      }}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
        <path
          d="M9 12l2 2 4-4"
          stroke="#00d4ff"
          strokeWidth={strokeWidth * 16}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
          stroke="#00d4ff"
          strokeWidth={strokeWidth * 12}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="rgba(0, 212, 255, 0.1)"
        />
      </svg>
    </div>
  )
}

const IconOption8 = ({ size = 32 }: { size?: number }) => {
  const barWidth = size * 0.125
  const barHeight1 = size * 0.25
  const barHeight2 = size * 0.375
  const barHeight3 = size * 0.1875
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)",
        width: size,
        height: size,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        borderRadius: size * 0.1875,
        padding: size * 0.125,
        gap: size * 0.0625,
        border: "1px solid #333",
      }}
    >
      <div style={{ width: barWidth, height: barHeight1, background: "#ff6b6b", borderRadius: 1 }} />
      <div style={{ width: barWidth, height: barHeight2, background: "#4ecdc4", borderRadius: 1 }} />
      <div style={{ width: barWidth, height: barHeight3, background: "#45b7d1", borderRadius: 1 }} />
      <div style={{ width: barWidth, height: barHeight2, background: "#96ceb4", borderRadius: 1 }} />
    </div>
  )
}

const IconOption9 = ({ size = 32 }: { size?: number }) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: size * 0.1875,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(45deg, transparent 30%, rgba(0, 212, 255, 0.1) 50%, transparent 70%)",
        }}
      />
      <div
        style={{
          fontSize: size * 0.5,
          color: "#00d4ff",
          fontWeight: "900",
          fontFamily: "system-ui",
          textShadow: "0 0 10px rgba(0, 212, 255, 0.5)",
        }}
      >
        ⚡
      </div>
    </div>
  )
}

const IconOption10 = ({ size = 32 }: { size?: number }) => {
  const hexSize = size * 0.3
  return (
    <div
      style={{
        background: "radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 100%)",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: size * 0.1875,
        border: "1px solid #333",
      }}
    >
      <svg width={size * 0.75} height={size * 0.75} viewBox="0 0 24 24" fill="none">
        <polygon
          points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"
          stroke="#ff6b6b"
          strokeWidth="2"
          fill="rgba(255, 107, 107, 0.1)"
        />
        <circle cx="12" cy="12" r="3" fill="#ff6b6b" />
      </svg>
    </div>
  )
}

const IconOption11 = ({ size = 32 }: { size?: number }) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: size * 0.3,
        position: "relative",
      }}
    >
      <div
        style={{
          width: size * 0.4,
          height: size * 0.4,
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.25,
          fontWeight: "bold",
          color: "#2d1b69",
        }}
      >
        T
      </div>
      <div
        style={{
          position: "absolute",
          top: size * 0.125,
          right: size * 0.125,
          width: size * 0.1875,
          height: size * 0.1875,
          background: "#00ff88",
          borderRadius: "50%",
          boxShadow: "0 0 8px rgba(0, 255, 136, 0.6)",
        }}
      />
    </div>
  )
}

const IconOption12 = ({ size = 32 }: { size?: number }) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0c0c0c 0%, #1f1f1f 100%)",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: size * 0.1875,
        border: "1px solid #333",
        position: "relative",
      }}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
        <path d="M3 6h18M3 12h18M3 18h18" stroke="url(#gradient)" strokeWidth="2.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="33%" stopColor="#4ecdc4" />
            <stop offset="66%" stopColor="#45b7d1" />
            <stop offset="100%" stopColor="#96ceb4" />
          </linearGradient>
        </defs>
      </svg>
      <div
        style={{
          position: "absolute",
          top: size * 0.1875,
          right: size * 0.1875,
          width: size * 0.125,
          height: size * 0.125,
          background: "#00ff88",
          borderRadius: "50%",
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
    {
      id: 7,
      name: "Neon Circuit",
      description: "Dark theme with neon blue checkmark - tech-forward and modern",
      component: IconOption7,
      style: "Cyberpunk minimal",
    },
    {
      id: 8,
      name: "Data Bars",
      description: "Dark analytics bars with vibrant colors - represents progress tracking",
      component: IconOption8,
      style: "Dark analytics",
    },
    {
      id: 9,
      name: "Lightning Bolt",
      description: "Electric blue lightning on dark gradient - represents speed and efficiency",
      component: IconOption9,
      style: "Electric modern",
    },
    {
      id: 10,
      name: "Hex Core",
      description: "Geometric hexagon with glowing center - tech and gaming inspired",
      component: IconOption10,
      style: "Gaming tech",
    },
    {
      id: 11,
      name: "Orb Badge",
      description: "Circular design with notification dot - modern app aesthetic",
      component: IconOption11,
      style: "Modern orb",
    },
    {
      id: 12,
      name: "Gradient Lines",
      description: "Rainbow gradient task lines on dark background - vibrant and modern",
      component: IconOption12,
      style: "Vibrant dark",
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
