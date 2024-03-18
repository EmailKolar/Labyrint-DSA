"use strict"

import Model from "../model/model.js"
import View from "../view/view.js"

export default class Controller {
    constructor() {
        this.model = new Model(30,30,this)
        this.view = new View(this)
    }
    init() {
        //inital method. called by main.js

        this.model.initMaze();
        console.table(this.model.maze)
        const start={row:0,col:0}
        const goal={row:5,col:5}
        this.view.displayMaze(30,30,start,goal,this.model.maze)

        this.model.generate();
        this.view.updateMaze(30,this.model.maze,start)
       
    }


    update(){
        this.view.updateMaze(30,this.model.maze,{row:0,col:0})
        console.log('test');
    }
}