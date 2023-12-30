class Player {
  constructor(ws) {
    this.ws = ws;
    this.game = null; // プレイヤーが所属しているゲーム
    this.hand = []; // プレイヤーの手札
    // プレイヤーの初期化など
    this.initializePlayer();
  }

  initializePlayer() {
    // 例: プレイヤーが最初の手番を持つように初期化する
    this.isTurn = true;

    // 他の初期化処理を追加する
  }

  send(message) {
    // メッセージをプレイヤーに送信する処理
    this.ws.send(JSON.stringify(message));
  }
}

module.exports = Player;
