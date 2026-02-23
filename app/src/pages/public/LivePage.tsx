import { Link } from 'react-router-dom';
import { ArrowLeft, Radio, Users, MessageCircle } from 'lucide-react';

export default function LivePage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to homepage
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="font-bold">LIVE</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative">
              <div className="text-center text-white/40">
                <Radio className="h-16 w-16 mx-auto mb-4" />
                <p className="text-xl">Live Stream</p>
                <p className="text-sm mt-2">Parliament Debates Infrastructure Bill</p>
              </div>
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-3 py-1 rounded">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm font-bold">LIVE</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h1 className="text-2xl font-serif font-bold">Parliament Debates Infrastructure Bill</h1>
              <p className="text-white/60 mt-2">
                Live coverage of the parliamentary session as lawmakers debate the comprehensive infrastructure bill. 
                Follow along for real-time updates, vote counts, and expert analysis.
              </p>
              <div className="flex items-center gap-4 mt-4 text-sm text-white/60">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  12,458 watching
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  234 comments
                </span>
              </div>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="bg-[#1a1a1a] rounded-lg p-4 h-[600px] flex flex-col">
            <h3 className="font-bold mb-4">Live Chat</h3>
            <div className="flex-1 overflow-y-auto space-y-3">
              {[
                { user: 'Viewer1', message: 'This is a crucial vote!' },
                { user: 'PoliticsFan', message: 'Hope they pass it' },
                { user: 'NewsJunkie', message: 'The amendments are interesting' },
              ].map((chat, i) => (
                <div key={i} className="text-sm">
                  <span className="font-bold text-[#C69B2F]">{chat.user}:</span>
                  <span className="text-white/80 ml-2">{chat.message}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full px-4 py-2 bg-black border border-white/20 rounded text-white placeholder-white/40"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
