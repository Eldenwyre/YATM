const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')

let win;
let skills;
let tasks;

app.allowRendererProcessReuse = true

// Function for creating the application window
app.on('ready', function createWindow () {
  win = new BrowserWindow({
    menuBarVisibility: false,
    webPreferences: {
      nodeIntegration: true,
    show: false
    }
  });
  win.loadFile('index.html');

  // File to render for the application window
  win.once('ready-to-show', () => {
    win.maximize()
    win.show()
  });

  
});



ipcMain.on("skillclick", (event) => {
  skills = new BrowserWindow({ parent: win,
    frame: false,
    show: false 
  })
  position = win.getPosition()
  size = win.getSize()
  skills.setPosition(position[0]+6, position[1]+55)
  skills.setSize(size[0]/4, size[1]-55)
  skills.loadFile('skills.html')
  skills.show();
// inform the render process that the assigned task finished. Show a message in html
// event.sender.send in ipcMain will return the reply to renderprocess
  skills.on('close', function () {
    skills.hide();
    event.preventDefault();
  })
});

ipcMain.on("taskclick", (event) => {
  tasks = new BrowserWindow({ parent: win,
    frame: false,
    show: false 
  })
  position = win.getPosition()
  size = win.getSize()
  x = size[0]*.75
  y = size[1]
  tasks.setPosition(x-6, position[1]+55)
  tasks.setSize(size[0]/4, size[1]-55)
  tasks.loadFile('tasks.html')
  tasks.show();
// inform the render process that the assigned task finished. Show a message in html
// event.sender.send in ipcMain will return the reply to renderprocess
});

ipcMain.on("skillclose", (event) => {
  skills.hide();
  win.show();
});

ipcMain.on("taskclose", (event) => {
  tasks.hide();
  win.show();
});

// Quit the application when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

