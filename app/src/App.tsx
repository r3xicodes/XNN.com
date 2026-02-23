import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import type { UserRole } from '@/types/enterprise';

// Public Pages
import PublicLayout from '@/layouts/PublicLayout';
import HomePage from '@/pages/public/HomePage';
import ArticlePage from '@/pages/public/ArticlePage';
import CategoryPage from '@/pages/public/CategoryPage';
import LivePage from '@/pages/public/LivePage';

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage';

// Newsroom Portal
import NewsroomLayout from '@/layouts/NewsroomLayout';
import NewsroomDashboard from '@/pages/newsroom/Dashboard';
import EditorialQueue from '@/pages/newsroom/EditorialQueue';
import StaffManagement from '@/pages/newsroom/StaffManagement';
import NewsroomAnalytics from '@/pages/newsroom/Analytics';

// Broadcast Studio
import StudioLayout from '@/layouts/StudioLayout';
import StudioControl from '@/pages/studio/Control';
import LiveMode from '@/pages/studio/LiveMode';

// Intelligence Dashboard
import IntelligenceLayout from '@/layouts/IntelligenceLayout';
import IntelligenceOverview from '@/pages/intelligence/Overview';
import ThreatMap from '@/pages/intelligence/ThreatMap';
import Operations from '@/pages/intelligence/Operations';
import ClassifiedAccess from '@/pages/intelligence/ClassifiedAccess';

// Error Pages
import NotFoundPage from '@/pages/error/NotFoundPage';
import UnauthorizedPage from '@/pages/error/UnauthorizedPage';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  requiredClearance?: number;
}

function ProtectedRoute({ children, requiredRoles, requiredClearance }: ProtectedRouteProps) {
  const { isAuthenticated, hasRole, hasClearance } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && !hasRole(requiredRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requiredClearance && !hasClearance(requiredClearance)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/live" element={<LivePage />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Newsroom Portal - Protected */}
        <Route
          element={
            <ProtectedRoute requiredRoles={['EDITOR', 'EXECUTIVE_EDITOR', 'ADMIN', 'SUPER_ADMIN']}>
              <NewsroomLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/newsroom" element={<NewsroomDashboard />} />
          <Route path="/newsroom/queue" element={<EditorialQueue />} />
          <Route path="/newsroom/analytics" element={<NewsroomAnalytics />} />
        </Route>

        <Route
          element={
            <ProtectedRoute requiredRoles={['ADMIN', 'SUPER_ADMIN']}>
              <NewsroomLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/newsroom/staff" element={<StaffManagement />} />
        </Route>

        {/* Broadcast Studio - Protected */}
        <Route
          element={
            <ProtectedRoute requiredRoles={['EXECUTIVE_EDITOR', 'ADMIN', 'SUPER_ADMIN']}>
              <StudioLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/studio" element={<StudioControl />} />
          <Route path="/studio/live" element={<LiveMode />} />
        </Route>

        {/* Intelligence Dashboard - Protected */}
        <Route
          element={
            <ProtectedRoute requiredRoles={['EXECUTIVE_EDITOR', 'ADMIN', 'SUPER_ADMIN']}>
              <IntelligenceLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/intelligence" element={<IntelligenceOverview />} />
          <Route path="/intelligence/map" element={<ThreatMap />} />
          <Route path="/intelligence/operations" element={<Operations />} />
        </Route>

        <Route
          element={
            <ProtectedRoute requiredClearance={5}>
              <IntelligenceLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/intelligence/classified" element={<ClassifiedAccess />} />
        </Route>

        {/* Error Pages */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
