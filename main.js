const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')

let win;
let skills;
let tasks;

app.allowRendererProcessReuse = true

// Function for creating the application window
app.on('ready', function createWindow () {
  win = new BrowserWindow({
    frame: false,
    resizable: false,
    fullscreen: true,
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
  skills = new BrowserWindow({ parent: win,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true 
    }
  })
  position = win.getPosition() //Skill menu is set to take up the left third of the window
  //and will do so by checking the window
  size = win.getSize()
  skills.setPosition(position[0], position[1]+40)
  skills.setSize(Math.round(size[0]/3), size[1]-40)
  skills.loadFile('skills.html')
  skills.show();
// inform the render process that the assigned task finished. Show a message in html
// event.sender.send in ipcMain will return the reply to renderprocess
});

ipcMain.on("taskclick", (event) => {
  tasks = new BrowserWindow({ parent: win,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true 
    }
  })
  position = win.getPosition()
  size = win.getSize()
  x = Math.round(size[0]*(2/3)) //To set the task menu on the right side of the screen
  tasks.setPosition(x, position[1]+40)
  tasks.setSize(Math.round(size[0]/3), size[1]-40)
  tasks.loadFile('tasks.html')
  tasks.show();
// inform the render process that the assigned task finished. Show a message in html
// event.sender.send in ipcMain will return the reply to renderprocess
});

//Closes the skills window and puts the focus back on the main window
ipcMain.on("skillclose", (event) => {
  win.show()
  skills.hide()
});

//Closes the tasks window
ipcMain.on("taskclose", (event) => {
  win.show()
  tasks.hide()
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

