"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
var skills_1 = require("./skills");
var lodash = require('lodash');
var Character = /** @class */ (function () {
    function Character(name, experience, tasks, skills, skill_sort_status, task_sort_status) {
        if (skill_sort_status === void 0) { skill_sort_status = new skills_1.SortStatus("alpha", true); }
        if (task_sort_status === void 0) { task_sort_status = new skills_1.SortStatus("date", true); }
        this.name = name;
        this.experience = experience;
        this.tasks = lodash.cloneDeep(tasks);
        this.task_sort_status = lodash.cloneDeep(task_sort_status);
        this.skills = lodash.cloneDeep(skills);
        this.skill_sort_status = lodash.cloneDeep(skill_sort_status);
    }
    //Calculates level based on XP of skill
    Character.prototype.getLevel = function () {
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
    Character.prototype.sortSkills = function (method, ascending) {
        if (method === void 0) { method = this.skill_sort_status.method; }
        if (ascending === void 0) { ascending = this.skill_sort_status.ascending_flag; }
        //Control Ascending/Descending
        var x = 1;
        if (!ascending) {
            x = -1;
        }
        //Alphabetically sort skills
        if (method === "alpha") {
            this.skills.sort(function (a, b) { return (a.title > b.title) ? x : ((b.title > a.title) ? -x : 0); });
        }
        //Sort by level/xp
        else if ((method === "level") || (method === "xp")) {
            this.skills.sort(function (a, b) { return (a.experience > b.experience) ? x : ((b.experience > a.experience) ? -x : 0); });
        }
        //Invalid method
        else {
            console.log("ERROR (INVALID METHOD for Character.sortSkills()): Could not sort strings with the method: " + method);
            return; //Prevents method from being changed
        }
        //Save new sort method
        this.skill_sort_status = new skills_1.SortStatus(method, ascending);
        return;
    };
    Character.prototype.sortTasks = function (method, ascending) {
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
        this.task_sort_status = new skills_1.SortStatus(method, ascending);
        return;
    };
    Character.prototype.addTask = function (task) {
        //Naive lazy way of implementing this but speed cost shouldn't be noticable
        this.tasks.push(lodash.deepClone(task));
        this.sortTasks();
        return;
    };
    Character.prototype.addSkill = function (skill) {
        //Naive lazy way of implementing this but speed cost shouldn't be noticable
        this.skills.push(lodash.deepClone(skill));
        this.sortSkills();
        return;
    };
    return Character;
}());
exports.Character = Character;
