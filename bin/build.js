#! /usr/bin/env node
// @see https://strongloop.com/strongblog/modular-node-js-express/

const fs = require('fs')
const path = require('path')
const runPkgCmd = require('./runPkgCmd')
const buildInfo = require('./buildInfo')

const root = path.resolve(__dirname, '../')
const src = root + '/src'
const appDir = root + '/src/apps'

fs.readdirSync(src).forEach(dir => {
  runPkgCmd(path.join(src, dir), 'build')
})

fs.readdirSync(appDir).forEach(app => {
  runPkgCmd(path.join(appDir, app), 'build')
})

buildInfo()
