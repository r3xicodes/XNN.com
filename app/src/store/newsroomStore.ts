import { create } from 'zustand';
import type { 
  Article, 
  EditorialItem, 
  StaffMember, 
  NewsroomAnalytics,
  ArticleStatus
} from '@/types/enterprise';

// Mock articles
const MOCK_ARTICLES: Article[] = [
  {
    id: 'art-001',
    headline: 'The Quiet Shift Reshaping Global Trade',
    subtitle: 'How new corridors, tariffs, and treaties are rewriting the rules',
    content: 'Full article content here...',
    excerpt: 'A comprehensive investigation into the changing landscape of international commerce.',
    author: {
      id: 'jour-001',
      username: 'journalist.test',
      email: 'journalist@xnn.com',
      firstName: 'Marcus',
      lastName: 'Hale',
      role: 'JOURNALIST',
      clearanceLevel: 2,
      permissions: ['articles:read', 'articles:create'],
      joinDate: '2023-06-15',
      lastActive: new Date().toISOString(),
      isActive: true,
    },
    category: { id: 'cat-001', name: 'Investigation', slug: 'investigation' },
    tags: ['trade', 'infrastructure', 'policy'],
    status: 'PUBLISHED',
    featuredImage: '/images/featured-trade-corridor.jpg',
    images: [],
    publishedAt: '2026-02-24T10:00:00Z',
    createdAt: '2026-02-20T08:00:00Z',
    updatedAt: '2026-02-24T10:00:00Z',
    views: 45230,
    likes: 1234,
    comments: 89,
    isBreaking: false,
    isFeatured: true,
  },
  {
    id: 'art-002',
    headline: 'Coastal Cities Draft New Flood Standards',
    subtitle: 'Municipalities implement unprecedented infrastructure requirements',
    content: 'Full article content here...',
    excerpt: 'Municipalities along the eastern seaboard are implementing new standards.',
    author: {
      id: 'jour-001',
      username: 'journalist.test',
      email: 'journalist@xnn.com',
      firstName: 'Sarah',
      lastName: 'Chen',
      role: 'JOURNALIST',
      clearanceLevel: 2,
      permissions: ['articles:read', 'articles:create'],
      joinDate: '2023-06-15',
      lastActive: new Date().toISOString(),
      isActive: true,
    },
    category: { id: 'cat-002', name: 'National', slug: 'national' },
    tags: ['infrastructure', 'climate', 'cities'],
    status: 'IN_REVIEW',
    featuredImage: '/images/topstory-flood-defense.jpg',
    images: [],
    createdAt: '2026-02-23T14:00:00Z',
    updatedAt: '2026-02-23T14:00:00Z',
    views: 0,
    likes: 0,
    comments: 0,
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 'art-003',
    headline: 'Summit Ends With a Fragile Ceasefire Deal',
    subtitle: 'Diplomatic breakthrough after marathon negotiations',
    content: 'Full article content here...',
    excerpt: 'Diplomatic breakthrough comes after marathon 72-hour negotiations.',
    author: {
      id: 'jour-002',
      username: 'reporter.world',
      email: 'world@xnn.com',
      firstName: 'James',
      lastName: 'Morrison',
      role: 'JOURNALIST',
      clearanceLevel: 2,
      permissions: ['articles:read', 'articles:create'],
      joinDate: '2023-08-20',
      lastActive: new Date().toISOString(),
      isActive: true,
    },
    category: { id: 'cat-003', name: 'World', slug: 'world' },
    tags: ['diplomacy', 'conflict', 'peace'],
    status: 'DRAFT',
    featuredImage: '/images/topstory-summit-hall.jpg',
    images: [],
    createdAt: '2026-02-24T09:00:00Z',
    updatedAt: '2026-02-24T09:00:00Z',
    views: 0,
    likes: 0,
    comments: 0,
    isBreaking: false,
    isFeatured: false,
  },
];

// Mock editorial queue
const MOCK_QUEUE: EditorialItem[] = [
  {
    id: 'queue-001',
    article: MOCK_ARTICLES[1],
    status: 'IN_REVIEW',
    priority: 'HIGH',
    comments: [],
    submittedAt: '2026-02-23T14:00:00Z',
    deadline: '2026-02-25T12:00:00Z',
  },
  {
    id: 'queue-002',
    article: MOCK_ARTICLES[2],
    status: 'DRAFT',
    priority: 'MEDIUM',
    comments: [],
    submittedAt: '2026-02-24T09:00:00Z',
  },
];

