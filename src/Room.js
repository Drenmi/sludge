const _ = require("lodash")

const Thing = require("./Thing")
const Container = require("./traits/container")

const DEFAULT_EXITS = { north: null, east: null, south: null, west: null, up: null, down: null }

const Room = Thing.define({
  attributes: {
    exits: DEFAULT_EXITS
  },
  traits: [Container],
  actions: {
    emit: function(sensoryEvent, context) {
      _.each(this.contents, function(content) {
        sensoryEvent.resolve(content, context)
      })
    }
  }
})

module.exports = Room
