import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
  disabled: boolean;
}

export const Card: React.FC<CardProps> = ({ card, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  return (
    <div 
      className={`relative w-full aspect-[3/4] cursor-pointer group perspective-1000 ${disabled ? 'cursor-not-allowed' : ''}`}
      onClick={handleClick}
    >
      <div
        className={`w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-xl ${
          card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Face (Hidden/Card Back) */}
        <div className="absolute w-full h-full backface-hidden rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 border-2 border-indigo-400/30 flex items-center justify-center">
          <div className="text-4xl text-white/20 select-none font-bold">?</div>
          {/* Decorative pattern */}
          <div className="absolute inset-2 border-2 border-dashed border-white/10 rounded-lg"></div>
        </div>

        {/* Back Face (Visible/Emoji) */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl bg-white border-2 border-indigo-200 flex items-center justify-center shadow-inner">
          <span className="text-4xl sm:text-5xl select-none animate-bounce-short">
            {card.emoji}
          </span>
          {card.isMatched && (
             <div className="absolute inset-0 bg-green-500/20 rounded-xl flex items-center justify-center">
               <div className="bg-green-100 text-green-700 p-1 rounded-full shadow-sm transform scale-150">
                 ✓
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};