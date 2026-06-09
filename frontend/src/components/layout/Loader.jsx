
function Loader() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-zinc-200 border-t-[#5C4E5B]"></div>
        <div className="absolute h-10 w-10 animate-spin rounded-full border-4 border-transparent border-b-zinc-400 border-r-zinc-400 animation-delay-150 [animation-direction:reverse]"></div>
      </div>
      
      {/* Loading Text */}
      <p className="font-sans text-sm font-medium tracking-widest text-[#5C4E5B] uppercase animate-pulse">
        Loading...
      </p>
    </div>
  )
}

export default Loader