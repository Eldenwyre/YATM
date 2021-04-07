import { ipcRenderer } from 'electron';

const addSkillClose = document.getElementById("addSkillClose");
addSkillClose.addEventListener('click', function () {
    ipcRenderer.send("addSkillClose"); // ipcRender.send will pass the information to main process
});

export function sendSkillForm(){
  //Get the values

  var _skill_data = {
    skill_name: (<HTMLInputElement>document.getElementById("skill_name")).value,
    skill_description: (<HTMLInputElement>document.getElementById("skill_description")).value,
    skill_xp: (<HTMLInputElement>document.getElementById("skill_xp")).value,
  }
  ipcRenderer.send("addSkillInformation", _skill_data);
};
