var chai = require('chai')
var expect = require('chai').expect
var readFileSync = require('fs-extra').readFileSync
chai.use(require('chai-json'))

describe('gmc', function () {
  var gmc = require('../config/gmc.json')
  var gmcEx = {
    chain: {
      name: 'Musicoin Daemon',
      path: '{process.cwd}/bin/gmc/',
      command: './gmc',
      args: [
        '--rpc',
        '--rpcapi=admin,db,eth,net,web3,personal',
        '--rpcport',
        '8545',
        '--rpcaddr',
        '127.0.0.1',
        '--rpccorsdomain',
        'localhost',
        '--fast',
        '--cache=512'
      ],
      rpcServer: 'http://localhost:8545'
    }
  }
  describe('Config:\n', function () {
    it('- gmc.json should be JSON', function () {
      expect(gmc).be.a.jsonObj()
    })
    it('- expects ' + JSON.stringify(gmcEx['chain']), function () {
      expect(JSON.stringify(gmc['chain'])).to.equal(
        JSON.stringify(gmcEx['chain'])
      )
    })
  })
})
