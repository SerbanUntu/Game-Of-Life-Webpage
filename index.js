const gridDOM = document.getElementById('grid');
const clearButton = document.getElementById('clear-button');
const playButton = document.getElementById('play-button');
const stopButton = document.getElementById('stop-button');
const speedSlider = document.getElementById('speed-slider');
const birthRule = document.getElementById('birth-rule');
const surviveRule = document.getElementById('survive-rule');
const patternNumber = document.getElementById('pattern-number');
const patternButton = document.getElementById('pattern-button');

const NUMBER_ROWS = 75;
const NUMBER_COLS = 75;

const NUMBER_ROWS_HIDDEN = 100;
const NUMBER_COLS_HIDDEN = 100;

const DOWN_SHIFT = parseInt((NUMBER_ROWS_HIDDEN - NUMBER_ROWS) / 2);
const RIGHT_SHIFT = parseInt((NUMBER_COLS_HIDDEN - NUMBER_COLS) / 2);

let grid = Array(NUMBER_ROWS).fill().map(() => Array(NUMBER_COLS).fill());
let hidden_grid = Array(NUMBER_ROWS_HIDDEN).fill().map(() => Array(NUMBER_COLS_HIDDEN).fill(0));
let isMousePressed = false;
let stopSimulation = true;

gridInitialize();

