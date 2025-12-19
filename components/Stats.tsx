import React from 'react';
import { Timer, Move, Trophy, RefreshCw } from 'lucide-react';

interface StatsProps {
  moves: number;
  timer: number;
  bestScore: number | null;
  onRestart: () => void;
}

export const Stats: React.FC<StatsProps> = ({ moves, timer, bestScore, onRestart }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 bg-slate-800/50 backdrop-blur-md rounded-2xl p-4 border border-slate-700 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
      
      <div className="flex items-center gap-6 text-slate-200">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
            <Move size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Moves</p>
            <p className="text-xl font-bold font-mono">{moves}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400">
            <Timer size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Time</p>
            <p className="text-xl font-bold font-mono w-16">{formatTime(timer)}</p>
          </div>
        </div>

        {bestScore !== null && (
          <div className="hidden sm:flex items-center gap-2 border-l border-slate-700 pl-6">
            <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400">
              <Trophy size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Best</p>
              <p className="text-xl font-bold font-mono">{bestScore}</p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onRestart}
        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transition-all active:scale-95 flex items-center gap-2 group w-full md:w-auto justify-center"
      >
        <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
        <span>Restart Game</span>
      </button>
    </div>
  );
};