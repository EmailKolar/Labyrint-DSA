"use strict"
export default class View {

    constructor(controller) {
        this.controller = controller;

    }
    

    displayMaze(rows, cols,start,goal,maze){
        
        const board = document.querySelector("#board");
        board.style.setProperty("--GRID_WIDTH",cols)
    
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cell = document.createElement("div")
                const cellData = maze[row][col]
                console.log(cellData);
                cell.classList.add("cell")

                if(row == start.row && col == start.col){
                    cell.classList.add('start')
                }
                if(row == goal.row && col == goal.col){
                    cell.classList.add('goal')
                }

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
                



                board.appendChild(cell)
            }   
        }
    }

    updateMaze(cols,maze,start){
       
        const cells = document.querySelectorAll('.cell')
        for (let i = 0; i < cells.length; i++) {
            const cellData = maze[Math.floor(i/cols)][i%cols]
            
            if(cellData.visited){
                cells[i].classList.add('visited')
            }
            if(cellData.row == start.row && cellData.col == start.col){
                cells[i].classList.remove('visited')
            }
        }
    }



}