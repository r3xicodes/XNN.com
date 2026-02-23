/* ============================================
   XNN Authentication Manager
   ============================================ */

// User Roles and Clearance Levels
export const USER_ROLES = {
  GUEST: { level: 0, name: 'Guest', permissions: ['read:public'] },
  MEMBER: { level: 1, name: 'Member', permissions: ['read:public', 'read:member', 'comment'] },
  JOURNALIST: { level: 2, name: 'Journalist', permissions: ['read:public', 'read:member', 'comment', 'create:article', 'edit:own'] },
  EDITOR: { level: 3, name: 'Editor', permissions: ['read:public', 'read:member', 'comment', 'create:article', 'edit:any', 'publish', 'moderate'] },
  EXECUTIVE_EDITOR: { level: 4, name: 'Executive Editor', permissions: ['read:public', 'read:member', 'comment', 'create:article', 'edit:any', 'publish', 'moderate', 'manage:staff', 'access:analytics'] },
  ADMIN: { level: 5, name: 'Admin', permissions: ['*'] },
  SUPER_ADMIN: { level: 6, name: 'Super Admin', permissions: ['*'] }
};

// Clearance Levels
export const CLEARANCE_LEVELS = {
  0: { name: 'Public', color: '#38a169' },
  1: { name: 'Internal', color: '#3182ce' },
  2: { name: 'Restricted', color: '#d69e2e' },
  3: { name: 'Confidential', color: '#dd6b20' },
  4: { name: 'Secret', color: '#e53e3e' },
  5: { name: 'Top Secret', color: '#805ad5' }
};

// Mock Users Database
const MOCK_USERS = {
  'Elaria.Xana': {
    id: 'usr_001',
    username: 'Elaria.Xana',
    email: 'elaria.xana@xnn.gov',
    firstName: 'Elaria',
    lastName: 'Xana',
    role: 'SUPER_ADMIN',
    clearanceLevel: 5,
    password: '1234KalyMaddi3Lovez',
    avatar: 'assets/images/staff/elaria-xana.jpg',
    department: 'Administration',
    title: 'Super Administrator',
    joinedAt: '2020-01-15',
    lastLogin: new Date().toISOString()
  },
  'journalist1': {
    id: 'usr_002',
    username: 'journalist1',
    email: 'reporter@xnn.gov',
    firstName: 'Marcus',
    lastName: 'Chen',
    role: 'JOURNALIST',
    clearanceLevel: 2,
    password: 'password123',
    avatar: 'assets/images/staff/marcus-chen.jpg',
    department: 'Newsroom',
    title: 'Senior Correspondent',
    joinedAt: '2022-03-10',
    lastLogin: null
  },
  'editor1': {
    id: 'usr_003',
    username: 'editor1',
    email: 'editor@xnn.gov',
    firstName: 'Sarah',
    lastName: 'Williams',
    role: 'EDITOR',
    clearanceLevel: 3,
    password: 'password123',
    avatar: 'assets/images/staff/sarah-williams.jpg',
    department: 'Editorial',
    title: 'Section Editor',
    joinedAt: '2021-06-22',
    lastLogin: null
  }
};

export class AuthManager {
  constructor() {
    this.currentUser = null;
    this.token = null;
    this.init();
  }

  init() {
    // Check for stored session
    const stored = localStorage.getItem('xnn_session');
    if (stored) {
      try {
        const session = JSON.parse(stored);
        this.currentUser = session.user;
        this.token = session.token;
      } catch (e) {
        this.logout();
      }
    }
  }

  // Login method
  async login(username, password) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = MOCK_USERS[username];
    if (!user || user.password !== password) {
      return { success: false, error: 'Invalid username or password' };
    }

    // Create session
    this.currentUser = { ...user };
    delete this.currentUser.password; // Remove password from session
    
    this.token = this.generateToken(user);
    
    // Store session
    localStorage.setItem('xnn_session', JSON.stringify({
      user: this.currentUser,
      token: this.token,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }));

