import Link from "next/link"

export default function AuthCodeErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute animate-spin-slow rounded-full bg-purple-500/20 blur-3xl h-80 w-80 top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute animate-spin-reverse rounded-full bg-cyan-500/20 blur-3xl h-64 w-64 bottom-1/4 right-1/4 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-6 bg-slate-900/80 backdrop-blur-xl rounded-lg shadow-xl border border-slate-700/50">
        <h1 className="text-2xl font-semibold text-white mb-4">Authentication Error</h1>
        <p className="text-slate-300 mb-6">
          There was an error processing your authentication code. Please try again or contact support.
        </p>
        <div className="flex flex-col space-y-4">
          <Link
            href="/auth/signin"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-600 hover:to-cyan-600 px-4 py-2"
          >
            Try Again
          </Link>
          <p className="text-center text-slate-400">
            Need help? Contact{" "}
            <Link href="/support" className="text-cyan-400 hover:text-cyan-300">
              support
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
