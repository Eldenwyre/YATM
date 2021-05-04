const lodash = require('lodash');

export class Subtask {
    public title: string;
    public description: string;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
    }
}

export class BasicTask {
    public title: string;
    public description: string;
    public date: Date;
    public reward: number;
    public subtasks: Array<Subtask>;

    public constructor(title:string, description:string, date:Date, reward: number, subtasks:Array<Subtask>) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.reward = reward;
        this.subtasks = lodash.cloneDeep(subtasks);
    }
}

export class RepeatableTask {
    public task: BasicTask;
    public repeat_increment: number;
    public num_repeats: number;
    public skill: string;
    constructor(title:string, 
                description: string, 
                date:Date, 
                reward: number, 
                subtasks:Array<Subtask>,
                repeat_increment:number,
                num_repeats:number,
                skill: string) {
        this.task = new BasicTask(title,description,date,reward,lodash.cloneDeep(subtasks));
        this.repeat_increment = repeat_increment;
        this.num_repeats = num_repeats;
        this.skill=lodash.cloneDeep(skill);
    }
}
