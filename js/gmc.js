const child_process = require('child_process')
const fs = require('fs-extra')
const mkdirp = require('mkdirp').sync
const os = require('os')
const sys = require('util')

let gmcBinDir = mkdirp('./bin/gmc/', '777')

function Gmc (gmcBinDir) {
  if (os.type() === 'Linux') {
    try {
      require('fs-extra').symlinkSync(
        require('path').resolve('node_modules/.bin/gmc-lin'),
        './bin/gmc/gmc',
        'junction'
      )
    } catch (e) {}
  } else if (os.type() === 'Darwin') {
    var musicoinRoot = process.env.HOME + '/Library/Musicoin'
    var configFolderHome = musicoinRoot + '/config'
    try {
      require('fs-extra').symlinkSync(
        require('path').resolve('node_modules/.bin/gmc-mac'),
        './bin/gmc/gmc',
        'junction'
      )
    } catch (e) {}
  } else if (os.type() === 'Windows_NT') {
    var musicoinRoot = process.env.APPDATA + '\\Musicoin'
    var configFolderHome = musicoinRoot + '\\config'
    try {
      require('fs-extra').symlinkSync(
        require('path').resolve('node_modules/.bin/gmc-win'),
        './bin/gmc/gmc',
        'junction'
      )
    } catch (e) {}
  } else throw new Error('Unsupported OS found: ' + os.type())
}

let gmcBin = Gmc('./bin/gmc/gmc')
module.exports = Gmc
