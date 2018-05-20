const _ = require("lodash")

function assignAttributes(attributes, options) {
  const unknownAttributes = _.difference(_.keys(options), _.keys(attributes))

  if(_.isEmpty(unknownAttributes)) {
    return _.merge(_.cloneDeep(attributes), options)
  } else {
    throw(`Unknown attributes: ${_.join(unknownAttributes, ", ")}`)
  }
}

function combineThing(traits) {
  return _.reduce(traits, function(thing, trait) {
    return _.merge(thing, _.cloneDeep(trait))
  })
}

function define({ traits = [], attributes = {}, actions = {} }) {
  const thing = combineThing(_.concat({ attributes, actions }, traits))

  return {
    build: function(attributes) {
      return _.create(thing.actions, assignAttributes(thing.attributes, attributes))
    },
    attributes: _.keys(attributes),
    traits: _.map(traits, "name"),
    kindOf: function(trait) {
      return _.includes(this.traits, trait)
    }
  }
}

const Thing = {
  define
}

module.exports = Thing
