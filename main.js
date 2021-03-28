const { app, BrowserWindow } = require('electron')
import {} from './datastructs';

app.allowRendererProcessReuse = false

// Proof of concept, this is how you would access our rust module in main
// var threadCount = require('./local_modules/test_module')
// var numThreads = threadCount()
// console.log(numThreads)

// Function for creating the application window
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // File to render for the application window
  win.loadFile('index.html');
}

// Create the application window
app.whenReady().then(createWindow)

// Quit the application when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Prevent loading multiple of the same window or something
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
