class Player {
  constructor(socketId, playerId, playerName, chipsAmount) {
    this.socketId = socketId;
    this.id = playerId;
    this.name = playerName;
    this.bankroll = chipsAmount;
  }
}

module.exports = Player;
