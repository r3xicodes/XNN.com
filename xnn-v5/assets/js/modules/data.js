/* ============================================
   XNN Data Store
   ============================================ */

// Mock data for the news platform
const MOCK_DATA = {
  // Featured Story
  featuredStory: {
    id: 'art_001',
    title: "President Announces Historic Infrastructure Investment Plan Worth $2 Trillion",
    excerpt: "In a landmark address to the nation, the President unveiled an ambitious infrastructure plan that promises to transform the nation's transportation, energy, and digital networks over the next decade.",
    category: "Politics",
    categoryUrl: "pages/politics.html",
    url: "pages/article.html?id=art_001",
    image: "assets/images/editorial/infrastructure-plan.jpg",
    breaking: true,
    timeAgo: "2 hours ago",
    author: {
      name: "James Mitchell",
      avatar: "assets/images/staff/james-mitchell.jpg",
      url: "pages/author/james-mitchell.html"
    }
  },

  // Top Stories
  topStories: [
    {
      id: 'art_002',
      title: "Global Climate Summit Reaches Breakthrough Agreement on Emissions",
      category: "World",
      url: "pages/article.html?id=art_002",
      timeAgo: "45 minutes ago"
    },
    {
      id: 'art_003',
      title: "Tech Giants Report Record Quarterly Earnings Amid AI Boom",
      category: "Business",
      url: "pages/article.html?id=art_003",
      timeAgo: "1 hour ago"
    },
    {
      id: 'art_004',
      title: "National Team Advances to Championship Finals",
      category: "Sports",
      url: "pages/article.html?id=art_004",
      timeAgo: "3 hours ago"
    },
    {
      id: 'art_005',
      title: "New Medical Breakthrough Offers Hope for Alzheimer's Patients",
      category: "Health",
      url: "pages/article.html?id=art_005",
      timeAgo: "4 hours ago"
    },
    {
      id: 'art_006',
      title: "Supreme Court Hears Arguments on Landmark Digital Privacy Case",
      category: "Politics",
      url: "pages/article.html?id=art_006",
      timeAgo: "5 hours ago"
    }
  ],

  // Categories
  categories: [
    { name: "Politics", icon: "fa-landmark", url: "pages/politics.html" },
    { name: "Business", icon: "fa-chart-line", url: "pages/business.html" },
    { name: "Technology", icon: "fa-microchip", url: "pages/technology.html" },
    { name: "Sports", icon: "fa-futbol", url: "pages/sports.html" },
    { name: "Entertainment", icon: "fa-film", url: "pages/entertainment.html" },
    { name: "Health", icon: "fa-heartbeat", url: "pages/health.html" }
  ],

  // Latest News
  latestNews: [
    {
      id: 'art_007',
      title: "Central Bank Signals Potential Interest Rate Changes",
      excerpt: "Financial markets react to latest monetary policy signals from the central bank governor.",
      category: "Business",
      categoryUrl: "pages/business.html",
      url: "pages/article.html?id=art_007",
      image: "assets/images/editorial/central-bank.jpg",
      timeAgo: "30 minutes ago",
      author: {
        name: "Emma Thompson",
        avatar: "assets/images/staff/emma-thompson.jpg",
        url: "pages/author/emma-thompson.html"
      },
      views: "12.5K",
      comments: 234
    },
    {
      id: 'art_008',
      title: "Revolutionary Battery Technology Extends EV Range by 50%",
      excerpt: "Scientists unveil new battery chemistry that could transform the electric vehicle industry.",
      category: "Technology",
      categoryUrl: "pages/technology.html",
      url: "pages/article.html?id=art_008",
      image: "assets/images/editorial/battery-tech.jpg",
      timeAgo: "1 hour ago",
      author: {
        name: "David Park",
        avatar: "assets/images/staff/david-park.jpg",
        url: "pages/author/david-park.html"
      },
      views: "8.2K",
      comments: 156
    },
    {
      id: 'art_009',
      title: "International Trade Agreement Expands Market Access",
      excerpt: "New trade pact opens opportunities for exporters across multiple sectors.",
      category: "Business",
      categoryUrl: "pages/business.html",
      url: "pages/article.html?id=art_009",
      image: "assets/images/editorial/trade-agreement.jpg",
      timeAgo: "2 hours ago",
      author: {
        name: "Lisa Wong",
        avatar: "assets/images/staff/lisa-wong.jpg",
        url: "pages/author/lisa-wong.html"
      },
      views: "6.8K",
      comments: 89
    },
    {
      id: 'art_010',
      title: "Archaeologists Discover Ancient City in Desert Region",
      excerpt: "Remarkable find sheds new light on lost civilization dating back 3,000 years.",
      category: "World",
      categoryUrl: "pages/world.html",
      url: "pages/article.html?id=art_010",
      image: "assets/images/editorial/archaeology.jpg",
      timeAgo: "3 hours ago",
      author: {
        name: "Ahmed Hassan",
        avatar: "assets/images/staff/ahmed-hassan.jpg",
        url: "pages/author/ahmed-hassan.html"
      },
      views: "15.3K",
      comments: 312
    },
    {
      id: 'art_011',
      title: "New Space Telescope Captures Stunning Images of Distant Galaxy",
      excerpt: "Astronomers celebrate breakthrough observations from next-generation observatory.",
      category: "Science",
      categoryUrl: "pages/science.html",
      url: "pages/article.html?id=art_011",
      image: "assets/images/editorial/space-telescope.jpg",
      timeAgo: "4 hours ago",
      author: {
        name: "Dr. Sarah Chen",
        avatar: "assets/images/staff/sarah-chen.jpg",
        url: "pages/author/sarah-chen.html"
      },
      views: "22.1K",
      comments: 445
    },
    {
      id: 'art_012',
      title: "Major Film Studio Announces Expansion of Production Facilities",
      excerpt: "Investment expected to create thousands of jobs in the entertainment sector.",
      category: "Entertainment",
      categoryUrl: "pages/entertainment.html",
      url: "pages/article.html?id=art_012",
      image: "assets/images/editorial/film-studio.jpg",
      timeAgo: "5 hours ago",
      author: {
        name: "Michael Torres",
        avatar: "assets/images/staff/michael-torres.jpg",
        url: "pages/author/michael-torres.html"
      },
      views: "5.4K",
      comments: 67
    }
  ],

  // Military News
  militaryNews: [
    {
      id: 'mil_001',
      title: "Defense Ministry Unveils Next-Generation Fighter Jet Program",
      excerpt: "New aircraft promises enhanced capabilities and stealth technology.",
      category: "Defense",
      categoryUrl: "pages/military.html",
      url: "pages/article.html?id=mil_001",
      image: "assets/images/editorial/fighter-jet.jpg",
      timeAgo: "1 hour ago",
      author: {
        name: "Col. Robert Hayes",
        avatar: "assets/images/staff/robert-hayes.jpg",
        url: "pages/author/robert-hayes.html"
      },
      views: "18.7K",
      comments: 289
    },
    {
      id: 'mil_002',
      title: "Naval Fleet Conducts Joint Exercises in International Waters",
      excerpt: "Multi-national operation demonstrates regional security cooperation.",
      category: "Navy",
      categoryUrl: "pages/military/navy.html",
      url: "pages/article.html?id=mil_002",
      image: "assets/images/editorital/naval-exercise.jpg",
      timeAgo: "3 hours ago",
      author: {
        name: "Adm. Patricia Moore",
        avatar: "assets/images/staff/patricia-moore.jpg",
        url: "pages/author/patricia-moore.html"
      },
      views: "9.3K",
      comments: 134
    },
    {
      id: 'mil_003',
      title: "Cyber Defense Command Reports Thwarting Major Attack",
      excerpt: "Sophisticated cyber threat neutralized before reaching critical infrastructure.",
      category: "Cyber Security",
      categoryUrl: "pages/military/cyber.html",
      url: "pages/article.html?id=mil_003",
      image: "assets/images/editorial/cyber-defense.jpg",
      timeAgo: "5 hours ago",
      author: {
        name: "Maj. Alex Kumar",
        avatar: "assets/images/staff/alex-kumar.jpg",
        url: "pages/author/alex-kumar.html"
      },
      views: "14.2K",
      comments: 201
    }
  ],

  // World News
  worldNews: [
    {
      id: 'wld_001',
      title: "North Atleos Summit Addresses Regional Security Concerns",
      excerpt: "Leaders gather to discuss cooperation on trade, security, and climate initiatives.",
      category: "North Atleos",
      categoryUrl: "pages/world/north-atleos.html",
      url: "pages/article.html?id=wld_001",
      image: "assets/images/editorial/north-atleos-summit.jpg",
      timeAgo: "2 hours ago",
      author: {
        name: "Elena Vasquez",
        avatar: "assets/images/staff/elena-vasquez.jpg",
        url: "pages/author/elena-vasquez.html"
      },
      views: "11.5K",
      comments: 178
    },
    {
      id: 'wld_002',
      title: "Adzkhri Celebrates National Day with Grand Ceremonies",
      excerpt: "Nation marks independence anniversary with military parades and cultural events.",
      category: "Adzkhri",
      categoryUrl: "pages/world/adzkhri.html",
      url: "pages/article.html?id=wld_002",
      image: "assets/images/editorial/adzkhri-celebration.jpg",
      timeAgo: "4 hours ago",
      author: {
        name: "Khalid Rahman",
        avatar: "assets/images/staff/khalid-rahman.jpg",
        url: "pages/author/khalid-rahman.html"
      },
      views: "7.8K",
      comments: 92
    },
    {
      id: 'wld_003',
      title: "Apoeln Launches Ambitious Renewable Energy Initiative",
      excerpt: "Country commits to 100% renewable electricity by 2035.",
      category: "Apoeln",
      categoryUrl: "pages/world/apoeln.html",
      url: "pages/article.html?id=wld_003",
      image: "assets/images/editorial/apoeln-energy.jpg",
      timeAgo: "6 hours ago",
      author: {
        name: "Sophie Laurent",
        avatar: "assets/images/staff/sophie-laurent.jpg",
        url: "pages/author/sophie-laurent.html"
      },
      views: "9.1K",
      comments: 145
    },
    {
      id: 'wld_004',
      title: "Central Atleos Trade Corridor Project Reaches Milestone",
      excerpt: "Major infrastructure project connecting regional economies nears completion.",
      category: "Central Atleos",
      categoryUrl: "pages/world/central-atleos.html",
      url: "pages/article.html?id=wld_004",
      image: "assets/images/editorial/trade-corridor.jpg",
      timeAgo: "8 hours ago",
      author: {
        name: "Marco Silva",
        avatar: "assets/images/staff/marco-silva.jpg",
        url: "pages/author/marco-silva.html"
      },
      views: "6.4K",
      comments: 78
    }
  ],

  // Videos
  videos: [
    {
      id: 'vid_001',
      title: "Exclusive: Inside the New Parliament Building",
      category: "Politics",
      url: "pages/video.html?id=vid_001",
      thumbnail: "assets/images/editorial/parliament-tour.jpg",
      duration: "12:34",
      timeAgo: "1 hour ago"
    },
    {
      id: 'vid_002',
      title: "Documentary: The Changing Face of Rural Xana",
      category: "Documentary",
      url: "pages/video.html?id=vid_002",
      thumbnail: "assets/images/editorial/rural-xana.jpg",
      duration: "45:20",
      timeAgo: "3 hours ago"
    },
    {
      id: 'vid_003',
      title: "Live: Championship Match Highlights",
      category: "Sports",
      url: "pages/video.html?id=vid_003",
      thumbnail: "assets/images/editorial/championship.jpg",
      duration: "8:15",
      timeAgo: "5 hours ago"
    },
    {
      id: 'vid_004',
      title: "Tech Review: Latest Smartphone Innovations",
      category: "Technology",
      url: "pages/video.html?id=vid_004",
      thumbnail: "assets/images/editorial/tech-review.jpg",
      duration: "15:42",
      timeAgo: "1 day ago"
    }
  ],

  // Opinion
  opinion: [
    {
      id: 'op_001',
      quote: "The infrastructure plan isn't just about roads and bridges—it's about building the foundation for our children's future.",
      author: {
        name: "Prof. Amanda Foster",
        avatar: "assets/images/staff/amanda-foster.jpg",
        url: "pages/author/amanda-foster.html"
      },
      timeAgo: "2 hours ago"
    },
    {
      id: 'op_002',
      quote: "We must address the growing inequality gap before it becomes an insurmountable challenge to our social fabric.",
      author: {
        name: "Dr. James Wilson",
        avatar: "assets/images/staff/james-wilson.jpg",
        url: "pages/author/james-wilson.html"
      },
      timeAgo: "5 hours ago"
    },
    {
      id: 'op_003',
      quote: "The climate summit's success depends on whether major economies follow through on their commitments.",
      author: {
        name: "Maria Santos",
        avatar: "assets/images/staff/maria-santos.jpg",
        url: "pages/author/maria-santos.html"
      },
      timeAgo: "1 day ago"
    }
  ],

  // Trending
  trending: [
    {
      id: 'tr_001',
      title: "Celebrity Couple Announces Surprise Wedding",
      category: "Entertainment",
      url: "pages/article.html?id=tr_001",
      timeAgo: "30 minutes ago"
    },
    {
      id: 'tr_002',
      title: "Stock Market Hits Record High",
      category: "Business",
      url: "pages/article.html?id=tr_002",
      timeAgo: "1 hour ago"
    },
    {
      id: 'tr_003',
      title: "New Virus Variant Detected",
      category: "Health",
      url: "pages/article.html?id=tr_003",
      timeAgo: "2 hours ago"
    },
    {
      id: 'tr_004',
      title: "Olympic Committee Announces Host City",
      category: "Sports",
      url: "pages/article.html?id=tr_004",
      timeAgo: "3 hours ago"
    },
    {
      id: 'tr_005',
      title: "Tech CEO Steps Down",
      category: "Technology",
      url: "pages/article.html?id=tr_005",
      timeAgo: "4 hours ago"
    },
    {
      id: 'tr_006',
      title: "Historic Building Damaged in Fire",
      category: "National",
      url: "pages/article.html?id=tr_006",
      timeAgo: "5 hours ago"
    }
  ],

  // Most Read
  mostRead: [
    {
      id: 'mr_001',
      title: "Complete Guide to New Tax Regulations",
      category: "Business",
      url: "pages/article.html?id=mr_001",
      timeAgo: "2 days ago"
    },
    {
      id: 'mr_002',
      title: "Health Experts Issue New Guidelines",
      category: "Health",
      url: "pages/article.html?id=mr_002",
      timeAgo: "1 day ago"
    },
    {
      id: 'mr_003',
      title: "Interview with the Prime Minister",
      category: "Politics",
      url: "pages/article.html?id=mr_003",
      timeAgo: "3 days ago"
    },
    {
      id: 'mr_004',
      title: "Travel Restrictions Updated",
      category: "Travel",
      url: "pages/article.html?id=mr_004",
      timeAgo: "12 hours ago"
    },
    {
      id: 'mr_005',
      title: "Education Reform Bill Explained",
      category: "Education",
      url: "pages/article.html?id=mr_005",
      timeAgo: "2 days ago"
    },
    {
      id: 'mr_006',
      title: "Housing Market Analysis 2026",
      category: "Real Estate",
      url: "pages/article.html?id=mr_006",
      timeAgo: "4 days ago"
    }
  ],

  // Breaking News Ticker
  tickerItems: [
    { time: "10:42", category: "Politics", text: "Senate passes infrastructure funding bill", url: "#" },
    { time: "10:38", category: "World", text: "Earthquake reported in Central Atleos region", url: "#" },
    { time: "10:25", category: "Business", text: "Major tech company announces layoffs", url: "#" },
    { time: "10:15", category: "Sports", text: "National team announces squad for upcoming tournament", url: "#" },
    { time: "10:08", category: "Health", text: "New study reveals benefits of Mediterranean diet", url: "#" },
    { time: "09:52", category: "Technology", text: "SpaceX successfully launches communications satellite", url: "#" }
  ]
};

