// Import functions
import { saveData, getData, characterFromFile} from './json_io.js';
import { Character } from './datastructures/char.js';
import { Subtask, RepeatableTask } from './datastructures/tasks.js';

// Create example object to read/write to file
var placeHolder = {
  name:"Name",
  age:21,
};

// Save object to json file
saveData(placeHolder, "./saves/test.json");
// read the object back from the file
console.log(getData("./saves/test.json"));

var curr_date: Date = new Date();
var rt = new RepeatableTask("Task Title", "Task Desc", curr_date, 100, [], 10, 10);

var character: Character = new Character("Character1", 500, [rt], []);
character.save();
var new_char: Character = characterFromFile();

console.log(new_char);
console.log(new_char.getLevel());
console.log(new_char.tasks[0].task.date);
