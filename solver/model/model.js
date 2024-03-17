export default class Model {

    constructor(controller) {
        this.rows = null;
        this.cols = null;
        this.start = null;
        this.goal = null;
        this.maze = null;
        this.route = [];
        this.controller = controller;
    }
    async fetchModel() {
        try {
            const response = await fetch("./model/maze.json");
            if (!response.ok) {
                throw new Error('Failed to fetch maze.json');
            }
            const data = await response.json();
            console.log(data);
            //this.setData(data)
            return data;
           
        } catch (error) {
            console.error('error fetching', error);
        }
    }
    

    setData(data){
        this.rows = data.rows;
        this.cols = data.cols;
        this.start = data.start;
        this.goal = data.goal;
        this.maze = data.maze;
    }

    
    async visitCell(row, col) {
        await this.wait(100);
    
        //console.log('row: ' + row + ", col: " + col);
    
        const cell = this.maze[row][col];
        console.log(cell);
    
        this.route.push(cell);
        cell.visited = true;
    
        this.controller.update();
    
        if (cell.row == this.goal.row && cell.col == this.goal.col) {
            console.log('GOAL');
            return true;
        }
    
        //south
        if (!cell.south && row < this.rows - 1 && !this.maze[row + 1][col].visited) {
            if (await this.visitCell(row + 1, col)) {
                return true;
            }
        }
        //west
        if (!cell.west && col > 0 && !this.maze[row][col - 1].visited) {
            if (await this.visitCell(row, col - 1)) {
                return true;
            }
        }
    
        //east
        if (!cell.east && col < this.cols - 1 && !this.maze[row][col + 1].visited) {
            if (await this.visitCell(row, col + 1)) {
                return true;
            }
        }
    
        //north
        if (!cell.north && row > 0 && !this.maze[row - 1][col].visited) {
            if (await this.visitCell(row - 1, col)) {
                return true;
            }
        }
    
        this.route.pop();
        return false;

        

    }
    async wait(milliseconds) {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

}