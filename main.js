const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')

let win;
let skills;
let tasks;

let skill_button_lock=false; //Locks the skill button when pressed until window is closed.
let task_button_lock=false; //Locks the task button when pressed until window is closed.


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

ipcMain.on("addskillclose", (event) => {
  win.show()
  addskills.hide()
  skills.show();
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

ipcMain.on("addtask", (event) => {
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

ipcMain.on("addtaskclose", (event) => {
  win.show()
  addtasks.hide()
  tasks.show();
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

ipcMain.on("exit", (event) => {
  app.quit()
});

// Quit the application when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
