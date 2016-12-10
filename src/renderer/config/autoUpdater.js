import { app, autoUpdater, BrowserWindow as BrowserWindowElectron } from "electron";
import * as os from "os";
import BrowserWindow = GitHubElectron.BrowserWindow;
import WebContents = GitHubElectron.WebContents;

const UPDATE_SERVER_HOST = "onshape-download.develar.org"

export default class AppUpdater {
  constructor(window) {

    const version = app.getVersion()
    autoUpdater.addListener("update-available", (event) => {
      console.log("A new update is available")
    })
    autoUpdater.addListener("update-downloaded", (event, releaseNotes, releaseName, releaseDate, updateURL) => {
      notify("A new update is ready to install", `Version ${releaseName} is downloaded and will be automatically installed on Quit`)
    })
    autoUpdater.addListener("error", (error) => {
      console.log(error)
    })
    autoUpdater.addListener("checking-for-update", (event) => {
      console.log("checking-for-update")
    })
    autoUpdater.addListener("update-not-available", () => {
      console.log("update-not-available")
    })
    //autoUpdater.setFeedURL(`https://${UPDATE_SERVER_HOST}/update/${os.platform()}_${os.arch()}/${version}`)

    window.webContents.once("did-frame-finish-load", (event) => {
      autoUpdater.checkForUpdates()
    })
  }
}

function notify(title, message) {
  let windows = BrowserWindowElectron.getAllWindows()
  if (windows.length == 0) {
    return
  }

  windows[0].webContents.send("notify", title, message)
}
