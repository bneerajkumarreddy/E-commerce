// main.js (Electron main process)

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const { spawn } = require("child_process");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // Start Node.js server
  const serverProcess = spawn("node", ["../ecommerce-backend/server.js"], {
    cwd: path.join(__dirname, "ecommerce-backend"),
  });
  serverProcess.stdout.on("data", (data) => {
    console.log(`Server stdout: ${data}`);
  });
  serverProcess.stderr.on("data", (data) => {
    console.error(`Server stderr: ${data}`);
  });

  // IPC communication example
  ipcMain.on("get-products", (event, arg) => {
    // Example: Send request to backend to get products
    // Use axios or fetch API to make HTTP requests
    // Example:
    // fetch('http://localhost:3000/api/products')
    // .then(response => response.json())
    // .then(data => {
    //     event.reply('products', data);
    // })
    // .catch(error => {
    //     console.error('Error fetching products:', error);
    // });
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
