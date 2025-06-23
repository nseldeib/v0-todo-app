import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-900/80 border-slate-700/50 shadow-2xl backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-white">Create an account</CardTitle>
          <CardDescription className="text-slate-400">Enter your email below to create your account</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>
          <Button className="w-full text-white bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-200">
            Sign up
          </Button>
          <div className="text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignupPage
