const _ = require("lodash")

const Container = {
  name: "container",
  attributes: {
    contents: []
  },
  actions: {
    add: function(...things) {
      _.each(things, (thing) => this.contents.push(thing))
    },
    remove: function(...things) {
      _.each(things, (thing) => _.pull(this.contents, thing))
    }
  }
}

module.exports = Container
