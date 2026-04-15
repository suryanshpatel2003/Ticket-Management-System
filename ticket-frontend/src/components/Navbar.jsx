import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const { logout } = useAuth()

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-indigo-200 shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-xl">🎫</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Ticket<span className="text-indigo-600">Flow</span>
          </h1>
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={logout}
            className="relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-indigo-600 rounded-full shadow-md group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-indigo-600 group-hover:translate-x-0 ease">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-indigo-600 transition-all duration-300 transform group-hover:translate-x-full ease">
              Logout
            </span>
            <span className="relative invisible">Logout</span>
          </button>
        </div>

      </div>
    </nav>
  )
}