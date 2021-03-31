import { Character } from './datastructures/char.js';
import { getData, characterFromObj } from './json_io.js';

var data = getData();
var character = characterFromObj(data);

window.onload = () => {
  for (var i = 0; i < character.tasks.length; i++){
    var task = character.tasks[i]
    var Task = document.createElement('div');
    var img = document.createElement('img');
    var Name = document.createElement('h3');
    var Desc = document.createElement('p');
    var Datetime = document.createElement('h3');
    var Subtasks = document.createElement('div');
    var Reward = document.createElement('h3');
    var Repeat_increment = document.createElement('div');
    var Num_repeats = document.createElement('div');
    Task.className = 'taskTab';

    // Temporary use of the skill image as the background
    img.src = "images/Skill.png"
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
    Num_repeats.innerHTML = task.num_repeats.toString();
    Task.appendChild(img);
    Task.appendChild(Name);
    Task.appendChild(Desc);
    Task.appendChild(Datetime);
    Task.appendChild(Subtasks);
    Task.appendChild(Reward);
    Task.appendChild(Repeat_increment);
    Task.appendChild(Num_repeats);
    document.getElementsByTagName('body')[0].appendChild(Task);
  }
}