import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Twitter, Linkedin, Bookmark, MessageCircle } from 'lucide-react';
import { useNewsroomStore } from '@/store/newsroomStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const { articles } = useNewsroomStore();
  
  const article = articles.find(a => a.id === id);
  const relatedArticles = articles
    .filter(a => a.id !== id && a.category.id === article?.category.id)
    .slice(0, 3);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Article Not Found</h1>
          <Link to="/" className="text-[#C69B2F] hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#F5F3EE]">
      {/* Back Navigation */}
      <div className="border-b border-[rgba(17,17,17,0.14)]">
        <div className="max-w-[1400px] mx-auto px-4 py-3">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-[#6E6A63] hover:text-[#C69B2F] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to homepage
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <div className="max-w-[720px] mx-auto px-4 pt-8 pb-6">
        <Badge className="mb-4 bg-[#C69B2F] text-[#111111]">{article.category.name}</Badge>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-4">
          {article.headline}
        </h1>
        {article.subtitle && (
          <p className="text-lg md:text-xl text-[#6E6A63] mb-6">
            {article.subtitle}
          </p>
        )}
        
        {/* Byline */}
        <div className="flex items-center gap-3 text-sm text-[#6E6A63] pt-4 border-t border-[rgba(17,17,17,0.14)]">
          <span>By <span className="font-medium text-[#111111]">{article.author.firstName} {article.author.lastName}</span></span>
          <span>•</span>
          <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-[1200px] mx-auto px-4 mb-8">
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-200">
          <img
            src={article.featuredImage || '/images/placeholder.jpg'}
            alt={article.headline}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 lg:col-start-3">
            <div className="max-w-[720px] mx-auto">
              {/* Share Buttons */}
              <div className="flex items-center gap-2 mb-8 pb-6 border-b border-[rgba(17,17,17,0.14)]">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="ml-auto">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>

              {/* Article Text */}
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  {article.content || article.excerpt}
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  The global trade landscape is undergoing a transformation that few anticipated. 
                  What began as isolated policy shifts has evolved into a comprehensive restructuring 
                  of how goods move across borders, impacting everything from consumer prices to 
                  national security strategies.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  At the heart of this change lies a new approach to trade corridors—strategic 
                  routes that have defined commerce for centuries. Ports that once dominated 
                  regional traffic are finding themselves in new competitive dynamics.
                </p>

                <blockquote className="border-l-4 border-[#C69B2F] pl-6 my-8">
                  <p className="text-xl md:text-2xl font-serif font-bold italic">
                    "The biggest changes often arrive quietly—in the fine print of a treaty."
                  </p>
                </blockquote>

                <p className="text-lg leading-relaxed mb-6">
                  For decades, the world's major shipping lanes followed predictable patterns. 
                  Today, those patterns are shifting. New alliances are forming around energy 
                  security, technology transfer, and strategic resources.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-[rgba(17,17,17,0.14)]">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/tag/${tag}`}
                    className="px-3 py-1 text-sm border border-[rgba(17,17,17,0.14)] hover:border-[#C69B2F] hover:text-[#C69B2F] transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Comments Section */}
              <div className="mt-12 pt-8 border-t border-[rgba(17,17,17,0.14)]">
                <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Comments ({article.comments})
                </h3>
                <div className="bg-white border border-[rgba(17,17,17,0.14)] p-4">
                  <textarea
                    placeholder="Join the discussion..."
                    className="w-full p-3 border border-[rgba(17,17,17,0.14)] resize-none focus:outline-none focus:border-[#C69B2F]"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <Button className="bg-[#111111] hover:bg-[#C69B2F] hover:text-[#111111]">
                      Post comment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E6A63] mb-4">Related Stories</h4>
              <div className="space-y-4">
                {relatedArticles.map((story) => (
                  <Link
                    key={story.id}
                    to={`/article/${story.id}`}
                    className="block group"
                  >
                    <div className="aspect-video mb-2 overflow-hidden bg-gray-200">
                      <img
                        src={story.featuredImage || '/images/placeholder.jpg'}
                        alt={story.headline}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h5 className="text-sm font-medium leading-snug group-hover:text-[#C69B2F] transition-colors">
                      {story.headline}
                    </h5>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
