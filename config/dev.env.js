'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_LOCATION: '"http://v220190910354396996.luckysrv.de"',
  CREATOR_ADDRESS: '"cosmos178x4cwg7zuppfgypdd7c0wy0kp304wad9v0awe"',
  CREATOR_MNEMONIC: '"obey regular kiwi crop middle letter ten ivory foot supreme spice job beef dignity loan easy amateur wall skill cube random post grunt blind"'
})
