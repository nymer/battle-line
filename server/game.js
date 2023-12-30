class Game {
  constructor() {
    // ゲームの初期化など
    this.players = [];
    // ゲームが満員かどうかのフラグ
    this.isFull = false;
    // ゲームの初期化など（例：デッキの初期化）
    this.deck = initializeDeck();
    this.drawHands();
  }

  addPlayer(player) {
    // プレイヤーをゲームに追加する処理
    if (!this.isFull) {
      this.players.push(player);
      player.game = this;
      player.send({ type: 'message', content: 'You joined the game.' });

      // ゲームが満員になったかどうかを確認し、必要なら処理を行う
      this.checkFull();
    } else {
      player.send({ type: 'message', content: 'Sorry, the game is full.' });
    }
  }

  removePlayer(player) {
    // プレイヤーをゲームから削除する処理
  }

  isAvailable() {
    // ゲームが満員でないかどうかを判定する処理
    const index = this.players.indexOf(player);
    if (index !== -1) {
      this.players.splice(index, 1);
      player.game = null;

      // ゲームが満員ではなくなったかどうかを確認し、必要なら処理を行う
      this.checkFull();
    }
  }

  checkFull() {
    this.isFull = this.players.length >= 2; // プレイヤーが2人以上いればゲームは満員とする
  }

  initializeDeck() {
    // デッキの初期化処理
    // 例えば、1から10までの数字が各2枚ずつ入ったデッキを想定
    const deck = [];
    for (let i = 1; i <= 10; i++) {
      deck.push(i, i);
    }
    return deck;
  }

  drawHands() {
    // プレイヤーに手札を配る処理
    // ここではシンプルにデッキからランダムにカードを引く例を示しているが、実際のゲームロジックに合わせて変更が必要
    this.players.forEach(player => {
      player.hand = [];
      for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * this.deck.length);
        const drawnCard = this.deck.splice(randomIndex, 1)[0];
        player.hand.push(drawnCard);
      }
    });
  }
}

module.exports = Game;
