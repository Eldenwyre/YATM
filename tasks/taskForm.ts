import { ipcRenderer } from 'electron';

const addTaskClose = document.getElementById("addTaskClose");
addTaskClose.addEventListener('click', function () {
    ipcRenderer.send("addTaskClose"); // ipcRender.send will pass the information to main process
});

export function sendTaskForm(event){
  //Get the values
  
  var _task_data = {
    task_name : (<HTMLInputElement>document.getElementById("task_name")).value,
    task_desc : (<HTMLInputElement>document.getElementById("task_desc")).value,
    task_date : (<HTMLInputElement>document.getElementById("task_date")).value,
    task_reward : (<HTMLInputElement>document.getElementById("task_reward")).value,
    task_inc : (<HTMLInputElement>document.getElementById("task_inc")).value,
    task_max_repeats : (<HTMLInputElement>document.getElementById("task_max_repeats")).value,
    task_skill : (<HTMLInputElement>document.getElementById("task_skill")).value
  }
  ipcRenderer.send("addTaskInformation", _task_data);
};
