import React, {useState} from 'react';
import CardComponent from './components/Card/CardComponent';
import CardDeck from './lib/CardDeck';
import Card from './lib/Card';
import PokerHand from './lib/PokerHand';

const App: React.FC = () => {
  const [deck, setDeck] = useState(new CardDeck());
  const [hand, setHand] = useState<Card[]>([]);
  const [cardCount, setCardCount] = useState(deck.cards.length);
  const [roundResult, setRoundResult] = useState('');

  const dealCards = () => {
    const cardsToDealCount = Math.min(5, cardCount);
    const cardsToDeal = deck.getCards(cardsToDealCount);
    setHand(cardsToDeal);
    setCardCount(prevCount => prevCount - cardsToDealCount);
    const pokerHand = new PokerHand(cardsToDeal);
    setRoundResult(pokerHand.getOutcome());
  };

  const resetDeck = () => {
    const newDeck = new CardDeck();
    setDeck(newDeck);
    setHand([]);
    setCardCount(newDeck.cards.length);
    setRoundResult('');
  };

  return (
    <div>
      <p className="cardInfo">Card count: {cardCount}</p>
      <button className="getCards" onClick={dealCards} disabled={cardCount === 0}>Get Cards</button>
      {cardCount === 0 && <button className="resetDeck" onClick={resetDeck}>Reset</button>} {}
      <p className="cardInfo">Result of round: {roundResult}</p>
      {hand.length > 0 && (
        <div className="playingCards faceImages">
          {hand.map((card, index) => (
            <div key={index}>
              <CardComponent rank={card.rank} suit={card.suit}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
