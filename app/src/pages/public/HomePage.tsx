// import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNewsroomStore } from '@/store/newsroomStore';
import { Play, ArrowRight, TrendingUp, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function HomePage() {
  const { articles } = useNewsroomStore();
  
  const featuredArticle = articles.find(a => a.isFeatured) || articles[0];
  const topStories = articles.filter(a => a.status === 'PUBLISHED').slice(0, 6);
  const trendingArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div className="bg-[#F5F3EE]">
      {/* Breaking News Ticker */}
      <div className="bg-[#111111] text-white py-3 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center">
          <span className="bg-red-600 px-2 py-1 text-xs font-bold mr-4 shrink-0">BREAKING</span>
          <div className="overflow-hidden flex-1">
            <div className="whitespace-nowrap animate-marquee">
              Markets rally as central bank signals hold on rates • Parliament debates infrastructure bill • 
              Coastal cities announce new flood defense measures • Tech sector responds to proposed AI regulations
            </div>
          </div>
        </div>
      </div>

      {/* Featured Story */}
      {featuredArticle && (
        <section className="relative h-[70vh] bg-[#111111]">
          <div className="absolute inset-0">
            <img
              src={featuredArticle.featuredImage || '/images/featured-trade-corridor.jpg'}
              alt={featuredArticle.headline}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
          <div className="relative h-full max-w-[1400px] mx-auto px-4 flex items-end pb-16">
            <div className="max-w-2xl text-white">
              <span className="text-[#C69B2F] text-sm font-bold uppercase tracking-wider mb-3 block">
                {featuredArticle.category.name}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
                {featuredArticle.headline}
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-6">
                {featuredArticle.subtitle}
              </p>
              <div className="flex gap-3">
                <Link
                  to={`/article/${featuredArticle.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C69B2F] text-[#111111] font-medium hover:bg-white transition-colors"
                >
                  Read Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white hover:bg-white/10 transition-colors">
                  <Play className="h-4 w-4" />
                  Watch
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Top Stories */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <h2 className="text-2xl font-serif font-bold mb-8">Top Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topStories.map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="group"
              >
                <div className="aspect-video mb-4 overflow-hidden bg-gray-200">
                  <img
                    src={article.featuredImage || '/images/placeholder.jpg'}
                    alt={article.headline}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-[#C69B2F] text-xs font-bold uppercase tracking-wider">
                  {article.category.name}
                </span>
                <h3 className="text-xl font-serif font-bold mt-2 group-hover:text-[#C69B2F] transition-colors">
                  {article.headline}
                </h3>
                <p className="text-[#6E6A63] text-sm mt-2 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-3 text-xs text-[#6E6A63]">
                  <span>{article.author.firstName} {article.author.lastName}</span>
                  <span>•</span>
                  <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live Coverage Banner */}
      <section className="py-8">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="bg-[#111111] text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="text-4xl font-serif font-bold">LIVE</span>
                <span className="absolute -top-1 -right-3 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </div>
              <div className="h-12 w-px bg-white/20 hidden md:block" />
              <div>
                <h3 className="text-xl font-serif font-bold">Parliament Debates Infrastructure Bill</h3>
                <p className="text-sm text-white/70">Live votes, amendments, and analysis as it happens.</p>
              </div>
            </div>
            <Link
              to="/live"
              className="px-6 py-3 bg-[#C69B2F] text-[#111111] font-medium hover:bg-white transition-colors"
            >
              Join live updates
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 border-t border-[rgba(17,17,17,0.14)]">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trending */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                Trending Now
              </h2>
              <div className="space-y-4">
                {trendingArticles.map((article, index) => (
                  <Link
                    key={article.id}
                    to={`/article/${article.id}`}
                    className="flex items-start gap-4 p-4 border border-[rgba(17,17,17,0.14)] hover:border-[#C69B2F] transition-colors group"
                  >
                    <span className="text-3xl font-serif font-bold text-[#C69B2F] w-10">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-medium group-hover:text-[#C69B2F] transition-colors">
                        {article.headline}
                      </h3>
                      <p className="text-sm text-[#6E6A63] mt-1">
                        {article.views.toLocaleString()} views
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h2 className="text-2xl font-serif font-bold mb-6">Stay Informed</h2>
              <div className="bg-white border border-[rgba(17,17,17,0.14)] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="h-6 w-6 text-[#C69B2F]" />
                  <h3 className="font-serif font-bold">Daily Briefing</h3>
                </div>
                <p className="text-[#6E6A63] text-sm mb-4">
                  Get the biggest stories, sharp analysis, and weekend reads delivered every morning.
                </p>
                <div className="space-y-3">
                  <Input placeholder="Email address" />
                  <Button className="w-full bg-[#111111] hover:bg-[#C69B2F] hover:text-[#111111]">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
