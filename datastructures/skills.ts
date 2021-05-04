import { RepeatableTask } from './tasks'
const lodash = require('lodash');

// Basic struct for storing the sorting method/direction of the containers
export class SortStatus {
    public method: string;              //Name of the method
    public ascending_flag: boolean;     //Sorting direction of the container (true => ascending)

    constructor(method: string, ascending_flag: boolean) {
        this.method = method;
        this.ascending_flag = ascending_flag;
    }
}

export class Skill {
    public title: string;
    public description: string;
    public experience: number;

    constructor(title: string, description: string, experience: number) {
        this.title = title;
        this.description = description;
        this.experience = experience;
    }
}