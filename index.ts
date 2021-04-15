import { ipcRenderer } from 'electron';

let SIZE: Number = 0;
let SKILLSBAR: Boolean = false;
let TASKSBAR: Boolean = false;

ipcRenderer.on("getWinSize", (event, data) => {

  SIZE = Math.round(data[0]*.4); //Sets the width to a SIZE that will fit skills.html properly

  if(SKILLSBAR) {
    document.getElementById("skillsSidebar").style.width = SIZE.toString() + "px";
  }  
  if(TASKSBAR) {
    document.getElementById("tasksSidebar").style.width = SIZE.toString() + "px";
  }

});

ipcRenderer.send("requestWinSize", event);

ipcRenderer.on("sendCharacterInfo", (event, data) => {
  document.getElementById("charName").innerHTML = data.name;
  document.getElementById("charLevel").innerHTML = data.level;
});

ipcRenderer.send("requestCharacterInfo", event);

const skillclose = document.getElementById('skillclose');
skillclose.addEventListener('click', function () {
  SKILLSBAR = !SKILLSBAR;
    document.getElementById("skillsSidebar").style.width = "0";
    // ipcRenderer.send("skillclose"); // ipcRender.send will pass the information to main process
});

const skilladd = document.getElementById('addskill');
skilladd.addEventListener('click', function () {
  ipcRenderer.send("addskill"); //Calls the main process to close the program
});

const skillclick = document.getElementById('loadskills'); 
skillclick.addEventListener('click', function () {
  SKILLSBAR = !SKILLSBAR;
  document.getElementById("skillsSidebar").style.width = SIZE.toString() + "px";
});

var taskclose = document.getElementById('taskclose');
taskclose.addEventListener('click', function () {
  TASKSBAR = !TASKSBAR;
  document.getElementById("tasksSidebar").style.width = "0";
});

const add = document.getElementById('addTaskWindow');
add.addEventListener('click', function () {
  ipcRenderer.send("addTaskWindow"); //Calls the main process to close the program
});

const taskclick = document.getElementById('loadtasks');
taskclick.addEventListener('click', function () {
  TASKSBAR = !TASKSBAR;
  document.getElementById("tasksSidebar").style.width = SIZE.toString() + "px";
});

ipcRenderer.on("openSidebar", (event, data) => {
  if(data == "skills") {
    SKILLSBAR = !SKILLSBAR;
  } else if(data == "tasks") {
    TASKSBAR = !TASKSBAR;
  }
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
