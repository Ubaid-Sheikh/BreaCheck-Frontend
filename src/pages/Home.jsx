import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Home() {
  const [password, setPassword] = useState('')
  const [prefix, setPrefix] = useState('')
  const [suffix, setSuffix] = useState('')
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.trim()) {
      const encoder = new TextEncoder();
      const bytes = encoder.encode(password);

      const hashBuffer = await crypto.subtle.digest('SHA-1', bytes);
      const hashBytes = new Uint8Array(hashBuffer);

      let hex = "";
      for (let i = 0; i < hashBytes.length; i++) {
        hex += hashBytes[i].toString(16).padStart(2, '0');
      }

      hex = hex.toUpperCase();
      const prefix = hex.slice(0, 5);
      const suffix = hex.slice(5);

      setPrefix(prefix);
      setSuffix(suffix);

      const apiResponse = await fetch("https://breacheck-backend.vercel.app/check-password", {
        method: 'POST',
        body: JSON.stringify({ prefix, suffix }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await apiResponse.json();
      navigate('/results', { state: { password, breached: data.breached, count: data.count } });
      setPassword('');
    }
  };


  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-[calc(100vh-5rem)]">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
        <section className="space-y-3 sm:space-y-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">
            Check Your Password
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed px-2">
            Check if your password has been compromised in known data breaches. We compare against a database of breached passwords to help keep your accounts secure.
          </p>
        </section>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm sm:text-base font-medium whitespace-nowrap"
            >
              Check
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home

