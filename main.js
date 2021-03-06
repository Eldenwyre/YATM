const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')

const path = require('path');

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


//Stores highestsprite value of X for images/character/char_X.png
const HIGHEST_SPRITE_VALUE = 11

//Returns the Max sprite level, should be lower of the levelgradient/HIGHEST_SPRITE_VALUE of files
function getMaxSprite(){
  return Math.min(Math.floor(character.getLevel() / 10), HIGHEST_SPRITE_VALUE)
}


app.allowRendererProcessReuse = true

// Function for creating the application window
app.on('ready', function createWindow () {
  win = new BrowserWindow({
    frame: true,
    autoHideMenuBar: true,
    resizable: true,
    fullscreen: false,
    width: 1280,
    height: 720,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
    show: false
    }
  });
  win.loadFile('index.html');

  // File to render for the application window
  win.on('ready-to-show', () => {
    win.show()
  });
  win.on('show', () => {
    if (task_button_lock === true) {
      task_button_lock = false;
      win.webContents.send("openSidebar", "tasks");
      win.webContents.send("getWinSize", win.getSize());
    }
    if (skill_button_lock === true) {
      skill_button_lock = false;
      win.webContents.send("openSidebar", "skills");
      win.webContents.send("getWinSize", win.getSize());
    }
  });

  //Moves the skills and tasks child windows with the main window
  win.on('resize', function() {
    let position = win.getPosition();
    let size = win.getSize();
    let realsize = win.getContentSize();
    win.webContents.send('getWinSize', size);
  });
});

ipcMain.on("requestWinSize", (event) => {
  data = win.getSize();
  event.sender.send("getWinSize", data);
});

ipcMain.on("recvSidebarInfo", (event, data) => {
  task_button_lock = data.tasksbar;
  skill_button_lock = data.skillsbar;
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
  size = win.getContentSize()
  addskills = new BrowserWindow({ parent: win,
    frame: false,
    show: false,
    x: position[0]+8, //Puts the window on the left side of the screen, but not off of the main window
    y: position[1]+31,
    width: Math.round(size[0]*(1.0/3)),
    height: size[1],
    resizable: true,
    webPreferences: {
      nodeIntegration: true //Required to close the child window
    }
  })
  addskills.loadFile('skills/skillForm.html')
  addskills.show();
});

ipcMain.on("addSkillClose", (event) => {
  win.show()
  addskills.hide()
  add_skill_lock = false; //Disable add skill lock
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
  size = win.getContentSize()
  addtasks = new BrowserWindow({ parent: win,
    frame: false,
    show: false,
    x: position[0]+8+Math.round(size[0]*(2.0/3)), //Math to put the window on the right side
    y: position[1]+31,
    width: Math.round(size[0]*(1.0/3)),
    height: size[1],
    resizable: true,
    webPreferences: {
      nodeIntegration: true //Required to close the child window
    }
  })
  addtasks.loadFile('tasks/taskForm.html')
  addtasks.show();
});

ipcMain.on("addTaskClose", (event) => {
  win.show();
  addtasks.hide();
  add_task_lock = false; // Dsiable add task lock
});

//Send the character info whenever requested through sendCharacterInfo channel
//Recieve with ipcRenderer.on("sendCharacterInfo", (event, data) => {});
ipcMain.on("requestCharacterInfo", (event) => {
  data = {
    name:character.name,
    level:Math.trunc(character.getLevel())
  }
  event.sender.send("sendCharacterInfo", data);
});

//Send the character sprite info whenever requested through sendCharacterSpriteNumber
//Recieve with ipcRenderer.on("sendCharacterSpriteNumber", (event, data) =>{});
ipcMain.on("requestCharacterSpriteNumber", (event) => {
  data = {
    sprite_value : character.get_sprite(),
    max_sprite_value : getMaxSprite()
  }
  event.sender.send("sendCharacterSpriteNumber", data);  
})

//Edits sprite value
ipcMain.on("changeCharSpriteNumber", (event, data) => {
  value_requested = (parseInt(character.selected_sprite, 10) + data);
  //Checks for the value being high or low
  if(value_requested < 0){
    value_requested = 0;
  }
  else if(value_requested > getMaxSprite()){
    value_requested = getMaxSprite();
  }
  character.selected_sprite = value_requested.toString();
  //Save Character
  json_io_js_1.saveData(character, path.resolve(__dirname, "saves/character.json"));
  win.reload();
  //Checks for bounds
});


ipcMain.on("addTaskInformation", (event, _task_data) => {
  character.addTask(new tasks_js_1.RepeatableTask(lodash.cloneDeep(_task_data.task_name),
                    lodash.cloneDeep(_task_data.task_desc),
                    lodash.cloneDeep(_task_data.task_date),
                    parseInt(_task_data.task_reward),
                    [], //TODO add subtask functionality lodash.cloneDeep(taskInfo.task_subtasks),
                    parseInt(_task_data.task_inc),
                    parseInt(_task_data.task_max_repeats),
                    lodash.cloneDeep(_task_data.task_skill)));
  json_io_js_1.saveData(character, path.resolve(__dirname, "saves/character.json"));
  win.reload();
  win.webContents.send("requestSidebarInfo");
  win.reload();
});

ipcMain.on("addSkillInformation", (event, _skill_data) => {
  character.addSkill(new skills_js_1.Skill(lodash.cloneDeep(_skill_data.skill_name),
  lodash.cloneDeep(_skill_data.skill_description),
  parseInt(_skill_data.skill_xp)));
  json_io_js_1.saveData(character, path.resolve(__dirname, "saves/character.json"));
  win.webContents.send('requestSidebarInfo');
  win.reload();
});

//Specific Skill Window
ipcMain.on("openSkillTaskWindow", (event, arg) => {
  let size = win.getSize();
  skillTasks = new BrowserWindow(
    {
      parent: win,
      frame: false,
      show: false,
      width: Math.round(size[0]/12*4.5),
      height: size[1]-450,
      resizable: false,
      webPreferences: {
        nodeIntegration: true //Required to close the child window
      }
    });
    selectedSkill = arg; //REVIEW
    skillTasks.loadFile('skills/skillTaskWindow.html');
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
  json_io_js_1.saveData(character, path.resolve(__dirname, "saves/character.json"));
  win.webContents.send("requestSidebarInfo");
  win.reload();
});

ipcMain.on("deleteTask", (event, taskname) => {
  character.deleteTask(taskname);
  json_io_js_1.saveData(character, path.resolve(__dirname, "saves/character.json"));
  win.webContents.send("requestSidebarInfo");
  win.reload();
});


ipcMain.on("deleteSkill", (event, skillname) => {
  character.deleteSkill(skillname);
  json_io_js_1.saveData(character, path.resolve(__dirname, "saves/character.json"));
  win.webContents.send("requestSidebarInfo");
  win.reload();
});

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
