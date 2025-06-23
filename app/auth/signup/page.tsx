"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, Eye, EyeOff, Loader2, ArrowLeft, Check } from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const passwordRequirements = [
    { text: "At least 8 characters", met: password.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { text: "Contains number", met: /\d/.test(password) },
  ]

  const isPasswordValid = passwordRequirements.every((req) => req.met)
  const doPasswordsMatch = password === confirmPassword && confirmPassword.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!isPasswordValid) {
      setError("Please meet all password requirements")
      setLoading(false)
      return
    }

    if (!doPasswordsMatch) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      if (data.user) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <Card className="project-card w-full max-w-md">
          <CardContent className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold">Welcome to TaskFlow!</h2>
            <p className="text-muted-foreground">
              Your account has been created successfully. Redirecting to your dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                TaskFlow
              </h1>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-sm sm:text-base">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <Card className="project-card">
            <CardHeader className="text-center space-y-2 pb-6">
              <CardTitle className="text-2xl sm:text-3xl font-bold">Create Account</CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Join TaskFlow and start managing your tasks more effectively
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription className="text-sm">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                    className="h-11 sm:h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      required
                      disabled={loading}
                      className="h-11 sm:h-12 text-base pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-11 sm:h-12 px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>

                  {/* Password Requirements */}
                  {password && (
                    <div className="space-y-2 mt-3">
                      <p className="text-xs font-medium text-muted-foreground">Password requirements:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {passwordRequirements.map((req, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs">
                            <div
                              className={`w-3 h-3 rounded-full flex items-center justify-center ${
                                req.met ? "bg-green-500" : "bg-muted"
                              }`}
                            >
                              {req.met && <Check className="w-2 h-2 text-white" />}
                            </div>
                            <span className={req.met ? "text-green-600" : "text-muted-foreground"}>{req.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      required
                      disabled={loading}
                      className="h-11 sm:h-12 text-base pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-11 sm:h-12 px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={loading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>

                  {confirmPassword && (
                    <div className="flex items-center gap-2 text-xs mt-2">
                      <div
                        className={`w-3 h-3 rounded-full flex items-center justify-center ${
                          doPasswordsMatch ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {doPasswordsMatch && <Check className="w-2 h-2 text-white" />}
                      </div>
                      <span className={doPasswordsMatch ? "text-green-600" : "text-red-600"}>
                        {doPasswordsMatch ? "Passwords match" : "Passwords do not match"}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 sm:h-12 text-base font-medium"
                  disabled={loading || !isPasswordValid || !doPasswordsMatch}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="font-medium text-primary hover:underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
