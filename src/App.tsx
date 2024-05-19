import React, { useState } from 'react';
import CardComponent from "./components/Card/CardComponent";
import CardDeck from './lib/CardDeck';
import Card from './lib/Card';

const App: React.FC = () => {
    const [deck] = useState(new CardDeck());
    const [hand, setHand] = useState<Card[]>([]);
    const [cardCount, setCardCount] = useState(deck.cards.length);

    const dealCards = () => {
        if (cardCount >= 5) {
            const cardsToDeal = deck.getCards(5);
            setHand(cardsToDeal);
            setCardCount(cardCount - cardsToDeal.length);
        } else if (cardCount > 0) {
            const cardsToDeal = deck.getCards(cardCount);
            setHand(cardsToDeal);
            setCardCount(0);
        } else {
            console.log('Карты закончились');
        }
    };

    return (
        <div>
            <p className="cardCount">Card count: {cardCount}</p>
            <button className="getCards" onClick={dealCards} disabled={cardCount === 0}>Get Cards</button>
            {hand.length > 0 && (
                <div className="playingCards faceImages">
                    {hand.map((card, index) => (
                        <div key={index}>
                            <CardComponent rank={card.rank} suit={card.suit} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
