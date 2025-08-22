import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Sparkles, 
  ArrowRight,
  MapPin, 
  Brain, 
  Trophy, 
  CheckCircle,
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail, 
  Play,
  Zap,
  BarChart,
  BarChart3,
  Target,
  Users,
  Star
} from 'lucide-react';
import { toast } from 'react-toastify';

// Utility function for className merging
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// FloatingNavbar Component
const FloatingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ITEMS = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Resources", href: "#resources" },
  ];

  return (
    <section className="fixed top-5 left-1/2 z-50 w-[min(90%,900px)] -translate-x-1/2 lg:top-8">
      <nav className="glassmorphic rounded-full border border-white/30 bg-gradient-to-r from-violet-300 via-purple-200 to-white backdrop-blur-xl shadow-lg">
        <div className="flex items-center justify-between px-6 py-3">
          <a href="#" className="flex shrink-0 items-center gap-2" title="InterXAI">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white to-white/90 flex items-center justify-center shadow-sm">
              <span className="text-indigo-500 font-bold text-sm">IX</span>
            </div>
            <span className="text-xl font-bold text-black">InterXAI</span>
          </a>
          <div className="hidden lg:flex items-center gap-8">
            {ITEMS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-black/80 hover:text-black transition-all duration-300 hover:scale-105"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="/login" className="hidden sm:block text-sm font-medium text-black/80 hover:text-black transition-colors">
              Login
            </a>
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span className={`block w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
                <span className={`block w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 rounded-2xl border border-white/20 bg-white/95 backdrop-blur-xl p-6 shadow-xl">
            <div className="flex flex-col space-y-4">
              {ITEMS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-base font-medium text-slate-700 hover:text-indigo-500 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-slate-200 pt-4">
                <a href="#login" className="block text-base font-medium text-slate-700 hover:text-indigo-500 transition-colors py-2">
                  Login
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </section>
  );
};

// Button Component
const Button = ({ children, className = "", ...props }) => (
  <button className={cn("px-4 py-2 rounded-lg font-medium transition-all duration-200", className)} {...props}>
    {children}
  </button>
);

// FloatingOrb Component
const FloatingOrb = ({ delay = 0, size = "w-32 h-32" }) => (
  <div 
    className={`absolute ${size} rounded-full blur-xl opacity-15 animate-bounce`}
    style={{ 
      background: 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 50%, #93c5fd 100%)',
      animationDelay: `${delay}s`,
      animationDuration: `${3 + delay}s`
    }}
  />
);

// ParticleField Component
const ParticleField = () => (
  <div className="absolute inset-0 overflow-hidden">
    {Array.from({ length: 50 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-gradient-to-r from-violet-400 to-indigo-500 rounded-full animate-bounce opacity-20"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }}
      />
    ))}
    <div className="absolute top-20 left-10 w-16 h-16 border border-violet-400/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
    <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-indigo-500/10 to-sky-400/10 rotate-45 animate-pulse" />
    <div className="absolute bottom-32 right-32 w-8 h-8 border-2 border-red-400/30 animate-bounce" />
    <div className="absolute top-60 left-1/4 w-20 h-20 border border-amber-400/20 rounded-lg animate-pulse" />
  </div>
);

// FeatureCard Component
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <div 
    className="bg-white/70 backdrop-blur-sm border border-white/30 p-6 rounded-2xl hover:scale-105 transition-all duration-500 shadow-lg group"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="font-semibold text-slate-800 mb-2">{title}</h3>
    <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
  </div>
);

// GlassmorphicHero Component with Stats Carousel and AI Simulator
const GlassmorphicHero = ({ stats, currentStat }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="features" className="relative min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-white overflow-hidden">
      <ParticleField />
      <div className="absolute inset-0 overflow-hidden">
        <FloatingOrb delay={0} size="w-80 h-80" />
        <FloatingOrb delay={2} size="w-64 h-64" />
        <FloatingOrb delay={4} size="w-48 h-48" />
        <div className="absolute top-20 right-20 w-60 h-60 rounded-full bg-gradient-to-br from-red-400/10 to-amber-400/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-20 w-72 h-72 rounded-full bg-gradient-to-br from-indigo-500/10 to-sky-400/10 blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
        <div className="text-center max-w-5xl mx-auto mb-20">
          <div className="flex items-center justify-center space-x-8 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-500 ${currentStat === index ? 'bg-violet-500/20 border-violet-400/50 scale-105' : ''}`}
                >
                  <Icon className="w-5 h-5 text-violet-300" />
                  <span className="text-black font-semibold">{stat.number}</span>
                  <span className="text-slate-600 text-sm">{stat.label}</span>
                </div>
              );
            })}
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            Master Every{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">Interview</span>
            <br />
            with AI Coaching
          </h1>

          <p className="text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Transform your interview skills with AI-powered practice sessions. Get personalized feedback, realistic scenarios, and the confidence to land your dream job.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-gradient-to-r from-violet-400 to-indigo-500 text-white text-lg px-8 py-4 shadow-xl hover:shadow-2xl group rounded-xl">
              Start Practicing
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button className="bg-white/80 backdrop-blur-sm text-indigo-500 border border-white/30 text-lg px-8 py-4 group rounded-xl hover:bg-white/90">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-slate-600 mt-8">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-lg">4.9/5 from 10,000+ users</span>
            </div>
            <div className="h-6 w-px bg-slate-400"></div>
            <span className="text-lg">Trusted by Fortune 500 companies</span>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <FeatureCard
            icon={Target}
            title="AI Mock Interviews"
            description="Practice with AI that adapts to your industry and role"
            delay={0.8}
          />
          <FeatureCard
            icon={Zap}
            title="Real-Time Feedback"
            description="Get instant insights on your performance and areas to improve"
            delay={1.0}
          />
          <FeatureCard
            icon={BarChart3}
            title="Industry Preparation" 
            description="Tailored questions for tech, finance, consulting, and more"
            delay={1.2}
          />
          <FeatureCard
            icon={BarChart}
            title="Performance Analytics"
            description="Track your progress and unlock your full potential"
            delay={1.4}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 rounded-3xl z-10" />
          <div className="bg-white/70  border border-white/30 max-w-6xl mx-auto rounded-3xl p-8 shadow-2xl hover:scale-[1.02] transition-all duration-700">
            <div className="bg-white/80  rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent  z-20 rounded-2xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-slate-800">Interview Performance Dashboard</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-slate-600 font-medium">AI Analysis Active</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6">
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent mb-2">96%</div>
                    <div className="text-sm text-slate-600">Confidence Score</div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                      <div className="bg-green-500 h-2 rounded-full w-[96%]"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-violet-400/10 to-violet-400/5 border border-violet-400/20 rounded-xl p-6">
                    <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent mb-2">9.2/10</div>
                    <div className="text-sm text-slate-600">Communication</div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                      <div className="bg-violet-400 h-2 rounded-full w-[92%]"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 border border-indigo-500/20 rounded-xl p-6">
                    <div className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-sky-400 bg-clip-text text-transparent mb-2">24</div>
                    <div className="text-sm text-slate-600">Practice Sessions</div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                      <div className="bg-indigo-500 h-2 rounded-full w-[80%]"></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-800">AI Feedback Highlights</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-4 bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="text-slate-700">Excellent eye contact and professional presence throughout</div>
                    </div>
                    <div className="flex items-start gap-4 bg-amber-400/10 border border-amber-400/20 rounded-xl p-4">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="text-slate-700">Consider adding more specific metrics in your examples</div>
                    </div>
                    <div className="flex items-start gap-4 bg-violet-400/10 border border-violet-400/20 rounded-xl p-4">
                      <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="text-slate-700">Clear technical explanations - great for engineering roles</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// NumberedBadgeCards Component
const NumberedBadgeCards = () => {
  const DATA = [
    {
      id: 1,
      number: "01",
      title: "Create Your Roadmap",
      description:
        "Select your target industry and role. Our AI creates a personalized interview roadmap with curated questions and preparation strategies tailored to your career path.",
      icon: MapPin,
    },
    {
      id: 2,
      number: "02", 
      title: "Access Curated Resources",
      description:
        "Get access to industry-specific interview guides, company insights, and proven frameworks. Everything you need to understand what employers are looking for.",
      icon: Brain,
    },
    {
      id: 3,
      number: "03",
      title: "Practice & Get Feedback",
      description:
        "Practice with our AI interviewer and receive real-time feedback on your responses, body language, and confidence. Track your improvement over time.",
      icon: Trophy,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium text-indigo-500 border border-white/20 mb-6">
            <CheckCircle className="w-4 h-4" />
            Simple Process
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
            Your Interview Success Journey
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our streamlined 3-step process transforms interview anxiety into confidence through personalized AI coaching
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {DATA.map((feature, index) => (
            <div
              key={feature.id}
              className="group bg-white/70 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden hover:scale-105 transition-all duration-500 shadow-lg"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {feature.number}
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-violet-400/30 to-transparent"></div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-indigo-500 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className="relative bg-gradient-to-br from-slate-50 to-white p-8 min-h-[160px] flex items-center justify-center group-hover:from-violet-400/10 group-hover:to-purple-200/10 transition-all duration-500">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-16 h-16 border border-violet-400 rounded-full"></div>
                  <div className="absolute bottom-6 left-6 w-8 h-8 bg-indigo-500 rounded-full"></div>
                  <div className="absolute top-8 left-8 w-4 h-4 bg-red-400 rounded-full"></div>
                </div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-violet-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-violet-400 to-indigo-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <p className="text-slate-600 mb-6">Ready to start your journey?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-violet-400 to-indigo-500 text-white px-8 py-3 shadow-xl hover:shadow-2xl rounded-xl">
              Start Your Roadmap
            </Button>
            <Button className="bg-white/80 backdrop-blur-sm text-indigo-500 border border-white/30 px-8 py-3 rounded-xl hover:bg-white/90">
              View Sample Questions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// GradientOverlayCta Component
const GradientOverlayCta = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-white via-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-violet-400/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-indigo-500/20 to-sky-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-br from-red-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 lg:p-16 border border-white/30 text-center shadow-2xl hover:scale-[1.01] transition-all duration-700">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium text-indigo-500 border border-white/20 mb-8">
              <Sparkles className="w-4 h-4" />
              Your Interview Success Starts Here
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready to <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">Transform</span> Your
              <br />
              Career Journey?
            </h2>
            <p className="text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join thousands of Gen Z professionals who've already mastered their interviews with AI-powered coaching. Your dream job is just one practice session away.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button className="bg-gradient-to-r from-violet-400 to-indigo-500 text-white text-lg px-10 py-4 shadow-2xl group relative overflow-hidden rounded-xl">
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Trial
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              <Button className="bg-white/80 backdrop-blur-sm text-indigo-500 border border-white/30 text-lg px-10 py-4 group rounded-xl hover:bg-white/90">
                <span className="flex items-center gap-2">
                  Schedule Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent mb-2">14-Day</div>
                <div className="text-sm text-slate-600">Free Trial</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent mb-2">No Card</div>
                <div className="text-sm text-slate-600">Required</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent mb-2">Cancel</div>
                <div className="text-sm text-slate-600">Anytime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// NewsletterFooter Component
const NewsletterFooter = () => {
  const [email, setEmail] = useState('');

  const navigation = [
    {
      title: "Platform",
      links: [
        { name: "AI Mock Interviews", href: "#features" },
        { name: "Real-time Feedback", href: "#features" },
        { name: "Industry Preparation", href: "#features" },
        { name: "Performance Analytics", href: "#features" },
      ],
    },
    {
      title: "Company", 
      links: [
        { name: "About InterXAI", href: "#about" },
        { name: "Success Stories", href: "#testimonials" },
        { name: "Careers", href: "#careers" },
        { name: "Press Kit", href: "#press" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Interview Guide", href: "#resources" },
        { name: "Career Tips Blog", href: "#blog" },
        { name: "Industry Insights", href: "#insights" },
        { name: "Help Center", href: "#help" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Support", href: "#support" },
        { name: "Community Forum", href: "#community" },
        { name: "API Documentation", href: "#api" },
        { name: "Status Page", href: "#status" },
      ],
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer id="resources" className="bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-violet-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-indigo-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="py-16 border-b border-slate-700/50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium text-violet-300 border border-white/10 mb-8">
              <Mail className="w-4 h-4" />
              Stay Updated
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Get Interview Tips & Updates
            </h3>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Join 50,000+ professionals receiving weekly interview tips, industry insights, and AI coaching updates
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
                required
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-violet-400 to-indigo-500 text-white px-8 py-4 rounded-xl hover:from-violet-500 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">IX</span>
                </div>
                <span className="text-2xl font-bold text-white">InterXAI</span>
              </div>
              <p className="text-slate-400 mb-8 leading-relaxed max-w-md">
                Empowering Gen Z professionals to ace interviews and land their dream jobs with AI-powered coaching and real-time feedback.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-violet-400/20 transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-violet-400/20 transition-all duration-300">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-violet-400/20 transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            {navigation.map((section) => (
              <div key={section.title} className="lg:col-span-1">
                <h4 className="font-semibold text-white mb-6">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors duration-300 hover:underline"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="py-8 border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-400 text-sm">
              © 2025 InterXAI. All rights reserved. Built for the next generation of professionals.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Home Component
const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const navigate = useNavigate();

  const stats = [
    { number: "95%", label: "Success Rate", icon: Trophy },
    { number: "50K+", label: "Users Trained", icon: Users },
    { number: "1M+", label: "Interviews Practiced", icon: Target }
  ];

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Assuming getAuthToken is a simple localStorage getter
    if (token) {
      fetch('http://localhost:8000/api/users/get-id/', {
        headers: { Authorization: `Token ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.profile_id) {
            navigate(`/profile/${data.profile_id}`);
          }
        })
        .catch(err => {
          toast.error("Redirect error: " + err.message);
          localStorage.removeItem("authToken");
        });
    }

    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 3s ease-in-out infinite; animation-delay: 1s; }
      `}</style>
      <FloatingNavbar />
      <GlassmorphicHero stats={stats} currentStat={currentStat} />
      <NumberedBadgeCards />
      <GradientOverlayCta />
      <NewsletterFooter />
    </div>
  );
};

export default Home;