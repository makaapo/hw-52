import React from 'react';

interface CardProps {
    rank: string;
    suit: string;
}

const CardComponent: React.FC<CardProps> = ({ rank, suit }) => {
    const getSuitSymbol = (suit: string) => {
        switch (suit) {
            case 'diams': return '♦';
            case 'hearts': return '♥';
            case 'clubs': return '♣';
            case 'spades': return '♠';
            default: return '';
        }
    };

    return (
        <span className={`card rank-${rank.toLowerCase()} ${suit}`}>
      <span className="rank">{rank}</span>
      <span className="suit">{getSuitSymbol(suit)}</span>
    </span>
    );
};

export default CardComponent;
