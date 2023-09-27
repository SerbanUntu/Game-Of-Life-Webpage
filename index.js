const gridDOM = document.getElementById('grid');
const clearButton = document.getElementById('clear-button');
const playButton = document.getElementById('play-button');
const stopButton = document.getElementById('stop-button');
const speedSlider = document.getElementById('speed-slider');
const birthRule = document.getElementById('birth-rule');
const surviveRule = document.getElementById('survive-rule');
const patternNumber = document.getElementById('pattern-number');
const patternButton = document.getElementById('pattern-button');

const NUMBER_ROWS = 85;
const NUMBER_COLS = 85;

let grid = Array(NUMBER_ROWS).fill().map(() => Array(NUMBER_COLS).fill());
let isMousePressed = false;
let stopSimulation = true;

gridInitialize();

document.body.addEventListener('mouseup', (e) => {
  e.preventDefault;
  isMousePressed = false;
});
clearButton.addEventListener('click', (e) => {
  e.preventDefault();
  for (i = 0; i < NUMBER_ROWS; i++) {
    for (j = 0; j < NUMBER_COLS; j++) {
      grid[i][j].classList.remove('on');
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
  console.log(pattern);
  let x_shift = parseInt((NUMBER_ROWS - pattern.length) / 2);
  let y_shift = parseInt((NUMBER_COLS - pattern[0].length) / 2);
  if(patternValue === 14) {
    x_shift -= 10;
  }
  if(patternValue === 15 || patternValue === 16) {
    x_shift += 20;
  }
  for(i = 0; i < NUMBER_ROWS; i++) {
    for(j = 0; j < NUMBER_COLS; j++) {
      if(grid[i][j].classList.contains('on')) {
        grid[i][j].classList.remove('on');
      }
    }
  }
  for(i = 0; i < pattern.length; i++) {
    for(j = 0; j < pattern[0].length; j++) {
      if(pattern[i][j] === 1 && !grid[i + x_shift][j + y_shift].classList.contains('on')) {
        grid[i + x_shift][j + y_shift].classList.add('on');
      } else if(pattern[i][j] === 0 && grid[i + x_shift][j + y_shift].classList.contains('on')) {
        grid[i + x_shift][j + y_shift].classList.remove('on');
      }
    }
  }
});

function lifeSimulate() {
  if (stopSimulation === true) return;
  let neighbours = Array(NUMBER_ROWS).fill().map(() => Array(NUMBER_COLS).fill(0));
  for (i = 0; i < NUMBER_ROWS; i++) {
    for (j = 0; j < NUMBER_COLS; j++) {
      [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]].forEach((coords) => {
        let [x, y] = coords;
        if (i + x >= 0 && i + x < NUMBER_ROWS && j + y >= 0 && j + y < NUMBER_COLS && grid[i + x][j + y].classList.contains('on')) neighbours[i][j]++;
      });
    }
  }
  let newNeighbours = neighbours;
  for (i = 0; i < NUMBER_ROWS; i++) {
    for (j = 0; j < NUMBER_COLS; j++) {

      if(!grid[i][j].classList.contains('on')) {
        let isBorn = false;
        // BIRTH
        birthRule.value.split(',').forEach((rule) => {
          if(parseInt(rule) === neighbours[i][j]) {
            isBorn = true;
          }
        });
        if(isBorn === true) {
          grid[i][j].classList.add('on');
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
          grid[i][j].classList.remove('on');
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
  for (i = 0; i < NUMBER_ROWS; i++) {
    for (j = 0; j < NUMBER_COLS; j++) {
      grid[i][j] = document.createElement('div');
      grid[i][j].classList.add('cell');
      grid[i][j].dataset.row = i;
      grid[i][j].dataset.column = j;
      gridDOM.appendChild(grid[i][j]);
      let cell = grid[i][j];
      ['mousedown', 'mouseover'].forEach((event) => {
        cell.addEventListener(event, (e) => {
          e.preventDefault;
          i = cell.dataset.row;
          j = cell.dataset.column;
          if (event === 'mousedown') {
            isMousePressed = true;
          }
          if (isMousePressed) {
            if (grid[i][j].classList.contains('on')) {
              grid[i][j].classList.remove('on');
            } else {
              grid[i][j].classList.add('on');
            }
          }
        });
      });
    }
  }
}