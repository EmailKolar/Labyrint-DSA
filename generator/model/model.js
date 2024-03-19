export default class Model {
    constructor(rows, cols, controller) {
        this.rows = rows;
        this.cols = cols;
        this.maze = [];
        this.controller = controller;
    }

    passage = [];

    directions = [
        { row: 0, col: -1 }, 
        { row: 1, col: 0 }, 
        { row: 0, col: 1 }, 
        { row: -1, col: 0 }
    ];

    initMaze() {
        for (let i = 0; i < this.rows; i++) {
            this.maze[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.maze[i][j] = { visited: false, row: i, col: j, north: true, east: true, west: true, south: true };
            }
        }
    }

    async generate(){
        const startRow = Math.floor(Math.random() * this.rows);
        const startCol = Math.floor(Math.random() * this.cols);
        this.maze[startRow][startCol].visited = true;
        this.passage.push(this.maze[startRow][startCol])

        let frts = this.getFrontiers()
        
        let cnt =0;
        while(frts.length>0 ){

            await this.wait(10);

            const randomFrontier = Math.floor(Math.random() *frts.length)
            this.bridgeOut(frts[randomFrontier]);

            frts = this.getFrontiers();
            
            cnt++;
            this.controller.update();

/*
            frts.forEach(elmt =>{
                console.log(elmt);
            })
            */

        }
        this.controller.update();
        this.passage.forEach(elmt =>{
            console.log(elmt);
        })




    }

   getFrontiers(){
    const frontiers = [];

        this.passage.forEach(cell => {
            if(cell.col+2 < this.cols && this.maze[cell.row][cell.col+2].north && this.maze[cell.row][cell.col+2].south
                && this.maze[cell.row][cell.col+2].east && this.maze[cell.row][cell.col+2].west){
                frontiers.push({cell:this.maze[cell.row][cell.col+2],dir:'east'})
            }
            if(cell.row+2 < this.rows && this.maze[cell.row+2][cell.col].north && this.maze[cell.row+2][cell.col].south
                && this.maze[cell.row+2][cell.col].east && this.maze[cell.row+2][cell.col].west){
                frontiers.push({cell:this.maze[cell.row+2][cell.col],dir:'south'})
            }
            if(cell.row-2 >= 0 && this.maze[cell.row-2][cell.col].north && this.maze[cell.row-2][cell.col].south
                && this.maze[cell.row-2][cell.col].east && this.maze[cell.row-2][cell.col].west){
                frontiers.push({cell:this.maze[cell.row-2][cell.col],dir:'north'})
            }
            if(cell.col-2 >= 0 && this.maze[cell.row][cell.col-2].north && this.maze[cell.row][cell.col-2].south
                && this.maze[cell.row][cell.col-2].east && this.maze[cell.row][cell.col-2].west){
                frontiers.push({cell:this.maze[cell.row][cell.col-2], dir:'west'})
            }
            
        });
        return frontiers;


   }

   

   bridgeOut(frontier) {
    const { cell, dir } = frontier;
    const row = cell.row;
    const col = cell.col;

    if (dir === 'east') {
        this.maze[row][col].west = false;
        this.maze[row][col - 1].west = false;
        this.maze[row][col - 1].east = false;
        this.maze[row][col - 2].east = false;

        //this.passage.push(this.maze[row][col - 1]);
        this.passage.push(this.maze[row][col]);
    }
    if (dir === 'west') {
        this.maze[row][col].east = false;
        this.maze[row][col + 1].east = false;
        this.maze[row][col + 1].west = false;
        this.maze[row][col + 2].west = false;

        //this.passage.push(this.maze[row][col + 1]);
        this.passage.push(this.maze[row][col]);
    }
    if (dir === 'south') {
        this.maze[row][col].north = false;
        this.maze[row - 1][col].north = false;
        this.maze[row - 1][col].south = false;
        this.maze[row - 2][col].south = false;

        //this.passage.push(this.maze[row - 1][col]);
        this.passage.push(this.maze[row][col]);
    }
    if (dir === 'north') {
        this.maze[row][col].south = false;
        this.maze[row + 1][col].south = false;
        this.maze[row + 1][col].north = false;
        this.maze[row + 2][col].north = false;

        //this.passage.push(this.maze[row + 1][col]);
        this.passage.push(this.maze[row][col]);
    }
}



    async wait(milliseconds) {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }
}