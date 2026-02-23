import { create } from 'zustand';
import type { StudioState, Segment, LowerThird, Ticker, Camera } from '@/types/enterprise';

const DEFAULT_CAMERAS: Camera[] = [
  { id: 'cam-1', name: 'Anchor Close', type: 'ANCHOR', isActive: true, preview: '/images/studio-cam-1.jpg' },
  { id: 'cam-2', name: 'Wide Shot', type: 'WIDE', isActive: false, preview: '/images/studio-cam-2.jpg' },
  { id: 'cam-3', name: 'Guest', type: 'GUEST', isActive: false, preview: '/images/studio-cam-3.jpg' },
  { id: 'cam-4', name: 'Overhead', type: 'OVERHEAD', isActive: false, preview: '/images/studio-cam-4.jpg' },
];

const DEFAULT_TICKER: Ticker = {
  id: 'ticker-001',
  items: [
    'Markets rally as central bank signals hold on rates',
    'Parliament debates infrastructure bill',
    'Coastal cities announce new flood defense measures',
    'Tech sector responds to proposed AI regulations',
    'International summit concludes in Geneva',
  ],
  isRunning: true,
  speed: 'NORMAL',
};

interface StudioStore extends StudioState {
  // Actions
  goLive: () => void;
  stopLive: () => void;
  switchCamera: (cameraId: string) => void;
  pushLowerThird: (text: string, subtext?: string, type?: LowerThird['type']) => void;
  clearLowerThird: () => void;
  triggerBreaking: (headline: string, content: string) => void;
  clearBreaking: () => void;
  startTicker: () => void;
  stopTicker: () => void;
  updateTickerSpeed: (speed: Ticker['speed']) => void;
  addTickerItem: (item: string) => void;
  removeTickerItem: (index: number) => void;
  setSegment: (segment: Segment | null) => void;
  emergencyBroadcast: (message: string) => void;
}

export const useStudioStore = create<StudioStore>((set) => ({
  isLive: false,
  streamKey: '',
  currentSegment: null,
  lowerThird: null,
  breakingNews: null,
  ticker: DEFAULT_TICKER,
  cameras: DEFAULT_CAMERAS,
  activeCamera: 'cam-1',

  goLive: () => {
    set({
      isLive: true,
      streamKey: `live_${Date.now()}`,
    });
  },

  stopLive: () => {
    set({
      isLive: false,
      streamKey: '',
    });
  },

  switchCamera: (cameraId: string) => {
    set(state => ({
      activeCamera: cameraId,
      cameras: state.cameras.map(cam =>
        cam.id === cameraId ? { ...cam, isActive: true } : { ...cam, isActive: false }
      ),
    }));
  },

  pushLowerThird: (text: string, subtext?: string, type: LowerThird['type'] = 'ANCHOR') => {
    set({
      lowerThird: {
        id: `lt-${Date.now()}`,
        text,
        subtext,
        type,
        visible: true,
      },
    });
  },

  clearLowerThird: () => {
    set({ lowerThird: null });
  },

  triggerBreaking: (headline: string, content: string) => {
    set({
      breakingNews: {
        id: `breaking-${Date.now()}`,
        headline,
        content,
        triggeredAt: new Date().toISOString(),
        triggeredBy: {
          id: 'exec-001',
          username: 'exec.editor',
          email: 'exec@xnn.com',
          firstName: 'Executive',
          lastName: 'Editor',
          role: 'EXECUTIVE_EDITOR',
          clearanceLevel: 4,
          permissions: ['*'],
          joinDate: '2021-01-01',
          lastActive: new Date().toISOString(),
          isActive: true,
        },
      },
    });
  },

  clearBreaking: () => {
    set({ breakingNews: null });
  },

  startTicker: () => {
    set(state => ({
      ticker: state.ticker ? { ...state.ticker, isRunning: true } : null,
    }));
  },

  stopTicker: () => {
    set(state => ({
      ticker: state.ticker ? { ...state.ticker, isRunning: false } : null,
    }));
  },

  updateTickerSpeed: (speed: Ticker['speed']) => {
    set(state => ({
      ticker: state.ticker ? { ...state.ticker, speed } : null,
    }));
  },

  addTickerItem: (item: string) => {
    set(state => ({
      ticker: state.ticker
        ? { ...state.ticker, items: [...state.ticker.items, item] }
        : null,
    }));
  },

  removeTickerItem: (index: number) => {
    set(state => ({
      ticker: state.ticker
        ? { ...state.ticker, items: state.ticker.items.filter((_, i) => i !== index) }
        : null,
    }));
  },

  setSegment: (segment: Segment | null) => {
    set({ currentSegment: segment });
  },

  emergencyBroadcast: (message: string) => {
    set({
      isLive: true,
      breakingNews: {
        id: `emergency-${Date.now()}`,
        headline: 'EMERGENCY BROADCAST',
        content: message,
        triggeredAt: new Date().toISOString(),
        triggeredBy: {
          id: 'admin-001',
          username: 'Elaria.Xana',
          email: 'elaria.xana@xnn.com',
          firstName: 'Elaria',
          lastName: 'Xana',
          role: 'SUPER_ADMIN',
          clearanceLevel: 5,
          permissions: ['*'],
          joinDate: '2020-01-01',
          lastActive: new Date().toISOString(),
          isActive: true,
        },
      },
    });
  },
}));
