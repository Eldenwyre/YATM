// Import functions
import { saveData, getData, characterFromObj } from './json_io.js';
import { Character } from './datastructures/char.js';
import { Subtask, RepeatableTask } from './datastructures/tasks.js';
import { Skill } from './datastructures/skills.js';
import { ipcRenderer } from 'electron';

var data = getData();
var character: Character = characterFromObj(data);

window.onload = () => {
  document.getElementById("charName").innerHTML = character.name;
  document.getElementById("charLevel").innerHTML = Math.trunc(character.getLevel()).toString();
};
