import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'National', href: '/category/national' },
  { 
    label: 'World', 
    href: '/category/world',
    dropdown: [
      { label: 'Adzkhri', href: '/category/world/adzkhri' },
      { label: 'North Atleos', href: '/category/world/north-atleos' },
      { label: 'Central Atleos', href: '/category/world/central-atleos' },
      { label: 'South Atleos', href: '/category/world/south-atleos' },
      { label: 'Apoeln', href: '/category/world/apoeln' },
      { label: 'Aspen', href: '/category/world/aspen' },
      { label: 'Asterol', href: '/category/world/asterol' },
      { label: 'Antartica', href: '/category/world/antartica' },
      { label: 'Xara', href: '/category/world/xara' },
      { label: "Labu'D'ike", href: '/category/world/labudike' },
    ]
  },
  { label: 'Military', href: '/category/military' },
  { label: 'Economy', href: '/category/economy' },
  { label: 'Technology', href: '/category/technology' },
  { label: 'Culture', href: '/category/culture' },
  { label: 'Politics', href: '/category/politics' },
  { label: 'Opinion', href: '/category/opinion' },
  { label: 'Live', href: '/live' },
];

export default function PublicLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      {/* Top Bar */}
      <div 
        className={`border-b border-[rgba(17,17,17,0.14)] bg-[#F5F3EE] transition-all duration-300 ${
          isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-9'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 h-full flex items-center justify-between text-xs">
          <div className="flex items-center gap-4 text-[#6E6A63]">
            <span>{currentDate}</span>
            <span className="hidden sm:inline">24°C</span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link to="/newsroom" className="flex items-center gap-1.5 hover:text-[#C69B2F] transition-colors">
                <User size={14} />
                <span className="hidden sm:inline">{user?.firstName}</span>
              </Link>
            ) : (
              <Link to="/login" className="flex items-center gap-1.5 hover:text-[#C69B2F] transition-colors">
                <User size={14} />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}
            <button className="bg-[#111111] text-white px-3 py-1 text-xs font-medium hover:bg-[#C69B2F] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div 
        className={`border-b border-[rgba(17,17,17,0.14)] bg-[#F5F3EE] transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex-1">
            <h1 
              className={`font-serif font-bold tracking-tight transition-all duration-300 ${
                isScrolled ? 'text-xl' : 'text-3xl md:text-4xl'
              }`}
            >
              XANA NATIONAL NEWS
            </h1>
          </Link>
          
          <button className="p-2 hover:bg-[rgba(17,17,17,0.05)] transition-colors md:hidden">
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-b border-[rgba(17,17,17,0.14)] bg-[#F5F3EE] hidden md:block sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4">
          <ul className="flex items-center justify-center gap-1">
            {navItems.map((item) => (
              <li 
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 px-4 py-3 text-sm font-medium transition-colors relative ${
                    isActive(item.href)
                      ? 'text-[#C69B2F]'
                      : 'hover:text-[#C69B2F]'
                  }`}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown size={14} />}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#C69B2F]" />
                  )}
                </Link>
                
                {/* Dropdown */}
                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-white border border-[rgba(17,17,17,0.14)] shadow-lg min-w-[200px] z-50">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.href}
                        className="block px-4 py-2.5 text-sm hover:bg-[#F5F3EE] hover:text-[#C69B2F] transition-colors"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-[#F5F3EE] border border-[rgba(17,17,17,0.14)] md:hidden"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#F5F3EE] z-40 pt-20 px-4 md:hidden">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 text-lg font-medium border-b border-[rgba(17,17,17,0.14)] ${
                    isActive(item.href) ? 'text-[#C69B2F]' : ''
                  }`}
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <ul className="pl-4 mt-1 space-y-1">
                    {item.dropdown.map((subItem) => (
                      <li key={subItem.label}>
                        <Link
                          to={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2 text-sm text-[#6E6A63]"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#111111] text-white py-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-4">Sections</h4>
              <ul className="space-y-2">
                {['National', 'World', 'Business', 'Technology', 'Culture', 'Opinion', 'Live'].map((item) => (
                  <li key={item}>
                    <Link to={`/category/${item.toLowerCase()}`} className="text-sm text-white/85 hover:text-[#C69B2F] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-4">Company</h4>
              <ul className="space-y-2">
                {['About', 'Careers', 'Code of Ethics', 'Press'].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-white/85 hover:text-[#C69B2F] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-4">Support</h4>
              <ul className="space-y-2">
                {['Contact', 'Help', 'Accessibility', 'Sitemap'].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase()}`} className="text-sm text-white/85 hover:text-[#C69B2F] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-4">Enterprise</h4>
              <ul className="space-y-2">
                {isAuthenticated ? (
                  <>
                    <li><Link to="/newsroom" className="text-sm text-white/85 hover:text-[#C69B2F] transition-colors">Newsroom Portal</Link></li>
                    <li><Link to="/studio" className="text-sm text-white/85 hover:text-[#C69B2F] transition-colors">Broadcast Studio</Link></li>
                    <li><Link to="/intelligence" className="text-sm text-white/85 hover:text-[#C69B2F] transition-colors">Intelligence</Link></li>
                  </>
                ) : (
                  <li><Link to="/login" className="text-sm text-white/85 hover:text-[#C69B2F] transition-colors">Staff Login</Link></li>
                )}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 mb-6">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-serif font-bold">XANA NATIONAL NEWS</h2>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/60">
            <p>© 2026 Xana National News</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
