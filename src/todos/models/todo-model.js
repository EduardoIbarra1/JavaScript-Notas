import {v4 as uuid} from 'uuid'

export class Todo{

    /**
     * Constructor para inicializar las tareas.
     * 
     * @param {String} description descripcion de la tarea. 
     */
    constructor(description){
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }

    

}