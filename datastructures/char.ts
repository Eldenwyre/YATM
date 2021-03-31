import { RepeatableTask } from './tasks'
import { Skill, SortStatus } from './skills'
import { saveData } from '../json_io'
const lodash = require('lodash');

export class Character {
    public name: string;                //User's name
    public experience: number;          //Total xp the user has gained
    public tasks: Array<RepeatableTask>;//Stores the user's (non-skill) tasks
    private task_sort_status: SortStatus;   //Stores last sort method for tasks
    public skills: Array<Skill>;        //Stores the user's skills
    private skill_sort_status: SortStatus;  //Stores last sort method for skills

    constructor(name: string, experience: number, tasks: Array<RepeatableTask>, skills: Array<Skill>, skill_sort_status: SortStatus = new SortStatus("alpha",true), task_sort_status: SortStatus = new SortStatus("date",true)) {
        this.name = name;
        this.experience = experience;
        this.tasks = lodash.cloneDeep(tasks);
        this.task_sort_status = lodash.cloneDeep(task_sort_status);
        this.skills = lodash.cloneDeep(skills);
        this.skill_sort_status = lodash.cloneDeep(skill_sort_status);
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

    public sortSkills(method: string = this.skill_sort_status.method, ascending: boolean = this.skill_sort_status.ascending_flag) {
        //Control Ascending/Descending
        var x: number = 1;
        if (!ascending)
        {
            x = -1;
        }

        //Alphabetically sort skills
        if (method === "alpha") {
            this.skills.sort((a,b) => (a.title > b.title) ? x : ((b.title > a.title) ? -x : 0));
        }
        //Sort by level/xp
        else if ((method === "level") || (method === "xp")){
            this.skills.sort((a,b) => (a.experience > b.experience) ? x : ((b.experience > a.experience) ? -x : 0));
        }
        //Invalid method
        else {
            console.log(`ERROR (INVALID METHOD for Character.sortSkills()): Could not sort strings with the method: ${method}`);
            return; //Prevents method from being changed
        }

        //Save new sort method
        this.skill_sort_status = new SortStatus(method,ascending);
        return;
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

    public addxp(xp: number) {
        if (typeof(xp) === "number"){
            this.experience = this.experience + xp;
        }
        else {
            try {
                this.experience = this.experience + parseInt(xp);
            } catch (error) {
                console.log(error);
                return;
            }
        }
    }


    public completeTask(taskName: string) {
        for (let i = 0; i < this.tasks.length; i++){
            if (this.tasks[i].task.title === taskName){
                //Add the xp
                this.addxp(this.tasks[i].task.reward);
                for (let j = 0; j < this.skills.length; j++){
                    if (this.skills[j].title === this.tasks[i].skill){
                        this.skills[j].experience = this.skills[j].experience + this.tasks[i].task.reward;
                    }
                }
                //Handle if there are repeats left
                if(this.tasks[i].num_repeats > 1) {
                    this.tasks[i].num_repeats -= 1;
                    //this.tasks[i].task.date.setDate(this.tasks[i].task.date.getDate() + this.tasks[i].repeat_increment);
                }
                else if (this.tasks[i].num_repeats < 0){
                    //this.tasks[i].task.date.setDate(this.tasks[i].task.date.getDate() + this.tasks[i].repeat_increment);
                }
                else{
                    //Delete the task
                    this.tasks.splice(i,1);
                }
                //End the loop
                i = this.tasks.length
            }
        }
    }


    public addTask(task: RepeatableTask) {
        //Naive lazy way of implementing this but speed cost shouldn't be noticable
        this.tasks.push(lodash.cloneDeep(task));
        this.sortTasks();

        return;
    }

    public addSkill(skill : Skill) {
        //Naive lazy way of implementing this but speed cost shouldn't be noticable
        this.skills.push(lodash.cloneDeep(skill));
        this.sortSkills();

        return;
    }

    public save() {
      saveData(this);
    }
}
