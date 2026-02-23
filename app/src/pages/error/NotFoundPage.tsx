import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-[#111111] rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-10 w-10 text-[#C69B2F]" />
        </div>
        <h1 className="text-6xl font-serif font-bold mb-4">404</h1>
        <h2 className="text-2xl font-serif font-bold mb-4">Page Not Found</h2>
        <p className="text-[#6E6A63] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button className="bg-[#111111] hover:bg-[#C69B2F] hover:text-[#111111]">
              <Home className="h-4 w-4 mr-2" />
              Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
