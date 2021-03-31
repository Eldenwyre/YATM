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
    public tasks: Array<RepeatableTask>;
    private task_sort_status: SortStatus;

    constructor(title: string, description: string, experience: number, tasks: Array<RepeatableTask>, task_sort_status: SortStatus = new SortStatus("date",true)) {
        this.title = title;
        this.description = description;
        this.experience = experience;
        this.tasks = lodash.cloneDeep(tasks);
        this.task_sort_status = lodash.cloneDeep(task_sort_status);
    }

    public sortTasks(method: string = this.task_sort_status.method, ascending: boolean = this.task_sort_status.ascending_flag) {
        //Control Ascending/Descending
        var x: number = 1;
        if (!ascending)
        {
            x = -1;
        }

        //Sort by date
        if (method === "date") {
            this.tasks.sort((a,b) => (a.task.date.valueOf() > b.task.date.valueOf()) ? x : ((b.task.date.valueOf() > a.task.date.valueOf()) ? -x : 0));
        }
        else if (method === "alpha") {
            this.tasks.sort((a,b) => (a.task.title > b.task.title) ? x : ((b.task.title > a.task.title) ? -x : 0));
        }
        //Sort by level/xp
        else if ((method === "level") || (method === "xp")){
            this.tasks.sort((a,b) => (a.task.reward > b.task.reward) ? x : ((b.task.reward > a.task.reward) ? -x : 0));
        }
        //Invalid method
        else {
            console.log(`ERROR (INVALID METHOD for Character.sortTasks()): Could not sort strings with the method: ${method}`);
            return; //Prevents method from being changed
        }

        //Save new sort method
        this.task_sort_status = new SortStatus(method,ascending);
        return;
    }
}