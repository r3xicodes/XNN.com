// XNN Enterprise 4.0 - Type Definitions

// User Roles
export type UserRole = 
  | 'GUEST' 
  | 'MEMBER' 
  | 'JOURNALIST' 
  | 'EDITOR' 
  | 'EXECUTIVE_EDITOR' 
  | 'ADMIN' 
  | 'SUPER_ADMIN';

export type ClearanceLevel = 0 | 1 | 2 | 3 | 4 | 5;

// User Interface
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  clearanceLevel: ClearanceLevel;
  permissions: string[];
  avatar?: string;
  department?: string;
  region?: string;
  joinDate: string;
  lastActive: string;
  isActive: boolean;
}

// Authentication
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  refreshToken: string;
  user: User;
  expiresAt: string;
}

// Article Types
export type ArticleStatus = 
  | 'DRAFT' 
  | 'SUBMITTED' 
  | 'IN_REVIEW' 
  | 'EDITING' 
  | 'LEGAL_REVIEW' 
  | 'SCHEDULED' 
  | 'PUBLISHED' 
  | 'ARCHIVED';

export interface Article {
  id: string;
  headline: string;
  subtitle?: string;
  content: string;
  excerpt: string;
  author: User;
  editor?: User;
  category: Category;
  tags: string[];
  status: ArticleStatus;
  featuredImage?: string;
  images: string[];
  publishedAt?: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  comments: number;
  isBreaking: boolean;
  isFeatured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent?: Category;
}

// Editorial Queue
export interface EditorialItem {
  id: string;
  article: Article;
  status: ArticleStatus;
  assignedTo?: User;
  reviewedBy?: User;
  comments: EditorialComment[];
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  submittedAt: string;
  deadline?: string;
}

export interface EditorialComment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
}

// Staff Management
export interface StaffMember extends User {
  articlesWritten: number;
  articlesPublished: number;
  approvalRate: number;
  averagePublishTime: number;
  performance: PerformanceMetrics;
}

export interface PerformanceMetrics {
  monthlyArticles: number;
  monthlyViews: number;
  engagement: number;
  quality: number;
}

// Newsroom Analytics
export interface NewsroomAnalytics {
  articlesPublished: number;
  articlesInQueue: number;
  averagePublishTime: number;
  staffActivity: ActivityLog[];
  engagement: EngagementMetrics;
  dailyStats: DailyStat[];
}

export interface ActivityLog {
  id: string;
  user: User;
  action: string;
  target?: string;
  timestamp: string;
}

export interface EngagementMetrics {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  averageTimeOnPage: number;
}

export interface DailyStat {
  date: string;
  articles: number;
  views: number;
  uniqueVisitors: number;
}

// Broadcast Studio
export interface StudioState {
  isLive: boolean;
  streamKey: string;
  currentSegment: Segment | null;
  lowerThird: LowerThird | null;
  breakingNews: BreakingNews | null;
  ticker: Ticker | null;
  cameras: Camera[];
  activeCamera: string;
}

export interface Segment {
  id: string;
  title: string;
  type: 'NEWS' | 'INTERVIEW' | 'REPORT' | 'WEATHER' | 'SPORTS';
  duration: number;
  anchor?: User;
  guest?: string;
}

export interface LowerThird {
  id: string;
  text: string;
  subtext?: string;
  type: 'ANCHOR' | 'GUEST' | 'LOCATION' | 'TOPIC';
  visible: boolean;
}

export interface BreakingNews {
  id: string;
  headline: string;
  content: string;
  triggeredAt: string;
  triggeredBy: User;
}

export interface Ticker {
  id: string;
  items: string[];
  isRunning: boolean;
  speed: 'SLOW' | 'NORMAL' | 'FAST';
}

export interface Camera {
  id: string;
  name: string;
  type: 'ANCHOR' | 'WIDE' | 'GUEST' | 'OVERHEAD';
  isActive: boolean;
  preview: string;
}

// Intelligence Dashboard
export interface ThreatLevel {
  level: 1 | 2 | 3 | 4 | 5;
  label: 'LOW' | 'GUARDED' | 'ELEVATED' | 'HIGH' | 'CRITICAL';
  description: string;
  updatedAt: string;
}

export interface Region {
  id: string;
  name: string;
  code: string;
  status: 'NORMAL' | 'WATCH' | 'WARNING' | 'ALERT';
  threatLevel: number;
  coordinates: { x: number; y: number };
  intel: RegionIntel;
}

export interface RegionIntel {
  summary: string;
  recentActivity: ActivityReport[];
  alerts: Alert[];
  resources: Resource[];
}

export interface ActivityReport {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  region: string;
  createdAt: string;
  acknowledged: boolean;
}

export interface Resource {
  id: string;
  type: 'FLEET' | 'AIR' | 'GROUND' | 'SATELLITE';
  name: string;
  status: 'ACTIVE' | 'STANDBY' | 'MAINTENANCE';
  location: string;
}

export interface FleetStatus {
  total: number;
  active: number;
  standby: number;
  maintenance: number;
  deployed: number;
}

export interface IntelReport {
  id: string;
  title: string;
  classification: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';
  author: User;
  summary: string;
  content: string;
  regions: string[];
  createdAt: string;
  updatedAt: string;
}

// Analytics
export interface RealtimeAnalytics {
  activeUsers: number;
  pageViews: number;
  topArticles: Article[];
  regionBreakdown: RegionBreakdown[];
  deviceBreakdown: DeviceBreakdown[];
}

export interface RegionBreakdown {
  region: string;
  users: number;
  percentage: number;
}

export interface DeviceBreakdown {
  device: string;
  users: number;
  percentage: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
