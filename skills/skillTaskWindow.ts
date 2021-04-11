const ipcRenderer = require('electron').ipcRenderer;

//Call to close the window on user click
const butCloseSkillTask = document.getElementById('butCloseSkillTask');
butCloseSkillTask.addEventListener('click', function () {
    ipcRenderer.send("closeSkillTaskWindow"); // ipcRender.send will pass the information to main process
});

//Call for skill task/desc
ipcRenderer.send("getSelectedSkillInfo");
ipcRenderer.on("recieveSelectedSkillInfo", (event, data) => {
    document.getElementById("skillName").innerHTML = data.title;
    document.getElementById("skillDesc").innerHTML = "Description: " + data.description;

    for(var i = 0; i < data.tasks.length; i++) {
        var task = data.tasks[i];

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
        docImg.src = "../images/Skill.png";
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
});
