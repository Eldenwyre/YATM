// Import functions
import { saveData, getData, characterFromObj } from './json_io.js';
import { Character } from './datastructures/char.js';
import { Subtask, RepeatableTask } from './datastructures/tasks.js';
import { Skill } from './datastructures/skills.js';
import { ipcRenderer } from 'electron';
/*
var rt = new RepeatableTask("Task Title", "Task Desc", curr_date, 100, [], 10, 10);

var skill: Skill = new Skill("Skill Title", "Skill Desc", 100, [rt]);

var curr_date: Date = new Date();
var char: Character = new Character("Character1", 500, [rt], [skill]);
char.save();

var data = getData();
var character: Character = characterFromObj(data);
console.log(character);
console.log(character.skills);

window.onload = () => {
  document.getElementById("charName").innerHTML = character.name;
  document.getElementById("charLevel").innerHTML = Math.trunc(character.getLevel()).toString();
};
*/