import React from 'react';
import { BrainCircuit } from 'lucide-react';
import { Card } from './components/Card';
import { Stats } from './components/Stats';
import { GameOverModal } from './components/GameOverModal';
import { useMemoryGame } from './hooks/useMemoryGame';

const App: React.FC = () => {
  const {
    cards,
    moves,
    timer,
    bestScore,
    isGameComplete,
    handleCardClick,
    restartGame,
    isProcessing
  } = useMemoryGame();

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black text-slate-100 font-sans selection:bg-indigo-500/30">
      
      {/* Header */}
      <header className="pt-8 pb-6 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20">
            <BrainCircuit size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
            MindMatch
          </h1>
        </div>
        <p className="text-slate-400 text-sm md:text-base">Train your brain, one pair at a time.</p>
      </header>

      {/* Main Game Area */}
      <main className="container mx-auto px-4 pb-12 max-w-4xl">
        <Stats 
          moves={moves} 
          timer={timer} 
          bestScore={bestScore} 
          onRestart={restartGame} 
        />

        {/* Grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 mx-auto perspective-1000">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onClick={handleCardClick}
              disabled={isProcessing}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-slate-600 text-sm">
        <p>© {new Date().getFullYear()} MindMatch. Built with React & Tailwind.</p>
      </footer>

      {/* Modals */}
      <GameOverModal
        isOpen={isGameComplete}
        moves={moves}
        timer={timer}
        bestScore={bestScore}
        onRestart={restartGame}
        onClose={() => {}} // Optional: If we want to allow closing without restart
      />
    </div>
  );
};

export default App;