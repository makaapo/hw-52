import Card from './Card';

class PokerHand {
  private cards: Card[];

  constructor(cards: Card[]) {
    this.cards = cards.sort((a, b) => this.getRankValue(a.rank) - this.getRankValue(b.rank));
  }

  getOutcome(): string {
    if (this.isRoyalFlush()) return 'Royal Flush';
    if (this.isStraightFlush()) return 'Straight Flush';
    if (this.isFourOfAKind()) return 'Four of a Kind';
    if (this.isFullHouse()) return 'Full House';
    if (this.isFlush()) return 'Flush';
    if (this.isStraight()) return 'Straight';
    if (this.isThreeOfAKind()) return 'Three of a Kind';
    if (this.isTwoPairs()) return 'Two Pairs';
    if (this.isOnePair()) return 'One Pair';
    return 'High Card';
  }

  private getRankValue(rank: string): number {
    const values: { [key: string]: number } = {
      '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };

    return values[rank] || 0;
  }

  private getRanks(): string[] {
    return this.cards.map(card => card.rank);
  }

  private isRoyalFlush(): boolean {
    return this.isStraightFlush() && this.cards[0].rank === '10';
  }

  private isStraightFlush(): boolean {
    return this.isFlush() && this.isStraight();
  }

  private isFourOfAKind(): boolean {
    return this.hasNOfAKind(4);
  }

  private isFullHouse(): boolean {
    const ranks = this.getRanks();
    const uniqueRanks: string[] = [];
    const rankCounts: { [rank: string]: number } = {};

    for (const rank of ranks) {
      if (!uniqueRanks.includes(rank)) {
        uniqueRanks.push(rank);
        rankCounts[rank] = 1;
      } else {
        rankCounts[rank]++;
      }
    }

    return uniqueRanks.length === 2 &&
      (rankCounts[uniqueRanks[0]] === 3 || rankCounts[uniqueRanks[0]] === 2) &&
      (rankCounts[uniqueRanks[1]] === 3 || rankCounts[uniqueRanks[1]] === 2);
  }

  private isFlush(): boolean {
    return this.cards.every(card => card.suit === this.cards[0].suit);
  }

  private isStraight(): boolean {
    for (let i = 0; i < this.cards.length - 1; i++) {
      if (this.getRankValue(this.cards[i].rank) + 1 !== this.getRankValue(this.cards[i + 1].rank)) {
        return false;
      }
    }

    if (this.cards[0].rank === '2' &&
      this.cards[1].rank === '3' &&
      this.cards[2].rank === '4' &&
      this.cards[3].rank === '5' &&
      this.cards[4].rank === 'A') {
      return true;
    }

    return true;
  }


  private isThreeOfAKind(): boolean {
    return this.hasNOfAKind(3);
  }

  private isTwoPairs(): boolean {
    const ranks = this.getRanks();
    const uniqueRanks: string[] = [];
    const rankCounts: { [rank: string]: number } = {};

    for (const rank of ranks) {
      if (!uniqueRanks.includes(rank)) {
        uniqueRanks.push(rank);
        rankCounts[rank] = 1;
      } else {
        rankCounts[rank]++;
      }
    }

    let pairsCount = 0;
    uniqueRanks.forEach(rank => {
      if (rankCounts[rank] === 2) {
        pairsCount++;
      }
    });

    return pairsCount === 2;
  }

  private isOnePair(): boolean {
    const ranks = this.getRanks();
    const uniqueRanks: string[] = [];

    ranks.forEach(rank => {
      if (!uniqueRanks.includes(rank)) {
        uniqueRanks.push(rank);
      }
    });

    return uniqueRanks.length === 4;
  }

  private hasNOfAKind(n: number): boolean {
    const ranks = this.getRanks();
    const rankCounts: { [rank: string]: number } = {};

    for (const rank of ranks) {
      rankCounts[rank] = (rankCounts[rank] || 0) + 1;
    }

    return Object.values(rankCounts).some(count => count === n);
  }
}
export default PokerHand