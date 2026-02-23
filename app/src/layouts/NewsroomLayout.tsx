import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BarChart3, 
  LogOut,
  ChevronRight,
  Bell
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Dashboard', href: '/newsroom', icon: LayoutDashboard },
  { label: 'Editorial Queue', href: '/newsroom/queue', icon: FileText },
  { label: 'Staff Management', href: '/newsroom/staff', icon: Users, adminOnly: true },
  { label: 'Analytics', href: '/newsroom/analytics', icon: BarChart3 },
];

export default function NewsroomLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, hasRole } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111111] text-white flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="block">
            <h1 className="text-lg font-serif font-bold">XNN NEWSROOM</h1>
          </Link>
          <p className="text-xs text-white/60 mt-1">Enterprise 4.0</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              if (item.adminOnly && !hasRole(['ADMIN', 'SUPER_ADMIN'])) {
                return null;
              }
              
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                      isActive(item.href)
                        ? 'bg-[#C69B2F] text-[#111111]'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#C69B2F] flex items-center justify-center text-[#111111] font-bold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-white/60">{user?.role.replace('_', ' ')}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full border-white/20 text-white hover:bg-white/10"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white border-b border-[rgba(17,17,17,0.14)] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-[#6E6A63]">
            <Link to="/newsroom" className="hover:text-[#C69B2F]">Newsroom</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[#111111]">
              {navItems.find(item => item.href === location.pathname)?.label || 'Page'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-[rgba(17,17,17,0.05)] rounded">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <Link to="/" className="text-sm text-[#6E6A63] hover:text-[#C69B2F]">
              View Site →
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
