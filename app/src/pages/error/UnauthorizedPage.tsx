import { Link } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-6xl font-serif font-bold mb-4">403</h1>
        <h2 className="text-2xl font-serif font-bold mb-4">Access Denied</h2>
        <p className="text-[#6E6A63] mb-8">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Homepage
            </Button>
          </Link>
          <Link to="/login">
            <Button className="bg-[#111111] hover:bg-[#C69B2F] hover:text-[#111111]">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