    // Update last login
    user.lastLogin = new Date().toISOString();

    return { success: true, user: this.currentUser };
  }

  // Logout method
  logout() {
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem('xnn_session');
  }

  // Register new user
  async register(userData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if username exists
    if (MOCK_USERS[userData.username]) {
      return { success: false, error: 'Username already exists' };
    }

    // Create new user
    const newUser = {
      id: `usr_${Date.now()}`,
      ...userData,
      role: 'MEMBER',
      clearanceLevel: 1,
      joinedAt: new Date().toISOString(),
      lastLogin: null
    };

    MOCK_USERS[userData.username] = newUser;

    return { success: true, user: newUser };
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Check if authenticated
  isAuthenticated() {
    return !!this.currentUser;
  }

  // Check if user has role
  hasRole(roles) {
    if (!this.currentUser) return false;
    if (typeof roles === 'string') roles = [roles];
    return roles.includes(this.currentUser.role);
  }

  // Check if user has permission
  hasPermission(permission) {
    if (!this.currentUser) return false;
    
    const role = USER_ROLES[this.currentUser.role];
    if (!role) return false;

    // Super admins have all permissions
    if (role.permissions.includes('*')) return true;

    // Check specific permission
    return role.permissions.includes(permission);
  }

  // Check clearance level
  hasClearance(level) {
    if (!this.currentUser) return level === 0;
    return this.currentUser.clearanceLevel >= level;
  }

  // Get user clearance info
  getClearanceInfo() {
    if (!this.currentUser) return CLEARANCE_LEVELS[0];
    return CLEARANCE_LEVELS[this.currentUser.clearanceLevel] || CLEARANCE_LEVELS[0];
  }

  // Generate JWT-like token (simulated)
  generateToken(user) {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: user.id,
      username: user.username,
      role: user.role,
      clearance: user.clearanceLevel,
      iat: Date.now(),
      exp: Date.now() + (24 * 60 * 60 * 1000)
    }));
    const signature = btoa(`${header}.${payload}.secret`);
    return `${header}.${payload}.${signature}`;
  }

  // Validate token (simulated)
  validateToken(token) {
    if (!token) return false;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      const payload = JSON.parse(atob(parts[1]));
      return payload.exp > Date.now();
    } catch (e) {
      return false;
    }
  }

  // Refresh session
  refreshSession() {
    const stored = localStorage.getItem('xnn_session');
    if (stored) {
      const session = JSON.parse(stored);
      if (session.expiresAt > Date.now()) {
        session.expiresAt = Date.now() + (24 * 60 * 60 * 1000);
        localStorage.setItem('xnn_session', JSON.stringify(session));
        return true;
      }
    }
    return false;
  }

  // Get all users (admin only)
  getAllUsers() {
    if (!this.hasRole(['ADMIN', 'SUPER_ADMIN', 'EXECUTIVE_EDITOR'])) {
      return [];
    }
    
    return Object.values(MOCK_USERS).map(u => ({
      id: u.id,
      username: u.username,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      role: u.role,
      clearanceLevel: u.clearanceLevel,
      department: u.department,
      title: u.title,
      joinedAt: u.joinedAt,
      lastLogin: u.lastLogin
    }));
  }

  // Update user (admin only)
  updateUser(userId, updates) {
    if (!this.hasRole(['ADMIN', 'SUPER_ADMIN'])) {
      return { success: false, error: 'Insufficient permissions' };
    }

    const user = Object.values(MOCK_USERS).find(u => u.id === userId);
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    Object.assign(user, updates);
    return { success: true, user };
  }

  // Delete user (super admin only)
  deleteUser(userId) {
    if (!this.hasRole('SUPER_ADMIN')) {
      return { success: false, error: 'Insufficient permissions' };
    }

    const username = Object.keys(MOCK_USERS).find(key => MOCK_USERS[key].id === userId);
    if (!username) {
      return { success: false, error: 'User not found' };
    }

    delete MOCK_USERS[username];
    return { success: true };
  }
}

export default AuthManager;
