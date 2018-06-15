import wurl from 'wurl';
import os from 'os';
import fs from 'fs';
import path from 'path';

const INJECT_CSS_PATH = path.join(__dirname, '..', 'inject/inject.css');
const log = require('loglevel');

function isOSX() {
  return os.platform() === 'darwin';
}

function isLinux() {
  return os.platform() === 'linux';
}

function isWindows() {
  return os.platform() === 'win32';
}

function linkIsInternal(currentUrl, newUrl, internalUrlRegex) {
  if (newUrl === 'about:blank') {
    return true;
  }

  if (internalUrlRegex) {
    const regex = RegExp(internalUrlRegex);
    return regex.test(newUrl);
  }

  const currentDomain = wurl('domain', currentUrl);
  const newDomain = wurl('domain', newUrl);
  return currentDomain === newDomain;
}

function shouldInjectCss() {
  try {
    fs.accessSync(INJECT_CSS_PATH, fs.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

function getCssToInject() {
  return fs.readFileSync(INJECT_CSS_PATH).toString();
}

/**
 * Helper method to print debug messages from the main process in the browser window
 * @param {BrowserWindow} browserWindow
 * @param message
 */
function debugLog(browserWindow, message) {
  // need the timeout as it takes time for the preload javascript to be loaded in the window
  setTimeout(() => {
    browserWindow.webContents.send('debug', message);
  }, 3000);
  log.info(message);
}

function getAppIcon() {
  return path.join(__dirname, '../', `/icon.${isWindows() ? 'ico' : 'png'}`);
}

function nativeTabsSupported() {
  return isOSX();
}

function getCounterValue(title) {
  const itemCountRegex = /[([{]([\d.,]*)\+?[}\])]/;
  const match = itemCountRegex.exec(title);
  return match ? match[1] : undefined;
}

export default {
  isOSX,
  isLinux,
  isWindows,
  linkIsInternal,
  getCssToInject,
  debugLog,
  shouldInjectCss,
  getAppIcon,
  nativeTabsSupported,
  getCounterValue,
};
