import { useIntelligenceStore } from '@/store/intelligenceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Ship, Plane, Satellite, Activity, Clock } from 'lucide-react';

export default function Operations() {
  const { fleetStatus, regions, reports } = useIntelligenceStore();

  const allResources = regions.flatMap(r => r.intel.resources);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Operations Center</h1>
        <p className="text-white/60">Fleet and resource management</p>
      </div>

      {/* Fleet Status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Total Fleet</p>
                <p className="text-2xl font-bold">{fleetStatus.total}</p>
              </div>
              <Ship className="h-8 w-8 text-[#58A6FF]" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Active</p>
                <p className="text-2xl font-bold text-green-500">{fleetStatus.active}</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Standby</p>
                <p className="text-2xl font-bold text-yellow-500">{fleetStatus.standby}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Deployed</p>
                <p className="text-2xl font-bold text-blue-500">{fleetStatus.deployed}</p>
              </div>
              <Satellite className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resources by Type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Ship className="h-5 w-5" />
              Naval Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {allResources.filter(r => r.type === 'FLEET').map((resource) => (
                <div key={resource.id} className="flex items-center justify-between p-3 bg-[#0D1117] rounded">
                  <div>
                    <p className="font-medium">{resource.name}</p>
                    <p className="text-sm text-white/60">{resource.location}</p>
                  </div>
                  <Badge className={resource.status === 'ACTIVE' ? 'bg-green-600' : 'bg-yellow-600'}>
                    {resource.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#161B22] border-[#30363D]">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Air Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {allResources.filter(r => r.type === 'AIR').map((resource) => (
                <div key={resource.id} className="flex items-center justify-between p-3 bg-[#0D1117] rounded">
                  <div>
                    <p className="font-medium">{resource.name}</p>
                    <p className="text-sm text-white/60">{resource.location}</p>
                  </div>
                  <Badge className={resource.status === 'ACTIVE' ? 'bg-green-600' : 'bg-yellow-600'}>
                    {resource.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Intel Reports */}
      <Card className="bg-[#161B22] border-[#30363D]">
        <CardHeader>
          <CardTitle className="text-lg">Intelligence Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="p-4 bg-[#0D1117] rounded border border-[#30363D]">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{report.title}</h4>
                    <p className="text-sm text-white/60 mt-1">{report.summary}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-white/40">
                      <span>By {report.author.firstName} {report.author.lastName}</span>
                      <span>•</span>
                      <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge className={
                    report.classification === 'TOP_SECRET' ? 'bg-red-600' :
                    report.classification === 'SECRET' ? 'bg-orange-600' :
                    'bg-blue-600'
                  }>
                    {report.classification}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
