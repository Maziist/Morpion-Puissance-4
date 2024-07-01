const container = document.querySelector('#gameContainer');
const play = document.querySelector('#btnPlay');
const replay = document.querySelector("#btnReplay");
const onevscpu = document.querySelector("#onevscpu");
const onevsone = document.querySelector("#onevsone");
const toggle = document.querySelector("#toggle");
const gameTitle = document.querySelector("#gameTitle");
let message = document.createElement('p');
message.classList.add('winorloose');
container.appendChild(message);

let gameOver = false;
let vsCpu = false;
let morpion = true;
let tabGame = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];
let connect = [
  ['', '', '', '', '', '','',],
  ['', '', '', '', '', '','',],
  ['', '', '', '', '', '','',],
  ['', '', '', '', '', '','',],
  ['', '', '', '', '', '','',],
  ['', '', '', '', '', '','',]

];
let counter = 0;
let playerOne = "X";
let playerTwo = "O";

function createTab(tab) {
  container.innerHTML = '';
  container.appendChild(message);

  let grid = document.createElement('div');
  grid.classList.add('grid');
  container.appendChild(grid);
  grid.classList.add(morpion ? 'tic-tac-toe' : 'connect-four');

  tab.forEach((row, rowIndex) => {
    console.log(row);
    let line = document.createElement('div');
    line.classList.add('line');
    row.forEach((column, columnIndex) => {
      let cell = document.createElement('div');
      cell.addEventListener('click', () => {
        choicePlayer(rowIndex, columnIndex);
      });
      switch (column) {
        case playerOne:
          cell.innerHTML = playerOne;
          cell.setAttribute('data-player', playerOne);
          break;

        case playerTwo:
          cell.innerHTML = playerTwo;
          cell.setAttribute('data-player', playerTwo);
          break;
      }
      cell.classList.add('cell');
      line.appendChild(cell);
    });
    grid.appendChild(line);
  });
}

function choicePlayer(row, column) {
  if (morpion) {
    if (tabGame[row][column] === "" && !gameOver) {
      if (counter % 2 === 0) {
        tabGame[row][column] = playerOne;
        if (vsCpu) {
          cpu(tabGame);
        }
      } else {
        tabGame[row][column] = playerTwo;
      }
      counter++;
      winner(tabGame);
      createTab(tabGame);
    }
  } else {
    if (connect[row][column] === "" && !gameOver) {
      let dispoRow = checkRow(column);

      if (dispoRow !== -1) {
        if (counter % 2 === 0) {
          connect[dispoRow][column] = playerOne;
          counter ++;
          if (vsCpu) {
            cpu(connect);
          }
        } else {
          connect[dispoRow][column] = playerTwo;
          counter ++;
        }
      
        winnerConnect(connect);
        createTab(connect);
      }
    }
  }
}

function checkRow(column) {
  for (let i = connect.length - 1; i >= 0; i--) {
    console.log(i);
    if (connect[i][column] === "") {
      return i;
    }
  }
  return -1;
}

function winner(tab) {
  let winner = null;

  for (let i = 0; i < tab.length; i++) {
    if (tab[i][0] && tab[i][0] === tab[i][1] && tab[i][0] === tab[i][2]) {
      winner = tab[i][0];
      break;
    }
  }
  if (!winner) {
    for (let j = 0; j < tab[0].length; j++) {
      if (tab[0][j] && tab[0][j] === tab[1][j] && tab[0][j] === tab[2][j]) {
        winner = tab[0][j];
        break;
      }
    }
  }

  if (!winner) {
    if (tab[0][0] && tab[0][0] === tab[1][1] && tab[0][0] === tab[2][2]) {
      winner = tab[0][0];
    } else if (tab[0][2] && tab[0][2] === tab[1][1] && tab[0][2] === tab[2][0]) {
      winner = tab[0][2];
    }
  }

  if (winner) {
    message.innerHTML = `${winner} Winner !!`;
    gameOver = true;
  } else if (tab.flat().every(cell => cell !== '')) {
    message.innerHTML = "Match Nul !!";
    gameOver = true;
  }
}

function winnerConnect(tab) {
  let winner = null;

  //horizontal
  for (let row = 0; row < tab.length; row++) {
    for (let col = 0; col < tab[row].length - 3; col++) {
      if (tab[row][col] && tab[row][col] === tab[row][col + 1] && tab[row][col] === tab[row][col + 2] && tab[row][col] === tab[row][col + 3]) {
        winner = tab[row][col];
        break;
      }
    }
  }

  //vertical
  for (let col = 0; col < tab[0].length; col++) {
    for (let row = 0; row < tab.length - 3; row++) {
      if (tab[row][col] && tab[row][col] === tab[row + 1][col] && tab[row][col] === tab[row + 2][col] && tab[row][col] === tab[row + 3][col]) {
        winner = tab[row][col];
        break;
      }
    }
  }

  //diagonal (bas-gauche à haut-droit)
  for (let row = 3; row < tab.length; row++) {
    for (let col = 0; col < tab[row].length - 3; col++) {
      if (tab[row][col] && tab[row][col] === tab[row - 1][col + 1] && tab[row][col] === tab[row - 2][col + 2] && tab[row][col] === tab[row - 3][col + 3]) {
        winner = tab[row][col];
        break;
      }
    }
  }

  //diagonal (haut-gauche à bas-droit)
  for (let row = 0; row < tab.length - 3; row++) {
    for (let col = 0; col < tab[row].length - 3; col++) {
      if (tab[row][col] && tab[row][col] === tab[row + 1][col + 1] && tab[row][col] === tab[row + 2][col + 2] && tab[row][col] === tab[row + 3][col + 3]) {
        winner = tab[row][col];
        break;
      }
    }
  }

  if (winner) {
    message.innerHTML = `${winner} Winner !!`;
    gameOver = true;
  } else if (tab.flat().every(cell => cell !== '')) {
    message.innerHTML = "Match Nul !!";
    gameOver = true;
  }
}

function reset(tab) {
  tab.forEach((row, i) => {
    row.forEach((column, j) => {
      tab[i][j] = "";
    });
  });
  message.innerHTML = "";
  counter = 0;
  gameOver = false;
  createTab(tab);
}

function startGame() {
  if (morpion) {
    reset(tabGame);
  } else {
    reset(connect);
  }
  
}

function updateTitle() {
  gameTitle.innerHTML = morpion ? "TIC-TAC-TOE" : "CONNECT 4";
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cpu(tab) {
  if (counter < 8 && morpion == true || counter < 42 && morpion == false) {
    let randomplayerX = random(0, tab.length - 1);
    let randomplayerY = random(0, tab[0].length - 1);
    while (tab[randomplayerX][randomplayerY] != "") {
      randomplayerX = random(0, tab.length - 1);
      randomplayerY = random(0, tab[0].length - 1);
    }
    if (morpion) {
      tab[randomplayerX][randomplayerY] = playerTwo;
    } else {
     let dispoRow = checkRow(randomplayerY);
     console.log(dispoRow);
      if (dispoRow !== -1) {

      connect[dispoRow][randomplayerY] = playerTwo;

      }
    }
    console.log(tab);
    counter++;
  }
}


play.addEventListener('click', startGame);
replay.addEventListener('click', () => reset(morpion ? tabGame : connect));
onevsone.addEventListener('click', () => {
  vsCpu = false;
  startGame();
});
onevscpu.addEventListener('click', () => {
  vsCpu = true;
  startGame();
});

toggle.addEventListener('change', () => {
  morpion = !toggle.checked;
  startGame();
  updateTitle();
});