export class DataStore {
  constructor() {
    this.data = MOCK_DATA;
  }

  // Get featured story
  getFeaturedStory() {
    return this.data.featuredStory;
  }

  // Get top stories
  getTopStories() {
    return this.data.topStories;
  }

  // Get categories
  getCategories() {
    return this.data.categories;
  }

  // Get latest news
  getLatestNews() {
    return this.data.latestNews;
  }

  // Get military news
  getMilitaryNews() {
    return this.data.militaryNews;
  }

  // Get world news
  getWorldNews() {
    return this.data.worldNews;
  }

  // Get videos
  getVideos() {
    return this.data.videos;
  }

  // Get opinion articles
  getOpinion() {
    return this.data.opinion;
  }

  // Get trending
  getTrending() {
    return this.data.trending;
  }

  // Get most read
  getMostRead() {
    return this.data.mostRead;
  }

  // Get ticker items
  getTickerItems() {
    return this.data.tickerItems;
  }

  // Get article by ID
  getArticleById(id) {
    const allArticles = [
      this.data.featuredStory,
      ...this.data.latestNews,
      ...this.data.militaryNews,
      ...this.data.worldNews
    ];
    return allArticles.find(article => article.id === id);
  }

  // Search articles
  searchArticles(query) {
    const allArticles = [
      this.data.featuredStory,
      ...this.data.latestNews,
      ...this.data.militaryNews,
      ...this.data.worldNews
    ];
    
    const lowerQuery = query.toLowerCase();
    return allArticles.filter(article => 
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt?.toLowerCase().includes(lowerQuery) ||
      article.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Get articles by category
  getArticlesByCategory(category) {
    const allArticles = [
      this.data.featuredStory,
      ...this.data.latestNews,
      ...this.data.militaryNews,
      ...this.data.worldNews
    ];
    
    return allArticles.filter(article => 
      article.category.toLowerCase() === category.toLowerCase()
    );
  }
}

export default DataStore;
