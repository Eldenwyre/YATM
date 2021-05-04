const fs = require('fs');
const lodash = require('lodash');
import { Character } from './datastructures/char.js';
import { RepeatableTask } from './datastructures/tasks.js'
import { Skill } from './datastructures/skills.js'

// NOTE: Using synchronous operations on the files,
// not a lot of data so it will mainly prevent read/write 
// conflicts on the file

// Default save file location
const SAVEFILE = "saves/character.json";

export function getData(file: string = SAVEFILE) {
  try {
    // Read the data
    const data = fs.readFileSync(file, 'utf-8');
    // Convert to Json object and return the result
    return JSON.parse(data);
  } catch(err) {
    throw err;
  }
}

export function saveData(data, file: string = SAVEFILE) {
  try {
    // Covert data to Json string
    data = JSON.stringify(data); 
    // Write Json string to file
    fs.writeFileSync(file, data, 'utf-8');
    console.log("Saved!");
  } catch(err) {
    throw err;
  }
}

export function characterFromObj(data) {
  var char: Character = new Character(data.name, 
                                      data.experience,
                                      lodash.cloneDeep(data.tasks),
                                      lodash.cloneDeep(data.skills),
                                      lodash.cloneDeep(data.task_sort_status),
                                      lodash.cloneDeep(data.skill_sort_status),
                                      data.selected_sprite,
  );
  return char;
}
