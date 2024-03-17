"use strict"

import Model from "../model/model.js"
import View from "../view/view.js"

export default class Controller {
    constructor() {
        this.model = new Model(this)
        this.view = new View(this)
    }

    


    init() {
        
       this.view.displayMaze(this.model.rows,
        this.model.cols,
        this.model.start,
        this.model.goal,
        this.model.maze)
        this.model.visitCell(this.model.start.row,this.model.start.col)

    }

    async fetchAndInit(){
        const data = await this.model.fetchModel();
        this.model.setData(data)

        this.init()
    }

    update(){
        this.view.updateMaze(
            this.model.cols,this.model.maze, this.model.start)
    }

}