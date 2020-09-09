const { FOLD, CHECK, RAISE, WINNER, CALL } = require('./actions');

class Seat {
  constructor(id, player, buyin, stack) {
    this.id = id; // Seat ID
    this.player = player; // A reference to the player currently holding the seat
    this.buyin = buyin; // The amount the player buys into the game with
    this.stack = stack; // The amount of chips the player currently has in the game at his disposal
    this.hand = []; // The players hidden cards
    this.bet = 0; // The current bet amount
    this.turn = false; // Is this currently the players turn?
    this.checked = true; // Did the player "check"?
    this.folded = true; // Did the player "fold"?
    this.lastAction = null;
    this.sittingOut = false;
  }

  placeBlind(amount) {
    this.bet = amount;
    this.stack -= amount;
  }

  fold() {
    this.bet = 0;
    this.folded = true;
    this.lastAction = FOLD;
    this.turn = false;
  }

  check() {
    this.checked = true;
    this.lastAction = CHECK;
    this.turn = false;
  }

  raise(amount) {
    const reRaiseAmount = amount - this.bet;
    if (reRaiseAmount > this.stack) return;

    this.bet = amount;
    this.stack -= reRaiseAmount;
    this.turn = false;
    this.lastAction = RAISE;
  }

  callRaise(amount) {
    let amountCalled = amount - this.bet;
    if (amountCalled >= this.stack) amountCalled = this.stack;

    this.bet += amountCalled;
    this.stack -= amountCalled;
    this.turn = false;
    this.lastAction = CALL;
  }

  winHand(amount) {
    this.bet = 0;
    this.stack += amount;
    this.turn = false;
    this.lastAction = WINNER;
  }
}

module.exports = Seat;
