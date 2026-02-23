import { useState } from 'react';
import { useNewsroomStore } from '@/store/newsroomStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Edit3, 
  Send,
  MoreHorizontal
} from 'lucide-react';

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-200 text-gray-800',
  SUBMITTED: 'bg-blue-200 text-blue-800',
  IN_REVIEW: 'bg-yellow-200 text-yellow-800',
  EDITING: 'bg-purple-200 text-purple-800',
  LEGAL_REVIEW: 'bg-orange-200 text-orange-800',
  SCHEDULED: 'bg-cyan-200 text-cyan-800',
  PUBLISHED: 'bg-green-200 text-green-800',
};

const priorityColors: Record<string, string> = {
  LOW: 'bg-gray-100 text-gray-600',
  MEDIUM: 'bg-blue-100 text-blue-600',
  HIGH: 'bg-orange-100 text-orange-600',
  URGENT: 'bg-red-100 text-red-600',
};

export default function EditorialQueue() {
  const { queue, articles, updateArticleStatus } = useNewsroomStore();
  const [activeTab, setActiveTab] = useState('all');

  const filteredQueue = activeTab === 'all' 
    ? queue 
    : queue.filter(item => item.status === activeTab);

  const handleStatusChange = (articleId: string, newStatus: string) => {
    updateArticleStatus(articleId, newStatus as any);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold">Editorial Queue</h1>
          <p className="text-[#6E6A63]">Manage articles through the editorial workflow</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#6E6A63]">{queue.length} items in queue</span>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {['DRAFT', 'SUBMITTED', 'IN_REVIEW', 'EDITING', 'LEGAL_REVIEW', 'SCHEDULED', 'PUBLISHED'].map((status) => {
          const count = articles.filter(a => a.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`p-3 text-left rounded border transition-colors ${
                activeTab === status 
                  ? 'border-[#C69B2F] bg-[#C69B2F]/10' 
                  : 'border-[rgba(17,17,17,0.14)] hover:bg-[rgba(17,17,17,0.02)]'
              }`}
            >
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-xs text-[#6E6A63]">{status.replace('_', ' ')}</p>
            </button>
          );
        })}
      </div>

      {/* Queue List */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white border border-[rgba(17,17,17,0.14)]">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="DRAFT">Drafts</TabsTrigger>
          <TabsTrigger value="IN_REVIEW">In Review</TabsTrigger>
          <TabsTrigger value="EDITING">Editing</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-6">
              {filteredQueue.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-medium">Queue is clear!</p>
                  <p className="text-[#6E6A63]">No articles waiting for review.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredQueue.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-start justify-between p-4 border border-[rgba(17,17,17,0.14)] rounded hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{item.article.headline}</h3>
                          <Badge className={statusColors[item.status]}>
                            {item.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={priorityColors[item.priority]}>
                            {item.priority}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-[#6E6A63] line-clamp-2 mb-3">
                          {item.article.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-[#6E6A63]">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Submitted {new Date(item.submittedAt).toLocaleDateString()}
                          </span>
                          <span>By {item.article.author.firstName} {item.article.author.lastName}</span>
                          {item.assignedTo && (
                            <span className="text-[#C69B2F]">
                              Assigned to {item.assignedTo.firstName} {item.assignedTo.lastName}
                            </span>
                          )}
                          {item.deadline && (
                            <span className="text-red-600 flex items-center gap-1">
                              <AlertCircle className="h-4 w-4" />
                              Due {new Date(item.deadline).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        {item.comments.length > 0 && (
                          <div className="mt-3 p-3 bg-[rgba(17,17,17,0.03)] rounded">
                            <p className="text-sm font-medium mb-1">Latest Comment:</p>
                            <p className="text-sm text-[#6E6A63]">
                              "{item.comments[item.comments.length - 1].content}"
                            </p>
                            <p className="text-xs text-[#6E6A63] mt-1">
                              — {item.comments[item.comments.length - 1].author.firstName} {item.comments[item.comments.length - 1].author.lastName}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        {item.status === 'IN_REVIEW' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleStatusChange(item.article.id, 'EDITING')}
                            >
                              <Edit3 className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleStatusChange(item.article.id, 'SCHEDULED')}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </>
                        )}
                        {item.status === 'DRAFT' && (
                          <Button 
                            size="sm"
                            onClick={() => handleStatusChange(item.article.id, 'SUBMITTED')}
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Submit
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
