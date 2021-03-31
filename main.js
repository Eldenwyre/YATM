const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')

//Req for character class to be in main
const json_io_js_1 = require("./json_io.js");
const char_js_1 = require("./datastructures/char.js");
const tasks_js_1 = require("./datastructures/tasks.js");
const skills_js_1 = require("./datastructures/skills.js");
const lodash = require("lodash");

//Load the character
var data = json_io_js_1.getData();
var character = json_io_js_1.characterFromObj(data);


//Window objects
let win; // Main window
let skills; // Skills Tab
let tasks; // Tasks Tab
let skillTasks; //Skill task tab
var selectedSkill;

let skill_button_lock=false; //Locks the skill button when pressed until window is closed.
let task_button_lock=false; //Locks the task button when pressed until window is closed.
let add_skill_lock = false; //Locks the add skill button when pressed until window is closed.
let add_task_lock = false; //Locks the add task button when pressed until window is closed.

app.allowRendererProcessReuse = true

// Function for creating the application window
app.on('ready', function createWindow () {
  win = new BrowserWindow({
    frame: true,
    resizable: true,
    fullscreen: false,
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
    show: false
    }
  });
  win.loadFile('index.html');

  // File to render for the application window
  win.once('ready-to-show', () => {
    win.show()
  });
});

ipcMain.on("skillclick", (event) => {
  //If button lock is activated, return immediately
  if (skill_button_lock) {
    return;
  }

  //Enable skill button lock
  skill_button_lock = true;
  position = win.getPosition() //Skill menu is set to take up the left third of the window
  //and will do so by checking the window
  size = win.getSize()
  skills = new BrowserWindow({ parent: win,
    frame: false,
    show: false,
    x: position[0],
    y: position[1],
    width: Math.round(size[0]/12*4.5),
    height: size[1],
    resizable: false,
    webPreferences: {
      nodeIntegration: true //Required to close the child window
    }
  })
  skills.loadFile('skills.html')
  skills.show();
});

ipcMain.on("addskill", (event) => {
  //if skill is locked, return, else lock and continue
  if (add_skill_lock) {
    return;
  }
  //Lock add skill button when pressed until window is closed.
  add_skill_lock = true; //

  position = win.getPosition() //Skill menu is set to take up the left third of the window
  //and will do so by checking the window
  size = win.getSize()
  addskills = new BrowserWindow({ parent: win,
    frame: false,
    show: false,
    width: Math.round(size[0]/3),
    height: size[1]-40,
    resizable: true,
    webPreferences: {
      nodeIntegration: true //Required to close the child window
    }
  })
  addskills.loadFile('skillForm.html')
  addskills.show();
});

ipcMain.on("addSkillClose", (event) => {
  win.show()
  addskills.hide()
  skills.show();
  add_skill_lock = false; //Disable add skill lock
});

ipcMain.on("taskclick", (event) => {
  //If button lock is activated, return immediately
  if (task_button_lock) {
    return;
  }

  task_button_lock = true; //Enable task button lock
  position = win.getPosition()
  size = win.getSize()
  x = Math.round(position[0] + size[0]*(7.5/12)) //To set the task menu on the right side of the screen
  tasks = new BrowserWindow({ parent: win,
    frame: false,
    show: false,
    x: x,
    y: position[1],
    width: Math.round(size[0]/12*4.5),
    height: size[1],
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  tasks.loadFile('tasks.html')
  tasks.show();
});

ipcMain.on("addTaskWindow", (event) => {
  //Return if locked, otherwise continue
  if (add_task_lock) {
    return;
  }
  //Locking the button
  add_task_lock = true; //
  position = win.getPosition() //Skill menu is set to take up the left third of the window
  //and will do so by checking the window
  size = win.getSize()
  addtasks = new BrowserWindow({ parent: win,
    frame: false,
    show: false,
    width: Math.round(size[0]/3),
    height: size[1]-40,
    resizable: true,
    webPreferences: {
      nodeIntegration: true //Required to close the child window
    }
  })
  addtasks.loadFile('taskForm.html')
  addtasks.show();
});

ipcMain.on("addTaskClose", (event) => {
  win.show();
  addtasks.hide();
  tasks.show();
  add_task_lock = false; // Dsiable add task lock
});

//Send the character info whenever requested through sendCharacterInfo channel
//Recieve with ipcRenderer.on("sendCharacterInfo", (event, data) => {}();
ipcMain.on("requestCharacterInfo", (event) => {
  data = {
    name:character.name,
    level:Math.trunc(character.getLevel())
  }
  event.sender.send("sendCharacterInfo", data);
});

ipcMain.on("addTaskInformation", (event, _task_data) => {
  character.addTask(new tasks_js_1.RepeatableTask(lodash.cloneDeep(_task_data.task_name),
                    lodash.cloneDeep(_task_data.task_desc),
                    lodash.cloneDeep(_task_data.task_date),
                    parseInt(_task_data.task_reward),
                    [], //TODO add subtask functionality lodash.cloneDeep(taskInfo.task_subtasks),
                    parseInt(_task_data.task_inc),
                    parseInt(_task_data.task_max_repeats)));

  json_io_js_1.saveData(character, "./saves/character.json");
  tasks.reload();
});

ipcMain.on("addSkillInformation", (event, _skill_data) => {
  console.log("Test", _skill_data);
  character.addSkill(new skills_js_1.Skill(lodash.cloneDeep(_skill_data.skill_name),
  lodash.cloneDeep(_skill_data.skill_description),
  parseInt(_skill_data.skill_xp),
  []));
  json_io_js_1.saveData(character, "./saves/character.json");
  skills.reload();
});

//Closes the skills window and puts the focus back on the main window
ipcMain.on("skillclose", (event) => {
  win.show()
  skills.hide()
  skill_button_lock = false; //Disable the skill button lock
});

//Closes the tasks window
ipcMain.on("taskclose", (event) => {
  win.show()
  tasks.hide()
  task_button_lock = false; //Disable the task button lock
});

//Specific Skill Window
ipcMain.on("openSkillTaskWindow", (event, arg) => {
  skillTasks = new BrowserWindow(
    {
      parent: win,
      frame: false,
      show: false,
      width: Math.round(size[0]/12*4.5),
      height: size[1]-40,
      resizable: false,
      webPreferences: {
        nodeIntegration: true //Required to close the child window
      }
    });
    selectedSkill = arg; //REVIEW
    skillTasks.loadFile('skillTaskWindow.html');
    skillTasks.show();
});

ipcMain.on("closeSkillTaskWindow", (event) => {
  skillTasks.hide();
});

ipcMain.on("getSelectedSkill", (event) => {
  event.sender.send("recieveSelectedSkill",selectedSkill);
});

ipcMain.on("completeTask", (event, taskname) => {
  character.completeTask(taskname);
  json_io_js_1.saveData(character, "./saves/character.json");
  tasks.reload();
  win.reload();
})

ipcMain.on("test", (event,args) => {
  console.log("test");
  console.log(args)
});

ipcMain.on("getSelectedSkillInfo", (event) => {
  var sk = character.skills.find(skill => skill.title === selectedSkill);
  event.sender.send("recieveSelectedSkillInfo", sk)
});

ipcMain.on("exit", (event) => {
  app.quit()
});

// Quit the application when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
