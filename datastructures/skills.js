"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skill = exports.SortStatus = void 0;
var lodash = require('lodash');
// Basic struct for storing the sorting method/direction of the containers
var SortStatus = /** @class */ (function () {
    function SortStatus(method, ascending_flag) {
        this.method = method;
        this.ascending_flag = ascending_flag;
    }
    return SortStatus;
}());
exports.SortStatus = SortStatus;
var Skill = /** @class */ (function () {
    function Skill(title, description, experience, tasks, task_sort_status) {
        if (task_sort_status === void 0) { task_sort_status = new SortStatus("date", true); }
        title = title;
        description = description;
        experience = experience;
        tasks = lodash.cloneDeep(tasks);
        task_sort_status = lodash.cloneDeep(task_sort_status);
    }
    //Calculates level based on XP of skill
    Skill.prototype.getLevel = function () {
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
            return 1 + Math.pow(this.experience, 0.49) - Math.pow(this.experience, 0.38) - Math.pow(this.experience, 0.07624);
        }
    };
    Skill.prototype.sortTasks = function (method, ascending) {
        if (method === void 0) { method = this.task_sort_status.method; }
        if (ascending === void 0) { ascending = this.task_sort_status.ascending_flag; }
        //Control Ascending/Descending
        var x = 1;
        if (!ascending) {
            x = -1;
        }
        //Sort by date
        if (method === "date") {
            this.tasks.sort(function (a, b) { return (a.task.date.valueOf() > b.task.date.valueOf()) ? x : ((b.task.date.valueOf() > a.task.date.valueOf()) ? -x : 0); });
        }
        else if (method === "alpha") {
            this.tasks.sort(function (a, b) { return (a.task.title > b.task.title) ? x : ((b.task.title > a.task.title) ? -x : 0); });
        }
        //Sort by level/xp
        else if ((method === "level") || (method === "xp")) {
            this.tasks.sort(function (a, b) { return (a.task.reward > b.task.reward) ? x : ((b.task.reward > a.task.reward) ? -x : 0); });
        }
        //Invalid method
        else {
            console.log("ERROR (INVALID METHOD for Character.sortTasks()): Could not sort strings with the method: " + method);
            return; //Prevents method from being changed
        }
        //Save new sort method
        this.task_sort_status = new SortStatus(method, ascending);
        return;
    };
    return Skill;
}());
exports.Skill = Skill;
