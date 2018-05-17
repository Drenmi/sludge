const _ = require("lodash")

const Container = {
  attributes: {
    contents: []
  },
  actions: {
    add: function(thing) {
      this.contents.push(thing)
    },
    remove: function(thing) {
      _.pull(this.contents, thing)
    }
  }
}

module.exports = Container
