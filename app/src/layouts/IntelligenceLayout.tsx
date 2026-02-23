import { Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Map, 
  Activity, 
  Lock,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { label: 'Overview', href: '/intelligence', icon: Activity },
  { label: 'Threat Map', href: '/intelligence/map', icon: Map },
  { label: 'Operations', href: '/intelligence/operations', icon: Shield },
  { label: 'Classified', href: '/intelligence/classified', icon: Lock, clearance: 5 },
];

export default function IntelligenceLayout() {
  const navigate = useNavigate();
  const { user, logout, hasClearance } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#161B22] flex flex-col fixed h-full border-r border-[#30363D]">
        {/* Logo */}
        <div className="p-6 border-b border-[#30363D]">
          <Link to="/" className="block">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-[#58A6FF]" />
              <div>
                <h1 className="text-sm font-bold">STRATEGIC INTELLIGENCE</h1>
                <p className="text-xs text-white/60">XNN Defense Division</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              if (item.clearance && !hasClearance(item.clearance)) {
                return null;
              }
              
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:bg-[#30363D] hover:text-white rounded transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                    {item.clearance && (
                      <Badge className="ml-auto bg-red-600 text-xs">L5</Badge>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-[#30363D]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#58A6FF] flex items-center justify-center text-[#0D1117] font-bold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.firstName} {user?.lastName}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-white/60">{user?.role.replace('_', ' ')}</p>
                <Badge className="text-xs bg-[#58A6FF] text-[#0D1117]">L{user?.clearanceLevel}</Badge>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full border-[#30363D] text-white hover:bg-[#30363D]"
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
