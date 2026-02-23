import { useParams, Link } from 'react-router-dom';
import { useNewsroomStore } from '@/store/newsroomStore';
import { ArrowLeft } from 'lucide-react';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { articles } = useNewsroomStore();
  
  const categoryArticles = articles.filter(a => 
    a.category.slug === slug || 
    a.category.name.toLowerCase() === slug?.toLowerCase()
  );

  const categoryName = categoryArticles[0]?.category.name || slug;

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      {/* Header */}
      <div className="bg-[#111111] text-white py-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to homepage
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">{categoryName}</h1>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        {categoryArticles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#6E6A63]">No articles found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.map((article) => (
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
                <h3 className="text-xl font-serif font-bold group-hover:text-[#C69B2F] transition-colors">
                  {article.headline}
                </h3>
                <p className="text-[#6E6A63] text-sm mt-2 line-clamp-2">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
