import { useEffect, useRef, useState } from 'react'
import './App.css'

// Hook for scroll animations
function useScrollAnimation() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const currentRef = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return [ref, isVisible]
}

// Animated Section Component
function AnimatedSection({ children, className = '', animation = 'fadeUp', delay = 0 }) {
  const [ref, isVisible] = useScrollAnimation()
  
  const animationClasses = {
    fadeUp: 'animate-on-scroll',
    fadeLeft: 'animate-left',
    fadeRight: 'animate-right',
    scale: 'animate-scale'
  }

  return (
    <div 
      ref={ref} 
      className={`${animationClasses[animation]} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <img src="/G.png" alt="GAnalyse" className="logo-icon" />
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#signals">Signals</a>
          <a href="#expert-chat">Expert Chat</a>
          <a href="#chart-analysis">Chart Analysis</a>
          <button className="nav-cta glass">Coming Soon</button>
        </div>
      </div>
    </nav>
  )
}

// Hero Section with GANALYSE_FLASH
function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-image-container">
          <img 
            src="/GANALYSE_FLASH.jpeg" 
            alt="GAnalyse" 
            className={`hero-main-image ${loaded ? 'loaded' : ''}`}
          />
          <div className="hero-overlay"></div>
        </div>
      </div>
      
      <div className={`hero-content ${loaded ? 'loaded' : ''}`}>
        <div className="hero-badge glass">
          <span className="badge-dot"></span>
          <span>Coming Soon</span>
        </div>
        
        <h1 className="hero-title">
          <span className="title-line">The Future of</span>
          <span className="title-highlight gradient-text-animated">Market Analysis</span>
          <span className="title-line">Is Here</span>
        </h1>
        
        <p className="hero-description">
          Revolutionary Multi-AI System combining the power of cutting-edge artificial intelligence 
          to decode market patterns, generate precision signals, and deliver expert insights.
        </p>
        
        <div className="hero-cta-group">
          <a href="#waitlist" className="cta-primary">
            <span>Join Waitlist</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-value gradient-text">4+</span>
            <span className="stat-label">AI Models</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value gradient-text">24/7</span>
            <span className="stat-label">Analysis</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value gradient-text">∞</span>
            <span className="stat-label">Possibilities</span>
          </div>
        </div>
      </div>

    </section>
  )
}

// Slogan Section with Everest
function SloganSection() {
  return (
    <section className="slogan-section">
      <div className="slogan-background">
        <img src="/EVEREST.avif" alt="Mountain Peak" className="everest-image" />
        <div className="slogan-overlay"></div>
      </div>
      
      <div className="slogan-content">
        <AnimatedSection animation="scale">
          <img src="/GAnalyse.png" alt="GAnalyse Logo" className="slogan-logo" />
        </AnimatedSection>
        
        <AnimatedSection animation="fadeUp" delay={0.2}>
          <h2 className="slogan-text">
            <span className="gradient-text-animated">See Beyond Limits</span>
          </h2>
        </AnimatedSection>
        
        <AnimatedSection animation="fadeUp" delay={0.4}>
          <p className="slogan-subtext">
            Where artificial intelligence meets market intuition. 
            Elevate your trading to unprecedented heights.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}

// SVG Icons
const Icons = {
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  lock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

// Feature Icons
const LightningIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
)

const ChatBubbleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <circle cx="9" cy="10" r="1" fill="white" />
    <circle cx="12" cy="10" r="1" fill="white" />
    <circle cx="15" cy="10" r="1" fill="white" />
  </svg>
)

const BarChartIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="12" width="4" height="9" rx="1" />
    <rect x="10" y="8" width="4" height="13" rx="1" />
    <rect x="17" y="4" width="4" height="17" rx="1" />
  </svg>
)

// Features Section
function FeaturesSection() {
  const panels = [
    {
      key: 'chat',
      title: 'Expert Chat',
      description: 'Chat directly with AI models (GPT-5, Claude, Gemini, Grok). Upload charts and ask detailed expert questions.',
      icon: <ChatBubbleIcon />
    },
    {
      key: 'signals',
      title: 'Instant Signals',
      description: 'Real-time trading signals. Get precise Entry, Stop-Loss, and Take-Profit levels for your trades.',
      icon: <LightningIcon />
    },
    {
      key: 'analysis',
      title: 'Chart Analysis',
      description: 'Analyze financial charts with AI. Receive detailed technical analysis, indicators, and forecasts.',
      icon: <BarChartIcon />
    }
  ]

  return (
    <section id="features" className="features-section">
      <div className="section-container">
        <div className="dashboard-panels-grid">
          {panels.map((panel, index) => (
            <AnimatedSection key={panel.key} animation="fadeUp" delay={index * 0.15}>
              <div className={`dashboard-card dashboard-card--${panel.key}`}>
                <div className="dashboard-card__icon">{panel.icon}</div>
                <h2 className="dashboard-card__title">{panel.title}</h2>
                <p className="dashboard-card__description">{panel.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// Instant Signals Section
function SignalsSection() {
  return (
    <section id="signals" className="signals-section">
      <div className="section-container">
        <div className="signals-layout">
          <div className="signals-info">
            <AnimatedSection animation="fadeLeft">
              <span className="section-tag glass">Instant Signals</span>
              <h2 className="section-title">
                Real-Time <span className="gradient-text">Trading Signals</span>
              </h2>
              <p className="section-description">
                Get precise, AI-generated trading signals delivered instantly. Each signal includes 
                entry point, take profit targets, and stop loss levels - everything you need to 
                execute profitable trades with confidence.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fadeLeft" delay={0.2}>
              <div className="signal-features">
                <div className="signal-feature">
                  <div className="feature-check">{Icons.check}</div>
                  <span>Entry & Exit Points</span>
                </div>
                <div className="signal-feature">
                  <div className="feature-check">{Icons.check}</div>
                  <span>Take Profit Levels</span>
                </div>
                <div className="signal-feature">
                  <div className="feature-check">{Icons.check}</div>
                  <span>Stop Loss Protection</span>
                </div>
                <div className="signal-feature">
                  <div className="feature-check">{Icons.check}</div>
                  <span>Risk Assessment</span>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div className="signals-preview">
            <AnimatedSection animation="fadeRight">
              <div className="screenshot-container glass-strong">
                <img src="/Instant_Signals.png" alt="Instant Signals Preview" className="screenshot-image" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}

// Expert Chat Section
function ExpertChatSection() {
  const aiModels = [
    { name: 'GPT', logo: '/openai-logo.png', specialty: 'General Analysis & Strategy', color: '#888888' },
    { name: 'Claude', logo: '/claude-logo.png', specialty: 'Deep Research & Reasoning', color: '#888888' },
    { name: 'Gemini', logo: '/gemini-logo.png', specialty: 'Data Processing & Insights', color: '#888888' },
    { name: 'Grok', logo: '/grok-logo.png', specialty: 'Real-time Market Analysis', color: '#888888' },
  ]

  return (
    <section id="expert-chat" className="expert-chat-section">
      <div className="section-container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-tag glass">Expert Chat</span>
            <h2 className="section-title">
              Chat with <span className="gradient-text">leading AI models</span>
            </h2>
            <p className="section-subtitle">
              Engage in meaningful conversations with the world's most advanced AI models. 
              Get expert-level insights on any topic, anytime.
            </p>
          </div>
        </AnimatedSection>

        <div className="chat-layout">
          <div className="ai-models-grid">
            {aiModels.map((model, index) => (
              <AnimatedSection key={index} animation="scale" delay={index * 0.1}>
                <div className="ai-model-card glass-strong">
                  <div className="model-logo-container" style={{ borderColor: model.color }}>
                    <img src={model.logo} alt={model.name} className="model-logo" />
                  </div>
                  <h3 className="model-name">{model.name}</h3>
                  <p className="model-specialty">{model.specialty}</p>
                  <div className="model-glow" style={{ background: model.color }}></div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="fadeUp" delay={0.4}>
            <div className="screenshot-container glass-strong chat-screenshot">
              <img src="/Expert_Chat.png" alt="Expert Chat Preview" className="screenshot-image" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// Chart Analysis Section
function ChartAnalysisSection() {
  const analysisFeatures = [
    {
      title: 'Multi-AI Consensus',
      description: 'Get analysis from GPT, Claude, Gemini, and Grok simultaneously. Compare perspectives and find consensus signals.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
          <path d="M2 12h20"/>
        </svg>
      )
    },
    {
      title: 'Technical Indicators',
      description: 'AI-powered recognition of RSI, MACD, Bollinger Bands, Moving Averages, and 50+ other indicators.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"/>
          <path d="M18 17V9"/>
          <path d="M13 17V5"/>
          <path d="M8 17v-3"/>
        </svg>
      )
    },
    {
      title: 'Pattern Recognition',
      description: 'Automatic detection of chart patterns: Head & Shoulders, Double Tops, Triangles, Flags, and more.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h6l3-9 6 18 3-9h4"/>
        </svg>
      )
    },
    {
      title: 'Support & Resistance',
      description: 'Identify key price levels with AI precision. Get actionable zones for entries and exits.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12H3"/>
          <path d="M21 6H3"/>
          <path d="M21 18H3"/>
        </svg>
      )
    }
  ]

  return (
    <section id="chart-analysis" className="chart-analysis-section">
      <div className="section-container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-tag glass">Chart Analysis</span>
            <h2 className="section-title">
              Multi-AI <span className="gradient-text">Chart Analysis</span>
            </h2>
            <p className="section-subtitle">
              Upload any financial chart and receive comprehensive analysis from multiple 
              AI models working together. Get the full picture, not just one perspective.
            </p>
          </div>
        </AnimatedSection>

        <div className="analysis-content-centered">
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <div className="multi-ai-highlight glass-strong">
              <div className="multi-ai-header">
                <h3>4 AI Models. One Analysis.</h3>
                <p>Each model brings unique strengths to your chart analysis</p>
              </div>
              <div className="multi-ai-models">
                <div className="mini-model">
                  <img src="/openai-logo.png" alt="GPT" />
                  <span>Pattern Analysis</span>
                </div>
                <div className="mini-model">
                  <img src="/claude-logo.png" alt="Claude" />
                  <span>Risk Assessment</span>
                </div>
                <div className="mini-model">
                  <img src="/gemini-logo.png" alt="Gemini" />
                  <span>Data Synthesis</span>
                </div>
                <div className="mini-model">
                  <img src="/grok-logo.png" alt="Grok" />
                  <span>Market Context</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="analysis-features-grid">
            {analysisFeatures.map((feature, index) => (
              <AnimatedSection key={index} animation="fadeUp" delay={0.15 + index * 0.1}>
                <div className="analysis-feature-card">
                  <div className="analysis-feature-icon">{feature.icon}</div>
                  <div className="analysis-feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      setError('Please enter your email address')
      return
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    
    setError('')
    setSubmitted(true)
  }

  return (
    <section id="waitlist" className="cta-section">
      <div className="cta-background">
        <div className="cta-particles"></div>
      </div>
      
      <div className="section-container">
        <AnimatedSection animation="scale">
          <div className="cta-card glass-strong">
            <img src="/G.png" alt="GAnalyse" className="cta-logo" />
            <h2 className="cta-title">
              Ready to <span className="gradient-text">See Beyond Limits</span>?
            </h2>
            <p className="cta-description">
              Be among the first to experience the future of AI-powered market analysis. 
              Join our exclusive waitlist and get early access.
            </p>
            
            {submitted ? (
              <div className="cta-success">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3 className="cta-success-title">You're on the list!</h3>
                <p className="cta-success-message">Thank you for joining. We'll notify you when GAnalyse launches.</p>
              </div>
            ) : (
              <>
                <form className="cta-form" onSubmit={handleSubmit}>
                  <input 
                    type="email" 
                    placeholder="Enter your email address"
                    className={`cta-input glass ${error ? 'cta-input-error' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="cta-button">
                    Join Waitlist
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </form>
                {error && <p className="cta-error">{error}</p>}
              </>
            )}
            
            <p className="cta-disclaimer">
              <span className="lock-icon">{Icons.lock}</span> We respect your privacy. No spam, ever.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src="/GAnalyse.png" alt="GAnalyse" className="footer-logo" />
          <p className="footer-tagline">See Beyond Limits</p>
        </div>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#signals">Signals</a>
          <a href="#expert-chat">Expert Chat</a>
          <a href="#chart-analysis">Chart Analysis</a>
        </div>
        <div className="footer-social">
          <span>You can find us on</span>
          <a href="https://x.com/GAnalyse_" target="_blank" rel="noopener noreferrer" className="x-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 GAnalyse. All rights reserved.</p>
          <p className="footer-coming">Coming Soon</p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <div className="app">
      <Navigation />
      <HeroSection />
      <SloganSection />
      <FeaturesSection />
      <SignalsSection />
      <ExpertChatSection />
      <ChartAnalysisSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App

