const HEIGHT = 550;
        const DELAY_END = 2; 
        const S = 30;
        const GRIDSIZE =10 ; 
        
        const WIDTH = HEIGHT * 0.9;
        const CELL = WIDTH / (GRIDSIZE + 2);
        const STROKE = CELL / 12; 
        const DOT = STROKE; 
        const MARGIN = HEIGHT - (GRIDSIZE + 1) * CELL; 

        const COLORBOARD = "Lavender";
        const COLORBORDER = "navy";
        const COLORCOMP = "crimson";
        const COLORCOMPLIT = "lightpink";
        const COLORDOT = "black";
        const COLORPLAY = "blue";
        const COLORPLAYLIT = "lightsteelblue";
        const COLORTIE = "black";

        const TEXTCOMP="PLAYER2"
        const TEXTCOMPSML = "A";
        const TEXTPLAY="PLAYER1"
        const TEXTPLAYSML = "B";
        const Side = {
            BOT: 0,
            LEFT: 1,
            RIGHT: 2,
            TOP: 3
        }

        const TEXTSIZECELL = CELL / 3;
        const TEXTSIZETOP = MARGIN / 6;
        const TEXTTIE = "DRAW";
        const TEXTWIN = "WINS";

        var canv = document.createElement("canvas");
        canv.height = HEIGHT;
        canv.width = WIDTH;
        document.body.appendChild(canv);
        var canvRect = canv.getBoundingClientRect();

    
        var ctx = canv.getContext("2d");
        ctx.lineWidth = STROKE;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var currentCells, playersTurn, squares;
        var scoreComp, scorePlay;
        var timeEnd;

    
        newGame();

    // event handlers
        canv.addEventListener("mousemove", highlightGrid);
      canv.addEventListener("click", click);
        setInterval(loop, 1000 / S);
        
        
function loop() {
            drawBoard();
      drawSquares();
            drawGrid();
            drawScores();
        }
 function click( ev) {
            if ( timeEnd > 0) {
                return;
            }
            selectSide();
        }


        function drawBoard() {
            ctx.fillStyle = COLORBOARD;
            ctx.strokeStyle = COLORBORDER;

            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            ctx.strokeRect(STROKE / 2, STROKE / 2, WIDTH - STROKE, HEIGHT - STROKE);
        }

function drawGrid() {
            for (let i = 0; i < GRIDSIZE + 1; i++) {
                for (let j = 0; j < GRIDSIZE + 1; j++) {
                    drawDot(getGridX(j), getGridY(i));
                }
            }
        }

 function drawDot(x, y) {
            ctx.fillStyle = COLORDOT;
            ctx.beginPath();
            ctx.arc(x, y, DOT, 0, Math.PI * 2);
            ctx.fill();
        }
        
 function drawLine(x0, y0, x1, y1, color) {
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.stroke();
 }   

 
