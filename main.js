'use strict'

const {
  app,
  BrowserWindow,
  ipcMain,
  globalShortcut,
  Menu
} = require('electron')

const Gmc = require('./js/gmc')
const Startup = require('./js/startup')
