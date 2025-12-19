import { useState, useEffect, useCallback } from 'react';
import { Card, GameState, GameDifficulty } from '../types';
import { EMOJIS, FLIP_DELAY_MS } from '../constants';

const shuffleCards = (size: number): Card[] => {
  // Select distinct emojis for pairs
  const numPairs = size / 2;
  const selectedEmojis = EMOJIS.sort(() => 0.5 - Math.random()).slice(0, numPairs);
  
  // Create pairs
  const deck = [...selectedEmojis, ...selectedEmojis].map((emoji, index) => ({
    id: `card-${index}`,
    emoji,
    isFlipped: false,
    isMatched: false,
  }));

  // Shuffle deck
  return deck.sort(() => 0.5 - Math.random());
};

export const useMemoryGame = (difficulty: GameDifficulty = GameDifficulty.MEDIUM) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(() => {
    const saved = localStorage.getItem('memory-best-score');
    return saved ? parseInt(saved, 10) : null;
  });

  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize game
  const initializeGame = useCallback(() => {
    setCards(shuffleCards(difficulty));
    setMoves(0);
    setTimer(0);
    setFlippedIndices([]);
    setIsGameActive(false);
    setIsGameComplete(false);
    setIsProcessing(false);
  }, [difficulty]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isGameActive && !isGameComplete) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, isGameComplete]);

  // Check for completion
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setIsGameComplete(true);
      setIsGameActive(false);
      
      // Update best score
      if (bestScore === null || moves < bestScore) {
        setBestScore(moves);
        localStorage.setItem('memory-best-score', moves.toString());
      }
    }
  }, [cards, moves, bestScore]);

  const handleCardClick = (clickedCard: Card) => {
    const clickedIndex = cards.findIndex(c => c.id === clickedCard.id);

    // Validation
    if (
      isProcessing || 
      clickedCard.isFlipped || 
      clickedCard.isMatched || 
      flippedIndices.includes(clickedIndex)
    ) {
      return;
    }

    // Start timer on first move
    if (!isGameActive && !isGameComplete) {
      setIsGameActive(true);
    }

    // Flip the card
    const newCards = [...cards];
    newCards[clickedIndex].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, clickedIndex];
    setFlippedIndices(newFlippedIndices);

    // Check for match if 2 cards are flipped
    if (newFlippedIndices.length === 2) {
      setMoves((prev) => prev + 1);
      setIsProcessing(true);
      checkForMatch(newFlippedIndices, newCards);
    }
  };

  const checkForMatch = (indices: number[], currentCards: Card[]) => {
    const [index1, index2] = indices;
    const card1 = currentCards[index1];
    const card2 = currentCards[index2];

    if (card1.emoji === card2.emoji) {
      // Match found
      setTimeout(() => {
        setCards((prev) => {
          const updated = [...prev];
          updated[index1].isMatched = true;
          updated[index2].isMatched = true;
          return updated;
        });
        setFlippedIndices([]);
        setIsProcessing(false);
      }, 300); // Small delay for visual satisfaction
    } else {
      // No match
      setTimeout(() => {
        setCards((prev) => {
          const updated = [...prev];
          updated[index1].isFlipped = false;
          updated[index2].isFlipped = false;
          return updated;
        });
        setFlippedIndices([]);
        setIsProcessing(false);
      }, FLIP_DELAY_MS);
    }
  };

  const restartGame = () => {
    initializeGame();
  };

  return {
    cards,
    moves,
    timer,
    bestScore,
    isGameActive,
    isGameComplete,
    handleCardClick,
    restartGame,
    isProcessing // Exported to potentially disable UI entirely if needed
  };
};