function drawScores() {
    let colComp = playersTurn ? COLORCOMPLIT : COLORCOMP;
    let colPlay = playersTurn ? COLOR_PLAY : COLORPLAYLIT;
      drawText(TEXTPLAY, WIDTH * 0.25, MARGIN * 0.25, colPlay, TEXTSIZETOP);
    drawText(scorePlay, WIDTH * 0.25, MARGIN * 0.6, colPlay, TEXTSIZETOP * 2);
      drawText(TEXTCOMP, WIDTH * 0.75, MARGIN * 0.25, colComp, TEXTSIZETOP);
    drawText(scoreComp, WIDTH * 0.75, MARGIN * 0.6, colComp, TEXTSIZETOP * 2);


    if (timeEnd > 0) {
        timeEnd--;
       
        if (scoreComp == scorePlay) {
            drawText(TEXTTIE, WIDTH * 0.5, MARGIN * 0.6, COLORTIE, TEXTSIZETOP);
        } else {
            let playerWins = scorePlay > scoreComp;
            let color = playerWins ? COLORPLAY : COLORCOMP;
            let text = playerWins ? TEXTPLAY : TEXTCOMP;
            drawText(text, WIDTH * 0.5, MARGIN * 0.5, color, TEXTSIZETOP);
            drawText(TEXTWIN, WIDTH * 0.5, MARGIN * 0.7, color, TEXTSIZETOP);
        }       
        if (timeEnd == 0) {
            newGame();
        }
    }
}
function drawSquares() {
    for (let row of squares) {
        for (let square of row) {
            square.drawSides();
            square.drawFill();
        }
    }
}

 function drawText(text, x, y, color, size) {
    ctx.fillStyle = color;
    ctx.font = size + "px dejavu sans mono";
    ctx.fillText(text, x, y);
}
function getColor(player, light) {
    if (player) {
        return light ? COLORPLAYLIT : COLORPLAY;
    } else {
        return light ? COLORCOMPLIT:COLORCOMP;
    }
}
function getText(player, small) {
    if (player) {
        return small?TEXTPLAYSML:TEXTPLAY;
    } else {
        return small?TEXTCOMPSML:TEXTCOMP;
    }
}
function getGridX(col) {
    return CELL*(col + 1);
}
function getGridY(row) {
    return MARGIN+CELL*row;
}
    function highlightGrid( ev) {
    if (timeEnd > 0) {
        return;
    }
    
   let x = ev.clientX - canvRect.left;
    let y = ev.clientY - canvRect.top;
    
    highlightSide(x, y);
        }

        function highlightSide(x, y) {
            for (let row of squares) {
                for (let square of row) {
                    square.highlight = null;
                }
            }
            let rows = squares.length;
            let cols = squares[0].length;
            currentCells = [];
            OUTER: for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if (squares[i][j].contains(x, y)) {
                        let side = squares[i][j].highlightSide(x, y);
                        if (side != null) {
                            currentCells.push({row: i, col: j});
                        }
                        let row = i, col = j, highlight, neighbour = true;
                        if (side == Side.LEFT && j > 0) {
                            col = j - 1;
                            highlight = Side.RIGHT;
                        } else if (side == Side.RIGHT && j < cols - 1) {
                            col = j + 1;
                            highlight = Side.LEFT;
                        } else if (side == Side.TOP && i > 0) {
                            row = i - 1;
                            highlight = Side.BOT;
                        } else if (side == Side.BOT && i < rows - 1) {
                            row = i + 1;
                            highlight = Side.TOP;
                        } else {
                            neighbour = false;
                        }

                        if (neighbour) {
                            squares[row][col].highlight = highlight;
                            currentCells.push({row: row, col: col});
                        }

                        
                        break OUTER;
                    }
                }
            }
        }

        function newGame() {
            currentCells = [];
            playersTurn = Math.random() >= 0.5;
            scoreComp = 0;
            scorePlay = 0;
            timeEnd = 0;
            squares = [];
            for (let i = 0; i < GRIDSIZE; i++) {
                squares[i] = [];
                for (let j = 0; j < GRIDSIZE; j++) {
                    squares[i][j] = new Square(getGridX(j), getGridY(i), CELL, CELL);
                }
            }
        }

        function selectSide() {
            if (currentCells == null || currentCells.length == 0) {
                return;
            }

        
            let filledSquare = false;
            for (let cell of currentCells) {
                if (squares[cell.row][cell.col].selectSide()) {
                    filledSquare = true;
                }
            }
            currentCells = [];

            if (filledSquare) {
                if (scorePlay + scoreComp == GRIDSIZE * GRIDSIZE) {
                    
                    timeEnd = Math.ceil(DELAY_END * S);
                }
            } else {

                playersTurn = !playersTurn;
            }
        }
        function Square(x, y, w, h) {
            this.w = w;
            this.h = h;
            this.bot = y + h;
            this.left = x;
            this.right = x + w;
            this.top = y;
            this.highlight = null;
            this.numSelected = 0;
            this.owner = null;
            this.sideBot = {owner: null, selected: false};
            this.sideLeft = {owner: null, selected: false};
            this.sideRight = {owner: null, selected: false};
            this.sideTop = {owner: null, selected: false};

            this.contains = function(x, y) {
                return x >= this.left && x < this.right && y >= this.top && y < this.bot;
            }

            this.drawFill = function() {
                if (this.owner == null) {
                    return;
                }

            
                ctx.fillStyle = getColor(this.owner, true);
                ctx.fillRect(
                    this.left + STROKE, this.top + STROKE,
                    this.w - STROKE * 2, this.h - STROKE * 2
                );

                
                drawText(
                    getText(this.owner, true),
                    this.left + this.w / 2,
                    this.top + this.h / 2,
                    getColor(this.owner, false),
                    TEXTSIZECELL
                );
            }
            this.drawSide = function(side, color) {
                switch(side) {
                    case Side.BOT:
                        drawLine(this.left, this.bot, this.right, this.bot, color);
                        break;
                    case Side.LEFT:
                        drawLine(this.left, this.top, this.left, this.bot, color);
                        break;
                    case Side.RIGHT:
                        drawLine(this.right, this.top, this.right, this.bot, color);
                        break;
                    case Side.TOP:
                        drawLine(this.left, this.top, this.right, this.top, color);
                        break;
                }
            }
            this.drawSides = function() {

                if (this.highlight != null) {
                    this.drawSide(this.highlight, getColor(playersTurn, true));
                }

                        if (this.sideBot.selected) {
                            this.drawSide(Side.BOT, getColor(this.sideBot.owner, false));
                            }
                if (this.sideLeft.selected) {
                    this.drawSide(Side.LEFT, getColor(this.sideLeft.owner, false));
                }
                     if (this.sideRight.selected) {
                                 this.drawSide(Side.RIGHT, getColor(this.sideRight.owner, false));
                }
                        if (this.sideTop.selected) {
                    this.drawSide(Side.TOP, getColor(this.sideTop.owner, false));
                }
            }
            this.highlightSide = function(x, y) {
                let dBot = this.bot - y;
                let dLeft = x-this.left;
                let dRight = this.right - x;
                let dTop = y-this.top;

                let dClosest = Math.min(dBot, dLeft, dRight, dTop);
                if (dClosest == dBot && !this.sideBot.selected) {
                    this.highlight = Side.BOT;
                } else if (dClosest == dLeft && !this.sideLeft.selected) {
                    this.highlight = Side.LEFT;
                } else if (dClosest == dRight && !this.sideRight.selected) {
                    this.highlight = Side.RIGHT;
                } else if (dClosest == dTop && !this.sideTop.selected) {
                    this.highlight = Side.TOP;
                }


                return this.highlight;
            }

            this.selectSide = function() {
                if (this.highlight == null) {
                    return;
                }
                switch (this.highlight) {
                    case Side.BOT:
                        this.sideBot.owner = playersTurn;
                        this.sideBot.selected = true;
                        break;
                    case Side.LEFT:
                        this.sideLeft.owner = playersTurn;
                        this.sideLeft.selected = true;
                        break;
                    case Side.RIGHT:
                        this.sideRight.owner = playersTurn;
                        this.sideRight.selected = true;
                        break;
                    case Side.TOP:
                        this.sideTop.owner = playersTurn;
                        this.sideTop.selected = true;
                        break;
                }
                this.highlight = null;
               
                this.numSelected++;
                if (this.numSelected == 4) {
                    this.owner = playersTurn;

                    if (playersTurn) {
                        scorePlay++;
                    } else {
                        scoreComp++;
                    }
                    return true;
                }
                return false;
            }
        }