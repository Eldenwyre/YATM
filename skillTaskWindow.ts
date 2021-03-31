import { Character } from './datastructures/char.js';
import { Skill } from './datastructures/skills.js';
import { getData, characterFromObj } from './json_io.js';
import {ipcRenderer} from 'electron';

var data = getData();
var character = characterFromObj(data);
var skill_title: string;

ipcRenderer.on("recieveSelectedSkill", (event, data) => {
    skill_title = data;
  });

ipcRenderer.send("test", skill_title);

window.onload = () => {
    ipcRenderer.send("getSelectedSkill");
    ipcRenderer.send("test",1);
    var skill: Skill = character.skills.find(skill => skill.title === skill_title);
    ipcRenderer.send("test", skill);
    for(var i = 0; i < skill.tasks.length; i++) {
        var task = skill.tasks[i];

        var docTask = document.createElement('div');
        var docImg = document.createElement('img');
        var docName = document.createElement('h3');
        var docDesc = document.createElement('p');
        var docDate = document.createElement('h3');
        var docSubtasks = document.createElement('div');
        var docReward = document.createElement('h3');
        var docRepeatIncrement = document.createElement('div');
        var docNumRepeats = document.createElement('div');

        docTask.className="taskTab";

        //Build the elements
        docImg.src = "images/Skill.png";
        docName.className = "taskName";
        docName.innerHTML = task.task.title;
        docDesc.className = "taskDesc";
        docDesc.innerHTML = task.task.description;
        docDate.className = "taskDate";
        docDate.innerHTML = task.task.date.toString();
        docReward.className = 'taskReward';
        docReward.innerHTML = task.task.reward.toString();
        docRepeatIncrement.className = 'taskRepeat';
        docRepeatIncrement.innerHTML = task.repeat_increment.toString();
        docNumRepeats.className = 'taskRep'
        docNumRepeats.innerHTML = task.num_repeats.toString();

        docTask.appendChild(docImg);
        docTask.appendChild(docName);
        docTask.appendChild(docDesc);
        docTask.appendChild(docDate);
        docTask.appendChild(docReward);
        docTask.appendChild(docRepeatIncrement);
        docTask.appendChild(docNumRepeats);
        document.getElementById('taskList').appendChild(docTask);
    }
}

