const _ = require("lodash")

function define({ attributes = {}, methods = {} }) {
  return {
    build: function(options) {
      return _.create(methods, _.merge(_.cloneDeep(attributes), options))
    }
  }
}

const Thing = {
  define
}

module.exports = Thing