// Mock staff
const MOCK_STAFF: StaffMember[] = [
  {
    ...MOCK_ARTICLES[0].author,
    articlesWritten: 45,
    articlesPublished: 38,
    approvalRate: 84,
    averagePublishTime: 48,
    performance: {
      monthlyArticles: 8,
      monthlyViews: 125000,
      engagement: 7.2,
      quality: 8.5,
    },
  },
  {
    ...MOCK_ARTICLES[2].author,
    articlesWritten: 32,
    articlesPublished: 28,
    approvalRate: 88,
    averagePublishTime: 36,
    performance: {
      monthlyArticles: 6,
      monthlyViews: 98000,
      engagement: 7.8,
      quality: 8.9,
    },
  },
];

// Mock analytics
const MOCK_ANALYTICS: NewsroomAnalytics = {
  articlesPublished: 156,
  articlesInQueue: 12,
  averagePublishTime: 42,
  staffActivity: [
    {
      id: 'act-001',
      user: MOCK_STAFF[0],
      action: 'Submitted article for review',
      target: 'art-002',
      timestamp: '2026-02-23T14:00:00Z',
    },
    {
      id: 'act-002',
      user: MOCK_STAFF[1],
      action: 'Created new draft',
      target: 'art-003',
      timestamp: '2026-02-24T09:00:00Z',
    },
  ],
  engagement: {
    totalViews: 2450000,
    totalLikes: 45600,
    totalComments: 3200,
    averageTimeOnPage: 245,
  },
  dailyStats: [
    { date: '2026-02-18', articles: 3, views: 125000, uniqueVisitors: 45000 },
    { date: '2026-02-19', articles: 2, views: 118000, uniqueVisitors: 42000 },
    { date: '2026-02-20', articles: 4, views: 142000, uniqueVisitors: 51000 },
    { date: '2026-02-21', articles: 3, views: 135000, uniqueVisitors: 48000 },
    { date: '2026-02-22', articles: 2, views: 128000, uniqueVisitors: 46000 },
    { date: '2026-02-23', articles: 3, views: 145000, uniqueVisitors: 52000 },
    { date: '2026-02-24', articles: 1, views: 98000, uniqueVisitors: 35000 },
  ],
};

interface NewsroomState {
  articles: Article[];
  queue: EditorialItem[];
  staff: StaffMember[];
  analytics: NewsroomAnalytics;
  isLoading: boolean;
  
  // Actions
  createArticle: (article: Partial<Article>) => void;
  updateArticleStatus: (articleId: string, status: ArticleStatus, comment?: string) => void;
  assignArticle: (articleId: string, userId: string) => void;
  publishArticle: (articleId: string) => void;
  getArticlesByStatus: (status: ArticleStatus) => Article[];
  getStaffPerformance: (userId: string) => StaffMember | undefined;
}

export const useNewsroomStore = create<NewsroomState>((set, get) => ({
  articles: MOCK_ARTICLES,
  queue: MOCK_QUEUE,
  staff: MOCK_STAFF,
  analytics: MOCK_ANALYTICS,
  isLoading: false,

  createArticle: (article: Partial<Article>) => {
    const newArticle: Article = {
      id: `art-${Date.now()}`,
      headline: article.headline || 'Untitled',
      subtitle: article.subtitle,
      content: article.content || '',
      excerpt: article.excerpt || '',
      author: article.author!,
      category: article.category || { id: 'cat-default', name: 'Uncategorized', slug: 'uncategorized' },
      tags: article.tags || [],
      status: 'DRAFT',
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      comments: 0,
      isBreaking: false,
      isFeatured: false,
    };

    set(state => ({
      articles: [newArticle, ...state.articles],
    }));
  },

  updateArticleStatus: (articleId: string, status: ArticleStatus, comment?: string) => {
    set(state => ({
      articles: state.articles.map(article =>
        article.id === articleId
          ? { ...article, status, updatedAt: new Date().toISOString() }
          : article
      ),
      queue: state.queue.map(item =>
        item.article.id === articleId
          ? {
              ...item,
              status,
              comments: comment
                ? [...item.comments, {
                    id: `comment-${Date.now()}`,
                    author: state.staff[0],
                    content: comment,
                    createdAt: new Date().toISOString(),
                  }]
                : item.comments,
            }
          : item
      ),
    }));
  },

  assignArticle: (articleId: string, userId: string) => {
    set(state => ({
      queue: state.queue.map(item =>
        item.article.id === articleId
          ? { ...item, assignedTo: state.staff.find(s => s.id === userId) }
          : item
      ),
    }));
  },

  publishArticle: (articleId: string) => {
    set(state => ({
      articles: state.articles.map(article =>
        article.id === articleId
          ? {
              ...article,
              status: 'PUBLISHED',
              publishedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          : article
      ),
    }));
  },

  getArticlesByStatus: (status: ArticleStatus) => {
    return get().articles.filter(article => article.status === status);
  },

  getStaffPerformance: (userId: string) => {
    return get().staff.find(s => s.id === userId);
  },
}));
