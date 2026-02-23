import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useIntelligenceStore } from '@/store/intelligenceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Activity,
  Ship,
  Plane,
  Satellite,
  Users,
  AlertCircle
} from 'lucide-react';

const threatLevelColors: Record<number, string> = {
  1: 'bg-green-600',
  2: 'bg-blue-600',
  3: 'bg-yellow-600',
  4: 'bg-orange-600',
  5: 'bg-red-600',
};

const threatLevelLabels: Record<number, string> = {
  1: 'LOW',
  2: 'GUARDED',
  3: 'ELEVATED',
  4: 'HIGH',
  5: 'CRITICAL',
};

const regionStatusColors: Record<string, string> = {
  NORMAL: 'bg-green-500',
  WATCH: 'bg-blue-500',
  WARNING: 'bg-yellow-500',
  ALERT: 'bg-red-500',
};

export default function IntelligenceOverview() {
  const { threatLevel, regions, fleetStatus, getActiveAlerts } = useIntelligenceStore();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const activeAlerts = getActiveAlerts();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Intelligence Overview</h1>
          <p className="text-white/60">Real-time defense monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-white/60">Threat Level</p>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded ${threatLevelColors[threatLevel.level]} text-white font-bold`}>
              <AlertTriangle className="h-5 w-5" />
              {threatLevelLabels[threatLevel.level]}
            </div>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {activeAlerts.length > 0 && (
        <div className="bg-red-600/20 border border-red-600 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-400 font-bold mb-2">
            <AlertCircle className="h-5 w-5" />
            ACTIVE ALERTS ({activeAlerts.length})
          </div>
          <div className="space-y-2">
            {activeAlerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-center justify-between text-sm">
                <span>{alert.title} — {alert.message}</span>
                <Badge className="bg-red-600">{alert.severity}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Fleet Active</p>
                <p className="text-2xl font-bold">{fleetStatus.active}/{fleetStatus.total}</p>
              </div>
              <Ship className="h-8 w-8 text-[#58A6FF]" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Air Patrols</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Plane className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Satellites</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Satellite className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Personnel</p>
                <p className="text-2xl font-bold">8,432</p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Map */}
        <Card className="lg:col-span-2 bg-[#161B22] border-[#30363D]">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Regional Threat Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-[#0D1117] rounded border border-[#30363D] relative overflow-hidden">
              {/* Simplified SVG Map */}
              <svg viewBox="0 0 700 400" className="w-full h-full">
                {/* Background grid */}
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#30363D" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Connection lines */}
                <line x1="150" y1="100" x2="250" y2="200" stroke="#30363D" strokeWidth="1" strokeDasharray="4" />
                <line x1="150" y1="300" x2="250" y2="200" stroke="#30363D" strokeWidth="1" strokeDasharray="4" />
                <line x1="350" y1="150" x2="250" y2="200" stroke="#30363D" strokeWidth="1" strokeDasharray="4" />
                <line x1="450" y1="200" x2="350" y2="150" stroke="#30363D" strokeWidth="1" strokeDasharray="4" />
                <line x1="550" y1="120" x2="450" y2="200" stroke="#30363D" strokeWidth="1" strokeDasharray="4" />
                
                {/* Region nodes */}
                {regions.map((region) => (
                  <g key={region.id} className="cursor-pointer" onClick={() => setSelectedRegion(region.id)}>
                    {/* Pulse animation for high threat */}
                    {region.threatLevel >= 4 && (
                      <circle
                        cx={region.coordinates.x}
                        cy={region.coordinates.y}
                        r="20"
                        fill="none"
                        stroke={regionStatusColors[region.status]}
                        strokeWidth="2"
                        className="animate-ping"
                        style={{ animationDuration: '2s' }}
                      />
                    )}
                    {/* Main node */}
                    <circle
                      cx={region.coordinates.x}
                      cy={region.coordinates.y}
                      r="12"
                      fill={regionStatusColors[region.status]}
                      stroke="#fff"
                      strokeWidth="2"
                      className="hover:scale-110 transition-transform"
                    />
                    {/* Label */}
                    <text
                      x={region.coordinates.x}
                      y={region.coordinates.y + 25}
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {region.code}
                    </text>
                  </g>
                ))}
              </svg>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-[#161B22]/90 p-3 rounded border border-[#30363D]">
                <p className="text-xs font-bold mb-2">STATUS</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>Normal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span>Watch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span>Warning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span>Alert</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Region Details */}
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardHeader>
            <CardTitle className="text-lg">Region Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {regions.map((region) => (
                <div 
                  key={region.id} 
                  className={`p-3 rounded border cursor-pointer transition-colors ${
                    selectedRegion === region.id 
                      ? 'border-[#58A6FF] bg-[#58A6FF]/10' 
                      : 'border-[#30363D] hover:border-[#58A6FF]/50'
                  }`}
                  onClick={() => setSelectedRegion(region.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${regionStatusColors[region.status]}`} />
                      <span className="font-medium">{region.name}</span>
                    </div>
                    <Badge className={threatLevelColors[region.threatLevel]}>
                      L{region.threatLevel}
                    </Badge>
                  </div>
                  <p className="text-xs text-white/60 mt-1 line-clamp-2">{region.intel.summary}</p>
                  {region.intel.alerts.length > 0 && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-red-400">
                      <AlertCircle className="h-3 w-3" />
                      {region.intel.alerts.length} active alert{region.intel.alerts.length > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-[#161B22] border-[#30363D]">
        <CardHeader>
          <CardTitle className="text-lg">Recent Intelligence Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {regions.flatMap(r => r.intel.recentActivity).slice(0, 5).map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-[#0D1117] rounded border border-[#30363D]">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.severity === 'HIGH' ? 'bg-red-500' : 
                  activity.severity === 'MEDIUM' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.type}</p>
                  <p className="text-sm text-white/60">{activity.description}</p>
                  <p className="text-xs text-white/40 mt-1">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
