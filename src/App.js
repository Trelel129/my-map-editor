import React, { useEffect } from 'react';
import p5 from 'p5';

const App = () => {
  const sketch = (p) => {
    // Paste your entire p5.js code here
    // ...
    // p5.js global variables
    // ...
    
    const GRID_SIZE = 12;
    // const GRID2_SIZE = 3;
    // const GRID3_SIZE = 12;
    const TILE_WIDTH = 100;
    const TILE_HEIGHT = 50;
    const MAX_HEIGHT = 100;

    let tile_images = [];

    let x = 0;
    let y = 0;
    let mouseX = 0;
    let mouseY = 0;
    
    let width = window.innerWidth;
    let height = window.innerHeight;

    let floor;
    let moveCursor;
    let first;
    let keyCode;
    let UP_ARROW = 38;
    let DOWN_ARROW = 40;
    let LEFT_ARROW = 37;
    let RIGHT_ARROW = 39;

    let saveJSON = window.saveJSON;
    let loadJSON = window.loadJSON;
    let loadImage = window.loadImage;

    let image = window.image;

    let createCanvas = window.createCanvas;

    let background = window.background;

    let windowHeight = window.windowHeight;
    let windowWidth = window.windowWidth;

    let x_start = 0;
    let y_start = 0;
    let x_start2 = 0;
    let y_start2 = 0;
    let url = window.location.href;
    let url2 = "map.json";

    let grid = [
      [14, 23, 23, 23, 23, 35 , 23, 23, 23, 13, 0, 0],
      [21, 33, 33, 33, 33, 33, 33, 33, 33, 20, 0, 0],
      [21, 33,  0,  0, 33, 33, 33,  1, 33, 20, 0, 0],
      [21, 33,  0,  0, 33,  1,  1, 10, 33, 20, 0, 0],
      [36, 33, 33, 33, 33, 33, 33, 33, 33, 20, 0, 0],
      [36, 33,  38,  37, 33, 18, 17, 10, 33, 20, 0, 0],
      [21, 33,  4,  7, 33, 16, 19, 10, 33, 20, 0, 0],
      [21, 33,  6,  8, 33, 10, 10, 10, 33, 20, 0, 0],
      [21, 33, 33, 33, 33, 33, 33, 33, 33, 20, 0, 0],
      [11, 22, 22, 22, 22, 22, 22, 22, 22, 12, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    console.log(grid);


    // let grid2 = [
    //   [0, 0, 11],
    //   [0, 10, 0],
    //   [1, 0, 0]
    // ];

    //grid 3 all 0s
    // let grid3 = [
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // ];

    //make initial position of cursor
    let cursor = {
      x: 0,
      y: 0
    };
    let tile = 0;
    
    //move cursor
    let opt = false;
  

    let cat = [0, 1, 10, 11, 15, 16, 20, 24, 37]; // category tiles

    for(x = 0; x < GRID_SIZE-1; x++) {//vertical roads
      for(y = 0; y < GRID_SIZE-1; y++) {
        if(grid[x][y] == grid[x+1][y] && grid [x][y] == 33) {
          grid[x][y] = 34;
        }
      }
    }
    for(x = 0; x < GRID_SIZE-1; x++) { // x juctions roads
      for(y = 0; y < GRID_SIZE-1; y++) {
        if((grid[x][y+1] == 34 || grid[x][y+1] == 33 || grid[x][y+1] == 32 || grid[x][y+1] == 31 || grid[x][y+1] == 25 || grid[x][y+1] == 27 || grid[x][y+1] == 28 || grid[x][y+1] == 24) && //up
        (grid[x+1][y] == 29|| grid[x+1][y]==32 || grid[x+1][y] ==33 || grid[x+1][y] == 34 || grid[x+1][y] == 25 || grid[x+1][y] == 26 || grid[x+1][y] == 28 || grid[x+1][y] == 24) && //left
        (grid[x+1][y+2] == 34 || grid[x+1][y+2] == 33 || grid[x+1][y+2] == 30 || grid[x+1][y+2] == 31 || grid[x+1][y+2] == 26 || grid[x+1][y+2] == 27 || grid[x+1][y+2] == 28 || grid[x+1][y+2] == 24) && //right
        (grid[x+2][y+1] == 34 || grid[x+2][y+1] == 33 || grid[x+2][y+1] == 30 || grid[x+2][y+1] == 29 || grid[x+2][y+1] == 25 || grid[x+2][y+1] == 26 || grid[x+2][y+1] == 27 || grid[x+2][y+1] == 24) //down
        &&
        ( grid[x+1][y+1] == 25 || grid[x+1][y+1] == 26 || grid[x+1][y+1] == 27 || grid[x+1][y+1] == 28 ||
          grid[x+1][y+1] == 29 || grid[x+1][y+1] == 30 || grid[x+1][y+1] == 31 || grid[x+1][y+1] == 32 || grid[x+1][y+1] == 33 || 
          grid[x+1][y+1] == 34 || grid[x+1][y+1] == 35 || grid[x+1][y+1] == 36))//middle
        {
          grid[x+1][y+1] = 24;  
        }
      }
    }
    for(x = 0; x < GRID_SIZE-1; x++) { // T juctions up roads
      for(y = 0; y < GRID_SIZE-1; y++) {
        if((grid[x+1][y] == 29|| grid[x+1][y]==32 || grid[x+1][y] ==33 || grid[x+1][y] == 34 || grid[x+1][y] == 25 || grid[x+1][y] == 26 || grid[x+1][y] == 28 || grid[x+1][y] == 24) && //left
        (grid[x][y+1] == 34 || grid[x][y+1] == 33 || grid[x][y+1] == 32 || grid[x][y+1] == 31 || grid[x][y+1] == 25 || grid[x][y+1] == 27 || grid[x][y+1] == 28 || grid[x][y+1] == 24) && //up
        (grid[x+1][y+2] == 34 || grid[x+1][y+2] == 33 || grid[x+1][y+2] == 30 || grid[x+1][y+2] == 31 || grid[x+1][y+2] == 26 || grid[x+1][y+2] == 27 || grid[x+1][y+2] == 28 || grid[x+1][y+2] == 24) //right
        &&
        ( grid[x+1][y+1] == 25 || grid[x+1][y+1] == 27 || grid[x+1][y+1] == 28 ||
          grid[x+1][y+1] == 29 || grid[x+1][y+1] == 30 || grid[x+1][y+1] == 31 || grid[x+1][y+1] == 32 || grid[x+1][y+1] == 33 || 
          grid[x+1][y+1] == 34 || grid[x+1][y+1] == 35 || grid[x+1][y+1] == 36))//middle
        {
          grid[x+1][y+1] = 26;  
        }
      }
    }
    for(x = 0; x < GRID_SIZE-1; x++) { // T juctions down roads
      for(y = 0; y < GRID_SIZE-1; y++) {
        if((grid[x+1][y] == 24 || grid[x+1][y] == 25 || grid[x+1][y] == 26 || grid[x+1][y] == 28 || grid[x+1][y] == 29 || grid[x+1][y] == 32 || grid[x+1][y] == 33 || grid[x+1][y] == 34) && //left
        (grid[x+1][y+2] == 24 || grid[x+1][y+2] == 26 || grid[x+1][y+2] == 27 || grid[x+1][y+2] == 28 || grid[x+1][y+2] == 30 || grid[x+1][y+2] == 31 || grid[x+1][y+2] == 33 || grid[x+1][y+2] == 34) && //right
        (grid[x+2][y+1] == 24 || grid[x+2][y+1] == 25 || grid[x+2][y+1] == 26 || grid[x+2][y+1] == 27 || grid[x+2][y+1] == 29 || grid[x+2][y+1] == 30 || grid[x+2][y+1] == 33 || grid[x+2][y+1] == 34) //down
        &&
        ( grid[x+1][y+1] == 25 || grid[x+1][y+1] == 26 || grid[x+1][y+1] == 27 ||
          grid[x+1][y+1] == 29 || grid[x+1][y+1] == 30 || grid[x+1][y+1] == 31 || grid[x+1][y+1] == 32 || grid[x+1][y+1] == 33 || 
          grid[x+1][y+1] == 34 || grid[x+1][y+1] == 35 || grid[x+1][y+1] == 36))//middle
        {
          grid[x+1][y+1] = 28;
        }
      }
    }
    for(x = 0; x < GRID_SIZE-1; x++) { // T juctions left roads
      for(y = 0; y < GRID_SIZE-1; y++) {
        if((grid[x+1][y] == 29|| grid[x+1][y]==32 || grid[x+1][y] ==33 || grid[x+1][y] == 34 || grid[x+1][y] == 25 || grid[x+1][y] == 26 || grid[x+1][y] == 28 || grid[x+1][y] == 24) && //left
        (grid[x][y+1] == 34 || grid[x][y+1] == 33 || grid[x][y+1] == 32 || grid[x][y+1] == 31 || grid[x][y+1] == 25 || grid[x][y+1] == 27 || grid[x][y+1] == 28 || grid[x][y+1] == 24) && //up
        (grid[x+2][y+1] == 34 || grid[x+2][y+1] == 33 || grid[x+2][y+1] == 30 || grid[x+2][y+1] == 29 || grid[x+2][y+1] == 25 || grid[x+2][y+1] == 26 || grid[x+2][y+1] == 27 || grid[x+2][y+1] == 24) //down
        &&
        ( grid[x+1][y+1] == 25 || grid[x+1][y+1] == 26 || grid[x+1][y+1] == 28 ||
          grid[x+1][y+1] == 29 || grid[x+1][y+1] == 30 || grid[x+1][y+1] == 31 || grid[x+1][y+1] == 32 || grid[x+1][y+1] == 33 || 
          grid[x+1][y+1] == 34 || grid[x+1][y+1] == 35 || grid[x+1][y+1] == 36))//middle
        {
          grid[x+1][y+1] = 27;  
        }
      }
    }
    for(x = 0; x < GRID_SIZE-1; x++) { // T juctions right roads
      for(y = 0; y < GRID_SIZE-1; y++) {
        if((grid[x][y+1] == 34 || grid[x][y+1] == 33 || grid[x][y+1] == 32 || grid[x][y+1] == 31 || grid[x][y+1] == 25 || grid[x][y+1] == 27 || grid[x][y+1] == 28 || grid[x][y+1] == 24) && //up
        (grid[x+1][y+2] == 34 || grid[x+1][y+2] == 33 || grid[x+1][y+2] == 30 || grid[x+1][y+2] == 31 || grid[x+1][y+2] == 26 || grid[x+1][y+2] == 27 || grid[x+1][y+2] == 28 || grid[x+1][y+2] == 24) && //right
        (grid[x+2][y+1] == 34 || grid[x+2][y+1] == 33 || grid[x+2][y+1] == 30 || grid[x+2][y+1] == 29 || grid[x+2][y+1] == 25 || grid[x+2][y+1] == 26 || grid[x+2][y+1] == 27 || grid[x+2][y+1] == 24) //down
        &&
        ( grid[x+1][y+1] == 26 || grid[x+1][y+1] == 27 || grid[x+1][y+1] == 28 ||
          grid[x+1][y+1] == 29 || grid[x+1][y+1] == 30 || grid[x+1][y+1] == 31 || grid[x+1][y+1] == 32 || grid[x+1][y+1] == 33 || 
          grid[x+1][y+1] == 34 || grid[x+1][y+1] == 35 || grid[x+1][y+1] == 36))//middle
        {
          grid[x+1][y+1] = 25;  
        }
      }
    }
    for(x = 0; x < GRID_SIZE-1; x++) { // ↱ roads
      for(y = 0; y < GRID_SIZE-1; y++) {
        if((grid[x+1][y] == 34 || grid[x+1][y] == 33 || grid[x+1][y] == 30 || grid[x+1][y] == 29 || grid[x+1][y] == 25 || grid[x+1][y] == 26 || grid[x+1][y] == 27 || grid[x+1][y] == 24)&& // down
        (grid[x][y+1] == 34 || grid[x][y+1] == 33 || grid[x][y+1] == 30 || grid[x][y+1] == 31 || grid[x][y+1] == 26 || grid[x][y+1] == 27 || grid[x][y+1] == 28 || grid[x][y+1] == 24) && //right
        (grid[x][y] == 34 || grid[x][y] == 33)) {
          grid[x][y] = 32;
        }
      }
    }
    for(x = 0; x < GRID_SIZE-1; x++) { // ↰ roads
      for(y = 0; y < GRID_SIZE-1; y++) {
        if((grid[x][y] == 29 || grid[x][y] == 32 || grid[x][y] == 33 || grid[x][y] == 34 || grid[x][y] == 25 || grid[x][y] == 26 || grid[x][y] == 28 || grid[x][y] == 24)&& //left
          (grid[x+1][y+1] == 34 || grid[x+1][y+1] == 33 || grid[x+1][y+1] == 30 || grid[x+1][y+1] == 29 || grid[x+1][y+1] == 25 || grid[x+1][y+1] == 26 || grid[x+1][y+1] == 27 || grid[x+1][y+1] == 24)&&  //down
          (grid[x][y+1] == 33 || grid[x][y+1] == 34)) {
          grid[x][y+1] = 31;
        }
      }
    }
    for(x = 0; x < GRID_SIZE-1; x++) { // ↲ roads
      for(y = 0; y < GRID_SIZE-1; y++) {
        if((grid[x][y] == 29 || grid[x][y] == 32 || grid[x][y] == 33 || grid[x][y] == 34 || grid[x][y] == 25 || grid[x][y] == 26 || grid[x][y] == 28 || grid[x][y] == 24)&& //left
          (grid[x-1][y+1] == 34 || grid[x-1][y+1] == 33 || grid[x-1][y+1] == 32 || grid[x-1][y+1] == 31 || grid[x-1][y+1] == 25 || grid[x-1][y+1] == 27 || grid[x-1][y+1] == 28 || grid[x-1][y+1] == 24)&& //up
          (grid[x][y+1] == 33 || grid[x][y+1] == 34)) {
          grid[x][y+1] = 30;
        }
      }
    }
    for(x = 0; x < GRID_SIZE-1; x++) { // ↳ roads
      for(y = 0; y < GRID_SIZE-1; y++) {
        if((grid[x][y+1] == 33 || grid[x][y+1] == 34 || grid[x][y+1] == 30 || grid[x][y+1] == 31 || grid[x][y+1] == 26 || grid[x][y+1] == 27 || grid[x][y+1] == 28 || grid[x][y+1] == 24)&& 
          (grid[x-1][y] == 34  || grid[x-1][y] == 33  || grid[x-1][y] == 32  || grid[x-1][y] == 31  || grid[x-1][y] == 25  || grid[x-1][y] == 27  || grid[x-1][y] == 28  || grid[x-1][y] == 24)&& 
          (grid[x][y] == 33 || grid[x][y] == 34)){
          grid[x][y] = 29;
        }
      }
    }


    // grid[1][0] = 33;



    

    //change grid if there's cursor
    function pointGrid() {
      grid[10][10] = grid[cursor.x][cursor.y];
      
      grid[cursor.x][cursor.y] = 0;
      // categorizer();
    }
    
    //restore grid
    function restoreGrid() {
      grid[cursor.x][cursor.y] = grid[10][10];
      grid[10][10] = 0;
    }

    //change grid after selecting tile
    function changeTile(tile) {
      grid[11][11] = tile;
    }

    // function categorizer(){
    //   curx = cursor.x;
    //   cury = cursor.y;
    //   grid2[1][1] = grid3[curx][cury];
    //   grid2[0][3] = grid[0][3];
    //   grid2[3][0] = grid[3][0];
    // }

    function mousePressed() {
      if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        let x = floor((mouseY - y_start) / TILE_HEIGHT - (mouseX - x_start) / TILE_WIDTH);
        let y = floor((mouseX - x_start) / TILE_WIDTH + (mouseY - y_start) / TILE_HEIGHT) -1;
        if (x >= 0 && x < GRID_SIZE-2 && y >= 0 && y < GRID_SIZE-2) {
          moveCursor(x - cursor.x, y - cursor.y);
        }
      }
    }
    function switchOpt() {
      if (opt == false) {
        opt = true;
      } else {
        opt = false;
      }
    }

    //keyboard input
    first = true;
    p.keyReleased = () => {
      console.log('Key Released:', p.key);
      if (p.key === UP_ARROW && opt == false && first == true) {
        moveCursor(-1, 0);
        first = false;
      } else if (p.key === DOWN_ARROW && opt == false && first == true) {
        moveCursor(1, 0);
        first = false;
      } else if (p.key === LEFT_ARROW && opt == false && first == true) {
        moveCursor(0, -1);
        first = false;
      } else if (p.key === RIGHT_ARROW && opt == false && first == true) {
        moveCursor(0, 1);
        first = false;
      } else if (p.key === UP_ARROW && opt == false && first == false) {
        restoreGrid();
        moveCursor(-1, 0);
      } else if (p.key === DOWN_ARROW && opt == false && first == false) {
        restoreGrid();
        moveCursor(1, 0);
      } else if (p.key === LEFT_ARROW && opt == false && first == false) {
        restoreGrid();
        moveCursor(0, -1);
      } else if (p.key === RIGHT_ARROW && opt == false && first == false) {
        restoreGrid();
        moveCursor(0, 1);
      } //space
      else if (p.key === 32 && opt == false) {
        first = true;
        switchOpt();
        grid[11][11] = grid[10][10];
      }
      else if (p.key === UP_ARROW && opt == true) {
        if (tile < 38) {
          tile++;
        } else {
          tile = 0;
        }
        changeTile(tile);
      } else if (p.key === DOWN_ARROW && opt == true) {
        if (tile > 0) {
          tile--;
        } else {
          tile = 38;
        }
        changeTile(tile);
      } else if (p.key === LEFT_ARROW && opt == true) {
        if (tile > 0) {
          tile--;
        } else {
          tile = 38;
        }
        changeTile(tile);
      } else if (p.key === RIGHT_ARROW && opt == true) {
        if (tile < 38) {
          tile++;
        } else {
          tile = 0;
        }
        changeTile(tile);
      } else if (p.key === 32 && opt == true) {
        switchOpt();
        grid[cursor.x][cursor.y] = grid[11][11];
      } 
      //download map to file using z key
      else if (p.key === 90) {
        saveJSON(grid, 'map.json', true);
      }
    }

    // keyReleased();
    

    p.setup = () => {
      // p5.js setup function
      // ...
      p.createCanvas(window.innerWidth, window.innerHeight);
      
      p.frameRate(60);
      p.textSize(20);
      p.textAlign(p.CENTER, p.CENTER);
      // for dark mode
      // p.background("black");
      // p.fill(255);
      p.text("Use arrow keys to move cursor", 200, 100);
      p.text("Press space to select tile", 200, 150);
      p.text("Use arrow keys to select tile", 200, 200);
      p.text("Press space to place tile", 200, 250);
      p.text("Press z to download map", 200, 300);

      

      for (let i = 0; i <= 38; i++) {
        tile_images.push(p.loadImage("./tiles/tile-" + i + ".png"));
      }

      // for (let i = 0; i <= 38; i++) {
      //   tile_images.push(p.loadImage("./tiles/tile-" + i + ".png"));
      // }

      
      function moveCursor(x, y) {
        if (cursor.x + x >= 0 && cursor.x + x < GRID_SIZE && cursor.y + y >= 0 && cursor.y + y < GRID_SIZE && opt == false) {
          
          cursor.x += x;
          cursor.y += y;
          pointGrid();
        }
      }
      // moveCursor(x, y);
    };

    p.draw = () => {
      // p5.js draw function
      // ...
      function draw_grid() {
        x_start = width/2 - TILE_WIDTH/2;
        y_start = 50;
        for (let i = 0; i < GRID_SIZE; i++) {
          for (let j = 0; j < GRID_SIZE; j++) {
            draw_tile((tile_images[grid[j][i]]), i, j);
          }
        }
      }
      
      // function draw_grid2() {
      //   x_start2 = width/2 - TILE_WIDTH/2;
      //   y_start2 = 650;
      //   for (let i = 0; i < GRID2_SIZE; i++) {
      //     for (let j = 0; j < GRID2_SIZE; j++) {
      //       draw_tile2((tile_images[grid2[j][i]]), i, j);
      //     }
      //   }
      // }
      
      //undraw grid2
      // function undraw_grid2() {
      //   x_start2 = width/2 - TILE_WIDTH/2;
      //   y_start2 = 650;
      //   for (let i = 0; i < GRID2_SIZE; i++) {
      //     for (let j = 0; j < GRID2_SIZE; j++) {
      //       draw_tile2((tile_images[0]), i, j);
      //     }
      //   }
      // }
      
      function draw_tile(img, x, y) {
        let x_screen = x_start + (x - y) * TILE_WIDTH/2;
        let y_screen = y_start + (x + y) * TILE_HEIGHT/2;
        let z_offset = MAX_HEIGHT - img.height;
        image(img, x_screen, y_screen + z_offset);
      }
      
      function draw_tile2(img, x, y) {
        let x_screen = x_start2 + (x - y) * TILE_WIDTH/2;
        let y_screen = y_start2 + (x + y) * TILE_HEIGHT/2;
        let z_offset = MAX_HEIGHT - img.height;
        image(img, x_screen, y_screen + z_offset);
      }
      
      function setup() {
        createCanvas(windowWidth, windowHeight);
        for (let i = 0; i <= 38; i++) {
          tile_images.push(loadImage("./tiles/tile-" + i + ".png"));
        }
      }
      
      function draw() {
        // background("black");
        draw_grid();
        // draw_grid2(); 
      }

      function image(img, x, y) {
        p.image(img, x, y);
      }

      draw();
    };
  };

  useEffect(() => {
    const canvas = new p5(sketch);
    return () => {
      canvas.remove();
    };
  }, []);

  return <div />;
};

export default App;