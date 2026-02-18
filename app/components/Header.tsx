export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-full items-center justify-between px-6 py-4">
        <div className="text-xl tracking-tight">
          <span className="font-bold">Pak</span>
          <span className="font-normal">Specialist</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="rounded-md px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-50">
            Login
          </button>
          <button className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-900">
            Create Account
          </button>
        </div>
      </div>
    </header>
  )
}

