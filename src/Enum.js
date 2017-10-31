const _ = require("lodash")

function search(prefix = "") {
  if(prefix.length > 0) {
    return _.find(_.keys(this), (item) => (_.startsWith(item, prefix.toUpperCase())))
  }
}

function define(...values) {
  return _.create({ search }, _.zipObject(values))
}

const Enum = {
  define
}

module.exports = Enum
