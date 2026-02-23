import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNewsroomStore } from '@/store/newsroomStore';
import { 
  Eye, 
  Heart, 
  MessageCircle, 
  Clock,
  TrendingUp,
  Users,
  FileText
} from 'lucide-react';

export default function NewsroomAnalytics() {
  const { analytics, articles } = useNewsroomStore();

  const topArticles = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold">Analytics</h1>
        <p className="text-[#6E6A63]">Performance metrics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6E6A63]">Total Views</p>
                <p className="text-2xl font-bold">{(analytics.engagement.totalViews / 1000000).toFixed(1)}M</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6E6A63]">Total Likes</p>
                <p className="text-2xl font-bold">{(analytics.engagement.totalLikes / 1000).toFixed(1)}K</p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6E6A63]">Comments</p>
                <p className="text-2xl font-bold">{analytics.engagement.totalComments.toLocaleString()}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6E6A63]">Avg Time on Page</p>
                <p className="text-2xl font-bold">{Math.round(analytics.engagement.averageTimeOnPage / 60)}m</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              7-Day Traffic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end gap-2">
              {analytics.dailyStats.map((day, index) => {
                const maxViews = Math.max(...analytics.dailyStats.map(d => d.views));
                const height = (day.views / maxViews) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col gap-1">
                      <div 
                        className="w-full bg-[#C69B2F] rounded-t"
                        style={{ height: `${height}%` }}
                        title={`${day.views.toLocaleString()} views`}
                      />
                    </div>
                    <span className="text-xs text-[#6E6A63]">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Articles */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Top Performing Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topArticles.map((article, index) => (
                <div key={article.id} className="flex items-start gap-3">
                  <span className="text-lg font-bold text-[#C69B2F] w-6">{index + 1}</span>
                  <div className="flex-1">
                    <p className="font-medium line-clamp-1">{article.headline}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-[#6E6A63]">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {article.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {article.likes.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Staff Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(17,17,17,0.14)]">
                  <th className="text-left py-3 px-4 font-medium">Staff Member</th>
                  <th className="text-left py-3 px-4 font-medium">Articles</th>
                  <th className="text-left py-3 px-4 font-medium">Published</th>
                  <th className="text-left py-3 px-4 font-medium">Approval Rate</th>
                  <th className="text-left py-3 px-4 font-medium">Monthly Views</th>
                  <th className="text-left py-3 px-4 font-medium">Quality Score</th>
                </tr>
              </thead>
              <tbody>
                {/* Staff performance data would go here */}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
