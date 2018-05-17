const _ = require("lodash")

function assignAttributes(attributes, options) {
  const unknownAttributes = _.difference(_.keys(options), _.keys(attributes))

  if(_.isEmpty(unknownAttributes)) {
    return _.merge(_.cloneDeep(attributes), options)
  } else {
    throw(`Unknown attributes: ${_.join(unknownAttributes, ", ")}`)
  }
}

function define({ attributes = {}, methods = {} }) {
  return {
    build: function(options) {
      return _.create(methods, assignAttributes(attributes, options))
    }
  }
}

const Thing = {
  define
}

module.exports = Thing
