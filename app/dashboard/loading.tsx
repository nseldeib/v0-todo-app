const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-cyan-500 border-r-4 border-purple-500 border-b-4 border-pink-500"></div>
        <p className="mt-4 text-white text-lg font-semibold">Loading Dashboard...</p>
      </div>
    </div>
  )
}

export default Loading
