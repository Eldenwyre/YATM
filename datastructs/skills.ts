import { RepeatableTask } from './tasks'
import lodash from 'lodash'

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
        title = title;
        description = description;
        experience = experience;
        tasks = lodash.cloneDeep(tasks);
        task_sort_status = lodash.cloneDeep(task_sort_status);
    }

    //Calculates level based on XP of skill
    public getLevel(): number {
        //XP_MIN is 21 for level 1
        if (this.experience < 21) { 
            return 0; 
        }
        //XP_MAX is 150409 for level 2500
        else if (this.experience > 150000) { 
            return 250; 
        }
        //Else use level curve
        else {
            return 1 + Math.pow(this.experience,0.49) - Math.pow(this.experience,0.38) - Math.pow(this.experience,0.07624);
        }
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
