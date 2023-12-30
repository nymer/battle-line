const ws = new WebSocket('ws://localhost:3000');

ws.addEventListener('open', (event) => {
  // WebSocket接続が確立されたときの処理
  console.log('Connected to the server.');
});

ws.addEventListener('message', (event) => {
  // サーバーからのメッセージを処理
  const message = JSON.parse(event.data);
  handleMessage(message);
});

function handleMessage(message) {
  switch (message.type) {
    case 'gameStart':
      // ゲームが開始されたときの処理
      console.log('Game started with hand:', message.hand);
      break;
    // 他のメッセージの処理を追加
  }
}

// サンプル: クライアントからのメッセージ送信
function sendMessageToServer() {
  const message = { type: 'clientMessage', hand: 'Hello, server!' };
  ws.send(JSON.stringify(message));
}


//画面イメージ部分
function updatePlayerHand(hand) {
  const playerHandElement = document.getElementById('player-hand');
  playerHandElement.innerHTML = ''; // 手札をクリア

  hand.forEach(card => {
    const cardElement = createCardElement(card);
    playerHandElement.appendChild(cardElement);
  });
}

function updateOpponentHand(hand) {
  const opponentHandElement = document.getElementById('opponent-hand');
  opponentHandElement.innerHTML = ''; // 手札をクリア

  hand.forEach(card => {
    const cardElement = createCardElement(); // カードの裏面の表示など
    opponentHandElement.appendChild(cardElement);
  });
}

function updateGameBoard(boardState) {
  const gameBoardElement = document.getElementById('game-board');
  gameBoardElement.innerHTML = ''; // ボードをクリア

  // ボードの状態に基づいてカードやゲームの進行を表示する処理
}

function createCardElement(card) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.textContent = card; // カードの数字や情報を表示
  return cardElement;
}
