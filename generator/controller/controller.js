"use strict"

import Model from "../model/model.js"
import View from "../view/view.js"

export default class Controller {
    constructor() {
        this.model = new Model(this)
        this.view = new View(this)
    }
    init() {
        //inital method. called by main.js

        this.view.setup()

/*
        this.model.initMaze();
        console.table(this.model.maze)
        const start={row:0,col:0}
        const goal={row:5,col:5}
        this.view.displayMaze(30,30,start,goal,this.model.maze)

        this.model.generate();
        this.view.updateMaze(30,this.model.maze,start)
        */
       
    }
    generate(rows,cols){
        this.model.setDimensions(rows,cols)
        this.model.initMaze();
        this.view.displayMaze(rows,cols,this.model.maze)

        this.model.generate();

    }


    update(){
        this.view.updateMaze(this.model.cols,this.model.maze)
        
    }

    exportToJSON(start, goal){
        //[Math.floor(i/cols)][i%cols]
        const startRowCol = {
            row: Math.floor(start/this.model.cols),
            col: start%this.model.cols
        }
        const goalRowCol = {
            row: Math.floor(goal/this.model.cols),
            col: goal%this.model.cols
        }
        this.model.setStartAndGoal(startRowCol,goalRowCol);
        const jsonString = this.model.toJSON();
        console.log(jsonString);

        
        return jsonString;


    }
    print(){
        console.table(this.model.maze)
    }

}