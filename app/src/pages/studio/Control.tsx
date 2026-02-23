import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useStudioStore } from '@/store/studioStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Type, 
  AlertTriangle,
  Play,
  Square,
  Send,
  X,
  Plus,
  Monitor,
  Video
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function StudioControl() {
  const { 
    isLive, 
    cameras, 
    activeCamera, 
    lowerThird, 
    breakingNews, 
    ticker,
    goLive, 
    stopLive, 
    switchCamera,
    pushLowerThird,
    clearLowerThird,
    triggerBreaking,
    clearBreaking,
    startTicker,
    stopTicker,
    addTickerItem
  } = useStudioStore();

  const [lowerThirdText, setLowerThirdText] = useState('');
  const [lowerThirdSubtext, setLowerThirdSubtext] = useState('');
  const [breakingHeadline, setBreakingHeadline] = useState('');
  const [breakingContent, setBreakingContent] = useState('');
  const [newTickerItem, setNewTickerItem] = useState('');

  const handlePushLowerThird = () => {
    if (lowerThirdText) {
      pushLowerThird(lowerThirdText, lowerThirdSubtext || undefined);
      setLowerThirdText('');
      setLowerThirdSubtext('');
    }
  };

  const handleTriggerBreaking = () => {
    if (breakingHeadline && breakingContent) {
      triggerBreaking(breakingHeadline, breakingContent);
      setBreakingHeadline('');
      setBreakingContent('');
    }
  };

  const handleAddTicker = () => {
    if (newTickerItem) {
      addTickerItem(newTickerItem);
      setNewTickerItem('');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold">Studio Control</h1>
          <p className="text-white/60">Manage live broadcast</p>
        </div>
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
          <Button
            onClick={isLive ? stopLive : goLive}
            className={isLive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
          >
            {isLive ? <Square className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isLive ? 'Stop Live' : 'Go Live'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Camera Preview */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-[#161B22] border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Program Output
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black rounded flex items-center justify-center relative overflow-hidden">
                <div className="text-white/40 text-center">
                  <Video className="h-16 w-16 mx-auto mb-4" />
                  <p>Camera {activeCamera} Feed</p>
                </div>
                
                {/* Lower Third Overlay */}
                {lowerThird?.visible && (
                  <div className="absolute bottom-12 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                    <div className="bg-[#C69B2F] text-[#111111] px-4 py-2 inline-block font-bold">
                      {lowerThird.text}
                    </div>
                    {lowerThird.subtext && (
                      <div className="bg-[#111111] text-white px-4 py-2 inline-block ml-0">
                        {lowerThird.subtext}
                      </div>
                    )}
                  </div>
                )}

                {/* Breaking News Overlay */}
                {breakingNews && (
                  <div className="absolute top-0 left-0 right-0 bg-red-600 text-white p-4 animate-in slide-in-from-top">
                    <div className="flex items-center gap-2 font-bold text-lg">
                      <AlertTriangle className="h-5 w-5" />
                      BREAKING NEWS
                    </div>
                    <p className="text-lg font-medium mt-1">{breakingNews.headline}</p>
                  </div>
                )}
              </div>

              {/* Camera Switcher */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {cameras.map((camera) => (
                  <button
                    key={camera.id}
                    onClick={() => switchCamera(camera.id)}
                    className={`aspect-video rounded border-2 transition-all ${
                      activeCamera === camera.id 
                        ? 'border-red-600 bg-red-600/20' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="h-full flex flex-col items-center justify-center text-white/60">
                      <Video className="h-6 w-6 mb-1" />
                      <span className="text-xs">{camera.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Lower Third */}
          <Card className="bg-[#161B22] border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Type className="h-5 w-5" />
                Lower Third
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Main text"
                value={lowerThirdText}
                onChange={(e) => setLowerThirdText(e.target.value)}
                className="bg-black border-white/20 text-white"
              />
              <Input
                placeholder="Subtext (optional)"
                value={lowerThirdSubtext}
                onChange={(e) => setLowerThirdSubtext(e.target.value)}
                className="bg-black border-white/20 text-white"
              />
              <div className="flex gap-2">
                <Button onClick={handlePushLowerThird} className="flex-1 bg-[#C69B2F] text-[#111111] hover:bg-[#C69B2F]/90">
                  <Send className="h-4 w-4 mr-2" />
                  Push
                </Button>
                <Button onClick={clearLowerThird} variant="outline" className="border-white/20">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Breaking News */}
          <Card className="bg-[#161B22] border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-red-500">
                <AlertTriangle className="h-5 w-5" />
                Breaking News
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Headline"
                value={breakingHeadline}
                onChange={(e) => setBreakingHeadline(e.target.value)}
                className="bg-black border-white/20 text-white"
              />
              <Input
                placeholder="Content"
                value={breakingContent}
                onChange={(e) => setBreakingContent(e.target.value)}
                className="bg-black border-white/20 text-white"
              />
              <div className="flex gap-2">
                <Button onClick={handleTriggerBreaking} className="flex-1 bg-red-600 hover:bg-red-700">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Trigger
                </Button>
                <Button onClick={clearBreaking} variant="outline" className="border-white/20">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Ticker */}
          <Card className="bg-[#161B22] border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">News Ticker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className={ticker?.isRunning ? 'bg-green-600' : 'bg-gray-600'}>
                  {ticker?.isRunning ? 'RUNNING' : 'STOPPED'}
                </Badge>
                <div className="flex gap-1 ml-auto">
                  <Button size="sm" onClick={startTicker} variant="outline" className="border-white/20">
                    <Play className="h-3 w-3" />
                  </Button>
                  <Button size="sm" onClick={stopTicker} variant="outline" className="border-white/20">
                    <Square className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add ticker item..."
                  value={newTickerItem}
                  onChange={(e) => setNewTickerItem(e.target.value)}
                  className="bg-black border-white/20 text-white"
                />
                <Button onClick={handleAddTicker} size="icon" className="bg-[#C69B2F] text-[#111111]">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {ticker?.items.map((item, index) => (
                  <div key={index} className="text-sm text-white/60 px-2 py-1 bg-white/5 rounded">
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
