const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext("2d");





// Create level
const level1 = new Image();
level1.src = '../assets/level1WITHBACKGROUND.png';
level1.onload = drawLevel;



function drawLevel() {
    // Set canvas size to match the image dimensions
    canvas.width = level1.width;
    canvas.height = level1.height;
  
    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw the level image onto the canvas
    ctx.drawImage(level1, 0, 0); // Draw at position (0, 0)
  }



/*
// Create tilesheet
const tilesheet = new Image();
tilesheet.src = "../assets/tilesheet.png";
tilesheet.onload = draw;

let tileSize = 16;
let tileOutputSize = 1; // can set to 1 for 32px or higher
let updatedTileSize = tileSize * tileOutputSize;


let tilesheetHeight = 800;
let tilesheetWidth = 600;
let tilesheetCol = tilesheetWidth / tileSize;
let tilesheetRow = tilesheetHeight / tileSize;
let levelCols = 25;
let levelRows = 14;
let levelHeight = tilesheetRow * tileSize;
let levelWidth = tilesheetCol * tileSize;

let level1 = [
  3, 3, 3, 3, 3, 3, 3, 2, 239, 240, 241, 239, 240, 241, 239, 240, 241, 706, 748,
  748, 748, 748, 38, 40, 40, 40, 40, 40, 40, 40, 39, 706, 748, 748, 748, 796,
  899, 750, 899, 795, 534, 743, 743, 743, 743, 743, 743, 743, 743, 743, 7, 7, 7,
  7, 7, 7, 7, 41, 276, 277, 278, 276, 277, 278, 276, 277, 278, 706, 748, 748,
  748, 748, 188, 618, 188, 188, 188, 188, 188, 618, 188, 678, 748, 748, 748,
  796, 899, 750, 899, 795, 743, 743, 743, 743, 743, 743, 743, 743, 743, 743, 7,
  45, 7, 7, 7, 7, 44, 41, 239, 240, 241, 239, 240, 241, 239, 240, 241, 706, 748,
  748, 748, 748, 261, 262, 262, 291, 292, 293, 262, 262, 263, 706, 748, 748,
  748, 796, 899, 750, 899, 795, 743, 743, 390, 926, 927, 927, 927, 927, 927,
  927, 40, 40, 40, 40, 40, 40, 40, 39, 276, 277, 278, 276, 277, 278, 276, 277,
  278, 706, 748, 748, 748, 748, 434, 434, 434, 434, 434, 434, 434, 434, 434,
  706, 748, 748, 748, 796, 899, 750, 899, 795, 743, 743, 427, 963, 889, 889,
  110, 111, 889, 889, 188, 188, 618, 188, 188, 618, 188, 188, 239, 240, 241,
  239, 240, 241, 239, 240, 241, 706, 748, 748, 748, 748, 299, 610, 611, 299,
  988, 299, 276, 278, 299, 677, 748, 748, 748, 827, 827, 827, 827, 827, 743,
  743, 427, 963, 889, 889, 889, 889, 889, 889, 188, 188, 188, 188, 188, 188,
  188, 188, 276, 277, 278, 276, 277, 278, 276, 277, 278, 706, 748, 748, 748,
  748, 144, 706, 706, 706, 706, 706, 706, 706, 706, 706, 748, 748, 748, 827,
  827, 827, 827, 827, 743, 743, 427, 963, 889, 889, 894, 894, 894, 894, 411,
  620, 410, 225, 225, 411, 620, 410, 239, 240, 241, 239, 240, 241, 239, 240,
  241, 706, 748, 748, 748, 748, 706, 706, 706, 706, 706, 706, 706, 706, 706,
  706, 748, 748, 748, 796, 899, 750, 899, 795, 743, 743, 464, 1000, 1001, 1001,
  1001, 1001, 1001, 1001, 188, 188, 188, 188, 188, 188, 188, 188, 276, 277, 278,
  276, 277, 278, 276, 277, 278, 706, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 796, 899, 750, 899, 795, 743,
  743, 743, 353, 353, 353, 353, 353, 354, 355, 188, 188, 188, 188, 188, 188,
  188, 188, 347, 912, 913, 347, 801, 349, 912, 913, 349, 706, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 796,
  899, 750, 899, 795, 743, 743, 743, 743, 743, 743, 743, 743, 743, 743, 299,
  299, 983, 299, 299, 983, 299, 299, 384, 949, 950, 384, 838, 349, 949, 950,
  386, 706, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 796, 899, 750, 899, 795, 743, 743, 743, 743, 743, 743,
  743, 743, 743, 743, 705, 705, 704, 704, 704, 704, 704, 704, 704, 704, 704,
  704, 704, 704, 704, 704, 704, 706, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 796, 899, 750, 899, 795, 743,
  743, 743, 743, 743, 743, 743, 743, 743, 743, 705, 705, 704, 704, 704, 704,
  704, 704, 704, 704, 704, 704, 704, 704, 704, 704, 704, 743, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 796,
  899, 750, 899, 795, 743, 743, 743, 743, 743, 743, 743, 743, 743, 743, 705,
  705, 705, 705, 705, 705, 705, 705, 705, 705, 705, 705, 705, 705, 705, 705,
  705, 743, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 796, 899, 750, 899, 795, 743, 743, 743, 743, 743, 743,
  743, 743, 743, 743, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 796, 899, 750, 899, 795, 743,
  743, 743, 743, 743, 743, 743, 743, 743, 743, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 785, 748, 748, 796,
  899, 750, 899, 795, 743, 743, 743, 743, 743, 743, 743, 743, 743, 743, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 796, 899, 750, 899, 795, 743, 852, 743, 743, 743, 743,
  743, 743, 852, 743, 748, 748, 748, 748, 748, 748, 748, 748, 748, 175, 176,
  177, 748, 748, 748, 748, 748, 748, 748, 785, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 796, 899, 750, 899, 899, 833,
  833, 833, 824, 824, 833, 833, 833, 833, 833, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 212, 213, 214, 748, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 796,
  899, 750, 899, 899, 899, 899, 899, 824, 824, 899, 899, 899, 899, 899, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 212, 213, 214, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 796, 715, 750, 713, 713, 713, 713, 713, 824, 824, 713,
  713, 713, 713, 713, 748, 748, 748, 748, 748, 748, 748, 748, 748, 212, 213,
  214, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 796, 898, 899, 899, 899, 899,
  899, 899, 824, 824, 899, 899, 899, 899, 899, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 212, 213, 214, 748, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 830,
  832, 832, 832, 832, 832, 832, 832, 824, 824, 832, 832, 832, 832, 832, 748,
  748, 785, 748, 748, 748, 748, 748, 748, 249, 250, 251, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 926, 927, 927, 927, 927, 927, 927, 1019, 927,
  927, 927, 927, 927, 928, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 963, 967, 36, 37, 967,
  967, 967, 945, 967, 967, 967, 36, 37, 965, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 963,
  967, 73, 74, 967, 967, 967, 945, 967, 967, 967, 73, 74, 965, 748, 748, 748,
  748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748, 748,
  748,
];

let levelIndex = 0;
let sourceX = 0;
let sourceY = 0;
function draw() {
   for (let col = 0; col < levelHeight; col += tileSize) {
      for (let row = 0; row < levelWidth; row += tileSize) {
         let tileVal = level1[levelIndex];
         if(tileVal !=0) {
            tileVal -= 1;
            sourceY = Math.floor(tileVal/tilesheetCol) * tileSize;
            sourceX = (tileVal % tilesheetCol) * tileSize;
            ctx.drawImage(tilesheet, sourceX, sourceY, tileSize,
            tileSize, row * tileOutputSize, col * tileOutputSize,
            updatedTileSize, updatedTileSize);
         }
         levelIndex ++;
      }
   }
}
*/


