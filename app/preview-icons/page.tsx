"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function PreviewIconsPage() {
  const iconOptions = [
    {
      id: 1,
      name: "Minimalist Checkmark",
      description: "Purple gradient with checkmark - represents task completion",
      route: "/icon-option-1",
      style: "Modern minimalist",
    },
    {
      id: 2,
      name: "Geometric Squares",
      description: "Colored squares on dark background - represents organization",
      route: "/icon-option-2",
      style: "Clean geometric",
    },
    {
      id: 3,
      name: "TaskFlow 'T'",
      description: "Bold 'T' letter with blue gradient - brand focused",
      route: "/icon-option-3",
      style: "Typography based",
    },
    {
      id: 4,
      name: "Task List",
      description: "Clean task list with colored dots - functional design",
      route: "/icon-option-4",
      style: "Functional minimal",
    },
    {
      id: 5,
      name: "Progress Circle",
      description: "Circular progress indicator - represents productivity",
      route: "/icon-option-5",
      style: "Progress focused",
    },
    {
      id: 6,
      name: "Diamond Shape",
      description: "Diamond with pink gradient - represents focus and clarity",
      route: "/icon-option-6",
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
          Preview all icon options for your TaskFlow app. Click on any icon to see it larger, or use the copy button to
          get instructions for implementing it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {iconOptions.map((option) => (
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
                  <img
                    src={`${option.route}?size=32`}
                    alt={option.name}
                    className="w-8 h-8 rounded-md shadow-sm"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                  <span className="text-xs text-muted-foreground">32px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={`${option.route}?size=48`}
                    alt={option.name}
                    className="w-12 h-12 rounded-md shadow-sm"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                  <span className="text-xs text-muted-foreground">48px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={`${option.route}?size=64`}
                    alt={option.name}
                    className="w-16 h-16 rounded-lg shadow-sm"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                  <span className="text-xs text-muted-foreground">64px</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{option.description}</p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => window.open(option.route, "_blank")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  View Full Size
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">How to Test as App Icons</h2>
        <div className="space-y-3 text-sm">
          <div>
            <strong>1. Browser Tab Icon:</strong>
            <p className="text-muted-foreground ml-4">
              Rename your chosen option to <code className="bg-white px-1 rounded">app/icon.tsx</code> and refresh your
              browser to see it in the tab.
            </p>
          </div>
          <div>
            <strong>2. PWA Home Screen:</strong>
            <p className="text-muted-foreground ml-4">
              Add the app to your phone's home screen to see how it looks as a mobile app icon.
            </p>
          </div>
          <div>
            <strong>3. Bookmark Icon:</strong>
            <p className="text-muted-foreground ml-4">Bookmark the page to see how it appears in your bookmarks bar.</p>
          </div>
          <div>
            <strong>4. Different Sizes:</strong>
            <p className="text-muted-foreground ml-4">
              The icons above show how they look at 32px, 48px, and 64px to simulate different contexts.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
