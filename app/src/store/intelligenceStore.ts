import { create } from 'zustand';
import type { 
  ThreatLevel, 
  Region, 
  Alert, 
  IntelReport, 
  FleetStatus
} from '@/types/enterprise';

// Mock threat level
const CURRENT_THREAT: ThreatLevel = {
  level: 3,
  label: 'ELEVATED',
  description: 'Elevated risk of hostile activity',
  updatedAt: new Date().toISOString(),
};

// Mock regions with SVG coordinates
const REGIONS: Region[] = [
  {
    id: 'reg-001',
    name: 'North Atleos',
    code: 'NA',
    status: 'NORMAL',
    threatLevel: 2,
    coordinates: { x: 150, y: 100 },
    intel: {
      summary: 'Stable conditions. Routine patrols active.',
      recentActivity: [],
      alerts: [],
      resources: [
        { id: 'res-001', type: 'FLEET', name: 'Northern Patrol Group', status: 'ACTIVE', location: 'North Atleos' },
      ],
    },
  },
  {
    id: 'reg-002',
    name: 'South Atleos',
    code: 'SA',
    status: 'WATCH',
    threatLevel: 3,
    coordinates: { x: 150, y: 300 },
    intel: {
      summary: 'Increased maritime traffic observed. Monitoring.',
      recentActivity: [
        { id: 'act-001', type: 'Naval Movement', description: 'Unknown vessel detected in sector 7', timestamp: '2026-02-24T08:30:00Z', severity: 'MEDIUM' },
      ],
      alerts: [],
      resources: [
        { id: 'res-002', type: 'FLEET', name: 'Southern Defense Fleet', status: 'ACTIVE', location: 'South Atleos' },
        { id: 'res-003', type: 'AIR', name: 'Maritime Patrol Wing', status: 'STANDBY', location: 'South Atleos' },
      ],
    },
  },
  {
    id: 'reg-003',
    name: 'Adzkhri',
    code: 'AD',
    status: 'WARNING',
    threatLevel: 4,
    coordinates: { x: 350, y: 150 },
    intel: {
      summary: 'Elevated tensions. Border incidents reported.',
      recentActivity: [
        { id: 'act-002', type: 'Border Incident', description: 'Minor skirmish at eastern border', timestamp: '2026-02-24T06:15:00Z', severity: 'HIGH' },
        { id: 'act-003', type: 'Troop Movement', description: 'Enemy forces repositioning', timestamp: '2026-02-24T04:00:00Z', severity: 'HIGH' },
      ],
      alerts: [
        { id: 'alert-001', title: 'Border Alert', message: 'Unusual troop movements detected', severity: 'WARNING', region: 'Adzkhri', createdAt: '2026-02-24T06:00:00Z', acknowledged: false },
      ],
      resources: [
        { id: 'res-004', type: 'GROUND', name: 'Border Defense Brigade', status: 'ACTIVE', location: 'Adzkhri' },
        { id: 'res-005', type: 'AIR', name: 'Tactical Air Wing', status: 'ACTIVE', location: 'Adzkhri' },
      ],
    },
  },
  {
    id: 'reg-004',
    name: 'Apoeln',
    code: 'AP',
    status: 'NORMAL',
    threatLevel: 1,
    coordinates: { x: 450, y: 200 },
    intel: {
      summary: 'All clear. No significant activity.',
      recentActivity: [],
      alerts: [],
      resources: [
        { id: 'res-006', type: 'FLEET', name: 'Coastal Patrol', status: 'ACTIVE', location: 'Apoeln' },
      ],
    },
  },
  {
    id: 'reg-005',
    name: 'Aspen',
    code: 'AS',
    status: 'NORMAL',
    threatLevel: 2,
    coordinates: { x: 550, y: 120 },
    intel: {
      summary: 'Stable. Routine operations.',
      recentActivity: [],
      alerts: [],
      resources: [
        { id: 'res-007', type: 'SATELLITE', name: 'Recon Sat Alpha', status: 'ACTIVE', location: 'Orbit' },
      ],
    },
  },
  {
    id: 'reg-006',
    name: 'Xara',
    code: 'XA',
    status: 'ALERT',
    threatLevel: 5,
    coordinates: { x: 250, y: 200 },
    intel: {
      summary: 'CRITICAL: Active conflict zone. Maximum alert.',
      recentActivity: [
        { id: 'act-004', type: 'Combat', description: 'Engagement reported in sector 12', timestamp: '2026-02-24T10:00:00Z', severity: 'HIGH' },
        { id: 'act-005', type: 'Air Strike', description: 'Tactical strike on enemy position', timestamp: '2026-02-24T09:30:00Z', severity: 'HIGH' },
      ],
      alerts: [
        { id: 'alert-002', title: 'RED ALERT', message: 'Active combat operations', severity: 'CRITICAL', region: 'Xara', createdAt: '2026-02-24T10:00:00Z', acknowledged: false },
      ],
      resources: [
        { id: 'res-008', type: 'GROUND', name: 'Rapid Response Force', status: 'ACTIVE', location: 'Xara' },
        { id: 'res-009', type: 'AIR', name: 'Strike Wing Alpha', status: 'ACTIVE', location: 'Xara' },
        { id: 'res-010', type: 'FLEET', name: 'Naval Support Group', status: 'ACTIVE', location: 'Xara Coast' },
      ],
    },
  },
];

