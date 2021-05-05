import { Character } from '../datastructures/char.js';
import { getData, characterFromObj } from '../json_io.js';
import { ipcRenderer } from 'electron';
const path = require('path');

const data = getData();
var character = characterFromObj(data);

for (var i = 0; i < character.tasks.length; i++){
  var task = character.tasks[i]
  var Task = document.createElement('div');
  Task.id = task.task.title;
  var img = document.createElement('img');
  var Name = document.createElement('h3');
  var Desc = document.createElement('p');
  var Datetime = document.createElement('h3');
  var Subtasks = document.createElement('div');
  var Reward = document.createElement('h3');
  var Repeat_increment = document.createElement('div');
  var Num_repeats = document.createElement('div');
  var skill = document.createElement('h3');
  const button = document.createElement('button');
  button.innerText = 'Completed';
  button.addEventListener('click', function(){
    ipcRenderer.send("completeTask",this.parentElement.id);
  });
  const delete_button = document.createElement('button');
  delete_button.innerText = "Delete";
  delete_button.addEventListener('click', function(){
    ipcRenderer.send("deleteTask", this.parentElement.id);
  })
  Task.className = 'taskTab';

  // Temporary use of the skill image as the background
  img.src = path.resolve(__dirname, "../images/newSkill.png");
  Name.className = 'taskName';
  Name.innerHTML = task.task.title;
  Desc.className = 'taskDesc';
  Desc.innerHTML = task.task.description;
  Datetime.className = 'taskDate';
  var date = task.task.date.toString();
  Datetime.innerHTML = date;

  // Add more to subtasks in the future
  Subtasks.className = 'taskSub';
  Reward.className = 'taskReward';
  Reward.innerHTML = 'Reward: ' + task.task.reward.toString();
  Repeat_increment.className = 'taskInc';
  Repeat_increment.innerHTML = task.repeat_increment.toString();
  Num_repeats.className = 'taskRep';
  Num_repeats.innerHTML = "Repeats Remaining: " + task.num_repeats.toString();
  skill.className = 'taskSkill';
  skill.innerHTML = task.skill;
  Task.appendChild(img);
  Task.appendChild(Name);
  Task.appendChild(Desc);
  Task.appendChild(Datetime);
  Task.appendChild(Subtasks);
  Task.appendChild(Reward);
  //Task.appendChild(Repeat_increment);
  Task.appendChild(Num_repeats);
  Task.appendChild(skill);
  Task.appendChild(button);
  Task.appendChild(delete_button);
  document.getElementById('tasksRow').appendChild(Task);
}
