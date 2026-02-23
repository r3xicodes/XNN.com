import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole, LoginCredentials } from '@/types/enterprise';

// Admin credentials (seeded)
const ADMIN_USER: User = {
  id: 'admin-001',
  username: 'Elaria.Xana',
  email: 'elaria.xana@xnn.com',
  firstName: 'Elaria',
  lastName: 'Xana',
  role: 'SUPER_ADMIN',
  clearanceLevel: 5,
  permissions: ['*'],
  department: 'Executive',
  joinDate: '2020-01-01',
  lastActive: new Date().toISOString(),
  isActive: true,
};

// Mock users for testing
const MOCK_USERS: Record<string, { user: User; password: string }> = {
  'Elaria.Xana': {
    user: ADMIN_USER,
    password: '1234KalyMaddi3Lovez',
  },
  'journalist.test': {
    user: {
      id: 'jour-001',
      username: 'journalist.test',
      email: 'journalist@xnn.com',
      firstName: 'Test',
      lastName: 'Journalist',
      role: 'JOURNALIST',
      clearanceLevel: 2,
      permissions: ['articles:read', 'articles:create', 'articles:update:own'],
      department: 'National Desk',
      joinDate: '2023-06-15',
      lastActive: new Date().toISOString(),
      isActive: true,
    },
    password: 'test123',
  },
  'editor.test': {
    user: {
      id: 'edit-001',
      username: 'editor.test',
      email: 'editor@xnn.com',
      firstName: 'Test',
      lastName: 'Editor',
      role: 'EDITOR',
      clearanceLevel: 3,
      permissions: ['articles:*', 'queue:read', 'queue:update'],
      department: 'Editorial',
      joinDate: '2022-03-10',
      lastActive: new Date().toISOString(),
      isActive: true,
    },
    password: 'test123',
  },
};

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  checkPermission: (permission: string) => boolean;
  hasRole: (roles: UserRole[]) => boolean;
  hasClearance: (level: number) => boolean;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials): Promise<boolean> => {
        set({ isLoading: true, error: null });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockUser = MOCK_USERS[credentials.username];
        
        if (mockUser && mockUser.password === credentials.password) {
          const token = `jwt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const refreshToken = `refresh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          
          set({
            user: mockUser.user,
            token,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          return true;
        }
        
        set({
          isLoading: false,
          error: 'Invalid username or password',
        });
        
        return false;
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        });
      },

      checkPermission: (permission: string): boolean => {
        const { user } = get();
        if (!user) return false;
        
        // Super admin has all permissions
        if (user.permissions.includes('*')) return true;
        
        // Check specific permission
        if (user.permissions.includes(permission)) return true;
        
        // Check wildcard permissions (e.g., 'articles:*' matches 'articles:read')
        const wildcard = permission.split(':').slice(0, -1).join(':') + ':*';
        if (user.permissions.includes(wildcard)) return true;
        
        return false;
      },

      hasRole: (roles: UserRole[]): boolean => {
        const { user } = get();
        if (!user) return false;
        return roles.includes(user.role);
      },

      hasClearance: (level: number): boolean => {
        const { user } = get();
        if (!user) return false;
        return user.clearanceLevel >= level;
      },

      updateUser: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },
    }),
    {
      name: 'xnn-auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Role-based access control helpers
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  GUEST: 0,
  MEMBER: 1,
  JOURNALIST: 2,
  EDITOR: 3,
  EXECUTIVE_EDITOR: 4,
  ADMIN: 5,
  SUPER_ADMIN: 6,
};

export const canAccess = (userRole: UserRole, requiredRole: UserRole): boolean => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};

// Route permissions
export const ROUTE_PERMISSIONS: Record<string, UserRole[]> = {
  '/newsroom': ['EDITOR', 'EXECUTIVE_EDITOR', 'ADMIN', 'SUPER_ADMIN'],
  '/newsroom/staff': ['ADMIN', 'SUPER_ADMIN'],
  '/newsroom/analytics': ['EDITOR', 'EXECUTIVE_EDITOR', 'ADMIN', 'SUPER_ADMIN'],
  '/studio': ['EXECUTIVE_EDITOR', 'ADMIN', 'SUPER_ADMIN'],
  '/intelligence': ['EXECUTIVE_EDITOR', 'ADMIN', 'SUPER_ADMIN'],
  '/intelligence/classified': ['ADMIN', 'SUPER_ADMIN'],
};