// Mock fleet status
const FLEET_STATUS: FleetStatus = {
  total: 48,
  active: 32,
  standby: 10,
  maintenance: 4,
  deployed: 2,
};

// Mock intel reports
const INTEL_REPORTS: IntelReport[] = [
  {
    id: 'intel-001',
    title: 'Quarterly Threat Assessment - Q1 2026',
    classification: 'CONFIDENTIAL',
    author: {
      id: 'analyst-001',
      username: 'analyst.defense',
      email: 'defense@xnn.com',
      firstName: 'Defense',
      lastName: 'Analyst',
      role: 'JOURNALIST',
      clearanceLevel: 4,
      permissions: ['intelligence:read'],
      joinDate: '2022-01-01',
      lastActive: new Date().toISOString(),
      isActive: true,
    },
    summary: 'Comprehensive analysis of regional threat landscape for Q1 2026.',
    content: 'Full report content...',
    regions: ['Adzkhri', 'Xara', 'South Atleos'],
    createdAt: '2026-02-01T00:00:00Z',
    updatedAt: '2026-02-01T00:00:00Z',
  },
  {
    id: 'intel-002',
    title: 'Naval Activity Report - February 2026',
    classification: 'SECRET',
    author: {
      id: 'analyst-002',
      username: 'analyst.naval',
      email: 'naval@xnn.com',
      firstName: 'Naval',
      lastName: 'Analyst',
      role: 'JOURNALIST',
      clearanceLevel: 4,
      permissions: ['intelligence:read'],
      joinDate: '2022-06-01',
      lastActive: new Date().toISOString(),
      isActive: true,
    },
    summary: 'Analysis of naval movements and fleet deployments.',
    content: 'Full report content...',
    regions: ['North Atleos', 'South Atleos', 'Apoeln'],
    createdAt: '2026-02-20T00:00:00Z',
    updatedAt: '2026-02-20T00:00:00Z',
  },
];

interface IntelligenceState {
  threatLevel: ThreatLevel;
  regions: Region[];
  fleetStatus: FleetStatus;
  alerts: Alert[];
  reports: IntelReport[];
  selectedRegion: Region | null;
  isLoading: boolean;
  
  // Actions
  setThreatLevel: (level: ThreatLevel['level']) => void;
  selectRegion: (region: Region | null) => void;
  acknowledgeAlert: (alertId: string) => void;
  getRegionById: (id: string) => Region | undefined;
  getActiveAlerts: () => Alert[];
  getResourcesByType: (type: Region['intel']['resources'][0]['type']) => number;
}

export const useIntelligenceStore = create<IntelligenceState>((set, get) => ({
  threatLevel: CURRENT_THREAT,
  regions: REGIONS,
  fleetStatus: FLEET_STATUS,
  alerts: REGIONS.flatMap(r => r.intel.alerts),
  reports: INTEL_REPORTS,
  selectedRegion: null,
  isLoading: false,

  setThreatLevel: (level: ThreatLevel['level']) => {
    const labels: ThreatLevel['label'][] = ['LOW', 'GUARDED', 'ELEVATED', 'HIGH', 'CRITICAL'];
    const descriptions = [
      'Low risk of hostile activity',
      'General risk of hostile activity',
      'Elevated risk of hostile activity',
      'High risk of hostile activity',
      'Critical risk - immediate action required',
    ];
    
    set({
      threatLevel: {
        level,
        label: labels[level - 1],
        description: descriptions[level - 1],
        updatedAt: new Date().toISOString(),
      },
    });
  },

  selectRegion: (region: Region | null) => {
    set({ selectedRegion: region });
  },

  acknowledgeAlert: (alertId: string) => {
    set(state => ({
      alerts: state.alerts.map(alert =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      ),
    }));
  },

  getRegionById: (id: string) => {
    return get().regions.find(r => r.id === id);
  },

  getActiveAlerts: () => {
    return get().alerts.filter(a => !a.acknowledged);
  },

  getResourcesByType: (type) => {
    return get().regions.reduce((count, region) => {
      return count + region.intel.resources.filter(r => r.type === type).length;
    }, 0);
  },
}));
