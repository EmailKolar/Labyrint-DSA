"use strict"
export default class View {

    

    constructor(controller) {
        this.controller = controller;

    }
    startPoint = null;
    goalPoint = null;
    

    setup(){
        
        document.querySelector('#generate-btn').addEventListener('click',(event)=>{
            const rows = document.querySelector('#rows').value
            const cols = document.querySelector('#cols').value

            this.controller.generate(Number(rows),Number(cols))
        })



        document.querySelector('#board').addEventListener('click', (event) => {
            let cell = event.target;
            let cells = document.querySelectorAll('#board .cell');
            let index = Array.from(cells).indexOf(cell);
            
            if (cell.classList.contains('start')) {
                cell.classList.remove('start');
                this.startPoint = null;
            } else if (cell.classList.contains('goal')) {
                cell.classList.remove('goal');
                this.goalPoint = null;
            } else {
                
                if (this.startPoint === null && !cell.classList.contains('block')) {
                   this.startPoint = index
                    cell.classList.add('start');
                } else if (this.goalPoint === null && !cell.classList.contains('block')) {
                    this.goalPoint = index
                    cell.classList.add('goal');
                }
            }

        });

        document.querySelector("#export-btn").addEventListener('click',(event)=>{
            this.controller.print();

            const mazeData = this.controller.exportToJSON(this.startPoint,this.goalPoint);
        
              document.body.innerHTML = '';
        
              const pre = document.createElement('pre');
              pre.textContent = mazeData;
        
              document.body.appendChild(pre);

        })


    }

    getStartAndGoal(){
        return {start: this.startPoint, goal: this.goalPoint}
    }


    displayMaze(rows, cols,maze){
        
        const board = document.querySelector("#board");
        board.style.setProperty("--GRID_WIDTH",cols)
    
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cell = document.createElement("div")
                const cellData = maze[row][col]
                console.log(cellData);
                cell.classList.add("cell")
/*
                if(row == start.row && col == start.col){
                    cell.classList.add('start')
                }
                if(row == goal.row && col == goal.col){
                    cell.classList.add('goal')
                }*/

                if(cellData.north){
                    cell.classList.add('north')
                }
                if(cellData.south){
                    cell.classList.add('south')
                }
                if(cellData.east){
                    cell.classList.add('east')
                }
                if(cellData.west){
                    cell.classList.add('west')
                }

                if(cellData.west && cellData.east && cellData.north && cellData.south){
                    cell.classList.add('block')
                }
                
                board.appendChild(cell)
            }   
        }
    }

    
        updateMaze(cols,maze){
            const cells = document.querySelectorAll('.cell')
            for (let i = 0; i < cells.length; i++) {
                const cellData = maze[Math.floor(i/cols)][i%cols]
                
                /*
                if(cellData.visited){
                    cells[i].classList.add('visited')
                }*/
                
                if(!cellData.north){
                    cells[i].classList.remove('north')
                    cells[i].classList.remove('block')
                }
                if(!cellData.south){
                    cells[i].classList.remove('south')
                    cells[i].classList.remove('block')

                }
                if(!cellData.east){
                    cells[i].classList.remove('east')
                    cells[i].classList.remove('block')

                }
                if(!cellData.west){
                    cells[i].classList.remove('west')
                    cells[i].classList.remove('block')

                }
                if(cellData.west && cellData.east && cellData.north && cellData.south){
                    cells[i].classList.add('block')
                }

            }
        }
    


}