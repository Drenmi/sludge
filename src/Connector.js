const _ = require("lodash")

const Thing = require("./Thing")

const Connector = Thing.define({
  attributes: {
    exits: []
  },
  actions: {
    connect: function(exits) {
      this.exits = _.concat(this.exits, exits)
      _.each(exits, function(exit) {
        exit.connector = this
      })
    },
    resolve: function(source) {
      return _.first(_.reject(this.exits, source))
    }
  }
})

module.exports = Connector
