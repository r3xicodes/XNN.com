import { Shield, Lock, FileText, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ClassifiedAccess() {
  const classifiedDocs = [
    { id: 1, title: 'Operation Silent Dawn', classification: 'TOP SECRET', date: '2026-02-20', accessed: 3 },
    { id: 2, title: 'Strategic Defense Initiative Q1', classification: 'TOP SECRET', date: '2026-02-15', accessed: 12 },
    { id: 3, title: 'Intelligence Assessment: Regional Threats', classification: 'SECRET', date: '2026-02-10', accessed: 8 },
    { id: 4, title: 'Naval Deployment Strategy', classification: 'SECRET', date: '2026-02-05', accessed: 15 },
    { id: 5, title: 'Satellite Reconnaissance Report', classification: 'TOP SECRET', date: '2026-01-28', accessed: 6 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Classified Documents</h1>
            <p className="text-white/60">Level 5 Clearance Required</p>
          </div>
        </div>
        <Badge className="bg-red-600 text-white px-4 py-2 text-sm">
          <Shield className="h-4 w-4 mr-1" />
          TOP SECRET
        </Badge>
      </div>

      {/* Warning Banner */}
      <div className="bg-red-600/20 border border-red-600 rounded-lg p-4">
        <div className="flex items-center gap-2 text-red-400 font-bold mb-2">
          <Shield className="h-5 w-5" />
          SECURITY WARNING
        </div>
        <p className="text-sm text-white/80">
          Access to classified documents is logged and monitored. Unauthorized disclosure 
          is punishable under the National Security Act. All activities are subject to audit.
        </p>
      </div>

      {/* Document List */}
      <Card className="bg-[#161B22] border-[#30363D]">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Repository
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {classifiedDocs.map((doc) => (
              <div 
                key={doc.id} 
                className="flex items-center justify-between p-4 bg-[#0D1117] rounded border border-[#30363D] hover:border-red-600/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-white/40" />
                  <div>
                    <h4 className="font-medium">{doc.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-white/60">
                      <span>Created {doc.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {doc.accessed} accesses
                      </span>
                    </div>
                  </div>
                </div>
                <Badge className={doc.classification === 'TOP SECRET' ? 'bg-red-600' : 'bg-orange-600'}>
                  {doc.classification}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Access Log */}
      <Card className="bg-[#161B22] border-[#30363D]">
        <CardHeader>
          <CardTitle className="text-lg">Recent Access Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { user: 'Elaria Xana', action: 'Viewed Operation Silent Dawn', time: '2 minutes ago' },
              { user: 'System', action: 'Audit scan completed', time: '15 minutes ago' },
              { user: 'Elaria Xana', action: 'Downloaded Naval Strategy', time: '1 hour ago' },
              { user: 'Elaria Xana', action: 'Logged in', time: '2 hours ago' },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#0D1117] rounded text-sm">
                <span><span className="font-medium">{log.user}</span> {log.action}</span>
                <span className="text-white/40">{log.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
