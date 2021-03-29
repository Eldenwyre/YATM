"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatableTask = exports.BasicTask = exports.Subtask = void 0;
var lodash = require('lodash');
var Subtask = /** @class */ (function () {
    function Subtask(title, description) {
        this.title = title;
        this.description = description;
    }
    return Subtask;
}());
exports.Subtask = Subtask;
var BasicTask = /** @class */ (function () {
    function BasicTask(title, description, date, reward, subtasks) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.reward = reward;
        this.subtasks = lodash.cloneDeep(subtasks);
    }
    return BasicTask;
}());
exports.BasicTask = BasicTask;
var RepeatableTask = /** @class */ (function () {
    function RepeatableTask(title, description, date, reward, subtasks, repeat_increment, num_repeats) {
        this.task = new BasicTask(title, description, date, reward, lodash.cloneDeep(subtasks));
        this.repeat_increment = repeat_increment;
        this.num_repeats = num_repeats;
    }
    return RepeatableTask;
}());
exports.RepeatableTask = RepeatableTask;
