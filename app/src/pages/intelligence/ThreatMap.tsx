import { useState } from 'react';
import { useIntelligenceStore } from '@/store/intelligenceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Activity, MapPin } from 'lucide-react';

const regionStatusColors: Record<string, string> = {
  NORMAL: 'bg-green-500',
  WATCH: 'bg-blue-500',
  WARNING: 'bg-yellow-500',
  ALERT: 'bg-red-500',
};

export default function ThreatMap() {
  const { regions, threatLevel } = useIntelligenceStore();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const selectedRegionData = selectedRegion ? regions.find(r => r.id === selectedRegion) : null;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Threat Map</h1>
          <p className="text-white/60">Interactive regional threat assessment</p>
        </div>
        <div className={`px-4 py-2 rounded ${
          threatLevel.level >= 4 ? 'bg-red-600' : 
          threatLevel.level >= 3 ? 'bg-yellow-600' : 'bg-green-600'
        }`}>
          <span className="font-bold">THREAT LEVEL: {threatLevel.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-2 bg-[#161B22] border-[#30363D]">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Strategic Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-[#0D1117] rounded border border-[#30363D] relative overflow-hidden">
              <svg viewBox="0 0 700 400" className="w-full h-full">
                {/* Grid */}
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#30363D" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Connection lines */}
                {regions.map((region, i) => 
                  regions.slice(i + 1).map((otherRegion) => (
                    <line
                      key={`${region.id}-${otherRegion.id}`}
                      x1={region.coordinates.x}
                      y1={region.coordinates.y}
                      x2={otherRegion.coordinates.x}
                      y2={otherRegion.coordinates.y}
                      stroke="#30363D"
                      strokeWidth="1"
                      strokeDasharray="4"
                    />
                  ))
                )}
                
                {/* Region nodes */}
                {regions.map((region) => (
                  <g 
                    key={region.id} 
                    className="cursor-pointer"
                    onClick={() => setSelectedRegion(region.id)}
                  >
                    {region.threatLevel >= 4 && (
                      <circle
                        cx={region.coordinates.x}
                        cy={region.coordinates.y}
                        r="25"
                        fill="none"
                        stroke={regionStatusColors[region.status]}
                        strokeWidth="2"
                        className="animate-ping"
                        style={{ animationDuration: '2s' }}
                      />
                    )}
                    <circle
                      cx={region.coordinates.x}
                      cy={region.coordinates.y}
                      r="15"
                      fill={regionStatusColors[region.status]}
                      stroke="#fff"
                      strokeWidth="2"
                      className="hover:scale-110 transition-transform"
                    />
                    <text
                      x={region.coordinates.x}
                      y={region.coordinates.y + 30}
                      textAnchor="middle"
                      fill="white"
                      fontSize="11"
                      fontWeight="bold"
                    >
                      {region.name}
                    </text>
                    <text
                      x={region.coordinates.x}
                      y={region.coordinates.y + 42}
                      textAnchor="middle"
                      fill="white"
                      fontSize="9"
                    >
                      L{region.threatLevel}
                    </text>
                  </g>
                ))}
              </svg>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-[#161B22]/90 p-3 rounded border border-[#30363D]">
                <p className="text-xs font-bold mb-2">STATUS LEGEND</p>
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
            <CardTitle className="text-lg">Region Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedRegionData ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">{selectedRegionData.name}</h3>
                  <Badge className={regionStatusColors[selectedRegionData.status]}>
                    {selectedRegionData.status}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm text-white/60 mb-2">Threat Level</p>
                  <div className={`inline-block px-3 py-1 rounded font-bold ${
                    selectedRegionData.threatLevel >= 4 ? 'bg-red-600' :
                    selectedRegionData.threatLevel >= 3 ? 'bg-yellow-600' : 'bg-green-600'
                  }`}>
                    Level {selectedRegionData.threatLevel}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-white/60 mb-2">Intelligence Summary</p>
                  <p className="text-sm">{selectedRegionData.intel.summary}</p>
                </div>

                {selectedRegionData.intel.alerts.length > 0 && (
                  <div>
                    <p className="text-sm text-white/60 mb-2 flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Active Alerts ({selectedRegionData.intel.alerts.length})
                    </p>
                    <div className="space-y-2">
                      {selectedRegionData.intel.alerts.map((alert) => (
                        <div key={alert.id} className="p-2 bg-red-600/20 border border-red-600/50 rounded text-sm">
                          <p className="font-medium">{alert.title}</p>
                          <p className="text-white/60">{alert.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm text-white/60 mb-2">Resources</p>
                  <div className="space-y-1">
                    {selectedRegionData.intel.resources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between text-sm p-2 bg-[#0D1117] rounded">
                        <span>{resource.name}</span>
                        <Badge className={resource.status === 'ACTIVE' ? 'bg-green-600' : 'bg-yellow-600'}>
                          {resource.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-white/40">
                <Activity className="h-12 w-12 mx-auto mb-4" />
                <p>Select a region on the map to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
