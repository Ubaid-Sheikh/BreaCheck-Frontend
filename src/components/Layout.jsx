import { Outlet, Link, useLocation } from 'react-router-dom'
import '../App.css'

function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="animated-gradient shadow-lg border-b border-white/20 relative overflow-hidden">
        {/* Animated overlay for extra depth */}
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link
              to="/"
              className="flex items-center gap-3 group transition-transform hover:scale-105"
            >
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-white">
                  BreaCheck
                </span>
                <span className="text-xs sm:text-sm text-white/90">
                  Secure your digital life
                </span>
              </div>
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all backdrop-blur-sm ${isHome
                  ? 'bg-white/90 text-gray-800 shadow-md hover:bg-white'
                  : 'text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20'
                  }`}
              >
                Home
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-gray-300 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="text-white font-semibold mb-3 text-lg">About</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Check if your passwords have been compromised in known data breaches.
                Stay secure and protect your digital identity.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 text-lg">Security</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">
                  🔒 Your passwords are never stored
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  🔐 SHA-1 hashing used for privacy
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  ✅ Checked against breach databases
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 text-lg">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <a href="https://haveibeenpwned.com/API/v3" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    Have I Been Pwned API
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400 text-center sm:text-left">
                © {new Date().getFullYear()} BreaCheck. All rights reserved.
              </p>
              <p className="text-sm text-gray-400">
                Developed by{' '}
                <a
                  href="https://www.linkedin.com/in/ubaid018"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  Ubaid Sheikh
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout

