import { Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  Radio, 
  Settings, 
  LogOut
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Control Room', href: '/studio', icon: Settings },
  { label: 'Live Mode', href: '/studio/live', icon: Radio },
];

export default function StudioLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111111] flex flex-col fixed h-full border-r border-white/10">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="block">
            <h1 className="text-lg font-serif font-bold">XNN STUDIO</h1>
          </Link>
          <p className="text-xs text-white/60 mt-1">Broadcast Control</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="flex items-center gap-3 px-6 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
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
        <Outlet />
      </main>
    </div>
  );
}
