import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login({ username, password });
    
    if (success) {
      navigate('/newsroom');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-3xl font-serif font-bold mb-2">XANA NATIONAL NEWS</h1>
          </Link>
          <p className="text-[#6E6A63]">Enterprise 4.0</p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-[rgba(17,17,17,0.14)] p-8">
          <h2 className="text-xl font-serif font-bold mb-6">Staff Login</h2>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6E6A63]" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6E6A63]" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6A63] hover:text-[#111111]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#111111] hover:bg-[#C69B2F] hover:text-[#111111]"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-[rgba(17,17,17,0.14)]">
            <p className="text-sm text-[#6E6A63] mb-2">Demo Credentials:</p>
            <div className="text-xs text-[#6E6A63] space-y-1">
              <p><strong>Super Admin:</strong> Elaria.Xana / 1234KalyMaddi3Lovez</p>
              <p><strong>Editor:</strong> editor.test / test123</p>
              <p><strong>Journalist:</strong> journalist.test / test123</p>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-[#6E6A63]">
          <Link to="/" className="hover:text-[#C69B2F] transition-colors">
            ← Back to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
