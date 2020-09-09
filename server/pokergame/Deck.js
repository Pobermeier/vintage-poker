class Deck {
  constructor() {
    this.extend = [];
    this.suits = ['s', 'h', 'd', 'c'];
    this.ranks = [
      'A',
      'K',
      'Q',
      'J',
      '10',
      '9',
      '8',
      '7',
      '6',
      '5',
      '4',
      '3',
      '2',
    ];
    this.cards = this.shuffle();
  }

  shuffle() {
    const cards = [];

    this.suits.forEach((suit) => {
      this.ranks.forEach((rank) => {
        cards.push({ suit, rank });
      });
    });

    return cards;
  }

  inlay(card) {
    if (card && card.suit && card.rank) {
      this.cards.push(card);
      return true;
    } else {
      return false;
    }
  }

  count() {
    return this.cards.length;
  }

  draw() {
    const count = this.count();
    if (count > 0)
      return this.cards.splice(Math.floor(Math.random() * count), 1)[0];
    else return null;
  }
}

module.exports = Deck;
