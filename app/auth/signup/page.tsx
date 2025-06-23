"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, Eye, EyeOff, ArrowLeft, Mail, Lock, Check, X } from "lucide-react"

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
    { text: "8+ characters", met: password.length >= 8 },
    { text: "Uppercase letter", met: /[A-Z]/.test(password) },
    { text: "Lowercase letter", met: /[a-z]/.test(password) },
    { text: "Number", met: /\d/.test(password) },
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
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
        <Card className="border-0 shadow-2xl bg-white max-w-sm w-full">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-3xl flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Welcome to TaskFlow!</h2>
              <p className="text-gray-600">Your account is ready. Taking you to your dashboard...</p>
            </div>
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Status Bar Safe Area */}
      <div className="h-safe-top bg-transparent"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="px-4 py-4 safe-area-inset">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center">
                <ArrowLeft className="w-4 h-4 text-gray-600" />
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-blue-600 font-medium">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 pt-8 safe-area-inset">
        <div className="max-w-sm mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600">Join TaskFlow and get organized</p>
          </div>

          {/* Signup Form */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        disabled={loading}
                        className="h-14 pl-12 text-base border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        required
                        disabled={loading}
                        className="h-14 pl-12 pr-12 text-base border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-xl hover:bg-gray-100"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-400" />
                        )}
                      </Button>
                    </div>

                    {/* Password Requirements */}
                    {password && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                        <div className="grid grid-cols-2 gap-2">
                          {passwordRequirements.map((req, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div
                                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                  req.met ? "bg-green-500" : "bg-gray-300"
                                }`}
                              >
                                {req.met ? (
                                  <Check className="w-2.5 h-2.5 text-white" />
                                ) : (
                                  <X className="w-2.5 h-2.5 text-gray-500" />
                                )}
                              </div>
                              <span className={`text-xs ${req.met ? "text-green-600" : "text-gray-500"}`}>
                                {req.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        required
                        disabled={loading}
                        className="h-14 pl-12 pr-12 text-base border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-xl hover:bg-gray-100"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={loading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-400" />
                        )}
                      </Button>
                    </div>

                    {confirmPassword && (
                      <div className="flex items-center space-x-2 mt-2">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            doPasswordsMatch ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {doPasswordsMatch ? (
                            <Check className="w-2.5 h-2.5 text-white" />
                          ) : (
                            <X className="w-2.5 h-2.5 text-white" />
                          )}
                        </div>
                        <span className={`text-xs ${doPasswordsMatch ? "text-green-600" : "text-red-600"}`}>
                          {doPasswordsMatch ? "Passwords match" : "Passwords don't match"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl shadow-lg shadow-blue-500/25"
                  disabled={loading || !isPasswordValid || !doPasswordsMatch}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-semibold text-blue-600 hover:text-blue-700">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Safe Area */}
      <div className="h-safe-bottom bg-transparent"></div>
    </div>
  )
}
