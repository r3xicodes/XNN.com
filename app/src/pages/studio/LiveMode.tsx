import { useStudioStore } from '@/store/studioStore';
import { Monitor, Radio } from 'lucide-react';

export default function LiveMode() {
  const { isLive, activeCamera, lowerThird, breakingNews, ticker } = useStudioStore();

  return (
    <div className="h-screen bg-black flex flex-col">
      {/* Live Indicator */}
      <div className="bg-[#111111] border-b border-white/10 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isLive ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <span className="font-bold">ON AIR</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded">
              <div className="w-3 h-3 bg-white/40 rounded-full" />
              <span className="text-white/60">STANDBY</span>
            </div>
          )}
          <span className="text-white/60 text-sm">{new Date().toLocaleTimeString()}</span>
        </div>
        <div className="text-white/60 text-sm">XNN LIVE BROADCAST</div>
      </div>

      {/* Main Broadcast View */}
      <div className="flex-1 relative">
        {/* Program Output */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-black">
          <div className="text-center text-white/40">
            <Monitor className="h-24 w-24 mx-auto mb-6" />
            <p className="text-2xl">Program Output</p>
            <p className="text-lg mt-2">Camera {activeCamera}</p>
          </div>
        </div>

        {/* Breaking News Overlay */}
        {breakingNews && (
          <div className="absolute top-0 left-0 right-0 bg-red-600 text-white p-6 animate-in slide-in-from-top">
            <div className="flex items-center gap-3 font-bold text-2xl">
              <Radio className="h-6 w-6" />
              BREAKING NEWS
            </div>
            <p className="text-xl font-medium mt-2">{breakingNews.headline}</p>
            <p className="text-white/80 mt-1">{breakingNews.content}</p>
          </div>
        )}

        {/* Lower Third */}
        {lowerThird?.visible && (
          <div className="absolute bottom-20 left-0 right-0">
            <div className="bg-gradient-to-t from-black/90 to-transparent p-8">
              <div className="bg-[#C69B2F] text-[#111111] px-6 py-3 inline-block text-xl font-bold">
                {lowerThird.text}
              </div>
              {lowerThird.subtext && (
                <div className="bg-[#111111] text-white px-6 py-2 inline-block text-lg">
                  {lowerThird.subtext}
                </div>
              )}
            </div>
          </div>
        )}

        {/* News Ticker */}
        {ticker?.isRunning && (
          <div className="absolute bottom-0 left-0 right-0 bg-[#C69B2F] text-[#111111] py-2 overflow-hidden">
            <div className="whitespace-nowrap animate-marquee">
              {ticker.items.join(' • ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
