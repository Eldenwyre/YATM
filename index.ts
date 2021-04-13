import { ipcRenderer } from 'electron';

// Not sure what this is yet
/*
window.$ = window.jquery = require("jquery");
window.popper = require("popper.js");
require("bootstrap");
require("./renderer.js");
*/

ipcRenderer.on("sendCharacterInfo", (event, data) => {
  document.getElementById("charName").innerHTML = data.name;
  document.getElementById("charLevel").innerHTML = data.level;
});

ipcRenderer.send("requestCharacterInfo", event);

const skillclick = document.getElementById('loadskills'); 
skillclick.addEventListener('click', function () {
    ipcRenderer.send("skillclick"); // ipcRender.send will pass the information to main process
    //It will call a function to open the skills.html file on screen
});

const taskclick = document.getElementById('loadtasks');
taskclick.addEventListener('click', function () {
    ipcRenderer.send("taskclick"); //Calls to open the tasks.html file on screen
});

/*
Old stuff we used for testing, kept for archiving purposes; ignore

// Import functions
import { saveData, getData, characterFromObj } from './json_io.js';
import { Character } from './datastructures/char.js';
import { Subtask, RepeatableTask } from './datastructures/tasks.js';
import { Skill } from './datastructures/skills.js';

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
