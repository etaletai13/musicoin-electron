var chai = require('chai')
var expect = require('chai').expect
var readFileSync = require('fs-extra').readFileSync
chai.use(require('chai-json'))

describe('global configuration', function () {
  var nodes = require('../config/bootnodes.json')
  var settings = require('../config/settings.json')
  describe('Config files:\n', function () {
    it('- bootnodes.json should be JSON', function () {
      expect(nodes).be.a.jsonObj()
    })
    it('- settings.json should be JSON', function () {
      expect(settings).be.a.jsonObj()
    })
  })
})
