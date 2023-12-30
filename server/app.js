const express = require('express');
const http = require('http');
const cors = require('cors');
const WebSocket = require('ws');
const Game = require('./game');
const Players = require('./player');

const app = express();
const server = http.createServer(app);
// const server = app.listen(3000, () => {  
//   console.log('Server started on http://localhost:3000');
// });
const wss = new WebSocket.Server({ server });

// CORSミドルウェアの使用
app.use(cors());

const games = [];

// publicディレクトリ内の静的ファイルを提供
app.use(express.static('public'));

wss.on('connection', (ws) => {
  // WebSocket接続が確立されたときの処理
  console.log('WebSocket connection established.');
  
  // 新しいプレイヤーが接続したときの処理
  const player = new Player(ws);
  let game = findAvailableGame();
  
  if (!game) {
    game = createGame();
    games.push(game);
  }

  game.addPlayer(player);
  player.send({ type: 'gameStart', hand: player.hand });

  ws.on('message', (message) => {
    // クライアントからのメッセージを処理
    handleMessage(game, player, JSON.parse(message));
  });

  ws.on('close', () => {
    // プレイヤーが切断したときの処理
    game.removePlayer(player);
  });
});

function findAvailableGame() {
  return games.find((game) => game.isAvailable());
}

function createGame() {
  const newGame = new Game();
  return newGame;
}

server.listen(3000, '0.0.0.0', () => {
  const address = server.address();
  console.log(`Server started on http://${address.address}:${address.port}`);
});