import { app } from "electron";

export function isDev() {
  return app.getPath("exe").includes("/node_modules/electron-prebuilt/");
}