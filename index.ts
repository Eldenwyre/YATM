import { ipcRenderer } from 'electron';
const path = require('path');

let SIZE: Number = 0;
let SKILLSBAR: Boolean = false;
let TASKSBAR: Boolean = false;

function expand(){
  if(SKILLSBAR) {
    document.getElementById("skillsSidebar").style.width = SIZE.toString() + "px";
  }  
  if(TASKSBAR) {
    document.getElementById("tasksSidebar").style.width = SIZE.toString() + "px";
  }
}

function collapse(){
  if(!SKILLSBAR) {
    document.getElementById("skillsSidebar").style.width = "0";
  }  
  if(!TASKSBAR) {
    document.getElementById("tasksSidebar").style.width = "0";
  }
}

ipcRenderer.on("getWinSize", (event, data) => {
  SIZE = Math.round(data[0]*.4);
  expand();
});

ipcRenderer.send("requestWinSize", event);

ipcRenderer.on("requestSidebarInfo", (event) => {
  let data = {
    skillsbar: SKILLSBAR,
    tasksbar: TASKSBAR
  }
  ipcRenderer.send("recvSidebarInfo", data);
});

ipcRenderer.on("sendCharacterInfo", (event, data) => {
  document.getElementById("charName").innerHTML = data.name;
  document.getElementById("charLevel").innerHTML = data.level;
});

ipcRenderer.send("requestCharacterInfo", event);

//Listener for Sprite Changing Buttons
const char_sprite_decrease = document.getElementById('sprite_button_left'); 
char_sprite_decrease.addEventListener('click', function () {
  ipcRenderer.send("changeCharSpriteNumber", -1);
});
const char_sprite_increase = document.getElementById('sprite_button_right'); 
char_sprite_increase.addEventListener('click', function () {
  ipcRenderer.send("changeCharSpriteNumber", 1);
});


//Gets Character Sprite
ipcRenderer.on("sendCharacterSpriteNumber", (event, data) => {
  var MAX_SPRITE_VAL = data.max_sprite_value; //Should probably get an actual check for this at one point.
  let char_sprite_loc = path.resolve(__dirname, "images/character/char_" + data.sprite_value + ".png");
  document.getElementById("character_image").setAttribute("src",char_sprite_loc);

  //Sprite Button Check, determines whether button should be shown or not.
  if(data.sprite_value === "0"){
    document.getElementById("sprite_button_left").hidden = true;
  }
  if(parseInt(data.sprite_value,10) >= MAX_SPRITE_VAL){
    document.getElementById("sprite_button_right").hidden = true;
  }
});

//Make Request for Character Sprite Number
ipcRenderer.send("requestCharacterSpriteNumber", event);


const skillclose = document.getElementById('skillclose');
skillclose.addEventListener('click', function () {
  SKILLSBAR = !SKILLSBAR;
  collapse();
});

const skilladd = document.getElementById('addskill');
skilladd.addEventListener('click', function () {
  ipcRenderer.send("addskill"); //Calls the main process to close the program
});

const skillclick = document.getElementById('loadskills'); 
skillclick.addEventListener('click', function () {
  SKILLSBAR = !SKILLSBAR;
  expand();
});

var taskclose = document.getElementById('taskclose');
taskclose.addEventListener('click', function () {
  TASKSBAR = !TASKSBAR;
  collapse();
});

const add = document.getElementById('addTaskWindow');
add.addEventListener('click', function () {
  ipcRenderer.send("addTaskWindow"); //Calls the main process to close the program
});

const taskclick = document.getElementById('loadtasks');
taskclick.addEventListener('click', function () {
  TASKSBAR = !TASKSBAR;
  expand();
});

ipcRenderer.on("openSidebar", (event, data) => {
  if(data == "skills") {
    SKILLSBAR = !SKILLSBAR;
  } 
  if(data == "tasks") {
    TASKSBAR = !TASKSBAR;
  }
  expand();
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
