import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Eye,
  ArrowRight
} from 'lucide-react';
import { useNewsroomStore } from '@/store/newsroomStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-200 text-gray-800',
  SUBMITTED: 'bg-blue-200 text-blue-800',
  IN_REVIEW: 'bg-yellow-200 text-yellow-800',
  EDITING: 'bg-purple-200 text-purple-800',
  LEGAL_REVIEW: 'bg-orange-200 text-orange-800',
  SCHEDULED: 'bg-cyan-200 text-cyan-800',
  PUBLISHED: 'bg-green-200 text-green-800',
};

export default function NewsroomDashboard() {
  const { articles, queue, analytics } = useNewsroomStore();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Published', value: analytics.articlesPublished, icon: CheckCircle, color: 'text-green-600' },
    { label: 'In Queue', value: analytics.articlesInQueue, icon: Clock, color: 'text-yellow-600' },
    { label: 'Avg Publish Time', value: `${analytics.averagePublishTime}h`, icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Total Views', value: (analytics.engagement.totalViews / 1000000).toFixed(1) + 'M', icon: Eye, color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold">Newsroom Dashboard</h1>
          <p className="text-[#6E6A63]">Overview of editorial operations</p>
        </div>
        <Button className="bg-[#111111] hover:bg-[#C69B2F] hover:text-[#111111]">
          <FileText className="h-4 w-4 mr-2" />
          New Article
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6E6A63]">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white border border-[rgba(17,17,17,0.14)]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="queue">Editorial Queue</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Articles */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Recent Articles</CardTitle>
                <Link to="/newsroom/queue" className="text-sm text-[#C69B2F] hover:underline flex items-center">
                  View all <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {articles.slice(0, 5).map((article) => (
                    <div key={article.id} className="flex items-start justify-between p-3 bg-[rgba(17,17,17,0.02)] rounded">
                      <div>
                        <p className="font-medium line-clamp-1">{article.headline}</p>
                        <div className="flex items-center gap-2 mt-1 text-sm text-[#6E6A63]">
                          <span>{article.author.firstName} {article.author.lastName}</span>
                          <span>•</span>
                          <span>{new Date(article.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Badge className={statusColors[article.status]}>
                        {article.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Staff Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Staff Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.staffActivity.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C69B2F] flex items-center justify-center text-[#111111] text-xs font-bold">
                        {activity.user.firstName[0]}{activity.user.lastName[0]}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user.firstName} {activity.user.lastName}</span>
                          {' '}{activity.action}
                        </p>
                        <p className="text-xs text-[#6E6A63]">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Stats Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">7-Day Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end gap-2">
                {analytics.dailyStats.map((day, index) => {
                  const maxViews = Math.max(...analytics.dailyStats.map(d => d.views));
                  const height = (day.views / maxViews) * 100;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-[#C69B2F] rounded-t transition-all hover:bg-[#111111]"
                        style={{ height: `${height}%` }}
                        title={`${day.views.toLocaleString()} views`}
                      />
                      <span className="text-xs text-[#6E6A63]">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queue">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Editorial Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {queue.length === 0 ? (
                  <p className="text-center text-[#6E6A63] py-8">No items in queue</p>
                ) : (
                  queue.map((item) => (
                    <div key={item.id} className="flex items-start justify-between p-4 border border-[rgba(17,17,17,0.14)] rounded">
                      <div>
                        <p className="font-medium">{item.article.headline}</p>
                        <div className="flex items-center gap-3 mt-2 text-sm text-[#6E6A63]">
                          <span>By {item.article.author.firstName} {item.article.author.lastName}</span>
                          <span>•</span>
                          <span>Submitted {new Date(item.submittedAt).toLocaleDateString()}</span>
                          {item.deadline && (
                            <>
                              <span>•</span>
                              <span className="text-red-600">Due {new Date(item.deadline).toLocaleDateString()}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={statusColors[item.status]}>{item.status}</Badge>
                        <Badge variant={item.priority === 'URGENT' ? 'destructive' : 'secondary'}>
                          {item.priority}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">All Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.staffActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 border-b border-[rgba(17,17,17,0.1)] last:border-0">
                    <div className="w-10 h-10 rounded-full bg-[#C69B2F] flex items-center justify-center text-[#111111] font-bold">
                      {activity.user.firstName[0]}{activity.user.lastName[0]}
                    </div>
                    <div className="flex-1">
                      <p>
                        <span className="font-medium">{activity.user.firstName} {activity.user.lastName}</span>
                        {' '}{activity.action}
                        {activity.target && <span className="text-[#6E6A63]"> on {activity.target}</span>}
                      </p>
                      <p className="text-sm text-[#6E6A63] mt-1">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
