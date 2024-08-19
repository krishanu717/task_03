var N_SIZE = 3,
  EMPTY = "&nbsp;",
  boxes = [],
  turn = "X",
  score,
  moves;

/**
 * Initializes the Tic Tac Toe board and starts the game.
 */
function init() {
  var board = document.createElement("table");
  board.setAttribute("border", 1);
  board.setAttribute("cellspacing", 0);

  var identifier = 1;
  for (var i = 0; i < N_SIZE; i++) {
    var row = document.createElement("tr");
    board.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
      var cell = document.createElement("td");
      cell.setAttribute("height", 120);
      cell.setAttribute("width", 120);
      cell.setAttribute("align", "center");
      cell.setAttribute("valign", "center");
      cell.classList.add("col" + j, "row" + i);
      if (i == j) {
        cell.classList.add("diagonal0");
      }
      if (j == N_SIZE - i - 1) {
        cell.classList.add("diagonal1");
      }
      cell.identifier = identifier;
      cell.addEventListener("click", set);
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
    }
  }

  document.getElementById("tictactoe").appendChild(board);
  startNewGame();
}

/**
 * Starts a new game
 */
function startNewGame() {
  score = {
    X: 0,
    O: 0,
  };
  moves = 0;
  turn = "X";
  boxes.forEach(function (square) {
    square.innerHTML = EMPTY;
  });
  document.getElementById("status").textContent = "Player X's turn";
  updateScoreboard();
}

/**
 * Updates the scoreboard
 */
function updateScoreboard() {
  document.getElementById("scoreX").textContent = score.X;
  document.getElementById("scoreO").textContent = score.O;
}

/**
 * Check if a win or not
 */
function win(clicked) {
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = "." + memberOf[i];
    var items = contains("#tictactoe " + testClass, turn);
    if (items.length == N_SIZE) {
      return true;
    }
  }
  return false;
}

/**
 * Helper function to check if NodeList from selector has a particular text
 */
function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

/**
 * Sets clicked square and also updates the turn.
 */
function set() {
  if (this.innerHTML !== EMPTY) {
    return;
  }
  this.innerHTML = turn;
  moves += 1;
  if (win(this)) {
    document.getElementById("status").textContent = "Winner: Player " + turn;
    score[turn] += 1;
    updateScoreboard();
    setTimeout(startNewGame, 2000);
  } else if (moves === N_SIZE * N_SIZE) {
    document.getElementById("status").textContent = "Draw";
    setTimeout(startNewGame, 2000);
  } else {
    turn = turn === "X" ? "O" : "X";
    document.getElementById("status").textContent =
      "Player " + turn + "'s turn";
  }
}

/**
 * Resets the game
 */
function resetGame() {
  score = {
    X: 0,
    O: 0,
  };
  updateScoreboard();
  startNewGame();
}

// Event listeners
document.getElementById("reset").addEventListener("click", resetGame);

init();