document.body.addEventListener('mouseup', (e) => {
  e.preventDefault;
  isMousePressed = false;
});
clearButton.addEventListener('click', (e) => {
  e.preventDefault();
  for (i = 0; i < NUMBER_ROWS_HIDDEN; i++) {
    for (j = 0; j < NUMBER_COLS_HIDDEN; j++) {
      if(i >= DOWN_SHIFT && j >= RIGHT_SHIFT && i - DOWN_SHIFT < NUMBER_ROWS && j - RIGHT_SHIFT < NUMBER_COLS) {
        grid[i - DOWN_SHIFT][j - RIGHT_SHIFT].classList.remove('on');
      }
      hidden_grid[i][j] = 0;
    }
  }
});
playButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (stopSimulation === false) {
    playButton.classList.remove('gg-play-stop');
    playButton.classList.add('gg-play-button');
    stopSimulation = true;
    gridDOM.style.pointerEvents = 'all';
  } else {
    playButton.classList.add('gg-play-stop');
    playButton.classList.remove('gg-play-button');
    stopSimulation = false;
    gridDOM.style.pointerEvents = 'none';
    lifeSimulate();
  }
});
patternButton.addEventListener('click', (e) => {
  e.preventDefault();
  if(stopSimulation === false) {
    playButton.classList.remove('gg-play-stop');
    playButton.classList.add('gg-play-button');
    stopSimulation = true;
    gridDOM.style.pointerEvents = 'all';
  }
  let patternValue = parseInt(patternNumber.value);
  let pattern;
  switch(patternValue) {
  // Still Lifes
    // Block
    case 1: {
      pattern = [
        [1,1],
        [1,1],
      ];
      break;
    }
    // Tub
    case 2: {
      pattern = [
        [0,1,0],
        [1,0,1],
        [0,1,0],
      ];
      break;
    }
    // Bee-hive
    case 3: {
      pattern = [
        [0,1,1,0],
        [1,0,0,1],
        [0,1,1,0],
      ];
      break;
    }
    // Loaf
    case 4: {
      pattern = [
        [0,1,1,0],
        [1,0,0,1],
        [0,1,0,1],
        [0,0,1,0],
      ];
      break;
    }
  // Oscillators
    // Blinker
    case 5: {
      pattern = [
        [1,1,1],
      ];
      break;
    }
    // Toad
    case 6: {
      pattern = [
        [0,1,1,1],
        [1,1,1,0],
      ];
      break;
    }
    // Beacon
    case 7: {
      pattern = [
        [1,1,0,0],
        [1,1,0,0],
        [0,0,1,1],
        [0,0,1,1],
      ];
      break;
    }
    // Pulsar
    case 8: {
      pattern = [
        [0,0,1,1,1,0,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [0,0,1,1,1,0,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,1,1,1,0,0],
        [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,1,1,1,0,0],
      ];
      break;
    }
    // Octagon 2
    case 9: {
      pattern = [
        [0,0,0,1,1,0,0,0],
        [0,0,1,0,0,1,0,0],
        [0,1,0,0,0,0,1,0],
        [1,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,1],
        [0,1,0,0,0,0,1,0],
        [0,0,1,0,0,1,0,0],
        [0,0,0,1,1,0,0,0],
      ];
      break;
    }
    // Penta-decathlon
    case 10: {
      pattern = [
        [0,0,1,0,0,0,0,1,0,0],
        [1,1,0,1,1,1,1,0,1,1],
        [0,0,1,0,0,0,0,1,0,0],
      ];
      break;
    }
    // Kok's Galaxy
    case 11: {
      pattern = [
        [1,1,1,1,1,1,0,1,1],
        [1,1,1,1,1,1,0,1,1],
        [0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0],
        [1,1,0,1,1,1,1,1,1],
        [1,1,0,1,1,1,1,1,1],
      ];
      break;
    }
  // Spaceships
    // Glider
    case 12: {
      pattern = [
        [0,1,0],
        [0,0,1],
        [1,1,1],
      ];
      break;
    }
    // Lightweight Spaceship
    case 13: {
      pattern = [
        [0,1,1,1,1],
        [1,0,0,0,1],
        [0,0,0,0,1],
        [1,0,0,1,0],
      ];
      break;
    }
  // Complex
    // Gosper's Glider Gun
    case 14: {
      pattern = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      ];
      break;
    }
    // Pufferfish
    case 15: {
      pattern = [
        [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
        [0,0,1,1,1,0,0,0,0,0,1,1,1,0,0],
        [0,1,1,0,0,1,0,0,0,1,0,0,1,1,0],
        [0,0,0,1,1,1,0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
        [0,0,1,0,0,1,0,0,0,1,0,0,1,0,0],
        [1,0,0,0,0,0,1,0,1,0,0,0,0,0,1],
        [1,1,0,0,0,0,1,0,1,0,0,0,0,1,1],
        [0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
        [0,0,0,1,0,1,0,0,0,1,0,1,0,0,0],
        [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
      ];
      break;

    }
    // Backrake 1
    case 16: {
      pattern = [
        [0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0],
        [0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0],
        [0,0,1,0,1,0,1,1,0,1,1,0,0,0,0,0,1,1,0,1,1,0,1,0,1,0,0],
        [0,1,1,0,1,0,0,0,0,1,0,1,1,0,1,1,0,1,0,0,0,0,1,0,1,1,0],
        [1,0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,1,1,0,1,0,1,0,1,1,0,0,0,0,0,0,0,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
      ];
      break;
    }
  // Unstable
    // Diehard
    case 17: {
      pattern = [
        [0,0,0,0,0,0,1,0],
        [1,1,0,0,0,0,0,0],
        [0,1,0,0,0,1,1,1],
      ];
      break;
    }
    // R-Pentomino
    case 18: {
      pattern = [
        [0,1,1],
        [1,1,0],
        [0,1,0],
      ];
      break;
    }
    // Acorn
    case 19: {
      pattern = [
        [0,1,0,0,0,0,0],
        [0,0,0,1,0,0,0],
        [1,1,0,0,1,1,1],
      ];
      break;
    }

    default: {
      pattern = [
        [0],
      ];
      break;
    }
  }
  let x_shift = parseInt((NUMBER_ROWS - pattern.length) / 2);
  let y_shift = parseInt((NUMBER_COLS - pattern[0].length) / 2);
  if(patternValue === 14) {
    x_shift -= 10;
  }
  if(patternValue === 15 || patternValue === 16) {
    x_shift += 20;
  }
  for (i = 0; i < NUMBER_ROWS_HIDDEN; i++) {
    for (j = 0; j < NUMBER_COLS_HIDDEN; j++) {
      if (i >= DOWN_SHIFT && j >= RIGHT_SHIFT && i - DOWN_SHIFT < NUMBER_ROWS && j - RIGHT_SHIFT < NUMBER_COLS) {
        grid[i - DOWN_SHIFT][j - RIGHT_SHIFT].classList.remove('on');
      }
      hidden_grid[i][j] = 0;
    }
  }
  for(i = 0; i < pattern.length; i++) {
    for(j = 0; j < pattern[0].length; j++) {
      if(pattern[i][j] === 1) {
        grid[i + x_shift][j + y_shift].classList.add('on');
        hidden_grid[i + x_shift + DOWN_SHIFT][j + y_shift + RIGHT_SHIFT] = 1;
      }
    }
  }
});

function lifeSimulate() {
  if (stopSimulation === true) return;
  let neighbours = Array(NUMBER_ROWS_HIDDEN).fill().map(() => Array(NUMBER_COLS_HIDDEN).fill(0));
  for (i = 0; i < NUMBER_ROWS_HIDDEN; i++) {
    for (j = 0; j < NUMBER_COLS_HIDDEN; j++) {
      [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]].forEach((coords) => {
        let [x, y] = coords;
        if (i + x >= 0 && i + x < NUMBER_ROWS_HIDDEN && j + y >= 0 && j + y < NUMBER_COLS_HIDDEN && hidden_grid[i + x][j + y] === 1) neighbours[i][j]++;
      });
    }
  }
  console.log(neighbours);
  let newNeighbours = neighbours;
  for (i = 0; i < NUMBER_ROWS_HIDDEN; i++) {
    for (j = 0; j < NUMBER_COLS_HIDDEN; j++) {
      if (i >= DOWN_SHIFT && j >= RIGHT_SHIFT && i - DOWN_SHIFT < NUMBER_ROWS && j - RIGHT_SHIFT < NUMBER_COLS) {
        if(!grid[i - DOWN_SHIFT][j - RIGHT_SHIFT].classList.contains('on')) {
          let isBorn = false;
          // BIRTH
          birthRule.value.split(',').forEach((rule) => {
            if (parseInt(rule) === neighbours[i][j]) {
              isBorn = true;
            }
          });
          if(isBorn === true) {
            grid[i - DOWN_SHIFT][j - RIGHT_SHIFT].classList.add('on');
            hidden_grid[i][j] = 1;
            alterNeighbours(1, newNeighbours);
          }
        } else {
          let survives = false;
          // SURVIVAL
          surviveRule.value.split(',').forEach((rule) => {
            if(parseInt(rule) === neighbours[i][j]) {
              survives = true;
            }
          });
          if (survives === false) {
            grid[i - DOWN_SHIFT][j - RIGHT_SHIFT].classList.remove('on');
            hidden_grid[i][j] = 0;
            alterNeighbours(-1, newNeighbours);
          }
        }
      }
      else if (hidden_grid[i][j] === 0) {
        let isBorn = false;
        // BIRTH
        birthRule.value.split(',').forEach((rule) => {
          if (parseInt(rule) === neighbours[i][j]) {
            isBorn = true;
          }
        });
        if (isBorn === true) {
          hidden_grid[i][j] = 1;
          alterNeighbours(1, newNeighbours);
        }
      } else {
        let survives = false;
        // SURVIVAL
        surviveRule.value.split(',').forEach((rule) => {
          if (parseInt(rule) === neighbours[i][j]) {
            survives = true;
          }
        });
        if (survives === false) {
          hidden_grid[i][j] = 0;
          alterNeighbours(-1, newNeighbours);
        }
      }
    }
  }
  neighbours = newNeighbours;
  setTimeout(lifeSimulate, 1000 / speedSlider.value);
}

function alterNeighbours(amount, neighbours, i, j) {
  [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]].forEach((coords) => {
    let [x, y] = coords;
    if (i + x >= 0 && i + x < NUMBER_ROWS && j + y >= 0 && j + y < NUMBER_COLS) neighbours[i + x][j + y] += amount;
  });
}

function gridInitialize() {
  for (i = 0; i < NUMBER_ROWS_HIDDEN; i++) {
    for (j = 0; j < NUMBER_COLS_HIDDEN; j++) {
      if (i >= DOWN_SHIFT && j >= RIGHT_SHIFT && i - DOWN_SHIFT < NUMBER_ROWS && j - RIGHT_SHIFT < NUMBER_COLS) {
        grid[i - DOWN_SHIFT][j - RIGHT_SHIFT] = document.createElement('div');
        grid[i - DOWN_SHIFT][j - RIGHT_SHIFT].classList.add('cell');
        grid[i - DOWN_SHIFT][j - RIGHT_SHIFT].dataset.row = i - DOWN_SHIFT;
        grid[i - DOWN_SHIFT][j - RIGHT_SHIFT].dataset.column = j - RIGHT_SHIFT;
        gridDOM.appendChild(grid[i - DOWN_SHIFT][j - RIGHT_SHIFT]);
        let cell = grid[i - DOWN_SHIFT][j - RIGHT_SHIFT];
        ['mousedown', 'mouseover'].forEach((event) => {
          cell.addEventListener(event, (e) => {
            e.preventDefault;
            i = parseInt(cell.dataset.row);
            j = parseInt(cell.dataset.column);
            if (event === 'mousedown') {
              isMousePressed = true;
            }
            if (isMousePressed) {
              if (grid[i][j].classList.contains('on')) {
                grid[i][j].classList.remove('on');
                hidden_grid[i + DOWN_SHIFT][j + RIGHT_SHIFT] = 0;
              } else {
                grid[i][j].classList.add('on');
                hidden_grid[i + DOWN_SHIFT][j + RIGHT_SHIFT] = 1;
              }
            }
          });
        });
      }
    }
  }
}