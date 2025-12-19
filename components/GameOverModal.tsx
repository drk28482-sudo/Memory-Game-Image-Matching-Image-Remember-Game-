import React from 'react';
import { Trophy, RefreshCw, X } from 'lucide-react';

interface GameOverModalProps {
  isOpen: boolean;
  moves: number;
  timer: number;
  bestScore: number | null;
  onRestart: () => void;
  onClose: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ 
  isOpen, 
  moves, 
  timer, 
  bestScore, 
  onRestart,
  onClose 
}) => {
  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const isNewRecord = bestScore === null || moves <= bestScore;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500 blur-xl opacity-20 rounded-full"></div>
            <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-full shadow-xl">
              <Trophy size={48} className="text-white" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">Fantastic!</h2>
        <p className="text-slate-400 mb-8">You've matched all the pairs.</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-700/50 p-4 rounded-xl">
            <p className="text-slate-400 text-sm uppercase font-bold mb-1">Moves</p>
            <p className="text-2xl font-bold text-white">{moves}</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-xl">
            <p className="text-slate-400 text-sm uppercase font-bold mb-1">Time</p>
            <p className="text-2xl font-bold text-white">{formatTime(timer)}</p>
          </div>
        </div>

        {isNewRecord && (
          <div className="mb-8 bg-green-500/10 text-green-400 py-2 px-4 rounded-lg text-sm font-semibold inline-block">
             ✨ New Personal Best!
          </div>
        )}

        <button
          onClick={onRestart}
          className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/25 transition-all active:scale-95 flex items-center justify-center gap-2 group"
        >
          <RefreshCw size={24} className="group-hover:rotate-180 transition-transform duration-500" />
          Play Again
        </button>
      </div>
    </div>
  );
};