import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const { password, breached, count } = location.state || {}
  const [showPasswordSuggestions, setShowPasswordSuggestions] = useState(false)
  const [suggestedPasswords, setSuggestedPasswords] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null)

  // Protect route - redirect to home if no password state
  useEffect(() => {
    if (!location.state || !password) {
      navigate('/', { replace: true })
    }
  }, [location.state, password, navigate])

  // Don't render if no valid state
  if (!location.state || !password) {
    return null
  }

  // Generate secure password suggestions
  const generatePasswordSuggestions = () => {
    const passwords = []
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    const allChars = uppercase + lowercase + numbers + symbols

    for (let i = 0; i < 3; i++) {
      let generatedPassword = ''

      // Ensure at least one character from each category
      generatedPassword += uppercase[Math.floor(Math.random() * uppercase.length)]
      generatedPassword += lowercase[Math.floor(Math.random() * lowercase.length)]
      generatedPassword += numbers[Math.floor(Math.random() * numbers.length)]
      generatedPassword += symbols[Math.floor(Math.random() * symbols.length)]

      // Fill the rest randomly (total length: 16-20 characters)
      const length = 16 + Math.floor(Math.random() * 5)
      for (let j = generatedPassword.length; j < length; j++) {
        generatedPassword += allChars[Math.floor(Math.random() * allChars.length)]
      }

      // Shuffle the password
      generatedPassword = generatedPassword.split('').sort(() => Math.random() - 0.5).join('')
      passwords.push(generatedPassword)
    }

    setSuggestedPasswords(passwords)
    setShowPasswordSuggestions(true)
  }

  // Copy password to clipboard
  const copyPassword = async (passwordToCopy, index) => {
    try {
      await navigator.clipboard.writeText(passwordToCopy)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy password:', err)
    }
  }

  const suggestions = breached ? [
    {
      icon: '🔒',
      title: 'Change Immediately',
      description: 'Update this password across all accounts where it\'s used.'
    },
    {
      icon: '🔄',
      title: 'Use Unique Passwords',
      description: 'Never reuse passwords. Each account should have its own unique password.'
    },
    {
      icon: '💪',
      title: 'Create Strong Passwords',
      description: 'Use at least 12 characters with mix of letters, numbers, and symbols.'
    },
    {
      icon: '📱',
      title: 'Use a Password Manager',
      description: 'Consider using a password manager to generate and store secure passwords.'
    }
  ] : [
    {
      icon: '✅',
      title: 'Password Not Breached',
      description: 'Good news! This password hasn\'t been found in known data breaches.'
    },
    {
      icon: '🔑',
      title: 'Keep It Unique',
      description: 'Ensure this password is only used for one account to maintain security.'
    },
    {
      icon: '📏',
      title: 'Check Length',
      description: 'Aim for passwords with at least 12-16 characters for better security.'
    },
    {
      icon: '🔐',
      title: 'Enable 2FA',
      description: 'Add an extra layer of security by enabling two-factor authentication.'
    },
    {
      icon: '🔄',
      title: 'Regular Updates',
      description: 'Consider updating passwords periodically, especially for sensitive accounts.'
    }
  ]

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-[calc(100vh-5rem)]">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Results Column */}
          <div className="space-y-4 sm:space-y-6">
            <div className={`p-4 sm:p-6 rounded-lg ${breached
              ? 'bg-red-50 border border-red-200'
              : 'bg-green-50 border border-green-200'
              }`}>
              {breached ? (
                <div className="space-y-2 sm:space-y-3 text-center">
                  <div className="text-red-600 text-4xl sm:text-5xl">⚠️</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-red-900">
                    Password Compromised
                  </h3>
                  <p className="text-xs sm:text-sm text-red-700">
                    This password has been found in {count} data breach{count !== 1 ? 'es' : ''}.
                  </p>
                  <p className="text-xs sm:text-sm text-red-700 font-medium">
                    You should change this password immediately.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3 text-center">
                  <div className="text-green-600 text-4xl sm:text-5xl">✓</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-green-900">
                    Password Safe
                  </h3>
                  <p className="text-xs sm:text-sm text-green-700">
                    This password was not found in our database of known breaches.
                  </p>
                  <p className="text-xs sm:text-sm text-green-700 font-medium">
                    However, make sure to use strong, unique passwords for each account.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2 sm:space-y-3">
              {breached && (
                <button
                  onClick={generatePasswordSuggestions}
                  className="w-full px-4 sm:px-6 py-2 sm:py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors text-xs sm:text-sm font-medium"
                >
                  Suggest Passwords
                </button>
              )}

              <button
                onClick={() => navigate('/')}
                className="w-full px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-xs sm:text-sm font-medium"
              >
                Check Another Password
              </button>
            </div>

            {/* Password Suggestions */}
            {breached && showPasswordSuggestions && (
              <div className="space-y-2 sm:space-y-3">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                  Suggested Strong Passwords
                </h4>
                <div className="space-y-2">
                  {suggestedPasswords.map((suggestedPassword, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-md"
                    >
                      <code className="flex-1 text-[10px] sm:text-xs font-mono text-gray-800 break-all">
                        {suggestedPassword}
                      </code>
                      <button
                        onClick={() => copyPassword(suggestedPassword, index)}
                        className="p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors shrink-0"
                        title="Copy password"
                      >
                        {copiedIndex === index ? (
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Suggestions Column */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              Security Suggestions
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex gap-2 sm:gap-3">
                    <div className="text-xl sm:text-2xl shrink-0">{suggestion.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1">
                        {suggestion.title}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results

